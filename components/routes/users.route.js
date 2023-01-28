const router = require("express").Router();

module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  router.get("/", (req, res) => {
    res.json({ message: "Users" });
  });

  router.post("/addUser", users.addUser);
  router.get("/getUser", users.getUser);

  app.use("/users", router);
};
