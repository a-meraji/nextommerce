  import { refreshToken, accessToken } from "../../json";
  import { cookieGenerator } from "./tokenCookei";
  import {isAdminCookie} from "./tokenCookei";
  import {server} from "../../../config/index";
  
  export default async function authHandler (req, res, isAdmin) {
    var access = req.cookies[accessToken.type];
    var refresh = req.cookies[refreshToken.type];
  
    const response = await fetch(`${server}/api/auth/verifier?isAdmin=${isAdmin}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        refresh: refresh,
        access: access,
      },
    });
  
    const authorized = response.headers.get("authorized") === "true";
  
    if (
      authorized === true &&
      response.headers.get(accessToken.type) !== null &&
      response.headers.get(refreshToken.type) !== null&&
      response.headers.get("isAdmin") !== null
    ) {
      access = response.headers.get(accessToken.type);
      refresh = response.headers.get(refreshToken.type);
      cookieGenerator(refreshToken, refresh, req, res);
      cookieGenerator(accessToken, access, req, res);
      isAdminCookie(req, res, response.headers.get("isAdmin"));
    }
  
    return { authorized, refresh, access };
  };
  