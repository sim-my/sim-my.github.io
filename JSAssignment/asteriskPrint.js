function asteriskPrint(num){
    for(var i=num; i>0;i--){
        str = '';
        for(var j=i; j>0; j--){
            var str = str + '*'
        }
        console.log(str)
    }
}
asteriskPrint(5);