import UserModel from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) =>{
    const user = {
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, 'register-login').toString(),
    };
    const newUser = new UserModel(user);

    try {
        const createUser = await newUser.save();
        res.status(201).json(createUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const login = async (req, res) => {
    try {
        // check login
        const user = await UserModel.findOne({username : req.body.username});
        !user && res.status(401).json('Wrong credentials!');
        
        // derypt password : giải mã password
        const hashedPassword = CryptoJS.AES.decrypt(user.password, 'register-login');
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // check password
        originalPassword !== req.body.password && res.status(401).json('Wrong credentials!');
        // end check login

        // jwt id and isAdmin
        // expiresIn thời hạn jwt
        const accessToken = jwt.sign({id : user._id, isAdmin : user.isAdmin}, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

        const { password, ...other } = user._doc;
        res.json({...other, accessToken});

    } catch (error) {
        res.status(500).json(error);   
    }
};