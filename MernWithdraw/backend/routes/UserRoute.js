const express = require("express");
const { createUser, loginUserCtrl, loginAdmin, handleRefreshToken, getUsers, UpdateActive, UsersActive, UpdateSuperAdmin, updatedUser, getProfile, walletUpdate } = require("../Controller/UserController");
const router = express.Router();
const { isAdmin, authMiddleware, isSuperUser } = require("../middleware/authmiddleware");
const { logoutMiddleware } = require("../middleware/logoutMiddleware");



router.post(`/register`, createUser);
router.post(`/login`, loginUserCtrl);
router.post(`/admin`, loginAdmin);
router.get(`/refresh`, handleRefreshToken);
router.get('/logout', logoutMiddleware, (req, res) => {
    // If the middleware execution reaches here, it means logout was successful
    res.status(200).json({ message: 'Logout successful' });
});
router.get(`/allusers`, authMiddleware, getUsers);
router.put(`/active/:id`, authMiddleware, isAdmin, UpdateActive);
router.get(`/user-active`, authMiddleware, isSuperUser, UsersActive);
router.put(`/update-useractive/:id`, authMiddleware, isAdmin, UpdateSuperAdmin);
router.put(`/update-profile`, authMiddleware, updatedUser);
router.get(`/get-profile`, authMiddleware, getProfile);
router.post('/watch-video', authMiddleware, walletUpdate);




module.exports = router