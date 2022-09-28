// 返回上一页
$('#goBack').click(()=>{
    history.go(-1)
})

// 去首页
$('#home').click(()=>{
    location.href = 'index.html'
})

// 提交表单的事件
$('form').submit(function (e) { 
    // 阻止表单的默认提交事件
    e.preventDefault();
    // 上传头像的请求

    const data = new FormData(this)
    $.post({
        url: '/user/photo',
        data,
        contentType: false,
        processData: false,
        success: (resData)=>{
            console.log(resData);
        }
    })

})