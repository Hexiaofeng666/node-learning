function Map(row,col,id){
    this.row = row ; 
    this.col = col ; 
    this.id = id ; 
    this.mapArr = [] 
}

//给map类添加方法
Map.prototype.createMap = function () {
    for (  var i = 0 ; i<= this.row - 1  ; i++  ) {
        var smallArr  = [] ; 
        for (  var j = 0 ; j<= this.col - 1; j++  ){
            smallArr.push('O') ; // [0,0,0,0,0]
        }
        this.mapArr.push(smallArr)
    }
}


