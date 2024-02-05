const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;
    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // If no existing order, create a new one
      await Order.create({
        email,
        order_data: [{ Order_date: order_date, items: order_data }],
      });
    } else {
      // If existing order, push new data
      existingOrder.order_data.push({ Order_date: order_date, items: order_data });
      await existingOrder.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error during orderData:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email);
        let eId = await Order.findOne({ 'email': req.body.email });
        //console.log(eId)
        res.json({ orderData: eId });
    } catch (error) {
        res.send("Error", error.message);
    }
});

module.exports = router;
