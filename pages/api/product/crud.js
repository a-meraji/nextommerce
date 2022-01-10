import connectDB from "../../../middleware/db/mongodb";
import Product from "../../../models/ProductModel";

const reqHandler = (req, res) => {
  /* **************************************************************
    before req proccesing check security credentials like JWT token 
  ************************************************************** */
  const method = req.method;
  if (method === "POST") createProduct(req, res);
  else if (method === "GET") readOneProduct(req, res);
  else if (method === "PATCH") updateProduct(req, res);
  else if (method === "DELETE") deleteProduct(req, res);
  else {
    res.status(422).send({ message: "req_method_not_supported" });
  }
};
export default connectDB(reqHandler);

const createProduct = async (req, res) => {
  const {
    name,
    category,
    price,
    store,
    description,
    sale,
    newArival,
    available,
  } = req.body;
  if (name && category && price && store && description) {
    try {
      const product = new Product({
        name: name.toLowerCase(),
        category,
        price,
        store,
        description,
        sale,
        newArival,
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
      data: {
        name,
        category,
        price,
        store,
        description,
        sale,
        newArival,
        available,
      },
    });
  }
};
const readOneProduct = async (req, res) => {
  const id = req.query.id ? req.query.id : undefined;
  const name = req.query.name ? req.query.name : undefined;
  const category = req.query.cat ? req.query.cat : undefined;
  const filter = req.query.filter ? req.query.filter : undefined;
  const value = req.query.value ? req.query.value : undefined;
  // creatinf a propper condition object
  var conObj = new Object();
  if (filter!=="undefined" && value!=="undefined") {
    if (value === "true" || value === "false") {
      conObj[filter] = value;
    } else {
      conObj[filter] = new RegExp(value, "i");
    }
  }

  try {
    let product;
    if (id) {
      product = await Product.findById(id);
    } else {
      // find product by name if name not provided return all products
      product = name
        ? await Product.findOne({ name: name })
        : category
        ? await Product.find({ category: category })
        : conObj.hasOwnProperty(filter)
        ? await Product.find(conObj)
        : await Product.find({});
    }
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(200).json({ message: "product not found" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateProduct = async (req, res) => {
  const {
    id,
    name,
    category,
    price,
    store,
    description,
    sale,
    newArival,
    available,
  } = req.body;
  if (id && name && category && price && store && description) {
    try {
      Product.findByIdAndUpdate(
        id,
        {
          name: name.toLowerCase(),
          category,
          price,
          store,
          description,
          sale,
          newArival,
          available,
        },
        function (err, docs) {
          if (err) {
            errorHandler(err);
          } else {
            return res.status(200).json({ message: "updated", docs });
          }
        }
      );
    } catch (error) {
      errorHandler(error, res);
    }
  } else {
    return res.status(422).json({
      message: "data_incomplete",
      data: {
        name,
        category,
        price,
        store,
        description,
        sale,
        newArival,
        available,
      },
    });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.body;
  if (id) {
    try {
      Product.findByIdAndDelete(id, function (err, docs) {
        if (err) {
          errorHandler(err);
        } else {
          return res.status(200).json({ message: "deleted", docs });
        }
      });
    } catch (error) {
      errorHandler(error, res);
    }
  } else {
    return res.status(422).json({
      message: "data_incomplete",
      data: { id },
    });
  }
};

const errorHandler = (err, res) => {
  return res.status(500).send({ message: err.message });
};
