const { json } = require('body-parser');
const DB = require('./dbconnect');
const cmm = require('../Lib/cmm')
const mecab = require('mecab-ya');

//============================================================================
// ingredients 식재료/조미료
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
exports.ref_ing_list = async (req, callback) => {

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



//냉장고 속 식재료/조미료 상세
exports.ref_ing_detail = async (req, callback) => {

  const { ing_idx, user_idx } = req.query;

  param = [ing_idx, user_idx];
  where = ``;


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


//냉장고 속 식재료/조미료 수정
exports.ref_ing_edit = async (req, callback) => {

  const { ref_idx, user_idx, ing_nm, count, b_idx, ing_dt } = req.query;

  param = [ing_nm, count, b_idx, ing_dt, ref_idx, user_idx,];
  where = ``;

  const sql = ` 
  UPDATE refrigerator
    SET b_idx = ?, ingredients_nm = ?, count = ?, expiration_dt = ?
    WHERE ref_idx = ? and user_idx = ?;
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};


//냉장고 속 식재료/조미료 이미지 수정



//냉장고 속 식재료/조미료 추가
exports.ref_ing_add = async (req, callback) => {

  const { user_idx, ingredients_idx, b_idx, img, ing_nm, count, exp_dt } = req.query;

  param = [user_idx, ingredients_idx, b_idx, img, ing_nm, count, exp_dt];
  where = ``;


  const sql = ` 
  INSERT INTO refrigerator
   (user_idx, ingredients_idx, b_idx, img, ingredients_nm, count, expiration_dt) VALUES (?, ?, ?, ?, ?, ?, ?);
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};


