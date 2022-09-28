


document.querySelector('button').onclick = function () {

    // 找到输入框中的内容，将其提交到服务器中
    const content = document.querySelector('input').value

    // 数据格式化工具，将数据格式为键值对的形式
    let data = new FormData()
    data.set('name','友力量')
    data.append('content','年少不知秋裤好，错把风度当做宝。')

    // 1.创建 xhr 对象
    let xhr = new XMLHttpRequest()

    // 2. 回调，监听状态的变化
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            console.log('4: 请求处理成功');
            // 获取状态码
            console.log(xhr.status);
            // 获取状态信息
            console.log(xhr.statusText);
            // 获取响应的数据
            // JSON.parse 将字符串 转换成 对象
            console.log(JSON.parse(xhr.responseText));
            // let data = JSON.parse(xhr.responseText)
            // JSON.stringify 将对象转换成字符串
            // document.querySelector('main').innerText = JSON.stringify(data)

        }

    }


    // 3. 配置请求信息
    // 第三个参数是一个布尔值，true 设置为异步请求，false 就是同步请求
    xhr.open('post', '/addContent', true)

    // formData 的请求不需要设置请求头的，使用默认即可，服务器取值会有专门的方法
    // xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')


    // 4. 发送数据请求
    xhr.send(data)

}