const followUser = (req,res,connection) =>{
    const sql = `UPDATE users SET followed_persons=CONCAT(IFNULL(followed_persons,""),",${req.body.to}") WHERE id = "${req.body.from}";`;
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      const sql1 = `UPDATE users SET followers=followers+1 WHERE id = "${req.body.to}"`;
      connection.query(sql1, (err, rows, fields) => {
        if (err) throw err;
        res.send("siema");
      });
    });
}

module.exports={followUser}