import Contactnew from '../model/contact_schema.js'

export const contact = async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const user = await Contactnew.findOne({ email });
  
      if (user) {
        return res.status(400).json({ message: "User already exists" });  
      }
  
      const createdUser = new Contactnew({
        name,
        email,
        message,
      });
  
      await createdUser.save();
      res.status(201).json({
        message: "User saved successfully",
        user: {
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        },
      });
    } catch (error) {
      console.log("error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };