// ES6 面向对象
class LunBo{
    //构造函数
    constructor( imgPath ){

        // this.imgPath =  imgPath == [] ?   默认取值 ：imgPath 
        // this.imgPath =   imgPath || 默认取值 
        this.imgPath = imgPath ; 
        
        this.moveUl = null ; 

        this.lunboDiv = null  ; //  轮播图的父标签
        
        this.pointUl = null ; 
        

        this.createElement();

        this.xuHao = 2 ;  // 轮播序号

       

        this.timer = null ; 
        // 定时器

        this.Move();
        // this.mySelf = this ;  // 用 mySelf 这个属性  把自己存起来
    }


     /* :
        方法名：createElement
        作用 ：插入轮播节点到BODY 
        参数：无
        返回值：无
        时间：2022年1月19日11:19:09
        操作人：xxx
    */ 
    createElement(){

        

        this.lunboDiv = document.createElement("div") ; 
        this.lunboDiv.id = "box" ; 


        var HTMLDOM = `
                            <div class="list">
                                <ul id="moveUl">` 
        for ( var i = 0 ;i<=   this.imgPath.length -1 ; i++  ){
                                      HTMLDOM+= ` <li><img src="${this.imgPath[i]}" width="490" height="170" /></li>`
        }        
        
        
            HTMLDOM+= `         </ul>
                            </div>`

            HTMLDOM+= `<ul class="count" id="ponit"> `
            for ( var i = 0 ;i<=   this.imgPath.length -1 ; i++  ){
                         HTMLDOM+= `  <li  >${i+1}</li>`
            }                    
                           
            HTMLDOM+=   `</ul>`      
                        
                       
        this.lunboDiv.innerHTML = HTMLDOM ; 
        document.body.append(   this.lunboDiv )    ; 
    }

    /* :
        方法名：JQ
        作用 ：获得节点
        参数：节点的字符串 String 
        返回值：节点DOM   Obj 
        时间：2022年1月19日11:00:59
        操作人：xxx
    */ 
    JQ(selectName){
       return  document.querySelector(selectName )
    }


    /* :
        方法名：Move
        作用 ：让轮播图动起来
      
        时间：2022年1月19日11:00:59
        操作人：xxx
    */ 

    Move(){
        console.log ( this) ; 
        var self = this; 
        window.setInterval ( function(){
           
            if (  self.xuHao <= 3   ) {
                self.xuHao += 1 ; 
            }else{
                self.xuHao  = 0 ; 
            }
         
     
            self.pointUl =  self.JQ("#moveUl")  ; 
            if ( self.xuHao == 0 ) {
                self.pointUl.style.transition = "" ; 
            }
            self.pointUl.style.transition = "all 1s " ; 
            self.pointUl.style.top =  self.xuHao * (-170) + "px"  ; 
        } , 1000 ) ; 
    }


    yuandian (){
       
    }

}