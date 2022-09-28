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