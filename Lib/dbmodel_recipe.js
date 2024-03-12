const { json } = require('body-parser');
const DB = require('./dbconnect');
const cmm = require('../Lib/cmm')
const mecab = require('mecab-ya');

//============================================================================
// recipe 레시피
//============================================================================

//카테고리별 레시피 sum 리스트
exports.rcp_cate_sum_list = async (req, callback) => {

  const { b_idx, search } = req.query;

  param = [b_idx];
  where = `where rcp_cate_idx = ?`;

  if (search) {
    where += `and cate_nm like ?;`;
    param = [b_idx, '%' + search + '%'];
  }

  const sql = ` 
  select 
    rsc.rcp_s_cate_idx,
    rsc.rcp_cate_idx,
    rsc.cate_nm
  from recipe_sum_category rsc
  ${where};
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};

//레시피 리스트
exports.rcp_list = async (req, callback) => {

  const { rcp_s_cate_idx } = req.query;

  param = [rcp_s_cate_idx];
  where = `where rcp_s_cate_idx = ?`;

  const sql = ` 
  select 
    r.rcp_idx,
    r.rcp_cate_idx,
    r.rcp_s_cate_idx,
    r.rcp_nm,
    r.rcp_image,
    r.rcp_introduction
  from recipe r
  ${where};
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });
};

//레시피 상세
exports.rcp_detil = async (req, callback) => {

  const { rcp_idx } = req.query;

  param = [rcp_idx, rcp_idx, rcp_idx];
  where = `where rcp_idx = ?`;

  const sql = ` 
  select 
    r.rcp_idx,
    r.rcp_cate_idx,
    r.rcp_s_cate_idx,
    r.rcp_nm,
    r.rcp_image,
    r.rcp_introduction
  from recipe r
  ${where};

  select 
    ri.rcp_idx,
    ri.ingredients_idx,
    i.ingredients_nm
  from recipe_ingredients ri
  inner join ingredients i on i.ingredients_idx = ri.ingredients_idx
  ${where};

  select 
    cp.ckp_idx,
    cp.rcp_idx,
    cp.ckp_image, 
    cp.ckp_text,
    cp.ckp_cnt
  from cooking_process cp
  ${where}
  order by ckp_cnt;
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });
};

//선택한 재료로만 만들 수 있는 레시피 리스트

//냉장고 안에 포함된 재료로 만들 수 있는 레시피 리스트

//지금 인기있는 레시피



