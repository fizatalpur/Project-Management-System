import User from '../models/user.model.js';
import { createJWT } from "../utils/index.js";

//Register User
export const registerUser = async (req, res) => {
    console.log("Received Data:", req.body);

    try {
        const { name, position, email, password, isAdmin, role } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                status: false,
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            position,
            email,
            password,
            isAdmin,
            role,

        });

        if (user) {
            isAdmin ? createJWT(res, user._id) : null;

            user.password = undefined;

            res.status(201).json(user);
        } else {
            return res.status(400).json({ status: false, message: "Invalid user data" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

//login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ status: false, message: "Invalid email or password." });
        }

        if (!user?.isActive) {
            return res.status(401).json({
                status: false,
                message: "User account has been deactivated, contact the administrator",
            });
        }

        const isMatch = await user.matchPassword(password);

        if (user && isMatch) {
            createJWT(res, user._id);

            user.password = undefined;

            res.status(200).json(user);
        } else {
            return res.status(401).json({ status: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

//logout user
export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            htttpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

