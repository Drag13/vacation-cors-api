// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || "0.0.0.0";
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8080;
const localhosts = ["http://127.0.0.1:8887"];
const whiteList = process.env.ALOWED ? [process.env.ALOWED] : localhosts;
const cors_proxy = require("cors-anywhere");

cors_proxy
  .createServer({
    originWhitelist: whiteList,
    requireHeader: ["origin"],
    removeHeaders: ["cookies"],
    handleInitialRequest: shouldStopRequest,
    checkRateLimit,
  })

  .listen(port, host, function () {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });

function shouldStopRequest(_, res, location) {
  return !isRequestedHostAlowed(location) && deny(res, location.host);
}

function isRequestedHostAlowed({ host } = {}) {
  return host && host.toLowerCase() === "date.nager.at";
}

function deny(response, host) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.writeHead(402);
  response.end(`${host} is unauthorized`);
  return true;
}

let lastCall = Date.now();
function checkRateLimit() {
  const now = Date.now();
  const delta = now - lastCall;
  const isRateLimitExceeded = delta < 500;
  lastCall = now;
  return isRateLimitExceeded ? "Rate limit exceeded" : undefined;
}
