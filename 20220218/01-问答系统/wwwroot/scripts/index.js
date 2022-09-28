
let petname = $.cookie('petname')

if(petname){
    $('#user').find('span').last().text(petname)
}else {
    $('#user').find('span').last().text('登录')
    // .removeAttr('data-toggle') 移除下拉效果
    $('#user').removeAttr('data-toggle').click(()=>{
        location.href = 'login.html'
    })
}

// 退出登录
$('#logout').click(()=>{
    $.get('/user/logout',(resData)=>{
        if(resData.code == '3000'){
            // 重新加载当前页面
            location.reload()
        }
    })
})


// 点击提问按钮
$('#ask').click(()=>{
    location.href = petname ? 'ask.html' : 'login.html'
})


// 获取首页数据
$.get('/question/all',(resData)=>{
    console.log(resData);
})