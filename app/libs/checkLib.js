'use srict'
const mongoose = require('mongoose');
const IssueModel = mongoose.model('Issue');


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
  

 return finalUserArr;




}
let  findScreenShotPathOfAIssue =(issueId) => {
  IssueModel.findOne({issueId:issueId},(err,result)=>{
      if (err)
      {

      }
      else if (check.isEmpty(result))
      {
          
      }
      else{
       console.log ('resultin find fun',result.screenshotPath)
       let path =result.screenshotPath;
           console.log('path here is',path)
       return path ;

      }
  })
}
/**
 * exporting functions.
 */
module.exports = {
  isEmpty: isEmpty,
  compareAndFilter:compareAndFilter,
  findScreenShotPathOfAIssue:findScreenShotPathOfAIssue
}
