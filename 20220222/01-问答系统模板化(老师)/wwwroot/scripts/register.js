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

    // 比较密码和确认密码是否相等
    const passwords = $('input[type=password]').map(function(){
        // 将两个密码输入框的内容返回回去
        return $(this).val()
    })

    // 判断两个密码是否一致
    if(passwords[0] != passwords[1]){
        // 提示用户两次密码输入不一致
        $('.modal-body').text('用户两次密码输入不一致,请重新输入...')
        $('#myModal').modal('show')
        return
    }

    // const data = new FormData(this) 原生获取表单数据的方法

    const data = $(this).serialize()
    $.post('/user/register',data,(resData)=>{
        console.log(resData);
        $('.modal-body').text(resData.message)
        $('#myModal').modal('show').on('hide.bs.modal',()=>{
            location.href = 'login.html'
        })
    })

});
