import connectDB from "../../../middleware/db/mongodb";
import Product from "../../../models/ProductModel";

const reqHandler = (req, res) => {
  /* **************************************************************
    before req proccesing check security credentials like JWT token 
  ************************************************************** */
  const method = req.method;
  if (method === "POST") createProduct(req, res);
  else if (method === "GET") readOneProduct(req, res);
  else if (method === "UPDATE") updateProduct(req, res);
  else if (method === "DELETE") deleteProduct(req, res);
  else {
    res.status(422).send({ message: "req_method_not_supported" });
  }
};
export default connectDB(reqHandler);

const createProduct = async (req, res) => {
  const { name, category, price, store, description, sale, available } =
    req.body;
  if (name && category && price && store && description) {
    try {
      const product = new Product({
        name,
        category,
        price,
        store,
        description,
        sale,
        available,
      });

      const createdProduct = await product.save();
      return res.status(200).send(createdProduct);
    } catch (error) {
      errorHandler(error);
    }
  } else {
    return res.status(422).send({
      message: "data_incomplete",
      data: { name, category, price, store, description, sale, available },
    });
  }
};
const readOneProduct = async (req, res) => {
  const name = req.query.name?req.query.name:undefined;
  try {
    // find product by name if name not provided return all products
    const product = name
      ? await Product.findOne({ name: name })
      : await Product.find({});
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(200).json({ message: "product not found" });
    }
  } catch (error) {
    errorHandler(error);
  }
};
const updateProduct = async (req, res) => {};
const deleteProduct = async (req, res) => {};

const errorHandler = (err) => {
  return res.status(500).send({ message: err.message });
};
