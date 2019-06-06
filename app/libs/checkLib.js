'use srict'

let trim = (x) => {
  let value = String(x)
  return value.replace(/^\s+|\s+$/gm, '')
}
let isEmpty = (value) => {
  if (value === null || value === undefined || trim(value) === '' || value.length === 0) {
    return true
  } else {
    return false
  }
}

let compareAndFilter =(array1,array2)=>
{

  function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; i++) {
        for(var j=i+1; j<a.length; j++) {
            if(a[i].email === a[j].email)
                a.splice(j, 1);
        }
    }

    return a;
}
  let finalUserArr =  arrayUnique(array1.concat(array2))
  // for (let x in userArr1)
  // {
  //   for(let y in userArr2)
  //   {
  //     if (userArr1[x].email  == userArr2[y].email)
  //     {
  //       finalUserArr.push(userArr2[y])
  //     }
  //   }
  // }

 //let userArr = userArr1.concat(userArr2);

 return finalUserArr;




}

/**
 * exporting functions.
 */
module.exports = {
  isEmpty: isEmpty,
  compareAndFilter:compareAndFilter
}
