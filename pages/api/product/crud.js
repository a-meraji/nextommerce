import connectDB from "../../../middleware/db/mongodb";
import errorController from "../../../controller/errorController";
//controllers
import {authMiddleware} from "../../../controller/authController/authMiddleware";
import createProduct from "../../../controller/productsController/createProduct";
import readProduct from "../../../controller/productsController/readProducts";
import updateProduct from "../../../controller/productsController/updateProduct";
import deleteProduct from "../../../controller/productsController/deleteProduct";

const reqHandler = (req, res) => {
  /* **************************************************************
    before req proccesing check security credentials like JWT token 
  ************************************************************** */
  const method = req.method;
  switch (method) {
    case "GET":
      readProduct(req, res);
      break;
    case "POST":
      authMiddleware(req, res, true, createProduct);
      break;
    case "PATCH":
      authMiddleware(req, res, true, updateProduct);
      break;
    case "DELETE":
      authMiddleware(req, res, true, deleteProduct);
      break;
    default:
      errorController(422, "request method not supported", res);
      break;
  }
};
export default connectDB(reqHandler);
