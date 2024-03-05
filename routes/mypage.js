const cmm = require('../Lib/cmm')
const express = require('express');
const router = express.Router();
const dbModel = require('../Lib/dbmodel_mypage');

//============================================================================
// mypage
//============================================================================

//식재료/조미료 리스트
router.get('/cate-recipe-list', (req, res) => {
  dbModel.cate_recipe_list(req, (data) => {
    cmm.ResData(res, data);
  });
})

module.exports = router;