function Person(name) {
    this.name = name;
}

function Mother() {}
Mother.prototype = { //Mother的原型
    age: 18,
    home: ['Beijing', 'Shanghai']
};
Person.prototype = new Mother(); //Person的原型为Mother
//用chrome调试工具查看，提供了__proto__接口查看原型
var p1 = new Person('Jack'); //p1:'Jack'; __proto__:18,['Beijing','Shanghai']
var p2 = new Person('Mark'); //p2:'Mark'; __proto__:18,['Beijing','Shanghai']
p1.age = 20;
/* 实例不能改变原型的基本值属性，正如你洗剪吹染黄毛跟你妈无关
 * 在p1实例下增加一个age属性的普通操作，与原型无关。跟var o{}; o.age=20一样。
 * p1：下面多了个属性age，而__proto__跟 Mother.prototype一样，age=18。
 * p2：只有属性name，__proto__跟 Mother.prototype一样
 */
p1.home[0] = 'Shenzhen';
/* 原型中引用类型属性的共享，正如你烧了你家，就是烧了你全家的家
 * 这个先过，下文再仔细唠叨一下可好？
 * p1：'Jack',20; __proto__:18,['Shenzhen','Shanghai']
 * p2：'Mark'; __proto__:18,['Shenzhen','Shanghai']
 */
p1.home = ['Hangzhou', 'Guangzhou'];
/* 其实跟p1.age=20一样的操作。换成这个理解: var o{}; o.house=['big','house']
 * p1：'Jack',20,['Hangzhou','Guangzhou']; __proto__:18,['Shenzhen','Shanghai']
 * p2：'Mark'; __proto__:18,['Shenzhen','Shanghai']
 */
delete p1.age;
/* 删除自定义的属性之后，原本被覆盖的原型值就重见天日了。这里就是向上搜索机制，所以才有下面的动态性
 * p1：'Jack',['Hangzhou','Guangzhou']; __proto__:18,['Shenzhen','Shanghai']
 * p2：'Mark'; __proto__:18,['Shenzhen','Shanghai']
 */
Person.prototype.lastName = 'Jin';
/* 改写原型，动态反应到实例中。正如你妈变新潮了，邻居提起你都说是潮妇的儿子
 * 注意，这里我们改写的是Person的原型，就是往Mother里加一个lastName属性，等同于Mother.lastName='Jin'
 * 这里并不是改Mother.prototype，改动不同的层次，效果往往会有很大的差异。
 * p1：'Jack',['Hangzhou','Guangzhou']; __proto__:'jin';__proto__:18,['Shenzhen','Shanghai']
 * p2：'Mark'; __proto__:'jin';__proto__:18,['Shenzhen','Shanghai']
 */
Person.prototype = {
    age: 28,
    address: {
        country: 'USA',
        city: 'Washington'
    }
};
var p3 = new Person('Obama');
/* 重写原型！这个时候Person的原型已经完全变成一个新的对象了，也就是说Person换了个娘。
 * 换成这样理解：var a=10; b=a; a=20; c=a。所以b不变，变得是c，所以p3变化了，与Mother无关。
 * p1：'Jack',['Hangzhou','Guangzhou']; __proto__:'jin';__proto__:18,['Shenzhen','Shanghai']
 * p2：'Mark'; __proto__:'jin';__proto__:18,['Shenzhen','Shanghai']
 * p3:'Obama';__proto__: 28 {country: 'USA', city: 'Washington'}
 */
Mother.prototype.no = 9527;
/* 改写原型的原型，动态反应到实例中。正如你妈他妈变新潮了，邻居提起你都说你丫外婆真潮
 * 注意，这里我们改写的是Mother.prototype，p1p2会变，但上面p3跟Mother已经了无瓜葛了，不影响他。
 * p1：'Jack',['Hangzhou','Guangzhou']; __proto__:'jin';__proto__:18,['Shenzhen','Shanghai'],9527
 * p2：'Mark'; __proto__:'jin';__proto__:18,['Shenzhen','Shanghai'],9527
 * p3:'Obama';__proto__: 28 {country: 'USA', city: 'Washington'}
 */
Mother.prototype = {
    car: 2,
    hobby: ['run', 'walk']
};
var p4 = new Person('Tony');
/* 重写原型的原型！这个时候Mother的原型已经完全变成一个新的对象了！
 * 由于上面Person与Mother已经断开联系了，这时候Mother怎么变已经不影响Person了。
 * p4:'Tony';__proto__: 28 {country: 'USA', city: 'Washington'}
 */
Person.prototype = new Mother(); //再次绑定
var p5 = new Person('Luffy');
// 这个时候如果需要应用这些改动的话，那就要重新将Person的原型绑到mother上了
// p5:'Luffy';__proto__: 2, ['run','walk']
p1.__proto__.__proto__.__proto__.__proto__ //null，你说原型链的终点不是null？
Mother.__proto__.__proto__.__proto__ //null，你说原型链的终点不是null？ 