const cmm = require('../Lib/cmm')
const express = require('express');
const router = express.Router();
const dbModel = require('../Lib/dbmodel_admin');

//============================================================================
// admin
//============================================================================

//대시보드
router.get('/dashboard', (req, res) => {
  dbModel.dashboard(req, (data) => {
    cmm.ResData(res, data);
  });
})

//사용자 리스트
router.get('/user-list', (req, res) => {
  dbModel.user_list(req, (data) => {
    cmm.ResData(res, data);
  });
})

// 회원 강제탈퇴
router.post('/user-out', (req, res) => {
  dbModel.user_out(req, res.locals.token, (data) => {
    cmm.ResData(res, data);
  });
})



module.exports = router;