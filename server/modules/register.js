const register = (req, res, connection, bcrypt, saltRounds) => {

  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  const sql = `INSERT INTO users(name,surname,email,password,phone,nick) VALUES ("${req.body.name}","${req.body.surname}","${req.body.email}","${hash}","${req.body.phone}","${req.body.nick}")`;

  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    res.send("added");
  });
};

module.exports = {register}