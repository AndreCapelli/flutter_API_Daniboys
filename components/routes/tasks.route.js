const router = require("express").Router();

module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller.js");

  router.get("/", (req, res) => {
    res.json({ message: "tasks" });
  });

  router.post("/addTask", tasks.addTask);
  router.get("/getAllTasks", tasks.getAllTasks);
  router.patch("/updateTask", tasks.updateTask);
  router.delete("/deleteTask", tasks.deleteTask);

  app.use("/tasks", router);
};
