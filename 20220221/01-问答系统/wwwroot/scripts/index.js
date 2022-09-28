let petname = $.cookie('petname')

if (petname) {
    $('#user').find('span').last().text(petname)
} else {
    $('#user').find('span').last().text('登录')
    // .removeAttr('data-toggle') 移除下拉效果
    $('#user').removeAttr('data-toggle').click(() => {
        location.href = 'login.html'
    })
}

// 退出登录
$('#logout').click(() => {
    $.get('/user/logout', (resData) => {
        if (resData.code == '3000') {
            // 重新加载当前页面
            location.reload()
        }
    })
})


// 点击提问按钮
$('#ask').click(() => {
    location.href = petname ? 'ask.html' : 'login.html'
})


// 获取首页数据
$.get('/question/all', (resData) => {
    // console.log(resData);
    // 创建标签字符串
    let htmlStr = ''
    for (let index = 0; index < resData.length; index++) {
        // 一个问题
        const question = resData[index]

        htmlStr += `
        <div class='media' data-question='$inew Date(question.time).getTime(b
            >
        <div class="media-left" >
            <a href="#">
            <img class="media-object" src="../uploads/${question.petname}.png" alt="..." onerror='defaultImg(this)'>
            </a>
        </div>
        <div class="media-body">
            <h4 class="media-heading">${question.petname}</h4>
            ${question.petname}
            <div>
                时间：${formatTime(question.time)}  ip：${formatIp(question.ip)}
            </div>
        </div>
        </div>
        <hr>
        `
    }
    $('.questions').html(htmlStr)
})
// 封装一个解析时间日期的方法
function formatTime(time){
    time = new Date(time)
    let y = time.getFullYear()
    let M = time.getMonth() + 1
    let d = time.getDate()
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()

    M = M < 10 ? "0" + M : M
    d = d < 10 ? "0" + d : d
    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s

    //2022-02-21  09:50:20
    
    return y + '-' + M + '-' + d +' ' + h + ':' + m + ':' + s
}

//解析ip地址的方法
function formatIp(ip){
    const regExp = /::1/ig//正则表达式
    if(ip.match(regExp)){
        return 'localhost'
    }else{

    }
} 
// 给每个问题添加点击事件
$('.questions').on('click','.media',function(){
    // 判断用户是否登录
    if(petname){
        // 有用户
        // 储存发布问题的时间戳，回答问题的时候要用
        $.cookie('question',$(this).data('question'))
        location.href = 'answer.html'
    }else{
        // 没有用户
        location.href = 'login.html'
    }
})
//如果没有上传头像的，那么加载一个默认头像
function defaultImg(th){
    //console.log(th);
    // console.log($('.media-object')[th]);
    th.src = '../images/user.png'
    }