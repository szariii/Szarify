const findUser = (req, res, connection) => {
  console.log(req.body);
  const sql = `SELECT id,name,surname,nick,register_date,followed_persons,followers FROM users WHERE id="${req.body.id}"`;

  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
    const array = [];
    if (rows[0].followed_persons !== null) {
      rows[0].followed_persons.split(",").map((ele) => {
        if (ele !== "") {
          array.push(parseInt(ele));
        }
      });
    }
    rows[0].followed_persons = array;
    res.send(rows[0]);
  });
};

module.exports = { findUser };
