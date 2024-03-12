const cmm = require('../Lib/cmm')
const express = require('express');
const router = express.Router();
const dbModel = require('../Lib/dbmodel_recipe');

//============================================================================
// recipe 레시피
//============================================================================


//카테고리별 레시피 sum 리스트
router.get('/rcp-cate-sum-list', (req, res) => {
  dbModel.rcp_cate_sum_list(req, (data) => {
    cmm.ResData(res, data);
  });
})

//레시피 리스트
router.get('/rcp-list', (req, res) => {
  dbModel.rcp_list(req, (data) => {
    cmm.ResData(res, data);
  });
})

//레시피 상세
router.get('/rcp-detil', (req, res) => {
  dbModel.rcp_detil(req, (data) => {
    cmm.ResData(res, data);
  });
})

module.exports = router;