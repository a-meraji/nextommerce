import { tokenDecoder } from "../../middleware/auth/JWTUtils";
import { refreshToken } from "../../shared/json";
import User from "../../models/UserModel";
import Admin from "../../models/AdminModel";
import errorController from "../errorController";

export default async function readAccount(req, res) {
  try {
    const isAdmin = req.cookies["isAdmin"]
console.log(typeof isAdmin)
    var refToken = req.cookies[refreshToken.type];

    if (refToken === "undefined" || refToken === undefined) {
      refToken = req.cookies[refreshToken.type];
    }

    if (refToken === undefined || refToken === "undefined") {
      return res
        .status(200)
        .json({ account: null, message: "Account not found" });
    } else {
      const id = tokenDecoder(refToken, refreshToken.type);

      const account = isAdmin
        ? await Admin.findById(id)
        : await User.findById(id);
      if (account && account !== null) {
        const resAcc =
          isAdmin === true
            ? { name: account.name, lastname: account.lastname, isAdmin: true }
            : {
                name: account.name,
                lastname: account.lastname,
                phone: account.phone,
                address: account.address,
                isAdmin: false,
              };
        return res
          .status(200)
          .json({ account: resAcc, message: "Account found" });
      } else {
        return res
          .status(200)
          .json({ account: null, message: "Account not found" });
      }
    }
  } catch (err) {
    errorController(500, err, res);
  }
}
