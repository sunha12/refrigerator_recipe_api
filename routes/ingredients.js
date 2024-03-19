const cmm = require('../Lib/cmm')
const express = require('express');
const router = express.Router();
const dbModel = require('../Lib/dbmodel_ingredients');

//============================================================================
// ingredients 식재료
//============================================================================


//식재료/조미료 리스트
router.get('/ingredients-list', (req, res) => {
  dbModel.ingredients_list(req, (data) => {
    cmm.ResData(res, data);
  });
})

//냉장고 속 식재료 조미료
router.get('/ref-ing-list', (req, res) => {
  dbModel.ref_ing_list(req, (data) => {
    cmm.ResData(res, data);
  });
})

//냉장고 속 식재료/조미료 상세
router.get('/ref-ing-detail', (req, res) => {
  dbModel.ref_ing_detail(req, (data) => {
    cmm.ResData(res, data);
  });
})

//냉장고 속 식재료/조미료 수정
router.post('/ref-ing-edit', (req, res) => {
  dbModel.ref_ing_edit(req, (data) => {
    cmm.ResData(res, data);
  });
})

//냉장고 속 식재료/조미료 이미지 수정

//냉장고 속 식재료/조미료 추가
router.post('/ref-ing-add', (req, res) => {
  dbModel.ref_ing_add(req, (data) => {
    cmm.ResData(res, data);
  });
})

module.exports = router;