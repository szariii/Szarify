const likePost = (req, res,connection) => {
  console.log(req.body);
  const sql = `UPDATE posts SET likes=CONCAT(IFNULL(likes,""),",${req.body.id}") WHERE id = ${req.body.postId}`;
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
    res.send("added");
  });
};

module.exports = { likePost };
