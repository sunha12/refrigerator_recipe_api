const { json } = require('body-parser');
const DB = require('./dbconnect');
const cmm = require('../Lib/cmm')
const mecab = require('mecab-ya');

//============================================================================
// ingredients 식재료
//============================================================================


//식재료/조미료 리스트
exports.ingredients_list = async (req, callback) => {

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

//냉장고 속 식재료/조미료
exports.ref_ingredients_list = async (req, callback) => {

  const { user_idx, b_idx } = req.query;

  param = [user_idx];
  where = ``;;

  if (b_idx) {
    where = `and b_idx = ?;`;
    param = [user_idx, b_idx];
  }

  const sql = ` 
  select * 
  from refrigerator ref
  where user_idx = ? 
  ${where};
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};


//식재료/조미료 상세
exports.ingredients_detail = async (req, callback) => {

  const { ing_idx, user_idx } = req.query;

  param = [ing_idx, user_idx];
  where = ``;;


  const sql = ` 
  select * 
  from refrigerator ref
  where ref.ingredients_idx = ? and user_idx = ?
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};

//재료 수정

//식재료/조미료 추가
