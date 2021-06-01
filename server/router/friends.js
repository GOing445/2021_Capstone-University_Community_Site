module.exports = function(app, fs, db){
   
    // 자신의 대기중인 친구추가 요청리스트 보기
    app.get('/friends/invite', async function(req, res){
        if(req.session.passport){
            var user = req.session.passport.user;
            var result = await db.getFreiendRequests(user.id);
            res.send(result);
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    })
    // 자신의 친구 리스트 보기
    app.get('/friends/list', async function(req, res){
        if(req.session.passport){
            // 유저 정보를 가져온다.
            var user = req.session.passport.user;
            var result = await db.getFreiendList(user.id);
            console.log(result);
            res.send(result);
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    })
    // 친구 추가 요청
    app.post('/friends/:friend_Name/:friend_Code',async function(req, res){
        if(req.session.passport){
            // 유저 정보를 가져온다.
            var user = req.session.passport.user;

            
            // 친구코드로 대상 유저를 찾는다.
            var target = await db.findUserbyCode(req.params.friend_Name,req.params.friend_Code)[0];
            console.log('target',target);
            if(!target){ // 대상이 없으면
                res.status(406).json({response:{status:406,desc:"406 error - User not Found"}}); // 대상이없으면 에러처리
                return;
            }


            // 친구와의 관계를 가져온다.
            var result = await db.checkFriend(target.id, user.id);
            var isUser = await db.checkUser(target.id);
            
            if((result.isFriend === false) && (result.isPending === false) && isUser.truth ){
                await db.addFriend(user.id,target.id);
                res.status(202).json({response:{status:202,desc:"request success"}});
            }else{
                res.status(400).json({error:{status:400,desc:"400 error"}});
            }
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});  
    })    
    // 친구추가 수락
    app.put('/friends/:friend_ID',async function(req, res){
        if(req.session.passport){
            // 유저 정보
            var user = req.session.passport.user;
            // 친구와의 관계 정보를 가져온다.
            var result = await db.checkFriend(user.id, req.params.friend_ID);
            var isUser = await db.checkUser(req.params.friend_ID);
            if((result.isFriend === false) && (result.isPending === true) && isUser.truth){
                await db.acceptFriend(user.id, req.params.friend_ID);
                res.status(202).json({response:{status:202,desc:"request success"}});
            }else{
                res.status(400).json({error:{status:400,desc:"400 error"}});
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
            var isUser = await db.checkUser(req.params.friend_ID);
            if(result.isFriend === true && isUser.truth){
                await db.deleteFriend(user.id, req.params.friend_ID);
                await db.deleteFriend(req.params.friend_ID,user.id);
                res.status(202).json({response:{status:202,desc:"request success"}});
            }else {
                res.status(400).json({error:{status:400,desc:"400 error"}});
            }
            
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});

    })    
     // 친구 사이 확인 API
     app.get('/friends/:friend_ID', async function(req, res){
        if(req.session.passport){
            var user = req.session.passport.user;
            result = await db.checkFriend(user.id, req.params.friend_ID);
            res.send(result);
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    })

}