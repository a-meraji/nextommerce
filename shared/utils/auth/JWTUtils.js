const jwt = require("jsonwebtoken");
import { accessToken, refreshToken } from "../../json";

// sign refresh and access JWT token
export const tokenGanarator = (id, type, maxAge) => {
  const secret = secreter(type);
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

// Decode refresh and access JWT token then return id from the decoded token
export const tokenDecoder =  (token, type) => {
  const secret = secreter(type);
  let id;
  if (token && secret) {
    id = jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        throw Error("token not valid");
      } else {
        return decodedToken.id;
      }
    });
  }
  return id;
};

// there are two deferent secret for signing access and refresh JWT token
// it return the propper secret base on type of token it recieves
const secreter = (type) => {
  const secret =
    type === refreshToken.type
      ? process.env.refresh
      : type === accessToken.type
      ? process.env.access
      : null;
  if (secret === null) throw Error("Type of token rejected");
  return secret;
};
