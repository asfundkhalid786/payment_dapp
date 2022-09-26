// import mysql from 'serverless-mysql';
// const db = mysql({
//   config: {
//     host:"127.0.0.1",
//     port: "3306",
//     database: 'usman',
//     user: 'root',
//     password: ''
//   }
// });


// export default async function excuteQuery({ query, values }) {
//   try {
//     const results = await db.query(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// }
// mysql
const {createPool} = require('mysql');

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "test",
  database: "usman",
})
pool.query(`select * from test where inno = ?`, [4], (err,result,field)=>{
  //pool.query(`select * from test`, (err,result,field)=>{
  if(err){
    return console.log(err);
  }
  return console.log(result)
})

module.exports = pool;