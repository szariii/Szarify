const addPost = (req,res,connection) =>{
    const sql = `INSERT INTO posts(author_id, text) VALUES (${req.body.id},"${req.body.text}")`;
    
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      res.send("added")
    });
}

module.exports={addPost}