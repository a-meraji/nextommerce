import connectDB from "../../../middleware/db/mongodb";
import { hashPass, comparePass } from "../../../middleware/db/bcrypt";
import { signToken } from "../../../libs/jwt";
import { refreshToken, accessToken } from "../../../shared/json";
import Cookies from "cookies";
import User from "../../../models/UserModel";

const reqHandler = (req, res) => {
  if (req.method === "POST") {
    signupCotroller(req, res);
  } else if (req.method === "PUT") {
    loginController(req, res);
  }else if(req.method === "DELETE"){
    logout(req, res);
  }
   else {
    res.status(422).send({ message: "req_method_not_supported" });
  }
};

export default connectDB(reqHandler);

const signupCotroller = async (req, res) => {
  // Check if name, email or password is provided
  const { name, lastname, email, password, phone, address } = req.body;
  if (name && lastname && email && password) {
    try {
      // Hash password to store it in DB
      const hashedPass = await hashPass(password);
      const user = new User({
        name,
        lastname,
        email,
        password: hashedPass,
        address,
        phone,
      });
      // Create new user
      const usercreated = await user.save();
      const refresh = signToken(
        usercreated._id,
        refreshToken.type,
        refreshToken.age
      );
      const access = signToken(
        usercreated._id,
        accessToken.type,
        accessToken.age
      );

      const cookies = new Cookies(req, res)

      cookies.set(refreshToken.type, refresh, {
        httpOnly: true,
        maxAge: refreshToken.age * 1000,
      });
      cookies.set(accessToken.type, access, {
        httpOnly: true,
        maxAge: accessToken.age * 1000,
      });

      return res.status(201).json({
        message: "account created successfuly",
        user: { name, lastname, address, phone }
      });
    } catch (error) {
      if(error.code==11000){
      return res.status(500).send({ message: "Email has been used before"});
      }
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
      const user = await User.findOne({ email: email });
      const compare = await comparePass(password, user.password);
      if (compare === true) {
        const { name, lastname, email } = user;
        return res.status(200).send({ name, lastname, email });
      } else if (compare === false) {
        return res.status(200).send({ message: "password is incorrect" });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    res.status(422).send({ message: "data_incomplete" });
  }
};

const logout = async (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set(refreshToken.type)
  cookies.set(accessToken.type)

}

const errorHandler = (err, res) => {
  return res.status(500).send({ message: err.message });
};