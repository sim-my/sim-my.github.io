var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
    var newArray = [];
    for(var i =0; i<collection.length; i++){
        var output = tranFunc(collection[i]);
        newArray.push(output);
    }
    return newArray;
 }

var output = transform(numbers, function(num) {
    return num * 2;
});
console.log(output);