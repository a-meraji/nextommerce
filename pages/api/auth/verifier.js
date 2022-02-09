import connectDB from "../../../middleware/db/mongodb";

import { serverAccessController } from "../../../controller/authController/serverAccessController";

const reqHandler = (req, res) => {
  if (req.method === "GET") {
    serverAccessController(req, res);
  } else {
    res.status(422).send({ message: "req_method_not_supported" });
  }
};

export default connectDB(reqHandler);
