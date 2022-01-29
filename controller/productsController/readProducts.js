import Product from "../../models/ProductModel";
import errorController from "../errorController";

export default async function readProduct(req, res) {
  const id = req.query.id;
  const name = req.query.name;
  const category = req.query.cat;
  const filter = req.query.filter;
  const value = req.query.value;
  // creats a propper condition object if quety had filter key format
  var conObj = new Object();
  if (filter !== undefined && value !== undefined) {
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
      : category!==undefined
      ? await Product.find({ category: category })
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
