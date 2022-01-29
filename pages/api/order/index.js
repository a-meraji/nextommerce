import connectDB from "../../../middleware/db/mongodb";
// controllers
import createOrder from "../../../controller/orderController/createOrder";
import readOrders from "../../../controller/orderController/readOrder";
import updateOrderStatus from "../../../controller/orderController/updateOrder";
import errorController from "../../../controller/errorController";

const reqHandler = (req, res) => {
  const method = req.method;
  if (method === "POST") createOrder(req, res);
  else if (method === "GET") readOrders(req, res);
  else if (method === "PATCH") updateOrderStatus(req, res);
  else {
    errorController(422, "req_method_not_supported", res);
  }
};
export default connectDB(reqHandler);