import Product from "../../models/ProductModel";
import errorController from "../errorController";

export default async function deleteProduct (req, res) {
    const { id } = req.body;
    if (id) {
      try {
        Product.findByIdAndDelete(id, function (err, docs) {
          if (err) {
            errorController(500,err.message,res)
          } else {
            return res.status(200).json({ message: "deleted", docs });
          }
        });
      } catch (err) {
        errorController(500,err.message,res)
      }
    } else {
      errorController(422,"data incomplete", res);
    }
  };