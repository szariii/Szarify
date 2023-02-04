const getUserData = (req, res, connection) => {
  const sql = `SELECT id,name,surname,email,phone,nick,register_date,followed_persons,followers FROM users WHERE id="${req.query.id}"`;
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;

    const array = [];
    if (rows[0].followed_persons !== null) {
      rows[0].followed_persons.split(",").map((ele) => {
        if (ele !== "") {
          array.push(parseInt(ele));
        }
      });
    }

    let sendObj = JSON.parse(JSON.stringify(rows[0]));
    sendObj.followed_persons = array;

    res.send(sendObj);
  });
};

module.exports = { getUserData };
