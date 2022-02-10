import connectDB from "../../../middleware/db/mongodb";
import Category from "../../../models/CategoryModel";
import { authMiddleware } from "../../../middleware/auth/authMiddleware";
const reqHandler = (req, res) => {
  const method = req.method;
  switch (method) {
    case "GET":
      getCats(req, res);
      break;
    case "POST":
      authMiddleware(req, res, true, createCat);
      break;
    case "UPDATE":
      authMiddleware(req, res, true, updateCat);
      break;
    case "DELETE":
      authMiddleware(req, res, true, deleteCat);
      break;
    default:
      res.status(422).send({ message: "req_method_not_supported" });
      break;
  }
};

export default connectDB(reqHandler);

async function getCats(req, res) {
  try {
    const rawCats = await Category.find({});
    const cats = rawCats.map((cat) => cat.name);
    if (cats) return res.status(200).send(cats);
    else
      return res.status(200).json({ message: "categories are not available" });
  } catch (error) {
    errorHandler(error, res);
  }
}

async function createCat(req, res) {
  try {
    const { name } = req.body;
    if (name) {
      const cat = new Category({ name });
      const createdCat = await cat.save();
      return res.status(200).send(createdCat);
    } else return res.status(200).json({ message: "data incomplete" });
  } catch (error) {
    errorHandler(error, res);
  }
}

async function updateCat(req, res) {
  try {
    const { name, newName } = req.body;
    if (name) {
      const updatedCat = await Category.findOneAndUpdate(
        { name },
        { name: newName },
        function (err, docs) {
          if (err) {
            errorHandler(err, res);
          } else {
            res.status(200).json({ docs });
          }
        }
      );
    } else return res.status(200).json({ message: "data incomplete" });
  } catch (error) {
    errorHandler(error, res);
  }
}

async function deleteCat(req, res) {
  try {
    const { name } = req.body;
    if (name) {
      const deletedCat = await Category.findOneAndDelete(
        { name },
        function (err, docs) {
          if (err) {
            errorHandler(err, res);
          } else {
            res.status(200).json({ docs });
          }
        }
      );
    } else return res.status(200).json({ message: "data incomplete" });
  } catch (error) {
    errorHandler(error, res);
  }
}

const errorHandler = (err, res) => {
  return res.status(500).send({ message: err.message });
};
