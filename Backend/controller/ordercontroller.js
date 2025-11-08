import OrderNew from '../model/order_Schema.js'

export const order = async (req, res) => {
    try {
      const { 
        name, 
        number, 
        address, 
        bookName, 
        payment, 
        email,
        price,
        quantity
      } = req.body;

      // Validate required fields
      if (!name || !email || !number || !address || !bookName || !payment || !price || !quantity) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }

      const createdOrder = new OrderNew({
        name,
        email,
        number,
        address,
        bookName,
        payment,
        price: Number(price),
        quantity: Number(quantity)
      });
  
      await createdOrder.save();

      res.status(201).json({
        message: "Order saved successfully",
        order: {
          _id: createdOrder._id,
          name: createdOrder.name,
          email: createdOrder.email,
          bookName: createdOrder.bookName,
          number: createdOrder.number,
          price: createdOrder.price,
          quantity: createdOrder.quantity,
          payment: createdOrder.payment
        },
      });
    } catch (error) {
      console.error("Order creation error:", error.message);
      res.status(500).json({ 
        message: "Internal server error",
        error: error.message 
      });
    }
  };

export const getAllOrders = async (req, res) => {
  try {
    // fetch all orders, newest first
    const orders = await OrderNew.find({}).sort({ createdAt: -1 }).lean();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("getAllOrders error:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Order id required" });

    const order = await OrderNew.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await OrderNew.findByIdAndDelete(id);
    return res.status(200).json({ message: "Order cancelled", id });
  } catch (error) {
    console.error("cancelOrder error:", error);
    return res.status(500).json({ message: "Failed to cancel order" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) return res.status(400).json({ message: "Order id required" });

    const updated = await OrderNew.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json(updated);
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return res.status(500).json({ message: "Failed to update order status" });
  }
};