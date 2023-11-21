
// this function will remove all the emplty key from object
export const removeEmpty = (obj)=>{
    Object.keys(obj).forEach( key =>{                
        if(obj[key] === '' || obj[key] === null || obj[key] === undefined){
            delete obj[key];
        }
       else if (typeof obj[key] === 'string' ){
        obj[key] = obj[key].trim();
       }
    })
    return obj
}

export const emailMask = (email) =>{
    let toMask = false;
let count = 0;
for(let i=0;i<email.length;i++){
    if(count===3){
        toMask=!toMask
        count=0
    }
    if(toMask){
      let characters = email.split('');
      characters[i] = '*';
      let result = characters.join('');
      email = result
    }
    count++;
}
return email
}