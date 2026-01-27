const path = require("path");

const notFound = (req, res, next) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } 
  else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } 
  else if (req.accepts("txt")) {
    res.type("txt").send("404 Not Found");
  } 
  else {
    res.send("404 Not Found");
  }
};

module.exports = notFound;
