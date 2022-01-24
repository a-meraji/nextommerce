const jwt = require('jsonwebtoken')
import { accessToken, refreshToken } from "../shared/json";

export const signToken = (id, type, maxAge) => {
  const secret =
    type === refreshToken.type
      ? process.env.REFRESH_TOKEN
      : type === accessToken.type
      ? process.env.ACCESS_TOKEN
      : null;

  return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

const jwtVerifier = async (token, secret) => {
    let id;
    if (token && secret) {
      id = await jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          throw Error("user validation failed");
        } else {
          return decodedToken.id;
        }
      });
    }
    return id;
  };