// 自定义集合
// 集合中的内容不能重复

function Set(array){
    // console.log(array instanceof Array);

    // 用来收集所有的参数
    let items = null

    if(array instanceof Array){
        // 是一个数组
        // console.log(array);
        items = array
    }else {
        // 一个字符串(数字、布尔值)，或者是多个字符串
        // console.log(Array.from(arguments));
        items = Array.from(arguments)
    }
    // 调用去重方法
    this.items = Set.unique(items)
}
// 增加一个去重的方法
Set.unique = function(arr){
    const newArr = []
    const obj = {}
    for (let index = 0; index < arr.length; index++) {
        if(!obj[arr[index]]){
            newArr.push(arr[index])
            obj[arr[index]] = 1
        }
    }
    // console.log(newArr);
    return newArr
}

// 判断两个集合是否相等(判断的是集合中的所有内容)
Set.prototype.equalTo = function(setObj){
    // 如何判断是否相等

    // console.log(this.items);
    // console.log(setObj.items);

    // 先比较两个集合的长度
    if(this.items.length != setObj.items.length){
        // 两个集合不等
        return false
    }

    // 如果长度相等，那么我们再进行内容的比较
    for(let i = 0; i < this.items.length; i++){
        if(this.items.indexOf(setObj.items[i]) < 0){
            // 两个集合不等
            return false
        }
    }
    // 两个集合相等
    return true
}

// 将两个集合，合并成为一个集合
Set.prototype.unite = function(setObj){
    const newArr = this.items.concat(setObj.items)

    return new Set(newArr)
}

// 交集，两个集合中都存在的内容
Set.prototype.intersection = function(setObj){
    // 创建一个临时数组
    let newArr = []
    this.items.forEach(element => {
        if(setObj.items.indexOf(element) != -1){
            newArr.push(element)
        }
    });

    return new Set(newArr)
}

// 两个集合的差集
Set.prototype.difference = function(setObj){
    // 创建一个临时数组
    let newArr = []
    this.items.forEach(element => {
        if(setObj.items.indexOf(element) == -1){
            newArr.push(element)
        }
    });

    return new Set(newArr)
}

/*
    在浏览器端，每个页面的JavaScript不管有多少个script标签，
    最终都会被拼接为一个script标签，所以在浏览器中可以很方便
    的导入外部js 文件但是在nodejs中，没有script标签就不能通
    过代码拼接的方式来实现导入外部js 文件

    模块化开发: node中就是采用模块化开发，就是将相同功能，
    或者重复使用的代码，封装成一个模块，在使用的时候直接
    导入模块即可
    AMD:先加载后使用 
    CMD:什么时候用什么时候加载

    前端是不是也可以进行模块化呢
*/ 



function say(){
    console.log('这个是set.js中的say方法');
}

// 导出
// 导出方式一
// exports.say = say
// exports.sat = Set

// 导出方法二
// module.exports.say = say
// module.exports.sat = Set

module.exports = {
    say,
    Set
}