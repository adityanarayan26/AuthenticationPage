import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import GenerateToken from "../token/GenerateToken.js";


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isValidPassword = await bcrypt.compare(password, user?.password || "")
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        GenerateToken(user._id, res);

        res.status(200).json({ success: true, message: "Login successful", user: user.fullname });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const register = async (req, res) => {
    try {
        const { fullname, email, dob, phone, password, confirmpassword } = req.body;
        const user = await UserModel.findOne({ email: email });
        const hashedPassword = await bcrypt.hash(password, 10);
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password does not match" });
        }
        const newUser = new UserModel({ fullname, email, dob, phone, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ success: true, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt').json({ message: 'Logout successful', success: true });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};