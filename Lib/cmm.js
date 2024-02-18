const crypto = require('crypto');
const fs = require('fs')
const axios = require("axios");

var cmm = {};

//data  Result 
cmm.ResData = (res, data) => {
  if (!data.state) {
    cmm.ErrorResponse(res, 400, data);
  } else {
    cmm.OkResponse(res, data.row);
  }
}

cmm.PageNum = (data, pageSize = cmm.PAGE_SIZE) => {
  if (cmm.isEmpty(data) || data <= 1) {
    return 0;
  } else {
    return (data - 1) * pageSize;
  }
}

//빈값 체크
cmm.isEmpty = (str) => {
  if (str == undefined || str == null || str == '' || str == 'null') {
    return true;
  } else {
    return false;
  }
}

//오류 리턴()
cmm.ErrorResponse = (res, status, msg) => {
  res.status(status).json({ status: status, message: msg });
  res.end();
}

//정상 리턴()
cmm.OkResponse = (res, msg) => {
  res.status(200).json({ status: 200, message: msg });
  res.end();
}

module.exports = cmm;