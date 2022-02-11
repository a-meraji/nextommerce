import Product from "../../models/ProductModel";
import errorController from "../errorController";

export default async function readProduct(req, res) {
  const {id,name,filter,value} = req.query
  // creats a propper condition object if quety had filter key format
  var conObj = new Object();
  console.log(id,name,filter,value);
  if (filter !== undefined && value !== undefined && value!=="undefined") {
    if (value === "true" || value === "false") {
      conObj[filter] = value;
    } else {
      conObj[filter] = new RegExp(value, "i");
    }
  }
  try {
    let product;
    // find product by name if name not provided return all products
    product = id!==undefined
      ? await Product.findById(id)
      : name!==undefined
      ? await Product.findOne({ name: name })
      : conObj.hasOwnProperty(filter)
      ? await Product.find(conObj)
      : await Product.find({});

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(200).json({ message: "product not found" });
    }
  } catch (error) {
    errorController(500, error.message, res);
  }
}
