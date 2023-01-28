const { db } = require("../../config/database/dbConfig");

exports.addUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name) return res.status(400).json({ message: "Must contain Name" });
  if (!email) return res.status(400).json({ message: "Must contain email" });
  if (!password)
    return res.status(400).json({ message: "Must contain password" });
  if (!phoneNumber)
    return res.status(400).json({ message: "Must contain phoneNumber" });

  const usersDb = db.collection("users").doc(email);

  const validation = await usersDb.get();

  if (validation.data())
    return res.status(200).json({ message: "EMAIL ALREADY REGISTERED" });

  try {
    const response = await usersDb.set({ name, email, password, phoneNumber });

    return res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Must contain email" });
  if (!password)
    return res.status(400).json({ message: "Must contain password" });

  const usersDb = db.collection("users").doc(email);

  const response = await usersDb.get();

  if (!response.data())
    return res.status(200).json({ message: "INVALID CREDENTIALS" });

  if (response.data().password == password)
    return res.status(200).json(response.data());
  else return res.status(200).json({ message: "INVALID CREDENTIALS" });
};
