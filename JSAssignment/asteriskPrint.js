function asteriskPrint(num){

    for(var i=num; i>0;i--){
        var str = '';
        for(var j=i; j>0; j--){
            str = str + '*'
        }
        console.log(str)
    }
}
asteriskPrint(5);