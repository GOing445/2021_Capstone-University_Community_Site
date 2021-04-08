var mysql = require('mysql');
var connection;
const db_config = require("./config.json").DB;
var Map = require("collections/map");

//NOTE 이렇게해도 되나싶음 더 좋은방법 있으면 알려주세요
global.DB = {
    users : new Map(), 
    // university : new Map(), 
};
//데이터베이스가 연결될때 데이터들 패치받기
async function init() {
    console.log(`DataBase : "${connection.config.host}:${connection.config.port}"`);
    console.log("init실행")
    // module.exports.fatchUsers();
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
class User{ // 사용자 객체 //클레스 구현예제
    constructor(data){
        // console.log(data);
        this.id = null;//유저 아이디(기본식별자)
        this.name = null;// 실명
        this.password = null;// 비밀번호(암호화된)
        this.registDate = null;// 가입일자
        this.University_ID = null;//TODO 대학객체의 포인터를 연결해주면 좋을것같음
        this.isSuperAdmin = false; // 사이트 관리자인가
        // if(data) this.init(data);
    }
    async init(data){
        //TODO sql데이터를 파싱해서 객체에 넣어주세요 
        this.id = data.User_id //이런식으로
    }
}
class University{ // 대학객체
    //TODO 
}

module.exports.fatchUsers = function() {
    connection.query(`SELECT * FROM User`,function(err, rows, fields) {
        for(row of rows){ // 유저한명씩 객체만들고 글로벌객체로 올려두기
            let user = new User(row) // 새객체
            user.init(row); // 데이터채우기
            // global.DB.users.set(row.User_ID, user); // 글로벌데이터로 올리기 //콜렉션 모듈을 교체해서 코드 바꿔야됨
        }
        if(err)Logger.json(err);
    });
}
//addUser 예제코드
//다른 프로젝트에서 그냥 가져온거라서 내용이 좀 이상할꺼임
module.exports.addUser = function(user,callback){
    // let date = new Date();
    //쿼리는 이렇게 작성해주면 됨
    let qqq = `INSERT INTO \`pateno0127\`.\`User\` (\`User_ID\`, \`isAdmin\`, \`UserName\`, \`Locale\`, \`Discriminator\`, \`eMail\`, \`AccessToken\`, \`RegistDate\`) VALUES ('${user.id}', '0', '${user.username}', '${user.locale}', '${user.discriminator}', '${user.email}', '${user.accessToken}', CURRENT_TIMESTAMP)`;
    // Logger(qqq); // 로그기능 아직 없으니까 무시
    connection.query(qqq, function(err, rows, fields) { // DB에 요청보내기
        if(!err)Logger.json(err); // 로그기능 아직 없으니까 무시2
        callback(err, rows); // 콜백함수 형태로 구현되있음 async await 형태로 구현하면 더 좋을것같음
        module.exports.fatchUsers(); // 데이터베이스에 변동이 생겼으니 동기화해주기
    });
}