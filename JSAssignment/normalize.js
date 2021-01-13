var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
  };
  var newArray = []
  var keys = Object.keys(input);
  for(var i = 0; i<keys.length; i++){
      var childArray = [];
      if(input[keys[i]].children.length>0){
        for(var j=0;j<input[keys[i]].children.length;j++){
            childArray.push(input[keys[i]].children[j].id)
            
        }        
      }  
      var obj =  {
          id:keys[i],
          name: input[keys[i]].name,
          children:childArray
    }
    newArray.push(obj);
  }
console.log(newArray)