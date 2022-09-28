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
    // 提交问题
    const data = $(this).serialize()
    $.post("/querstion/answer", data,(data)=> {
            // console.log(data);
            $('.modal-body').text(data.message)
            if(data.code == 7000){
                $('#myModal').modal('show').on('hide.bs.modal',()=>{
                    location.href = 'index.html'
                })
            }
        }
    );

})