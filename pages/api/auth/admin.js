import connectDB from "../../../middleware/db/mongodb";
import signupController from "../../../controller/authController/adminSignupController";
import loginController from "../../../controller/authController/loginController";
import logoutController from "../../../controller/authController/logoutCountroller";
import { clientAccessController } from "../../../controller/authController/clientAccessController";

const reqHandler = (req, res) => {
  if (req.method === "POST") {
    signupController(req, res);
  } else if (req.method === "GET") {
    clientAccessController(req, res, true);
  } else if (req.method === "PUT") {
    loginController(req, res);
  } else if (req.method === "DELETE") {
    logoutController(req, res);
  } else {
    res.status(422).send({ message: "req_method_not_supported" });
  }
};
export default connectDB(reqHandler);
