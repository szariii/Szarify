const followUser = (req,res,connection) =>{
    console.log(req.body);
    const sql = `UPDATE users SET followed_persons=CONCAT(IFNULL(followed_persons,""),",${req.body.to}") WHERE id = "${req.body.from}";`;
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      const sql1 = `UPDATE users SET followers=followers+1 WHERE id = "${req.body.to}"`;
      console.log(sql1);
      connection.query(sql1, (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        res.send("siema");
      });
    });
    console.log("test");

}

module.exports={followUser}