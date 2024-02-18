const express = require("express");
const router = express.Router();
const mecab = require('mecab-ya');

//////////////////
//  응답 테스트용  //
//////////////////

router.post('/', (req, res) => {
    // const requestData = req.body; // 요청의 본문(body)에서 데이터 추출
    // console.log(':::::::::::', requestData.test);

    //명사만 추출
    // console.log('nouns : ', mecab.nounsSync(requestData.test));

    // mecab.pos(requestData.test, function (err, result) {
    //     console.log('pos : ', result
    //     );
    // })

    // mecab.morphs(requestData.test, function (err, result) {
    //     console.log('morphs : ', result
    //     );
    // })

    // 응답 보내기
    // res.status(200).json({ message: mecab.nounsSync(requestData.test) });
    res.status(200).json({ message: 'test' });
});


module.exports = router;

