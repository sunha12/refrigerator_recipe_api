const cmm = require('../Lib/cmm');
const express = require('express');
const router = express.Router();
const dbModel = require('../Lib/dbmodel_mypage');

//============================================================================
// mypage
//============================================================================

// 식재료/조미료 리스트 조회 경로
router.get('/cate-recipe-list', (req, res) => {
  dbModel.cate_recipe_list(req, (data) => {
    cmm.ResData(res, data);
  });
});

// 최근 본 레시피 목록 조회 경로
router.get('/recently-viewed', (req, res) => {
  dbModel.getRecentlyViewedRecipes(req, (data) => {
    cmm.ResData(res, data);
  });
});

// 스크랩한 레시피 목록 조회 경로
router.get('/scraps', (req, res) => {
  dbModel.getScrapedRecipes(req, (data) => {
    cmm.ResData(res, data);
  });
});

// 새 레시피 등록 경로
router.post('/new-recipe', (req, res) => {
  dbModel.addNewRecipe(req, (result) => {
    cmm.ResData(res, result);
  });
});

// 나의 레시피 목록 조회 경로
router.get('/my-recipes', (req, res) => {
  dbModel.getMyRecipes(req, (data) => {
    cmm.ResData(res, data);
  });
});

// 알람 설정 조회
router.get('/alarm-settings', (req, res) => {
  dbModel.getAlarmSettings(req, (data) => {
    cmm.ResData(res, data);
  });
});

// 알람 설정 업데이트
router.post('/update-alarm-settings', (req, res) => {
  dbModel.updateAlarmSettings(req, (result) => {
    cmm.ResData(res, result);
  });
});

module.exports = router;