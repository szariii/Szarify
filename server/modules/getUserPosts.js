const getUserPosts = (req,res,connection)=>{
    console.log(req.query);
    //SELECT posts.id AS id ,author_id,posts.timestamp as timestamp,text,likes, users.nick AS nick FROM posts INNER JOIN users WHERE users.id = author_id AND author_id=23 ORDER BY timestamp DESC LIMIT 5
    const sql = `SELECT posts.id AS id ,author_id,posts.timestamp as timestamp,text,likes, users.nick AS nick FROM posts INNER JOIN users WHERE users.id = author_id AND author_id=${req.query.id} ORDER BY timestamp DESC LIMIT ${req.query.limit-5},5`;
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
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
}

module.exports={getUserPosts}