const dislikePost=(req,res,connection)=>{
    console.log(req.body);
    const sql = `UPDATE posts SET likes="${req.body.array}" WHERE id = ${req.body.postId}`
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      res.send("added");
    });
}

module.exports={dislikePost}