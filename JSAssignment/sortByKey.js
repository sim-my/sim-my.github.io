var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key) {
    var newArray = [];
    var keysArray = []
    for(var i = 0; i<array.length; i++){
        keysArray.push(array[i][key]);    
    }
    for(var x=0;x<keysArray.length; x++){
        for(var y = 0; y<keysArray.length; y++){
            if(keysArray[y]>keysArray[y+1]){
                var temp = keysArray[y];
                keysArray[y] = keysArray[y+1];
                keysArray[y+1] = temp
            }
        }
        
    }
    for(var j=0; j<keysArray.length; j++){
        for(var y=0; y<array.length; y++){
            if(keysArray[j]===array[y][key]){
                var index = y
            }
        }
        newArray.push(array[index])
    }   
    return newArray
}

var sorted = sortBy(arr, 'name');
console.log(sorted)