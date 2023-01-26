const checkData = async (req, res, db) => {
  console.log(req);
  const sql = "SELECT * FROM `users` WHERE ``";
  //db.query()
  res.end("test");
};

module.exports = checkData;
