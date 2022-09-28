

// 在 node 中外部 JS 不会遇到冲突问题
const js1 = require('./js1')
const js2 = require('./js2')

console.log(js1.a);
console.log(js1.b);
console.log(js1.c);
console.log(js1.num);

console.log(js2.num);
js2.fun()