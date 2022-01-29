import errorController from "../errorController";
import Order from "../../models/OrderModel";

export default async function createOrder(req, res) {
  const { name, lastname, address, phone, cart, cost, amount } = req.body;
  if (name && lastname && address && phone && cart && cost && amount) {
    try {
      // create new order
      const order = new Order({
        name,
        lastname,
        address,
        phone,
        cart,
        cost,
        amount,
        sent: false,
      });
      const createdOrder = await order.save();
      return res.status(200).send({ message: "saved", createdOrder });
    } catch (error) {
      errorController(500, error.message, res);
    }
  } else {
    errorController(422, "incomplete data", res);
  }
}
