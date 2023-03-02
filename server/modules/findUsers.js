const findUsers=(req,res,connection)=>{
    const nick = req.query.nick
  
    const arr = nick.split(" ")
    let sql = `SELECT id,name,surname,nick FROM users WHERE nick LIKE "${nick}%" OR name LIKE "${nick}%" OR surname LIKE "${nick}%"`
    if(arr.length>1){
      sql = `SELECT id,name,surname,nick FROM users WHERE nick LIKE "${nick}%" OR (name LIKE "${arr[0]}" AND surname LIKE "${arr[1]}%") OR (surname LIKE "${arr[1]}" AND name LIKE "${arr[0]}%")`
    }
  
    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;      res.send(rows)
    });
  
}

module.exports = {findUsers}