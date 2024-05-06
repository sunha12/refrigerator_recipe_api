const { json } = require('body-parser');
const DB = require('./dbconnect');
const cmm = require('../Lib/cmm')
const mecab = require('mecab-ya');

//============================================================================
// 관리자 페이지
//============================================================================


//대시보드
exports.dashboard = async (req, callback) => {

  const { sdt, edt } = req.query;

  param = [sdt, edt];
  where = ``;

  if (sdt && edt) {
    where += `
    where date_format(cre_dt, '%Y-%m-%d') >= date_format(?, '%Y-%m-%d')
	  and date_format(cre_dt, '%Y-%m-%d') <=  date_format(?, '%Y-%m-%d')
    `
  }

  const sql = ` 
  select '활동 중인 회원' as tbnm,
  count(*) as cnt
  from users u
  where del_yn = 'N';

  select '탈퇴한 회원' as tbnm, 
  count(*) as cnt
  from users u
  where del_yn = 'Y';

  select '모든 레시피' as tbnm,
  count(*) as cnt
  from recipe ;

  select '최근 추가된 레시피' as tbnm,
  count(*) as cnt
  from recipe 
  ${where}
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};


//사용자 리스트
exports.user_list = async (req, callback) => {

  const { pageno, search } = req.query;
  const page_size = 20;

  let ppageno = (!pageno) ? '1' : pageno;

  param = [cmm.PageNum(ppageno, page_size), page_size];
  where = ``;


  if (search) {
    where += `and p.nicknm like ?;`;
    param = ['%' + search + '%', cmm.PageNum(ppageno, page_size), page_size];
  }


  const sql = ` 
  select 
    u.user_idx,
    u.u_uuid,
    p.nicknm,
    IFNULL(r.cnt, 0) as r_cnt,
    IFNULL(reff.cnt, 0) as i_cnt,
    IFNULL(ref.cnt, 0) as c_cnt
  from users u
  inner join profile p on p.user_idx = u.user_idx
  left join (
    select count(*) as cnt, r.user_idx
    from recipe r
    group by r.user_idx
  )r on r.user_idx = u.user_idx
  left join (
    select count(*) as cnt, reff.user_idx
    from refrigerator reff
    where b_idx != 70000
    group by reff.user_idx
  )reff on reff.user_idx = u.user_idx
  left join (
    select count(*) as cnt, ref.user_idx
    from refrigerator ref
    where b_idx = 70000
    group by ref.user_idx
  )ref on ref.user_idx = u.user_idx
  where del_yn = 'N'
  ${where}
  order by u.cre_dt DESC limit ?, ?;
  ` ;

  DB('GET', sql, param)
    .then((result) => {
      callback(result);
    });

};


// 회원 강제탈퇴
exports.user_out = async (req, token, callback) => {

  const { user_idx } = req.body;

  const sql = `
  
  UPDATE users
  SET del_yn = 'Y'
  WHERE user_idx = ?;
  
  ` ;

  DB('GET', sql, user_idx).then((result) => {
    callback(result);
  });

};


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