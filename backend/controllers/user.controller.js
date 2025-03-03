import User from '../models/user.model.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("name email position role isActive");

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const dashboardStatisticsEmployees = async (req, res) => {
    try {
        const { isAdmin } = req.user;

        if (!isAdmin) {
            return res.status(403).json({
                status: false,
                message: "Unauthorized access",
            });
        }

        const totalEmployees = await User.countDocuments({ isAdmin: false });

        res.status(200).json({
            status: true,
            message: "Total employees count fetched successfully",
            totalEmployees
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;
        const { _id } = req.body;

        const id =
            isAdmin && userId === _id
                ? userId
                : isAdmin && userId !== _id
                    ? _id
                    : userId;

        const user = await User.findById(id);

        if (user) {
            user.name = req.body.name || user.name;
            user.position = req.body.position || user.position;
            user.role = req.body.role || user.role;

            const updatedUser = await user.save();

            user.password = undefined;

            res.status(201).json({
                status: true,
                message: "Profile Updated Successfully.",
                user: updatedUser,
            });
        } else {
            res.status(404).json({ status: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const activateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (user) {
            user.isActive = req.body.isActive; //!user.isActive

            await user.save();

            res.status(201).json({
                status: true,
                message: `User account has been ${user?.isActive ? "activated" : "disabled"
                    }`,
            });
        } else {
            res.status(404).json({ status: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndDelete(id);

        res.status(200).json({ status: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};