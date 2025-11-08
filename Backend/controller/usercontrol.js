import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {expiresIn: '30d',  });
  //jwt.sign combines = payload + secret_key + time line 
};


export const signup = async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ message: "User already exists" });  
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = new User({
        fullname,
        email,
        password: hashedPassword,
      });
  
      await createdUser.save();
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: createdUser._id,
          fullname: createdUser.fullname,
          email: createdUser.email,
        },
      });
    } catch (error) {
      console.log("error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // controllers/userController.js
export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", { 
      httpOnly: true,
      secure: true, // or false for local testing (if not using HTTPS)
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Logout failed" });
  }
};


export const login = async(req,res)=>{
      try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Username or Password" });
        }

         const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid Username or Password" });
        }

        const token = generateToken(user._id)

     
         res.cookie("token", token, {
            httpOnly: true,
            secure: false,       // true in production (HTTPS)
            sameSite: "lax",     // "none" if HTTPS
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });


        res.status(200).json({
            message: "Login Successful",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}