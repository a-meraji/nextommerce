import connectDB from "../../../middleware/db/mongodb";
// controllers
import createOrder from "../../../controller/orderController/createOrder";
import readOrders from "../../../controller/orderController/readOrder";
import updateOrderStatus from "../../../controller/orderController/updateOrder";
import errorController from "../../../controller/errorController";
import { authMiddleware } from "../../../middleware/auth/authMiddleware";

const reqHandler = (req, res) => {
  const method = req.method;
  switch (method) {
    case "POST":
      createOrder(req, res);
      break;
    case "GET":
      // accessController(req, res, true, readOrders);
      authMiddleware(req,res,true, readOrders);
      break;
    case "PATCH":
      authMiddleware(req,res,true,updateOrderStatus);
      break;
    default:
      errorController(422, "req_method_not_supported", res);
      break;
  }
};
export default connectDB(reqHandler);
