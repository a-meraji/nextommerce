import connectDB from "../../../middleware/db/mongodb";
// controllers
import readAccount from "../../../controller/accountControllers/readAccount";
import errorController from "../../../controller/errorController";

const reqHandler = (req, res) => {
  const method = req.method;
  if (method === "GET") readAccount(req, res);
  else {
    errorController(422, "req_method_not_supported", res);
  }
};

export default connectDB(reqHandler);