
// 如果一个js文件中有多个模块我们该如何使用

// require(['a','b','../lib/jquery'],(a,b,jquery)=>{
//     console.log(a,'aaaaaaaaaaa');
//     console.log(b,'bbbbbbbbbbb');
//     // 因为jquery中没有定义导出模块，所以得到的是一个undefined
//     // console.log(jquery);
//     // 如果要使用jquery可以不用传递参数，直接使用即可
//     console.log($);
// })



// ------------------------require.js常见配置---------------------

// --------------------baseUrl
// require.config({
//     // baseUrl: 配置基本路径(根路径)，默认是入口js文件所在的路径
//     baseUrl: 'lib'
// })
// require(['jquery'],()=>{
//     console.log($);
// })




// --------------------paths
// require.config({
//     baseUrl: 'lib',
//     // paths: 配置特殊路径的js文件，那些不是直接放在baseUrl下的
//     // 模块，所在paths时，起始位置是相对于baseUrl的，如果文件是
//     // 一个绝对路径那么不需要在意baseUrl
//     // 需注意（后缀名称.js不要加，因为会自动补全，否则会出现两个.js）
//     paths:{
//         test: '../hxf66666666666/niubbbbb',
//         jq:'http://libs.baidu.com/jquery/2.0.0/jquery.min'
//     }
// })
// require(['jq','test'],()=>{
//     console.log($);
//     console.log(a);
// })




// --------------------shim
// require.config({
//     // baseUrl: 'lib',
//     paths:{
//         test: '../hxf66666666666/niubbbbb',
//         jq:'http://libs.baidu.com/jquery/2.0.0/jquery.min'
//     },
//     // shim配置依赖项用的，模块依赖关系，脚本在运行时，只有当依赖的模块
//     // 全部被加载完后才会执行当前脚本
//     shim:{
//         b: ['jq','a','test']
//     }
// })

// require(['b'],()=>{
//     console.log($);
//     console.log(a);
// })


// -------------------bundles
// require.config({
//     // bundles模块树。如果一个js文件中有多个模块，就可以
//     // 使用该方法来进行分别导入配置
//     bundles: {
//         a: ['first', 'second'],
//         // 'secondary': ['text!secondary.html']
//     }
// })



// -------------------waitSeconds
require.config({
    bundles: {
        a: ['first', 'second'],
        // 'secondary': ['text!secondary.html']
    },
    // 配置加载时间，如果加载的时间超过配置的时间
    // 就会被认为是加载失败，加载是针对所有模块
    // 默认值是7秒，该值尽量设置大点
    waitSeconds: 7
    
})


require(['first','second'],(a1,a2)=>{
    console.log(a1);
    console.log(a2);
})