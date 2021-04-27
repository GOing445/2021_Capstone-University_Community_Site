var mysql = require('mysql');
var connection;
const db_config = require("./config.json").DB;
var Map = require("collections/map");


//NOTE 이렇게해도 되나싶음 더 좋은방법 있으면 알려주세요
global.DB = {
    users : new Map(), 
    // university : new Map(),
    // schedules : new Map(), 
    // friends : new Map(),
};
//데이터베이스가 연결될때 데이터들 패치받기
async function init() {
    console.log(`DataBase : "${connection.config.host}:${connection.config.port}"`);
    console.log("init실행")
    module.exports.fatchUsers();
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
        this.schedules =[];
        // if(data) this.init(data);
    }
    async init(data){
        this.id = data.id ;
        this.name = data.name ;
        this.invCode = data.invCode ;
        this.registDate = data.registDate ;
        this.schedules = await getSchedulesFromUserID(data.id);
    }
}
class schedule{ // 스케줄 객체
    constructor(data){
        this.day = null;// 요일 0(일)~6(토)
        this.className = null;// 강의 이름
        this.classroom = null;// 강의실
        this.start = null;// 일정이 시작되는 시간
        this.end = null;// 일정이 끝나는 시간
        // if(data) this.init(data);
    }
    async init(data){
        //TODO sql데이터를 파싱해서 객체에 넣어주세요 
        this.id = data.id ;//이런식으로
        this.name = data.name ;//이런식으로
        this.invCode = data.invCode ;//이런식으로
        this.registDate = data.registDate ;//이런식으로
    }
}

getSchedulesFromUserID = function(user_id,callback){
    return new Promise(function(resolve,reject){
        //쿼리는 이렇게 작성해주면 됨
        let qqq = `SELECT * FROM Schedule WHERE owner = "${user_id}"`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(!err)console.log(err); // 로그기능 아직 없으니까 무시2
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
        let qqq = `DELETE FROM Schedule WHERE id=${schedule_ID};`;
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err);
            if(callback)callback(err, rows); // 콜백함수
            resolve(rows);
        });
    });
}
module.exports.addSchedule = async function(user_id,schedule,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `INSERT INTO \`${db_config.database}\`.\`Schedule\` (\`owner\`, \`day\`, \`className\`, \`classroom\`, \`start\`, \`end\`) VALUES ('${user_id}', '${schedule.day}', '${schedule.className}', '${schedule.classroom}', '${schedule.start}', '${schedule.end}');`;
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(err)console.log(err); // 로그
            global.DB.users.get(user_id).schedules.push(schedule);
            console.log(global.DB.users.get(user_id));
            if(callback)callback(err, rows); // 콜백함수
            resolve(rows);
            // module.exports.fatchUsers(); // 데이터베이스에 변동이 생겼으니 동기화해주기
        });
    });
}
module.exports.fatchUsers = function() {
    connection.query(`SELECT * FROM User`,function(err, rows, fields) {
        for(row of rows){ // 유저한명씩 객체만들고 글로벌객체로 올려두기
            let user = new User(row) // 새객체
            user.init(row); // 데이터채우기
            global.DB.users.set(row.id, user); // 글로벌데이터로 올리기 //콜렉션 모듈을 교체해서 코드 바꿔야됨
        }
        if(err)console.log(err);
        console.log(global.DB.users);
    });
}
//addUser 새로운 유저 생성
module.exports.addUser = function(user,callback){
    return new Promise(function(resolve,reject){
        //쿼리
        let qqq = `INSERT INTO \`${db_config.database}\`.\`User\` (\`id\`, \`name\`, \`invCode\`, \`registDate\`) VALUES ('${user.id}', '${user.name}', '${"what"}', CURRENT_TIMESTAMP);`;
        // Logger(qqq); // 로그기능 아직 없으니까 무시
        connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
            if(!err)console.log(err); // 로그기능 아직 없으니까 무시2
            if(callback)callback(err, rows); // 콜백함수 형태로 구현되있음 async await 형태로 구현하면 더 좋을것같음
            else resolve(rows)
            module.exports.fatchUsers(); // 데이터베이스에 변동이 생겼으니 동기화해주기
        });
    });
}