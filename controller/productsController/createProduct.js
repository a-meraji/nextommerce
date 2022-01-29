import Product from "../../models/ProductModel";
import errorController from "../errorController";

export default async function createProduct (req, res) {
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
        errorController(500,error.message,res);
      }
    } else {
      errorController( 422,"data_incomplete",res);
    }
  };