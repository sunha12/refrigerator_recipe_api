const { json } = require('body-parser');
const DB = require('./dbconnect');
const cmm = require('../Lib/cmm')
const mecab = require('mecab-ya');

//============================================================================
// test
//============================================================================ß


//test
exports.test = async (req, callback) => {

  // const { user_idx } = req.query;

  param = [];
  where = ``;

  const sql = ` 
  select *
  from users
  ${where};
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};