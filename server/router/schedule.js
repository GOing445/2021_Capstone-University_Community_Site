const { addOwnPropertyChangeListener } = require("collections/listen/property-changes");

module.exports = function(app, fs, db){
    app.get('/timetable',function(req,res){
        if(req.session.passport){
            res.send(global.DB.users.get(req.session.passport.user.id).schedules);
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    })
    app.get('/timetable/:user_ID',function(req,res){
        //todo 친구목록에 있는지 체크할수 있어야함
        if(req.session.passport){
            res.send(global.DB.users.get(req.params.user_ID).schedules);
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    });
    app.delete('/schedule/:schedule_ID',async function(req,res){
        if(req.session.passport){
            var user = req.session.passport.user;
            var schedule = await db.getScheduleByID(req.params.schedule_ID);
            if(schedule.owner!=user.id){ //자신의 스케줄이 아니면 거절
                res.status(403).json({error:{status:403,desc:"403 error - Request Rejected"}});
            }
            else{ 
                await db.deleteScheduleByID(req.params.schedule_ID);
                res.status(202).json({response:{status:202,desc:"request success"}});
            }
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    });
    // app.get('/user',async function(req,res){ //테스트용 코드
    //     console.log(global.DB.users)
    //     res.send(global.DB.users)
    // });
    app.post('/schedule',async function(req,res){
        if(req.session.passport){
            var okPacket = await db.addSchedule(req.session.passport.user.id,req.body);
            res.status(401).json({response:{status:202,desc:"request success",insertId:okPacket.insertId}});
        }
        else res.status(401).json({error:{status:401,desc:"401 error - Unauthorized"}});
    });
    // app.post('/schedule/:schedule_ID}',function(req,res){
    //     res.send(req.session)
    // });
}