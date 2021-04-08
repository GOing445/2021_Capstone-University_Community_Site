var fs = require('fs');

module.exports = function(app, fs)
{   
    app.get('/',function(req,res){
        res.send('Hello World!!!!')
    });
    // app.get('/login/:username',function(req, res) {
    //     var ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
    //     console.log(`[${ip}] ${req.params.username}님이 웹사이트 로그인에 성공하셨습니다.`);
    //     req.session.username = req.params.username;
    //     console.log(req.user);
    //     res.redirect('/session');
    // });
    app.get('/session',function(req,res){
        res.send(req.session)
        console.log(req.user)
    });
};