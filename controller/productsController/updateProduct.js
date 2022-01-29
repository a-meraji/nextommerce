import Product from "../../models/ProductModel";
import errorController from "../errorController";

export default async function updateProduct (req, res) {
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
              errorController(500,err.message,res);
            } else {
              return res.status(200).json({ message: "updated", docs });
            }
          }
        );
      } catch (error) {
        errorController(500,error.message, res);
      }
    } else {
      errorController(422,"data_incomplete",res)
    }
  };