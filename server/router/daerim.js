var request = require('request');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('.');
}


module.exports = function(app, fs, db){
    app.get('/daerim/diet',function(req,res){
        var options = {
            'method': 'POST',
            'url': 'https://www.daelim.ac.kr/ajaxf/FrBistroSvc/BistroCarteInfo.do',
            formData: {
              'START_DAY': formatDate(new Date()),

              'BISTRO_SEQ': '1'
            }
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            res.send(response.body);
          });  
    });
    app.get('/daerim/announce/:pageNo',function(req,res){ 
        var options = {
            'method': 'POST',
            'url': 'https://www.daelim.ac.kr/ajaxf/FrBoardSvc/BBSViewList.do',
            formData: {
              'pageNo': req.params.pageNo,
              'pagePerCnt:': '15',
              'MENU_ID': '900',
              'SITE_NO': '2',
              'BOARD_SEQ': '8'
            }
          };


        request(options, function (error, response) {
            if (error) throw new Error(error);
            res.send(response.body);
        });    
    });
    app.get('/daerim/schedule',function(req,res){
        var request = require('request');
        var options = {
          'method': 'POST',
          'url': 'https://www.daelim.ac.kr/ajaxf/FrScheduleSvc/ScheduleListData.do',
          formData: {
            'SCH_YEAR': String(new Date().getFullYear()),
            'SCH_DEPT_CD': '2'
          }
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          res.send(response.body);
        });   
    });
}



