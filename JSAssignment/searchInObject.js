var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]

var searchByName =  (obj_array, val) => {
    for(var i=0; i<obj_array.length; i++){
        if(val.toLowerCase() === obj_array[i].name.toLowerCase()){
            index = i;
            break;
        }
    }
    console.log(obj_array[index])
}

searchByName(fruits, 'apple');

var searchByKey =  (obj_array,key, val) => {
    for(var i=0; i<obj_array.length; i++){
        if(val.toLowerCase() === obj_array[i][key].toLowerCase()){
            index = i;
            break;
        }
    }
    console.log(obj_array[index])
}
searchByKey(fruits, 'name', 'apple');