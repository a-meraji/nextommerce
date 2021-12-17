import connectDB from "../../../middleware/db/mongodb";
import { hashPass, comparePass } from "../../../middleware/db/bcrypt";
import User from "../../../models/UserModel";

const reqHandler = (req, res) => {
  if (req.method === "POST") {
    signupController(req, res);
  } else if (req.method === "PUT") {
    loginController(req, res);
  } else {
    res.status(422).send({ message: "req_method_not_supported" });
  }
};
export default connectDB(reqHandler);

const signupController = async (req, res) => {
  const {
    name,
    lastname,
    email,
    password,
    role,
    root,
    adminEmail,
    adminPassword,
  } = req.body;
  if (
    name &&
    lastname &&
    email &&
    password &&
    role &&
    root &&
    adminEmail &&
    adminPassword
  ) {
    try {
      const admin = await User.findOne({ email: adminEmail });
      const valid = await comparePass(adminPassword, admin.password);
      if (admin.role === "admin" && admin.root === true && valid === true) {
        const hashedPass = await hashPass(password);
        const user = new User({
          name,
          lastname,
          email,
          password: hashedPass,
          role,
          root,
        });
        const createdAdmin = await user.save();
        return res.status(200).send(createdAdmin);
      } else if (
        admin.role !== "admin" ||
        admin.root === false ||
        valid === false
      ) {
        return res.status(200).send({ message: "request rejected" });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    res.status(422).send({ message: "data_incomplete" });
  }
};

const loginController = async (req, res) => {
  // Check if name, email or password is provided
  const { email, password } = req.body;
  if (email && password) {
    try {
      const admin = await User.findOne({ email: email });
      const compare = await comparePass(password, admin.password);
      if (compare === true && admin.role === "admin") {
        const { name, lastname, email, role, root } = admin;
        return res.status(200).send({ name, lastname, email, role, root });
      } else if (compare === false || admin.role !== "admin") {
        return res.status(200).send({ message: "access denied" });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    res.status(422).send({ message: "data_incomplete" });
  }
};
