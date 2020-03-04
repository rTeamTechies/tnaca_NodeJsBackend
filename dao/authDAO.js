var connection=require('../sqlconfig/config')
module.exports =  {
  checkCredentials:checkCredentials,
  saveCrendentials:saveCrendentials,
  checkUserCount:checkUserCount
  }
  function checkCredentials(data){
    return new Promise((resolve, reject) => {
      connection.User.findOne({
        where: {
          email : data.emailId
        }
      })
        .then(user => {
            resolve(user);
        })
    })
}
function updatePassword(data){
  try{
      const updateData={
        activation_flag : 0,
        password : data.password
      }
      return new Promise((resolve, reject) => {
        connection.User.update(updateData,
          {
            where: {
              login_id : data.login_id
          }
        }
      )
        .then((rowsUpdated)=> {
            resolve(rowsUpdated);
        })
      })
    }catch(err){
      throw err;
    }
}
function saveCrendentials(data){
  try{
      const saveData={
        user_name : data.userName,
        email : data.emailId,
        user_type : data.userType,
        active_flag : data.activeFlag,
        password : data.password
      }
      return new Promise((resolve, reject) => {
        connection.User.create(saveData)
        .then((rowsUpdated)=> {
            resolve(rowsUpdated);
        })
      })
    }catch(err){
      throw err;
    }
}
function checkUserCount(data){
  try{
      return new Promise((resolve, reject) => {
          connection.User.count({
            where: {
              email : data
            }
          })
            .then(result => {
                resolve(result);
            })
        })
  }catch(err){
      throw err;
  }
}

