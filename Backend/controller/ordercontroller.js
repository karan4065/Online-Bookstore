import OrderNew from '../model/order_Schema.js'

export const order = async (req, res) => {
    try {
      const { name, number, address, bookName, payment, email } = req.body;

      const createdUser = new OrderNew({
        name,
        email,
        number,
        address,
        bookName,
        payment,
      });
  
      await createdUser.save();
      res.status(201).json({
        message: "User saved successfully",
        user: {
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          bookName:createdUser.bookName,
          number: createdUser.number,
        },
      });
    } catch (error) {
      console.log("error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };