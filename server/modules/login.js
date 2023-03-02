const login = (req,res,connection,bcrypt)=> {
  const sql = `SELECT * FROM users WHERE email="${req.query.email}"`;
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    let obj = {
      operation: false,
      data: "",
      errorMessage: "Something is wrong with email address or password",
    };
    if (rows.length === 0) {
      res.send(obj);
      return;
    }

    const result = bcrypt.compareSync(req.query.password, rows[0].password);

    if (result) {

      const array = []
      if(rows[0].followed_persons!==null){
        rows[0].followed_persons.split(",").map(ele=>{
          if(ele!==""){
            array.push(parseInt(ele))
          }
        })
      }
      

      const sendingObj = {
        id: rows[0].id,
        name: rows[0].name,
        surname: rows[0].surname,
        email: rows[0].email,
        phone: rows[0].phone,
        nick: rows[0].nick,
        register_date:rows[0].register_date,
        followed_persons:array,
        followers: rows[0].followers
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