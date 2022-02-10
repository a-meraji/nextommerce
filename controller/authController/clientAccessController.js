import Admin from "../../models/AdminModel";
import User from "../../models/UserModel";
import RefreshToken from "../../models/RefreshTokenModel";
import { refreshTokenSubmiter } from "../../shared/utils/auth/refreshTokenSubmit";
import errorController from "../errorController";
import { tokenDecoder, tokenGanarator } from "../../shared/utils/auth/JWTUtils";
import {
  cookieGenerator,
  deleteCookie,
  isAdminCookie,
  isAdminDelete,
} from "../../shared/utils/auth/tokenCookei";
import { refreshToken, accessToken } from "../../shared/json";

export async function clientAccessController(req, res, isAdmin) {
  //get tokens from cookies
  //headers have coockie if fetch is from server side
  var accToken = req.headers[accessToken.type];
  var refToken = req.headers[refreshToken.type];

  // req.cookies have cookies if fetch is from client side
  if (refToken === "undefined" || refToken === undefined) {
    refToken = req.cookies[refreshToken.type];
    accToken = req.cookies[accessToken.type];
  }

  //it's an unathorized request if refresh token is not provided
  if (refToken === "undefined" || refToken === undefined) {
    return unathorized(req, res);
  }

  try {
    if (isAdmin === undefined) throw new Error("isAdmin is undefined");
    // if both token provided
    if (accToken !== "undefined" && accToken !== undefined) {
      //first verify access token. if it was verified next()
      const validId = tokenDecoder(accToken, accessToken.type);
      var validPerson =
        isAdmin === true
          ? await Admin.findById(validId)
          : await User.findById(validId);
      if (validPerson && validPerson.suspend === true) unathorized(req, res);
      else if (validPerson && validPerson !== null) {
        // user athourized
        res.setHeader("authorized", "true");
        isAdminCookie(req, res, isAdmin);
        return res.status(200).json({ message: "user authorized" });
      } else {
        //  if access token not verified then verify refresh token
        // if refresh token was valid but not existed in DB,
        //then account will be suspended to avoid token highjacking
        const validRef = await refreshTokenVerifier(
          refToken,
          isAdmin,
          req,
          res
        );
        if (validRef.id) {
          //refresh token was valid
          return authenticated(req, res, validRef.id, isAdmin);
        } else {
          return unathorized(req, res);
        }
      }
    }
    // if only refresh token is  provided
    else if (accToken === "undefined" || accToken === undefined) {
      // if refresh token was valid but not existed in DB,
      //then account will be suspended to avoid token highjacking
      const validRef = await refreshTokenVerifier(refToken, isAdmin, req, res);
      if (validRef.id) {
        // refresh token was valid
        return authenticated(req, res, validRef.id, isAdmin);
      } else {
        return unathorized(req, res);
      }
    }
  } catch (err) {
    errorController(500, err, res);
  }
}

/* ****************
 * if refresh token existed in DB then it is valid and continue further proccess
 * but if no such token existed in DB but the token itself is a valid token then
 * someone has highjacked the token and the account should be suspended for safty
 ****************** */
async function refreshTokenVerifier(token, isAdmin, req, res) {
  const id = tokenDecoder(token, refreshToken.type);
  var validRefToken = await RefreshToken.findOneAndDelete({ token });

  // if refresh token not found in DB proccess if the account needs to get suspended
  if (!validRefToken) {
    const suspendedAccount =
      isAdmin === true
        ? await Admin.findByIdAndUpdate(id, { suspend: true })
        : await User.findByIdAndUpdate(id, { suspend: true });

    if (!suspendedAccount) {
      // no such account with this id found
      return { message: "account not found" };
    }
    return {
      message: `account suspended`,
    };
  }
  return { message: `refresh token is valid`, id };
}

const authenticated = async (req, res, ownerID, isAdmin) => {
  const newAccess = tokenGanarator(ownerID, accessToken.type, accessToken.age);
  const newRefresh = tokenGanarator(
    ownerID,
    refreshToken.type,
    refreshToken.age
  );

  const data = await refreshTokenSubmiter(newRefresh, ownerID);
  if (!data.message) {
    return unathorized(req, res);
  } else {
    res.setHeader("authorized", "true");
    cookieGenerator(refreshToken, newRefresh, req, res);
    cookieGenerator(accessToken, newAccess, req, res);
    isAdminCookie(req, res, isAdmin);
    return res.status(200).json({ message: "user authorized" });
  }
};

const unathorized = (req, res) => {
  deleteCookie(refreshToken.type, req, res);
  deleteCookie(accessToken.type, req, res);
  isAdminDelete(req, res);
  return res.status(401).json({ message: "user not authorized" });
};
