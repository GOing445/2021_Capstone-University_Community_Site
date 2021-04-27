module.exports = function(app, fs){
    app.get('/api/s',function(req,res){
        res.send(req.session)
    });
}