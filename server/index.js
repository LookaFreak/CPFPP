const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
require("./config/conn");
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, '/public')));


app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/blog", require("./routes/blogRoute"));
app.use("/api/v1/comment", require("./routes/commentRoute"));
const port = 8000;
app.listen(port, () => {
  console.log(
    `Server is listening from the ${port} mode on ${port}`.bgCyan.white
  );
});
