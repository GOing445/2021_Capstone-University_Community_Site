module.exports = function(app, fs){
    // 친구 사이 확인 API
    app.get('/friends/:friend_ID', function(req, res){
        if(req.session.passport){
            var user = req.session.passport.user;
            result = await db.checkFriend(user.id, friend_ID);
            res.send(result);
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    })
    // 친구 추가 요청
    app.post('/friends/:friend_ID/request',async function(req, res){
        if(req.session.passport){
            // 유저 정보를 가져온다.
            var user = req.session.passport.user;
            // 친구와의 관계를 가져온다.
            var result = await db.checkFriend(user.id, req.params.friend_ID);
            if(result.isFriend === false){
                await db.addFriend(user.id, req.params.friend_ID);
                res.status(202).json({response:{status:202,desc:"request success"}});
            }
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});  
    })    
    // 친구추가 수락
    app.post('/friends/:friend_ID',async function(req, res){
        if(req.session.passport){
            // 유저 정보
            var user = req.session.passport.user;
            // 친구와의 관계 정보를 가져온다.
            var result = await db.checkFriend(user.id, req.params.friend_ID);
            if(result.isFriend === false){
                await db.acceptFriend(user.id, req.params.friend_ID);
                res.status(202).json({response:{status:202,desc:"request success"}});
            }
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    })    
    // 
    // 친구 삭제
    app.delete('/friends/:friend_ID',async function(req, res){
        if(req.session.passport){
            // 유저 정보
            var user = req.session.passport.user;
            // 친구인지 정보를 가져온다.
            var result = await db.checkFriend(user.id, req.params.friend_ID);
            if(result.isFriend === true){
                await db.deleteFriend(user.id, req.params.friend_ID);
                res.status(202).json({response:{status:202,desc:"request success"}});
            }
            
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});

    })    

}