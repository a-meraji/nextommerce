const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "bublic",
    disable: process.env.NODE_ENV === 'development'
  },
  images: {
    domains: ["demo.vercel.store"],
  },
});
