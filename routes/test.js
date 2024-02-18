const cmm = require('../Lib/cmm')
const express = require('express');
const router = express.Router();
const dbModel = require('../Lib/dbmodel_test');

//============================================================================
// test
//============================================================================


//test
router.get('/test', (req, res) => {
  dbModel.test(req, (data) => {
    cmm.ResData(res, data);
  });
})

module.exports = router;