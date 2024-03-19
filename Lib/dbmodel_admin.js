const { json } = require('body-parser');
const DB = require('./dbconnect');
const cmm = require('../Lib/cmm')
const mecab = require('mecab-ya');

//============================================================================
// 관리자 페이지
//============================================================================

//식재료/조미료 상세
exports.ingredients_detail = async (req, callback) => {

  const { ing_idx } = req.query;

  param = [ing_idx];
  where = ``;


  const sql = ` 
  select * 
  from ingredients ing
  where ing.ingredients_idx = ?;
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};


//식재료/조미료 수정
exports.ingredients_edit = async (req, callback) => {

  const { ing_idx, b_idx, ing_nm, ing_dt } = req.query;

  param = [b_idx, ing_nm, ing_dt, ing_idx];
  where = ``;


  const sql = ` 
  UPDATE ingredients
  SET b_idx = ?, ingredients_nm = ?, ingredients_dt = ?
    WHERE ingredients_idx = ?;
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};


//식재료/조미료 추가
exports.ingredients_add = async (req, callback) => {

  const { ing_nm, b_idx, ing_dt } = req.query;

  param = [ing_nm, b_idx, ing_dt];
  where = ``;


  const sql = ` 
  INSERT INTO ingredients
   (ingredients_nm, b_idx, ingredients_dt) VALUES (?, ?, ?);
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};

//식재료/조미료 이미지 등록/수정