var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
},
{
    id: 4,
    name: 'Andrew',
}];

function sortBy(arr, key) {
    var array = arr;
    for(var x=0;x<array.length; x++){
        for(var y = 0; y<array.length-1; y++){
            if(array[y][key]>array[y+1][key]){
                var temp = array[y];
                array[y] = array[y+1];
                array[y+1] = temp
            }
        }
        
    }
    return array
}

var sorted = sortBy(arr, 'id');
console.log(sorted)