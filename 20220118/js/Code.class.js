//ES5 
//思想： 高内聚 低耦合 
function Code(canvasId,width,height){
    this.codeRange = [] ;// 验证码的取值范围
    this.codeStr = ``; //验证码
    // 画笔
    this.pen = document.getElementById( canvasId ).getContext("2d")  ; 
    this.width = width ; 
    this.height = height ; 
    this.outPut()
}

//方法 创建验证码的字符串
Code.prototype.createRange = function(){
    for (  var i = 97 ;i<= 122 ; i++  ){
        this.codeRange.push( String.fromCharCode(i) )
    }
}

//方法 产生验证码的数据 数据 ---> 视图 
Code.prototype.createCode = function (){
    for ( var i = 1 ; i<=  4 ; i++ ){
        this.codeStr  += this.codeRange[   parseInt(  Math.random() * 26  )  ]   
    }

    // 文件保存数据  local
}

//方法 创建不同的背景颜色  返回 # AADDEE 
Code.prototype.RandomColor = function (){
    var colorStr = "#" ; 
    for ( var i = 1 ; i<= 6 ; i++  ){
        colorStr +=  parseInt ( Math.random() * 16  ).toString(16) ; 
    }
    return colorStr ; 
}

//方法 画验证码在画布上
Code.prototype.drawBg = function (){
       //画矩形
       this.pen.fillStyle = this.RandomColor() ; 
       //从0 0 点 画到 100 100 
       this.pen.rect(0,0,this.width ,this.height); 
       //填充
       this.pen.fill(); 
}

Code.prototype.drawText = function (){
    this.pen.font = "30px 宋体" ; 
   
    for (  var i = 0 ; i<= this.codeStr.length-1 ; i++ ){
        this.pen.fillStyle = this.RandomColor() ; 
        this.pen.fillText ( this.codeStr[i] , 50 +  i * 50  ,this.height/2,30  ) ; 
    }

    
}


Code.prototype.createLine = function (){
    for( var i = 1 ; i<= 5 ; i++ ){
        var startX =parseInt ( Math.random() * this.width ) ;
        var stratY =  parseInt ( Math.random() * this.height ) ;
        var endX = parseInt ( Math.random() * this.width ) ;
        var enxY =  parseInt ( Math.random() * this.height ) ;
        this.pen.beginPath();
        //随机颜色
        this.pen.strokeStyle = this.RandomColor();
        this.pen.moveTo(startX,stratY);
        this.pen.lineTo(endX,enxY );
        //绘制
        this.pen.stroke();
 
    }
   
}


Code.prototype.outPut = function(){
    this.createRange(); 
    this.createCode();
    this.drawBg();
    this.drawText()
    this.createLine();
}

