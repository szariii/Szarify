const login = (req,res,connection,bcrypt)=> {
  console.log(req.body);
  const sql = `SELECT * FROM users WHERE email="${req.body.email}"`;
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    let obj = {
      operation: false,
      data: "",
      errorMessage: "Something is wrong with email address or password",
    };
    console.log(rows);
    if (rows.length === 0) {
      console.log("finito");
      res.send(obj);
      return;
    }
    console.log("go");

    const result = bcrypt.compareSync(req.body.password, rows[0].password);
    console.log(result);

    if (result) {
      const sendingObj = {
        id: rows[0].id,
        name: rows[0].name,
        surname: rows[0].surname,
        email: rows[0].email,
        phone: rows[0].phone,
        nick: rows[0].nick,
      };
      obj.data = sendingObj;
      obj.operation = true;
      res.send(obj);
      return;
    }
    res.send(obj);
  });
};

module.exports ={login}