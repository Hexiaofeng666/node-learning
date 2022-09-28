function fbnc(n) {
        // count++
        if (n == 1 || n == 2) {
            return 1
        } else {
            return fbnc(n - 1) + fbnc(n - 2)
        }
    }
// console.log(febo(100));
// console.log(count);


/*
    onmessage：是一个事件，当其他线程通过postMessage给本线程
    传递值的时候就会自动触发该事件，传递的参数值是在event的data中
*/
onmessage = (event) => {
    // console.log(event.data);
    console.log(fbnc(event.data));
    let val = fbnc(event.data)
    // 在js中线程之间的作用域是独立的，那么在分线程中就不能
    // 直接访问主线程作用域中的变量，所以我们使用的时候就会因为找不到
    // document而报错
    // document.querySelector('#box').innerHTML = fbnc(event.data)
    // console.log(document.querySelector('#box'));

    // 在分线程中计算好结果后，可以通过postMessage可以将
    // 值直接发送给分线程
    postMessage(val)
}