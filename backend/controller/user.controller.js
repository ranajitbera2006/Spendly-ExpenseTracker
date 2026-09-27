
import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export const signupController = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;
    if (!fullname || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Please fill all required feilds!" });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ error: "User already exist!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password length should be at least 6" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords Should match!" });
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new User({ fullname, email, password :hashedPassword});
    await newUser.save();
    generateTokenAndSetCookie(newUser._id,res)
    return res
      .status(201)
      .json({ message: "User created successfully!", newUser });
  } catch (error) {
    console.log("Error in addUserController", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const loginController = async (req, res) => {
  try {
    const {email,password} = req.body
    if (!email || !password) {
      return res.status(400).json({error:"All feilds are required!"})
    }
    const user = await User.findOne({email}).select("+password")
    const isPassword = await bcrypt.compare(password,user?.password||"")
    if (!user || !isPassword) {
      return res.status(400).json({error:"Invalid username or password!"})
    }
    generateTokenAndSetCookie(user._id,res)
    return res.status(200).json({message:"User login successfully!",user})
  } catch (error) {
    console.log("Error in loginController", error.message);
    return res.status(500).json("Internal server error!");
  }
};
export const logoutController = async (req,res)=>{
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully." });
    
  } catch (error) {
    console.log("Error in logoutController", error.message);
    return res.status(500).json("Internal server error!");
  }
}