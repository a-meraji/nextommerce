import Cookies from "cookies";

// set access and refresh JWT tokens as httpOnly cookies
export const cookieGenerator = (tknInf, token, req, res) => {
  const cookies = new Cookies(req, res);

  cookies.set(tknInf.type, token, {
    httpOnly: true,
    maxAge: tknInf.age * 1000,
  });
};

export const deleteCookie = (type, req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set(type, "", { httpOnly: true, maxAge: 1 });
};

export const isAdminCookie = (req, res, isAdmin) => {
  const cookies = new Cookies(req, res);
  cookies.set("isAdmin", isAdmin, { httpOnly: true });
};
export const isAdminDelete = (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set("isAdmin", "", { httpOnly: true, maxAge: 1 });
};
