// 返回上一页
$('#goBack').click(()=>{
    history.go(-1)
})

// 去注册
$('#register').click(()=>{
    location.href = 'register.html'
})