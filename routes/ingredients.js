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
router.get('/ref-ingredients-list', (req, res) => {
  dbModel.ref_ingredients_list(req, (data) => {
    cmm.ResData(res, data);
  });
})

//재료 상세
router.get('/ingredients-detail', (req, res) => {
  dbModel.ingredients_detail(req, (data) => {
    cmm.ResData(res, data);
  });
})

module.exports = router;