const addPost = (req,res,connection) =>{
    console.log(req.body);
    const timestamp = new Date().getTime()
    const sql = `INSERT INTO posts(author_id, text, timestamp) VALUES (${req.body.id},"${req.body.text}",${timestamp})`;
    
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      console.log(rows)
      res.send("added")
    });
}

module.exports={addPost}