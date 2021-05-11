var fs = require('fs');

module.exports = function(app, fs, db)
{   
   require("./friends")(app,fs,db);
   require("./schedule")(app,fs,db);
   require("./daerim")(app,fs,db);
   app.get('/',function(req,res){
      res.render('index.html');
   });
    // app.get('/login/:username',function(req, res) {
    //     var ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
    //     console.log(`[${ip}] ${req.params.username}님이 웹사이.passport트 로그인에 성공하셨습니다.`);
    //     req.session.username = req.params.username;
    //     console.log(req.user);
    //     res.redirect('/session');
    // });
   app.get('/session',function(req,res){
      res.send(req.session)
      console.log(req.user)
   });
   
   app.get('/api/test1',function(req,res){
      if(req.session.passport){//로그인 검사
         var data = {schedule:[
            {
               day: 1,
               className: '빅 데이터 프로그래밍',
               classroom: '프젝3',
               start: '10:00',
               end: '12:50',
               memo: 'memo context for testing',
            },
            {
               day: 1,
               className: 'IoT개론 및 프로그래밍',
               classroom: '프젝1',
               start: '14:00',
               end: '16:50',
               memo: 'memo context for testing',
            },
            {
               day: 2,
               className: 'UML',
               classroom: '프젝3',
               start: '10:00',
               end: '12:50',
               memo: 'memo context for testing',
            },
            {
               day: 2,
               className: '캡스톤디자인',
               classroom: '프로3',
               start: '14:00',
               end: '16:50',
               memo: 'memo context for testing',
            },
            {
               day: 3,
               className: 'AI개론',
               classroom: '프젝3',
               start: '14:00',
               end: '16:50',
               memo: 'memo context for testing',
            },
            {
               day: 4,
               className: 'Linux 운영체제',
               classroom: '프젝2',
               start: '10:00',
               end: '12:50',
               memo: 'memo context for testing',
            },
            {
               day: 4,
               className: 'ERP',
               classroom: '프로2',
               start: '14:00',
               end: '16:50',
               memo: 'memo context for testing',
            },
            {
               day: 5,
               className: '근로',
               classroom: '원스톱지원실',
               start: '09:00',
               end: '18:00',
               memo: 'memo context for testing',
            },
         ]};
         res.send(data)
         // console.log(req.user)
      }
      else{
         res.status(403).json({error:{status:403,desc:"403 error - Access Denied"}});
      }
   });
   app.get('/logout',function(req,res){
      req.session.destroy(function(err){
         if(err){
               console.log(err);
         }else{
               res.redirect('/');
         }
      })
   });
};