


document.querySelector('button').onclick = function () {

    // 找到输入框中的内容，将其提交到服务器中
    const content = document.querySelector('input').value

    // 1.创建 xhr 对象
    let xhr = new XMLHttpRequest()

    // 2. 回调，监听状态的变化
    xhr.onreadystatechange = function () {
        // 获取当前状态
        // console.log(xhr.readyState);
        switch (xhr.readyState) {
            case 0:
                console.log('0: 请求没有初始化');
                break;
            case 1:
                console.log('1: 服务器连接成功');
                break;
            case 2:
                console.log('2: 请求已经被接收');
                break;
            case 3:
                console.log('3: 请求正在处理中');
                break;
            case 4:
                console.log('4: 请求处理成功');
                // 获取状态码
                console.log(xhr.status);
                // 获取状态信息
                console.log(xhr.statusText);
                // 获取响应的数据
                // JSON.parse 将字符串 转换成 对象
                console.log(JSON.parse(xhr.responseText));
                let data = JSON.parse(xhr.responseText)
                // JSON.stringify 将对象转换成字符串
                document.querySelector('main').innerText = JSON.stringify(data)
                break;
            default:
                console.log('你想干啥？');
                break;
        }
    }

    // 3. 配置请求信息
    xhr.open('get', '/addContent?content=' + content)

    // 4. 发送数据请求
    xhr.send()

}