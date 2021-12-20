import connectDB from "../../../middleware/db/mongodb";
import { hashPass, comparePass } from "../../../middleware/db/bcrypt";
import User from "../../../models/UserModel";

const reqHandler = (req, res) => {
  if (req.method === "POST") {
    signupCotroller(req, res);
  } else if (req.method === "PUT") {
    loginController(req, res);
  } else {
    res.status(422).send({message:"req_method_not_supported"});
  }
};

export default connectDB(reqHandler);

const signupCotroller = async (req, res) => {
  // Check if name, email or password is provided
  const { name, lastname, email, password } = req.body;
  if (name && lastname && email && password) {
    try {
      // Hash password to store it in DB
      const hashedPass = await hashPass(password);
      const user = new User({
        name,
        lastname,
        email,
        password: hashedPass,
        role: "user",
        root: false,
      });
      // Create new user
      const usercreated = await user.save();
      return res.status(200).send(usercreated);
    } catch (error) {
      return res.status(500).send({message:error.message});
    }
  } else {
    res.status(422).send({message:"data_incomplete"});
  }
};

const loginController = async (req, res) => {
  // Check if name, email or password is provided
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email: email });
      const compare = await comparePass(password, user.password);
      if(compare === true){
        const {name, lastname, email} = user;
        return res.status(200).send({name, lastname, email});
      }
      else if(compare === false){
        return res.status(200).send({message:'password is incorrect'});
      }
    } catch (error) {
      return res.status(500).send({message:error.message});
    }
  } else {
    res.status(422).send({message:"data_incomplete"});
  }
};
