const { json } = require('body-parser');
const DB = require('./dbconnect');
const cmm = require('../Lib/cmm')
const mecab = require('mecab-ya');

//============================================================================
// mypage
//============================================================================


//참고용
exports.cate_recipe_list = async (req, callback) => {

  const { b_idx } = req.query;

  param = [b_idx];
  where = `where b_idx = ?;`;

  const sql = ` 
  select 
    i.ingredients_idx, 
    i.ingredients_nm,
    i.b_idx,
    i.ingredients_dt,
    i.ingredients_image
  from ingredients i
  ${where};
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};