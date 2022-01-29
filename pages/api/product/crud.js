import connectDB from "../../../middleware/db/mongodb";
import errorController from "../../../controller/errorController";
//controllers
import createProduct from "../../../controller/productsController/createProduct";
import readProduct from "../../../controller/productsController/readProducts";
import updateProduct from "../../../controller/productsController/updateProduct";
import deleteProduct from "../../../controller/productsController/deleteProduct";

const reqHandler = (req, res) => {
  /* **************************************************************
    before req proccesing check security credentials like JWT token 
  ************************************************************** */
  const method = req.method;
  if (method === "POST")  createProduct(req, res);
  else if (method === "GET") readProduct(req, res);
  else if (method === "PATCH") updateProduct(req, res);
  else if (method === "DELETE") deleteProduct(req, res);
  else {
    errorController(422,"request method not supported",res);
  }
};
export default connectDB(reqHandler);

