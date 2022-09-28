


document.querySelector('button').onclick = function () {

    // 找到输入框中的内容，将其提交到服务器中
    const content = document.querySelector('input').value

    
    ajax('/addContent','post',content,function(data){
        console.log(data);
    })
   
}


function ajax(url,type,data,fun) {
     // 1.创建 xhr 对象
     let xhr = new XMLHttpRequest()

     // 2. 回调，监听状态的变化
     xhr.onreadystatechange = function () {
         // 获取当前状态
         if(xhr.readyState == 4){
            //  console.log('4: 请求处理成功');
             // 获取状态码
            //  console.log(xhr.status);
             // 获取状态信息
            //  console.log(xhr.statusText);
             // 获取响应的数据
             // JSON.parse 将字符串 转换成 对象
             // console.log(xhr.responseText);
            //  console.log(JSON.parse(xhr.responseText));
             fun(JSON.parse(xhr.responseText))
             // let data = JSON.parse(xhr.responseText)
             // JSON.stringify 将对象转换成字符串
             // document.querySelector('main').innerText = JSON.stringify(data)
         }
     }
     
 
     // 3. 发送请求配置
     xhr.open(type,url)
     
     if(type === 'post' || type === 'POST'){
         // 设置请求头，如果不设置会导致数据提交不成功
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
     }
    
 
     // 发送数据
     xhr.send('name=友力&content=' + data)
}