import bcrypt from "bcrypt";

// hass password before saving in DB
export const hashPass = async (plainPass) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hassedPass = await bcrypt.hash(plainPass, salt);
  return hassedPass;
};

// compare hased pass and plain pass
export const comparePass = async (plainPass, hashedPass) => {
  const match = await bcrypt.compare(plainPass, hashedPass);
  if (match === true) {
    return true;
  }
  return false;
};
