const cmm = require('./Lib/cmm');
const express = require('express');
const schedule = require('node-schedule');

const port = 4512;

const app = express();
const server = require('http').createServer(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
  limit: '50mb', extended: true, parameterLimit: 100000
}));



// CORS 설정
// Header CORS
app.use(function (req, res, next) {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:4512',
    'https://app.codingduo.co.kr',
    'https://auth.codingduo.co.kr',
    'https://api.codingduo.co.kr',
    'https://admin.codingduo.co.kr',
    'https://codingduo.co.kr',
  ];

  //const allowedOrigins = ['*'];
  const origin = req.headers.origin;
  //console.log('HEADER.ORIGIN:::',req.headers.origin);
  //req.append(local [{'test':'test'}]);
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //console.log('req:::',req);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST, GET, HEAD");
  res.header("Access-Control-Allow-Credentials", 'true');

  next();

});   //인증처리   oauthServer.authenticate()
//},oauthServer.authenticate());   //인증처리   oauthServer.authenticate()


//static 폴더 지정
//app.use(express.static('/public'));
app.use('/image', express.static('public/image'));
app.use('/js', express.static('public/js'));
app.use('/files', express.static('/mnt/disk01/files/indubook'));
app.use('/chatimage', express.static('/mnt/disk01/files/chatfiles'));
app.use('/pdffiles', express.static('/mnt/disk01/files/temp_pdf'));


// 헤더 인증체크
app.use(async function (req, res, next) {

  next();

});


//============================================================================
// ROUTES START !!
//============================================================================

//응답 테스트
app.use('/test', require('./routes/test'));

//관리자 페이지
app.use('/admin', require('./routes/admin'));

// ingredients 식재료
app.use('/ingredients', require('./routes/ingredients'));

//============================================================================
// ROUTES END !!
//============================================================================

//============================================================================
// 스케줄러 START!!
//============================================================================


//테스트
// schedule.scheduleJob('30 * * * * *', () => {
//   console.log('schedule is executed')
// })

//============================================================================
// 스케줄러 END !!
//============================================================================


//============================================================================
// 서버실행 (listen)
//============================================================================
server.listen(port, () => {
  console.log("서버가 시작 되었습니다.");
});
