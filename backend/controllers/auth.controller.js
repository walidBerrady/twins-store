import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";

const generateToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    })

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    })

    return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("access_token", accessToken, {
        httpOnly: true, // Prevent XSS attacks
        sameSite: "strict", // Prevent CSRF attacks
        secure:process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true, // Prevent XSS attacks
        sameSite: "strict", // Prevent CSRF attacks
        secure:process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        })

        // authenticate user
        const {accessToken, refreshToken} = generateToken(user._id);
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        res.status(201).json({ user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
            message: "User created successfully",
        })

    } catch (error) {
        console.log("Error in signup controller", error.maessage)
        res.status(500).json({
            message: error.message
        })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})

        if (user && (await user.comparePassword(password))) {
            const {accessToken, refreshToken} = generateToken(user._id)

            await storeRefreshToken(user._id, refreshToken)
            setCookies(res, accessToken, refreshToken)

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        } else {
            res.status(401).json({message: "Invalid email or passwords"})
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: error.message})
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// This will refresh the access token 
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if(!refreshToken) {
            return res.status(404).json({message: "No refresh token provided"});
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if(storedToken !== refreshToken) {
            return res.status(401).json({message: "Invalid refresh token"});
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

        res.json({message: "Token refreshed successfully"});
    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
        res.status(500).json({message: "Server error", error: error.message})
    }
};

export const getProfile = async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}