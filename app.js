const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const rootRoute = require("./routes/root.routes");
const path = require("path");
const notFound = require("./middlewares/notFound");
const swaggerSpec = require("./swagger");
const swaggerUI = require("swagger-ui-express");
const handleError = require("./middlewares/errorHandel");

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/v1", rootRoute);

app.use(handleError);
app.use(notFound);

module.exports = app;
