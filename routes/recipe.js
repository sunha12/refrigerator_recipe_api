const cmm = require('../Lib/cmm')
const express = require('express');
const router = express.Router();
const dbModel = require('../Lib/dbmodel_recipe');

//============================================================================
// recipe 레시피
//============================================================================


//식재료/조미료 리스트
router.get('/ingredients-list', (req, res) => {
  dbModel.ingredients_list(req, (data) => {
    cmm.ResData(res, data);
  });
})

module.exports = router;