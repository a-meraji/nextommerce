import User from "../../models/UserModel";
import errorController from "../errorController";
import { refreshToken, accessToken } from "../../shared/json/index";
import {
  cookieGenerator,
  isAdminCookie,
} from "../../shared/utils/auth/tokenCookei";
import { refreshTokenSubmiter } from "../../shared/utils/auth/refreshTokenSubmit";
import { tokenGanarator } from "../../shared/utils/auth/JWTUtils";
import { hashPass } from "../../shared/utils/auth/bcrypt";

export default async function signupController(req, res) {
  const { name, lastname, email, password, phone, address } = req.body;
  if (name && lastname && email && password) {
    const hashedPass = await hashPass(password);
    try {
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

      if (usercreated.name) {
        //create refresh token
        const refresh = tokenGanarator(
          usercreated._id,
          refreshToken.type,
          refreshToken.age
        );
        //create access token
        const access = tokenGanarator(
          usercreated._id,
          accessToken.type,
          accessToken.age
        );
        //save refresh token in DB
        const submitedRef = await refreshTokenSubmiter(
          refresh,
          usercreated._id
        );
        if (submitedRef.message) {
          //when refresh token saved
          //set refresh and access token as cookies
          cookieGenerator(accessToken, access, req, res);
          cookieGenerator(refreshToken, refresh, req, res);
          isAdminCookie(req, res, false);
          return res.status(201).json({
            message: "account created successfuly",
            user: { name, lastname, address, phone },
          });
        } else {
          errorController(500, "token not saved", res);
        }
      }
    } catch (error) {
      if (error.code == 11000) {
        return res.status(500).send({ message: "Email has been used before" });
      }
      errorController(500, error, res);
    }
  } else {
    res.status(422).send({ message: "data_incomplete" });
  }
}
