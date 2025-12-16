import User from "../models/User.js";
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email, phone, birthday, address, avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                username,
                email,
                phone,
                birthday,
                address,
                avatar,
            },
            { new: true }
        ).select("-password");

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Update failed" });
    }
};