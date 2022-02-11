const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "bublic"
  },
  images: {
    domains: ["demo.vercel.store"],
  },
});
