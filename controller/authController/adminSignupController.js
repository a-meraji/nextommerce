import Admin from "../../models/AdminModel";
import errorController from "../errorController";
import { comparePass } from "../../shared/utils/auth/bcrypt";
import { tokenGanarator } from "../../shared/utils/auth/JWTUtils";
import { refreshToken, accessToken } from "../../shared/json";
import { cookieGenerator, isAdminCookie } from "../../shared/utils/auth/tokenCookei";
import { refreshTokenSubmiter } from "../../shared/utils/auth/refreshTokenSubmit";
import { hashPass } from "../../shared/utils/auth/bcrypt";

export default async function signupController(req, res) {
  const {
    name,
    lastname,
    password,
    email,
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
    adminEmail &&
    adminPassword
  ) {
    try {
      // check if an admin with root access is signing up the new admin
      const admin = await Admin.findOne({ email: adminEmail });
      if (admin === null) throw Error("admin not exist");
      if (admin.role === "master" && admin.root === true) {
        const valid = await comparePass(adminPassword, admin.password);
        if (valid === true) {
          // admin model
    const hashedPass = await hashPass(password);
          const admin = new Admin({
            name,
            lastname,
            email,
            password: hashedPass,
            role,
            root,
          });
          //save new admin
          const createdAdmin = await admin.save();

          // generate refresh token
          const refresh = tokenGanarator(
            createdAdmin._id,
            refreshToken.type,
            refreshToken.age
          );
          //generate access token
          const access = tokenGanarator(
            createdAdmin._id,
            accessToken.type,
            accessToken.age
          );

          // save refresh token in database
          const submitedRef = await refreshTokenSubmiter(
            refresh,
            createdAdmin._id
          );
          // if refresh token save
          if (submitedRef.message) {
            // set refresh and access token as cookies
            cookieGenerator(accessToken, access, req, res);
            cookieGenerator(refreshToken, refresh, req, res);
            isAdminCookie(req,res,true);

            return res.status(201).json({
              message: "account created successfuly",
              account: { name, lastname },
            });
          }
          else {
            throw Error("token did not saved successfuly");
          }
        } else {
          errorController(401, "invalid admin password", res);
        }
      } else {
        errorController(
          403,
          "root access is neeeded in case to create new admin account",
          res
        );
      }
    } catch (error) {
      if (error.code == 11000) {//duplication error for email
        return res.status(500).send({ message: "This Email has been used before" });
      }
      errorController(500, error, res);
    }
  } else {
    errorController(422, "data_incomplete", res);
  }
}
