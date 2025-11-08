import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

//dotenv.config();


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL ||password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized: Invalid credentials" });
    }


    const token = jwt.sign(
      { role: "admin",email: process.env.ADMIN_EMAIL }, //payload
         process.env.JWT_SECRET, //secret key 
      { expiresIn: "30d" } // time 
    );

    // ✅ Set token as cookie (optional, same as user)
    res.cookie("admin-token", token, {
      httpOnly: true,
      secure: false, // use true in production with HTTPS
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "Admin login successful",
      admin: {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    });

  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const AdminLogout = async (req, res) => {
  res.clearCookie("admin-token", {
    httpOnly: true,
    secure: false, // true if using HTTPS in production
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Admin logged out successfully" });
};
 
