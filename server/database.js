var mysql = require('mysql');
var connection;
const db_config = require("./config.json").DB;
var Map = require("collections/map");


//NOTE 이렇게해도 되나싶음 더 좋은방법 있으면 알려주세요
global.DB = {
    users : new Map(), 
    schedules : new Map(), 
    // university : new Map(),
    // friends : new Map(),
};
//데이터베이스가 연결될때 데이터들 패치받기
async function init() {
    console.log(`DataBase : "${connection.config.host}:${connection.config.port}"`);
    console.log("init실행")
    await Promise.all([module.exports.fatchUsers(),module.exports.fatchScadules()])
    module.exports.linkScadules();
}
// 커넥션이 만료되면 다시 연결해주는 코드
module.exports.handleDisconnect = function() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.
    
    connection.connect(function (err) {              // The server is either down
        init();
        module.exports.connection = connection;
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(module.exports.handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            module.exports.handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}


module.exports.handleDisconnect();
//TODO 클래스들은 나중에 스트럭쳐 파일들로 독립시키기
class User{ // 사용자 객체
    constructor(data){
        // console.log(data);
        this.id = null;//유저 아이디(기본식별자)
        this.name = null;// 실명
        this.invCode = null;// 비밀번호(암호화된)
        this.registDate = null;// 가입일자
        this.schedules =null;
        // if(data) this.init(data);
    }
    async init(data){
        this.id = data.id ;
        this.name = data.name ;
        this.invCode = data.invCode ;
        this.registDate = data.registDate ;
        this.schedules = new Map();
        // console.log(this);
    }
    toJSON(){
        return {
            id:this.id,
            name:this.name,
            invCode:this.invCode,
            registDate:this.registDate,
            schedule:this.schedules
        };
    }
}
class Schedule{ // 스케줄 객체
    constructor(data){
        this.id = null;// 스케줄 아이디
        this.owner = null;// 주인
        this.day = null;// 요일 0(일)~6(토)
        this.className = null;// 강의 이름
        this.classroom = null;// 강의실
        this.start = null;// 일정이 시작되는 시간
        this.end = null;// 일정이 끝나는 시간
        this.memo = null;// 일정이 끝나는 시간
        // if(data) this.init(data);
    }
    async init(data){
        //TODO sql데이터를 파싱해서 객체에 넣어주세요 
        
        this.id = data.id;// 스케줄 아이디
        this.owner = data.owner;// 주인
        this.day = data.day;// 요일 0(일)~6(토)
        this.className = data.className;// 강의 이름
        this.classroom = data.classroom;// 강의실
        this.start = data.start;// 일정이 시작되는 시간
        this.end = data.end;// 일정이 끝나는 시간
        this.memo = data.memo;// 메모
    }
    toJSON(){
        return {
            id:this.id,
            owner:this.owner.id,
            day:this.day,
            className:this.className,
            classroom:this.classroom,
            start:this.start,
            end:this.end,
            memo:this.memo
        };
    }
}

module.exports.getSchedulesFromUserID = function(user_id,callback){
    return new Promise(function(resolve,reject){
        //쿼리는 이렇게 작성해주면 됨
        let qqq = `SELECT * FROM Schedule WHERE owner = "${user_id}"`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 로그기능 아직 없으니까 무시2
            if(callback)callback(err, rows); // 콜백함수 형태로 구현되있음 async await 형태로 구현하면 더 좋을것같음
            else resolve(rows)
            // module.exports.fatchUsers(); // 데이터베이스에 변동이 생겼으니 동기화해주기
        });
    });
}
module.exports.getScheduleByID = async function(schedule_ID,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `SELECT * FROM Schedule WHERE id = ${schedule_ID}`;
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err);
            if(callback)callback(err, rows[0]); // 콜백함수
            resolve(rows[0]);
        });
    });
}
module.exports.deleteScheduleByID = async function(schedule_ID,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        schedule_ID = Number(schedule_ID);
        let schedule = global.DB.schedules.get(schedule_ID);
        if(schedule){ 
            schedule.owner.schedules.delete(schedule_ID);
            console.log('머선119',global.DB.schedules.delete(schedule_ID));
    
            let qqq = `DELETE FROM Schedule WHERE id=${schedule_ID};`;
            connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
                if(err)console.log(err);
                if(callback)callback(err, rows); // 콜백함수
    
                resolve(rows);
            });
        }
        else{ // 존재하지 않는 스케쥴
            resolve(false);
        }
    });
}
module.exports.addSchedule = async function(user_id,schedule,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `INSERT INTO \`${db_config.database}\`.\`Schedule\` (\`owner\`, \`day\`, \`className\`, \`classroom\`, \`start\`, \`end\`, \`memo\`) VALUES ('${user_id}', '${schedule.day}', '${schedule.className}', '${schedule.classroom}', '${schedule.start}', '${schedule.end}', '${schedule.memo}');`;
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 로그
            // global.DB.users.get(user_id).schedules.push(schedule);
            global.DB.users.get(user_id).schedules.set(rows.insertId,schedule);
            global.DB.schedules.set(rows.insertId,schedule);
            console.log(global.DB.users.get(user_id));
            if(callback)callback(err, rows); // 콜백함수
            resolve(rows);
            // module.exports.fatchUsers(); // 데이터베이스에 변동이 생겼으니 동기화해주기
        });
    });
}
module.exports.editSchedule = async function(schedule_id,user_id,schedule,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let eee = '';
        if(schedule.day)eee+=`\`day\`='${schedule.day}',`
        if(schedule.className)eee+=`\`className\`='${schedule.className}',`
        if(schedule.classroom)eee+=`\`classroom\`='${schedule.classroom}',` 
        if(schedule.start)eee+=`\`start\`='${schedule.start}',`
        if(schedule.end)eee+=`\`end\`='${schedule.end}',`
        if(schedule.memo)eee+=`\`memo\`='${schedule.memo}',`
        eee = eee.replace(/(,+)(?!.*,)/g,'');

        let qqq = `UPDATE \`${db_config.database}\`.\`Schedule\` SET ${eee} WHERE  \`id\`=${schedule_id};`;
        console.log(qqq);
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 로그
            // global.DB.users.get(user_id).schedules.push(schedule);
            if(!global.DB.users.get(user_id))console.log("editSchedule 유저찾기 실패")
            global.DB.users.get(user_id).schedules.set(rows.insertId,schedule);
            global.DB.schedules.set(rows.insertId,schedule);
            console.log(global.DB.users.get(user_id));
            if(callback)callback(err, rows); // 콜백함수
            resolve(rows);
            // module.exports.fatchUsers(); // 데이터베이스에 변동이 생겼으니 동기화해주기
        });
    });
}
module.exports.fatchUsers = function(callback) {
    return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM User`,function(err, rows, fields) {
            for(row of rows){ // 유저한명씩 객체만들고 글로벌객체로 올려두기
                let user = new User(row) // 새객체
                user.init(row); // 데이터채우기
                global.DB.users.set(row.id, user); // 글로벌데이터로 올리기 //콜렉션 모듈을 교체해서 코드 바꿔야됨
            }
            if(err)console.log(err);
            if(callback)callback(err, rows); // 콜백함수 형태
            else resolve(rows);
        });
    });
}
module.exports.fatchScadules = function(callback) {
    return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM Schedule`,function(err, rows, fields) {
            for(row of rows){ // 유저한명씩 객체만들고 글로벌객체로 올려두기
                let schedule = new Schedule(row) // 새객체
                schedule.init(row); // 데이터채우기
                // console.log(schedule);
                global.DB.schedules.set(row.id, schedule); // 글로벌데이터로 올리기 //콜렉션 모듈을 교체해서 코드 바꿔야됨
            }
            if(err)console.log(err);
            // console.log(global.DB.schedule);
            if(callback)callback(err, rows); // 콜백함수 형태
            else resolve(rows);
        });
    });
}
module.exports.linkScadules = function(callback) {
    return new Promise(function(resolve,reject){
        for(schedule of global.DB.schedules.toArray()){
            let user = global.DB.users.get(schedule.owner);
            if(!user)continue;
            user.schedules.set(schedule.id,schedule);
            schedule.owner = user;    
        }
        console.log(global.DB.users);
        resolve();
    });
}
//addUser 새로운 유저 생성
module.exports.addUser = function(user,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `INSERT INTO \`${db_config.database}\`.\`User\` (\`id\`, \`name\`, \`invCode\`, \`registDate\`) VALUES ('${user.id}', '${user.name}', '${Math.floor(Math.random() * (9999 - 0))}', CURRENT_TIMESTAMP);`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시
        
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 로그기능 아직 없으니까 무시2
            if(callback)callback(err, rows); // 콜백함수 형태로 구현되있음 async await 형태로 구현하면 더 좋을것같음
            else resolve(rows)
            module.exports.fatchUsers(); // 데이터베이스에 변동이 생겼으니 동기화해주기
        });
    });
}
module.exports.addFriend = function(from,to,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `INSERT INTO \`${db_config.database}\`.\`Friend\` (\`from\`, \`to\`, \`time\`, \`isAcceped\`) VALUES ('${from}', '${to}', CURRENT_TIMESTAMP, 'N');`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시
        
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 로그기능 아직 없으니까 무시2
            if(callback)callback(err, rows); // 콜백함수 형태로 구현되있음 async await 형태로 구현하면 더 좋을것같음
            else resolve(rows);
        });
    });
}
module.exports.acceptFriend = function(from,to,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `UPDATE \`${db_config.database}\`.\`Friend\` SET \`isAcceped\`='Y' WHERE  \`from\`='${from}' AND \`to\`='${to}';`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시
        
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 로그기능 아직 없으니까 무시2
            if(callback)callback(err, rows); // 콜백함수 형태로 구현되있음 async await 형태로 구현하면 더 좋을것같음
            else resolve(rows);
        });
    });
}
module.exports.deleteFriend = function(from,to,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `DELETE FROM \`${db_config.database}\`.\`Friend\` WHERE  \`from\`='${from}' AND \`to\`='${to}';`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시
        
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 로그기능 아직 없으니까 무시2
            if(callback)callback(err, rows); // 콜백함수 형태로 구현되있음 async await 형태로 구현하면 더 좋을것같음
            else resolve(rows);
        });
    });
}
module.exports.checkFriend = async function(from,to,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `SELECT \`from\`, \`to\`, \`time\`, \`isAcceped\` FROM \`pateno0127\`.\`Friend\` WHERE  \`from\`='${from}' AND \`to\`='${to}' OR \`from\`='${to}' AND \`to\`='${from}';`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시
        let output = {
            isFriend : false, //친구인가?
            isEmpty : false, //아무관계없는가?
            isPending : false //친구수락 대기중인가?
        }
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 에러검출
            if(rows.length==0){//서로 친구가 아니면
                output.isEmpty = true;
            }
            else{ //일방적인 친구관계
                if(rows[0].isAcceped=='Y'){ //친구요청 상태
                    output.isFriend = true;
                }
                else{ //친구요청 대기중인 상태
                    output.isPending = true;
                }
            }

            if(rows.length==2){//서로 친구이면(비정상 상태)
                //TODO 둘중하나를 삭제하는 코드
                console.log("error:) Duplicated relationships")
            }
            console.log(output);
            if(callback)callback(err, output); // 콜백함수 형태로 구현되있음 async await 형태로 구현하면 더 좋을것같음
            else resolve(output);
        });
    }); 
}
module.exports.getFreiendRequests = async function(userID,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `SELECT * FROM Friend WHERE isAcceped="N" AND \`to\`="${userID}";`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시

        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 에러검출
            console.log(rows);
            if(callback)callback(err, rows); // 콜백함수
            else resolve(rows);
        });
    }); 
}
module.exports.getFreiendList = async function(userID,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `SELECT * FROM Friend WHERE isAcceped="Y" AND \`from\`="${userID}" OR \`to\`="${userID}";`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시

        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 에러검출
            console.log(rows);
            if(callback)callback(err, rows); // 콜백함수
            else resolve(rows);
        });
    }); 
}
