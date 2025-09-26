export const cookies = {
  getOptions : () => ({
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  }),
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...cookies.getOptions(), ...options });
  },
  clear: (res, name, options={}) => {
    res.clearCookie(name, {...cookies.getOptions(), ...options});
  },
  get: (req, name) => {
    return req.cookies[name];
  }
};