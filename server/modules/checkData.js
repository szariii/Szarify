const checkData = (req, res,connection) => {
  console.log(req.body);
  const email = req.body.email;
  const nick = req.body.nick;
  const sql =
    'SELECT `email`,`nick` FROM `users` WHERE `email`="' +
    email +
    '" OR `nick`="' +
    nick +
    '"';

  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);

    let obj = {
      free: "",
      errorMessage: "",
    };

    if (rows.length === 0) {
      obj.free = true;
      res.send(obj);
    } else {
      obj.free = false;
      if (rows[0].email === email) {
        obj.errorMessage = "Email is already used";
      } else {
        obj.errorMessage = "Nick is already used";
      }
      res.send(obj);
    }
  });
};

module.exports={checkData}