const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const crypto = require("crypto");



const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user",
        },
        superrole: {
            type: String,
            default: "superuser",
        },
        active: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String,
        },
        wallet: {
            type: Number,
            default: 0,
        },
        lastWalletUpdate: Date,
        videosWatched: [{
            videoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video" // Specify the reference to the Video model
            },
            lastUpdateTimestamp: Date
        }],

        videoWalletUpdates: {
            type: mongoose.Schema.Types.Mixed, // Use Mixed type to store an object with dynamic keys
            default: {},
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
)



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resettoken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
};






const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };










