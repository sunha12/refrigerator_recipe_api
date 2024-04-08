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

// 최근 본 레시피 목록 조회
exports.getRecentlyViewedRecipes = async (req, callback) => {
  const { userIdx } = req.query;

  const params = [userIdx];
  const where = `WHERE rvr.user_idx = ?`;

  const sql = `
    SELECT 
      r.rcp_idx, 
      r.rcp_nm, 
      r.rcp_image,
      rvr.cre_dt
    FROM recipe r
    JOIN recent_view_recipe rvr ON r.rcp_idx = rvr.rcp_idx
    ${where}
    ORDER BY rvr.cre_dt DESC;
  `;

  DB('GET', sql, params)
    .then((result) => {
      callback(result);
    });
};


// 스크랩한 레시피 목록 조회
exports.getScrapedRecipes = async (req, callback) => {
  const { userIdx } = req.query;

  const params = [userIdx];
  const where = `WHERE sr.user_idx = ?`;

  const sql = `
    SELECT 
      r.rcp_idx, 
      r.rcp_nm, 
      r.rcp_image,
      sr.cre_dt
    FROM recipe r
    JOIN scrap_recipe sr ON r.rcp_idx = sr.rcp_idx
    ${where}
    ORDER BY sr.cre_dt DESC;
  `;

  DB('GET', sql, params)
    .then((result) => {
      callback(result);
    });
};


// 새 레시피 등록
exports.addNewRecipe = async (req, callback) => {
  const { userIdx, rcpNm, rcpImage } = req.body; 

  const params = [userIdx, rcpNm, rcpImage]; 

  const sql = `
    INSERT INTO recipe (user_idx, rcp_nm, rcp_image)
    VALUES (?, ?, ?);
  `;

  DB('POST', sql, params)
    .then((result) => {
      callback(result);
    });
};


// 나의 레시피 목록 조회
exports.getMyRecipes = async (req, callback) => {
  const { userIdx } = req.query; 

  const params = [userIdx];
  const where = `WHERE user_idx = ?`; 

  const sql = `
    SELECT 
      rcp_idx, 
      rcp_nm, 
      rcp_image
    FROM recipe
    ${where}; 
  `;

  DB('GET', sql, params)
    .then((result) => {
      callback(result);
    });
};

// 알람 설정 조회
exports.getAlarmSettings = async (req, callback) => {
  const { userIdx } = req.query;

  const sql = `
    SELECT 
      al_no_stime, 
      al_no_etime
    FROM settings
    WHERE user_idx = ?;
  `;

  DB('GET', sql, [userIdx]).then((result) => {
    callback(result);
  });
};

// 알람 설정 업데이트
exports.updateAlarmSettings = async (req, callback) => {
  const { userIdx, alNoStime, alNoEtime } = req.body;

  const sql = `
    UPDATE settings
    SET 
      al_no_stime = ?, 
      al_no_etime = ?
    WHERE user_idx = ?;
  `;

  DB('POST', sql, [alNoStime, alNoEtime, userIdx]).then((result) => {
    callback(result);
  });
};
