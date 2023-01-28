const { db } = require("../../config/database/dbConfig");

exports.addTask = async (req, res) => {
  const { title, description, data, completed, email } = req.body;

  if (!email) return res.status(400).json({ message: "Must contain email" });

  const usersDb = db.collection("users").doc(email).collection("tasks").doc();

  try {
    const response = await usersDb.set({ title, description, data, completed });

    return res.status(200).json({ message: "TASK CREATED SUCCESS" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ message: "Must contain email" });

  const usersDb = db.collection("users").doc(email).collection("tasks");

  try {
    const response = await usersDb.get().then((querySnapchat) => {
      return querySnapchat.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id, title, description, data, completed, email } = req.body;

  if (!email) return res.status(400).json({ message: "Must contain email" });
  if (!id) return res.status(400).json({ message: "Must contain ID" });

  const usersDb = db.collection("users").doc(email).collection("tasks").doc(id);

  try {
    const response = await usersDb.update({
      title,
      description,
      data,
      completed,
    });

    return res.status(200).json({ message: "TASK UPDATED SUCCESS" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id, email } = req.body;

  if (!email) return res.status(400).json({ message: "Must contain email" });
  if (!id) return res.status(400).json({ message: "Must contain ID" });

  const usersDb = db.collection("users").doc(email).collection("tasks").doc(id);

  try {
    const response = await usersDb.delete();

    return res.status(200).json({ message: "TASK DELETED SUCCESS" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
