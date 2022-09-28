// 返回上一页
$('#goBack').click(()=>{
    history.go(-1)
})

// 去注册
$('#register').click(()=>{
    location.href = 'register.html'
})

// 提交登录信息
$('form').submit(function (e) { 
    e.preventDefault();
    const data = $(this).serialize()
    $.post('/user/login',data,(resData)=>{
        // console.log(resData);
        $('.modal-body').text(resData.message)
        if(resData.code == 2000){
            $('#myModal').modal('show').on('hide.bs.modal',()=>{
                location.href = 'index.html'
            })
        }
        
    })
});
