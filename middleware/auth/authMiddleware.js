import Admin from "../../models/AdminModel";
import User from "../../models/UserModel";
import RefreshToken from "../../models/RefreshTokenModel";
import errorController from "../../controller/errorController";
import { tokenDecoder, tokenGanarator } from "../../shared/utils/auth/JWTUtils";
import { refreshToken, accessToken } from "../../shared/json";

/* 
check if user is authenticated
 if it waas unthenticated then next()
 if not it return a 401 respond with message "user not authorized"
*/
export async function authMiddleware(req, res, isAdmin, next) {
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
    return unathorized(res);
  }

  try {
    console.log("serverside auth isAdmin : ",isAdmin,typeof isAdmin);
    if (isAdmin === undefined||isAdmin==="undefined") throw new Error("isAdmin is undefined");
    // if access token still exist
    if (accToken !== "undefined" && accToken !== undefined) {
      //first verify access token. if it was verified next()
      const validId = tokenDecoder(accToken, accessToken.type);
      var validPerson = isAdmin
        ? await Admin.findById(validId)
        : await User.findById(validId);
        console.log("access Part: ",isAdmin,validPerson);
        if(validPerson && validPerson.suspend===true) unathorized(res)
      else if (validPerson && validPerson !== null) {
        // user athourized
        res.setHeader("authorized", "true");
        return next(req, res);
      } else {
        //  if access token not verified then verify refresh token
        // if refresh token was valid but not existed in DB,
        //then account will be suspended to avoid token highjacking
        const validRef = await refreshTokenVerifier(refToken, isAdmin, res);
        if (validRef.id) {
          //refresh token was valid
          return authenticated(req, res, next);
        } else {
          return unathorized(res);
        }
      }
    }
    // if only refresh token is  provided
    else if (accToken === "undefined" || accToken === undefined) {
      // if refresh token was valid but not existed in DB,
      //then account will be suspended to avoid token highjacking
      const validRef = await refreshTokenVerifier(refToken, isAdmin, res);
      if (validRef.id) {
        //refresh token was valid
        return authenticated(req, res, next);
      } else {
        return unathorized(res);
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
async function refreshTokenVerifier(token, isAdmin, res) {
  const id = tokenDecoder(token, refreshToken.type);
  var validRefToken = await RefreshToken.findOne({ token });

  // if refresh token not found in DB proccess if the account needs to get suspended
  if (!validRefToken) {
    return{message: "refresh token not valid"}
  }
  const suspendedAccount = isAdmin
      ? await Admin.findById(id)
      : await User.findById(id);
    if (suspendedAccount && suspendedAccount.suspend === true) {
      return {
        message: `account suspended`,
      };
    }
  return { message: `refresh token is valid`, id };
}

const authenticated = async (req, res, next) => {
    res.setHeader("authorized", "true");
    return next(req, res);
};

const unathorized = (res) => {
  console.log("unathorized");
  res.setHeader("authorized", "false");
  return res.status(401).json({ message: "user not authorized" });
};
