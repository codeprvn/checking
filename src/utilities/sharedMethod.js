
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