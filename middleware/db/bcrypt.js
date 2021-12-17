import bcrypt from "bcrypt";

export const hashPass = async (plainPass) => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hassedPass = await bcrypt.hash(plainPass, salt);
    return hassedPass;
} 

export const comparePass = async (plainPass, hashedPass) => {
    const match = await bcrypt.compare(plainPass, hashedPass);
   console.log(match)
    if(match === true) {
        return true;
    }
    return false
}