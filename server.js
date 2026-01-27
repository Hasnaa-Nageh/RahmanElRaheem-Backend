require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const rootRoute = require("./routes/root.routes");
const path = require("path");
const notFound = require("./middlewares/notFound");
const swaggerSpec = require("./swagger");
const swaggerUI = require("swagger-ui-express");
connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/v1", rootRoute);

app.use(notFound);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
