const dislikePost=(req,res,connection)=>{
    const sql = `UPDATE posts SET likes="${req.body.array}" WHERE id = ${req.body.postId}`
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      res.send("added");
    });
}

module.exports={dislikePost}