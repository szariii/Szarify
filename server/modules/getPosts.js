const getPosts = (req, res,connection) => {
  if (req.query.array !== undefined) {
    let sql = `SELECT posts.id as id,author_id,text,posts.timestamp as timestamp,likes,nick FROM posts INNER JOIN users WHERE users.id=posts.author_id AND (`;
    req.query.array.map((ele, index) => {
      if (index === 0) {
        sql += ` author_id=${ele}`;
      } else {
        sql += ` OR  author_id=${ele}`;
      }
    });
    sql += `) ORDER BY posts.timestamp DESC LIMIT ${req.query.limit - 5}, 5`;

    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      let sendObj = rows;
      sendObj.map((row, index) => {
        if (row.likes === null) {
          sendObj[index].likes = [];
        } else {
          let arr = [];
          row.likes.split(",").map((ele) => {
            if (ele !== "") {
              arr.push(parseInt(ele));
            }
          });
          sendObj[index].likes = arr;
        }
      });
      res.send(sendObj);
    });
  } else {
    res.send([]);
  }
};

module.exports = { getPosts };
