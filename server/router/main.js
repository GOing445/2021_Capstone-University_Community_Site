var fs = require('fs');

module.exports = function(app, fs)
{   
    app.get('/',function(req,res){
        res.send('Hello World!!!!')
    });
};