const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome - API Daniboys Flutter" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require("./components/routes/users.route.js")(app);
require("./components/routes/tasks.route.js")(app);
