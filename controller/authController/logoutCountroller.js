import RefreshToken from "../../models/RefreshTokenModel";
import errorController from "../errorController";
import { refreshToken, accessToken } from "../../shared/json";
import { deleteCookie, isAdminDelete } from "../../middleware/auth/tokenCookei";

export default async function logoutController(req, res) {
  // check it's admin auth or user auth
  var pathname = req.headers.referer;
  const isAdmin = pathname.includes("admin");
  if (isAdmin) pathname = "/admin/login";
  else pathname = "/auth/login";

  const refToken = req.cookies[refreshToken.type];
  try {
    // if there was refresh token delete it from data-base
    if (refToken) {
      const deletedToken = await RefreshToken.findOneAndDelete({
        token: refToken,
      });
      if (!deletedToken) {
        throw new Error("Refresh token not found");
      }

      //clear refresh and access cookies then redirect to login page
      deleteCookie(refreshToken.type,req,res);
      deleteCookie(accessToken.type,req,res);
      isAdminDelete(req,res);
      return res.status(200).json({ message: "loged out" });
    }
  } catch (err) {
    errorController(500, err, res);
  }
}
