const { UserModel } = require("../models/UserModel");
const { VideoModel } = require("../models/videoModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");

// Register here
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    const finduser = await UserModel.findOne({ email: email });


    if (!finduser) {
        const newUser = await UserModel.create(req.body);
        res.status(200).json(newUser);
    } else {
        throw new Error("User Already Exits!")
    }
})

// login here
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await UserModel.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await UserModel.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            token: generateToken(findUser?._id),
        });
    } else {
        return res.status(403).send("Invalid Credeintials!")
    }
});

// admin login here
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await UserModel.findOne({ email });
    if (findAdmin.role !== "admin") return res.status(401).send("You are not Admin!");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await UserModel.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            username: findAdmin?.username,
            phone: findAdmin?.phone,
            email: findAdmin?.email,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});


// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await UserModel.findOne({ refreshToken });
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, "abcdefghijklmnopqrstuvwxyaz", (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});



// get user here
const getUsers = asyncHandler(async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).send({ message: "All Users", data });
    } catch (error) {
        res.status(400).send(error)
    }
})



// user active

const UsersActive = asyncHandler(async (req, res) => {
    try {
        const users = await UserModel.find();
        const activeUsers = users.filter(user => user.superrole === "superadmin");

        if (activeUsers.length > 0) {
            // At least one user is active, return status code 200
            res.status(200).json({ message: 'At least one active user found', data: activeUsers });
        } else {
            // No active users found, return status code 400
            res.status(400).json({ message: 'No active users found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})









// update active
const UpdateActive = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const data = await UserModel.findByIdAndUpdate(id, {
            active: req.body.active
        }, { new: true });
        res.status(200).send({ message: "User has been Activated", data });
    } catch (error) {
        res.status(400).send(error)
    }
})


// update super admin active
const UpdateSuperAdmin = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const data = await UserModel.findByIdAndUpdate(id, {
            superrole: req.body.superrole
        }, { new: true });
        res.status(200).send({ message: "New Updated!", data });
    } catch (error) {
        res.status(400).send(error)
    }
})



// get profile user
const getProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    try {
        const getUser = await UserModel.findById(_id).populate({
            path: "videosWatched.videoId", // Specify the path to populate
            model: "Video", // Specify the model to populate (should match your Video model name)
        });

        res.json(getUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});






//   update user

const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            _id,
            {
                username: req?.body?.username,
                email: req?.body?.email,
                phone: req?.body?.phone,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});


// wallet update 

const walletUpdate = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const videoId = req.body.videoId;

    try {
        // Check if the user exists
        const user = await UserModel.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the user has already updated their wallet within the last 24 hours for this video
        const videoWatched = user.videosWatched.find((watched) => watched.videoId.equals(videoId));

        if (videoWatched) {
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            if (videoWatched.lastUpdateTimestamp && videoWatched.lastUpdateTimestamp > twentyFourHoursAgo) {
                return res.status(400).json({ message: "You will be able to watch the video after 24 hours" });
            }
        }

        // Check if the video exists
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }

        // Mark the video as watched by the user and update the last wallet update timestamp
        const timestampIndex = user.videosWatched.findIndex((watched) => watched.videoId.equals(videoId));

        if (timestampIndex !== -1) {
            user.videosWatched[timestampIndex].lastUpdateTimestamp = new Date();
        } else {
            user.videosWatched.push({ videoId: videoId, lastUpdateTimestamp: new Date() });
        }

        // Award the user with some wallet update, e.g., add 20 to their wallet
        user.wallet += 20;

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: "Wallet updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});





module.exports = { createUser, loginUserCtrl, loginAdmin, handleRefreshToken, getUsers, UpdateActive, UsersActive, UpdateSuperAdmin, updatedUser, getProfile, walletUpdate }