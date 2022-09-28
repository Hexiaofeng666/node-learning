// 自定义警告框
function Alert(message,willDismiss,didDismiss){
    // 要展示的提示信息
    this.message = message
    // 回调函数：在指定的情况下去执行，在想要执行的时候去执行
    this.willDismiss = willDismiss
    this.didDismiss = didDismiss
}

// 在原型中添加方法
// 创建外层的透明黑色背景，也就是一个遮罩层
Alert.prototype.showMask = ()=>{
    // 添加一个遮罩层
    const mask = document.createElement('div')
    mask.className = 'mask-div'
    document.body.appendChild(mask)
}

// 创建整个弹出框的方法
Alert.prototype.showBox = function(){
    // 创建弹出框所需的所有标签
    const box = document.createElement('div')
    box.className = 'box-div'
    document.body.appendChild(box)
    // 提示信息
    const msg = document.createElement('div')
    msg.className = 'msg-div'
    msg.innerText = this.message
    box.appendChild(msg)
    // 灰色的横条
    const btnBar = document.createElement('div')
    btnBar.className = 'btnBar-div'
    box.appendChild(btnBar)
    // 确定按钮
    const btn = document.createElement('div')
    btn.className = 'btn-div'
    btn.innerText = '确定'
    box.appendChild(btn)
    
    // const _this = this

    btn.onclick = ()=>{

        // 调用即将消失的回调函数
        if(typeof this.willDismiss == 'function'){
            this.willDismiss()
        }
        
        
        this.close()


        if(typeof this.didDismiss == 'function'){
            this.didDismiss()
        }
        
        

    }

}
// 在原型中添加一个关闭的方法
Alert.prototype.close = function(){
    document.documentElement.style.overflow = 'auto'

    // 找到遮罩层和弹出层将其移除掉
    const maskDiv = document.querySelector('.mask-div')
    const boxDiv = document.querySelector('.box-div')

    document.body.removeChild(maskDiv)
    document.body.removeChild(boxDiv)


    
}



// 展示的方法
Alert.prototype.show = function(){

    // 添加一个弹出时禁止滚动
    document.documentElement.style.overflow = 'hidden'

    // console.log(this)
    this.showMask()
    this.showBox()
}
