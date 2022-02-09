import Admin from "../../models/AdminModel";
import errorController from "../errorController";
import { comparePass } from "../../middleware/auth/bcrypt";
import { tokenGanarator } from "../../middleware/auth/JWTUtils";
import { refreshToken, accessToken } from "../../shared/json";
import {
  cookieGenerator,
  isAdminCookie,
} from "../../middleware/auth/tokenCookei";
import { refreshTokenSubmiter } from "../../middleware/auth/refreshTokenSubmit";
import User from "../../models/UserModel";

export default async function loginController(req, res) {
  const { email, password } = req.body;
  // check it's admin auth or user auth
  var pathname = req.headers.referer;
  const isAdmin = pathname.includes("admin");
  if (isAdmin) pathname = "/admin/signup";
  else pathname = "/auth/signup";

  try {
    if (!email || !password) throw Error("incomplete credentials");
    // find account bas on email and then compare passwords
    const account = isAdmin
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
