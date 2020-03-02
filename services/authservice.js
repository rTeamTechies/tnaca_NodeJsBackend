var authDAO=require("../dao/authDAO");
const bcrypt = require('bcrypt');
module.exports =  {
	login:login,
	signup : signup,
	getHashPassword:getHashPassword
}


function login(req,res){
	if(req.body.emailId!=null&&req.body.password!=""){
		var finalResult;
		return authDAO.checkCredentials(req.body).then(function (response){
			if(response!=null && response!='undefined'){
				console.log(response.dataValues.password)
				if(bcrypt.compareSync(req.body.password,response.dataValues.password)){
					finalResult={
						"status" : "Success",
						"message" : "Valid loginId",
					}
				}else{
					finalResult={
						"status" : "Failure",
						"message" : "Invalid Credentials"
					}
				}
				res.send(finalResult);
			}else{
				finalResult={
					"status" : "Failure",
					"message" : "Invalid Credentials"
				}
			}
			res.send(finalResult);
		});
	}else{
		finalResult={
			"status" : "Failure",
			"message" : "Invalid Request"
		}
		res.send(finalResult);
	}
}

function signup(req,res){
	if(req.body.emailId!=null&&req.body.password!=""){
		var finalResult;
		return  authDAO.checkUserCount(req.body.emailId).then(async function(userResponse){
			if(userResponse==0){
				return getHashPassword(req.body.password).then(function(passwordResponse){
					req.body.password=passwordResponse;
					return authDAO.saveCrendentials(req.body).then(function (response){
						console.log(response)
						if(response!=null){
								finalResult={
									"status" : "Success",
									"message" : "User Created Successfully",
								}
							
						}else{
							finalResult={
								"status" : "Failure",
								"message" : "Error while creating user"
							}
						}
						res.send(finalResult);
					});
				});
			}else{
				finalResult={
					"status" : "Failure",
					"message" : "User already exists"
				}
				res.send(finalResult);
			}
		});
	}else{
		finalResult={
			"status" : "Failure",
			"message" : "Invalid Request"
		}
		res.send(finalResult);
	}
}

function getHashPassword(password){
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password,bcrypt.genSaltSync(12),function(err,response){
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        })
    })
}