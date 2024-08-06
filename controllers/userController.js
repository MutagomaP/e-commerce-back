import userModel from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists', success: false });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new userModel({
            fullName,
            email,
            password: hashedPassword
        });

        await userModel.create(newUser);
        res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = jwt.sign({ id: user._id }, "process env JWT_SECRET");
                res.json({ message: 'Logged in successfully', success: true, token });
            } else {
                return res.status(400).json({ error: 'Invalid credentials', success: false });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};