import Admin from "../../models/AdminModel";
import errorController from "../errorController";
import { comparePass } from "../../shared/utils/auth/bcrypt";
import { tokenGanarator } from "../../shared/utils/auth/JWTUtils";
import { refreshToken, accessToken } from "../../shared/json";
import {
  cookieGenerator,
  isAdminCookie,
} from "../../shared/utils/auth/tokenCookei";
import { refreshTokenSubmiter } from "../../shared/utils/auth/refreshTokenSubmit";
import User from "../../models/UserModel";

export default async function loginController(req, res,isAdmin) {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw Error("incomplete credentials");
    if (isAdmin === undefined) throw new Error("isAdmin is undefined");
    // find account bas on email and then compare passwords
    const account = isAdmin===true
      ? await Admin.findOne({ email })
      : await User.findOne({ email });
    if (account) {
      const truePass = await comparePass(password, account.password);
      if (truePass) {
        // when password is true generate refresh token
        const refresh = tokenGanarator(
          account._id,
          refreshToken.type,
          refreshToken.age
        );
        //generate access token
        const access = tokenGanarator(
          account._id,
          accessToken.type,
          accessToken.age
        );

        // save refresh token in database
        const data = await refreshTokenSubmiter(refresh, account._id);
        if (data.message) {
          //when refresh token saved successfuly
          // set refresh and access token as cookies
          cookieGenerator(accessToken, access, req, res);
          cookieGenerator(refreshToken, refresh, req, res);
          isAdminCookie(req, res, isAdmin);

          return res.status(200).json({
            message: "login successfuly",
            account: {
              name: account.name,
              lastname: account.lastname,
              phone: account.phone,
              address: account.address,
            },
          });
        } else {
          throw Error("token did not saved successfuly");
        }
      } else {
        res.status(200).json({ message: "incorrcet password" });
      }
    } else {
      return res.status(200).json({ message: "this email is not registerd" });
    }
  } catch (err) {
    errorController(500, err, res);
  }
}
