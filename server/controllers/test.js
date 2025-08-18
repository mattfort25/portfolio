// server/controllers/test.js
exports.test = async (req, res) => {
  console.log("This is for test only");
  res.send("Backend is connected successfully!");
};
