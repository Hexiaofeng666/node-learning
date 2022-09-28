let page = $.cookie('page')
if(!page){
    page = 1
}

// 加载页面先获取最新数据
getStudentsOfPage(page)
// 封装一个方法，来获取指定页数的数据内容
function getStudentsOfPage(page){
    // 获取首页数据的接口地址拼接
    const url = '/student/info?page=' + page

    $.get(url,(resData)=>{
        // console.log(resData);

        const htmlStr = template('table', resData)
        $('#showStudent').html(htmlStr)

    })
}

// 分页指示器的点击事件
$('#showStudent').on('click','.pagination>li>a',function(){
    // console.log(this);
    // 当点击的不是当前页的时候就重新获取数据
    // 如果点击的是当前页那么咱就不做任何处理
    if(page != $(this).data('page')){
        // 不相等就直接重新获取当前 page 页的数据
        page = $(this).data('page')

        if(page > 0 || page < $('.pagination>li').length - 2){
            // 保存当前页，为了下次刷新的时候还能在该页
            $.cookie('page',page)

            // 请求数据
            getStudentsOfPage(page)
        }
        
    }

})

// ----- 删除的方法 -------
$('#showStudent').on('click','.glyphicon-trash',function(){
    // alert('被调用了' + $(this).data('id'))
    const id = $(this).data('id')
    const result = confirm('您确定要删除该数据吗 ？')
    if(result){
        $.post('/student/remove',{id},(resData)=>{
            // console.log(resData);

            const alt = new Alert(resData,()=>{
                // 请求数据
                getStudentsOfPage(page)
            })

            alt.show()
        })
    }
    
})



// ----- 修改的方法 -------
$('#showStudent').on('click','.glyphicon-edit',function(){
    const id = $(this).data('id')
    // 发送请求将 id 传过去，由服务器端进行修改
    location.href = '/edit?id=' + id
})



// ----- 搜索的方法 -------
$('#submit').click(()=>{
    // 获取表单数据，将数据发生给后端
    console.log($('form').serialize());
    // 发送数据请求
    $.get('/student/search',$('form').serialize(),(resData)=>{
        // console.log(resData);
        const htmlStr = template('table', resData)
        $('#showStudent').html(htmlStr)
    })

})



/*
    1、实现翻页效果，通过点击事件完成
    2、删除功能的实现
    3、修改数据的功能（修改页面同添加页面，修改时需将用户数据渲染出来，然后修改）
    4、搜索功能（搜索功能具有模糊查询，及各个条件查询）
*/ 