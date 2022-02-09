import RefreshToken from "../../models/RefreshTokenModel";

// save refresh JWT token in data base 
// we need to save refresh token to block access to the accounts
// that their refresh token has been highjaked and used before
// refresh tokens are one case used
// there for valid refresh token without a record in database 
// means it has been highjacked before 
export const refreshTokenSubmiter = async (token, id) => {
  const refreshToken = new RefreshToken({ token, ownerId: id });
  const savedToken = await refreshToken.save();
  return { message: "token saved", savedToken };
};