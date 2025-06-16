const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({email});

        if(checkUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with the same email please try again with another email!"
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully."
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
            error: error.message
        });
    }
};


// login
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const checkUser = await User.findOne({email});

        if(!checkUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found. Please signup first!'
            });
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);

        if(!checkPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
        }, 'CLIENT_SECRET_KEY', {expiresIn: '60m'})

        res.cookie('token', token, { 
            httpOnly: true, 
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        }).status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            }
        });

    } catch(error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}


// logout
const logoutUser = (req, res) => {
    res.clearCookie('token').status(200).json({
        success: true,
        message: 'User logged out successfully!'
    });
};


// auth moiddleware
const authMiddleware = async(req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: 'Invalid or expired token'
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware }