// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
document.getElementById('b1').onclick = function(){
    console.log( require('electron').remote.getGlobal('sharedObject'));
    var ip = require('electron').remote.getGlobal('sharedObject').IP;
    document.getElementById('d1').innerHTML = ip;
    // ip = '192.168.0.105'
    var url = 'http://' + ip + ':3002/users';
    console.log(url);
    // $.ajax({
    //     type: 'get',
    //     url: url,
    //     contentType: 'application/json;charset=utf-8'
    // }).then(function(res){
    //     console.log(res);
    // })
    var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
        httpRequest.open('GET', url, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send();//第三步：发送请求  将请求参数写在URL中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;//获取到json字符串，还需解析
                console.log(json);
            }
        };
  }