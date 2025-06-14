const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, authMiddleware } = require('../../controllers/auth/auth-controller')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user.",
        user
    });
});


module.exports = router;