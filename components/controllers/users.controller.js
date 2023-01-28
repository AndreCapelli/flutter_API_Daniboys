const { db } = require("../../config/database/dbConfig");

exports.addUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name) return res.status(400).json({ message: "Must contain Name" });
  if (!email) return res.status(400).json({ message: "Must contain email" });
  if (!password)
    return res.status(400).json({ message: "Must contain password" });
  if (!phoneNumber)
    return res.status(400).json({ message: "Must contain phoneNumber" });

  const usersDb = db.collection("users");

  const response = await usersDb
    .doc(email)
    .set({ name, email, password, phoneNumber });

  res.status(200).json(response);
};

exports.getUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Must contain email" });
  if (!password)
    return res.status(400).json({ message: "Must contain password" });

  const usersDb = db.collection("users").doc(email);

  const response = await usersDb.get();

  res.status(200).json(response.data());
};
