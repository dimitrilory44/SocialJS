const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: "Trop de compte crée à partir de cet IP, ré-essayer dans 2 min"
});

module.exports = { limiter };