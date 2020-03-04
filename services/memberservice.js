var memberDAO=require("../dao/memberDAO");
module.exports =  {
	getMembers:getMembers,
	getMemberById:getMemberById,
	addMember:addMember,
	editMember : editMember,
	memberPayment:memberPayment,
	getMemberPayment : getMemberPayment,
	addCost:addCost,
	getCost:getCost,
	addAdvDonation:addAdvDonation,
	getAdvDonation:getAdvDonation,
	getMembersByFlag:getMembersByFlag,
	checkLockerAvailablity:checkLockerAvailablity,
	surrenderLocker:surrenderLocker

}
function getMembers(req,res){
	return memberDAO.getMembers(req).then(function(response){
		var finalResult="";
		console.log(response)
		if(response!=null){
			var result=[];
			console.log(response)
			response.forEach(member => {
				console.log(member)
						result.push(member.dataValues);
			});
			finalResult={
				
				"status" : "Success",
				"data" : result
			}
		}else{
			finalResult={
				"status" : "Failure",
				"data" : "Error while getting members"
			}
		}
		res.send(finalResult)
	});
}
function getMembersByFlag(req,res){
	return memberDAO.getMembersByFlag(req).then(function(response){
		var finalResult="";
		console.log(response)
		if(response!=null){
			var result=[];
			console.log(response)
			response.forEach(member => {
				console.log(member)
						result.push(member.dataValues);
			});
			finalResult={
				
				"status" : "Success",
				"data" : result
			}
		}else{
			finalResult={
				"status" : "Failure",
				"data" : "Error while getting members"
			}
		}
		res.send(finalResult)
	});
}
function getCost(req,res){
	return memberDAO.getCost().then(function(response){
		var finalResult="";
		console.log(response)
		if(response!=null){
			
				console.log(response)
			finalResult={
				
				"status" : "Success",
				"data" : response
			}
		}else{
			finalResult={
				"status" : "Failure",
				"data" : "Error while getting members"
			}
		}
		res.send(finalResult)
	});
}

function getAdvDonation(req,res){
	return memberDAO.getAdvocateDonationData().then(function(response){
		var finalResult="";
		console.log(response)
		if(response!=null){
				console.log(response)
			finalResult={
				"status" : "Success",
				"data" : response
			}
		}else{
			finalResult={
				"status" : "Failure",
				"data" : "Error while getting members"
			}
		}
		res.send(finalResult)
	});
}

function addCost(req,res){
	var finalResult;
	req.body.billDate=parseDate(req.body.billDate);
	return  memberDAO.checkJCCount().then(async function(membeResponse){
		var billNo=formatBill("cost",membeResponse)
		return memberDAO.saveCostData(req.body,billNo).then(function (response){
			if(response!=null){
					finalResult={
						"status" : "Success",
						"message" : "Judge Cost added Successfully",
						"billNo" : response.dataValues.bill_no
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
}
function formatBill(table,id){
	var billNo="";
	var count=id+1;
	var date = new Date();
	if(table=='cost'){
		billNo = date.getFullYear()+"/JC/"+count;
		billNo = count+"/JC/"+date.getFullYear();
	}else if(table=='advocate')		
		billNo = count+"/AD/"+date.getFullYear();
	else if(table=='member')
		billNo = count + "/"+ date.getFullYear();
	else	
	billNo = count+"/L/"+date.getFullYear();
	return billNo.toString();
}
function addAdvDonation(req,res){
	var finalResult;
	req.body.billDate=parseDate(req.body.billDate);
	return  memberDAO.checkAdvCount().then(async function(membeResponse){
		var billNo=formatBill("advocate",membeResponse)
		return memberDAO.saveAdvocateDonationData(req.body,billNo).then(function (response){
			if(response!=null){
					finalResult={
						"status" : "Success",
						"message" : "Advocate Donation Added Successfully",
						"billNo" : response.dataValues.bill_no
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
}	

function editMember(req,res){
	var finalResult="";
	if(req.body.memberId!=null&&req.body.memberId!=0){
		return memberDAO.editMember(req.body).then(function (response){
			console.log(response)
			if(response!=null){
					finalResult={
						"status" : "Success",
						"message" : "Member modified Successfully",
					}
				
			}else{
				finalResult={
					"status" : "Failure",
					"message" : "Error while modifying member"
				}
			}
			res.send(finalResult);
		});
	}else{
		finalResult={
			"status" : "Failure",
			"message" : "Member ID is mandatory"
		}
	}
}
function getMemberById(req,res){
	return memberDAO.getMembersById(req.query.rollNo).then(function(response){
		var finalResult="";
		console.log(response)
		if(response!=null){
			finalResult={
				
				"status" : "Success",
				"data" : response
			}
		}else{
			finalResult={
				"status" : "Failure",
				"data" : "Error while getting members"
			}
		}
		res.send(finalResult)
	});
}
function addMember(req,res){
	if(req.body.rollNo!=null&&req.body.rollNo!=""){
		var finalResult;
		return  memberDAO.checkMemberCount(req.body.rollNo).then(async function(membeResponser){
			if(membeResponser==0){
				//return  memberDAO.checkMemberAllCount().then(async function(reponseData){
				//var flag=req.body.membershipFlag==1?'member':'locker';
				//var billNo=formatBill(flag,reponseData)
					return memberDAO.saveMember(req.body).then(function (response){
						if(response!=null){
								finalResult={
									"status" : "Success",
									"message" : "Member added Successfully",
									//"billNo" : billNo
								}
							
						}else{
							finalResult={
								"status" : "Failure",
								"message" : "Error while creating user"
							}
						}
						res.send(finalResult);
					});
				//});
			}else{
				finalResult={
					"status" : "Failure",
					"message" : "Roll No is already allocated to another member"
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
function memberPayment(req,res){
	if(req.body.rollNo!=null&&req.body.rollNo!=""){
		var finalResult;
		req.body.fromDate=parseDate(req.body.fromDate);
		req.body.toDate = parseDate(req.body.toDate);
		return  memberDAO.checkMemberAllCount().then(async function(reponseData){
				var flag=req.body.membershipFlag==1?'member':'locker';
				var billNo=formatBill(flag,reponseData)
			return memberDAO.makePayment(req.body,billNo).then(function (response){
				console.log(response)
				if(response!=null){
						finalResult={
							"status" : "Success",
							"message" : "Payment recorded Successfully",
							"billNo" : billNo
						}
					
				}else{
					finalResult={
						"status" : "Failure",
						"message" : "Error while making payment. Please contact administrator"
					}
				}
				res.send(finalResult);
			});
		});
	}else{
		finalResult={
			"status" : "Failure",
			"message" : "Invalid Request"
		}
		res.send(finalResult);
	}

}
function parseDate(input) {
	var parts = input.split('-');
	return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
  }
  function parseDateWithSlah(input) {
	var parts = input.split('/');
	var formattedDate=parts[0]+"-"+parts[1]+"-"+parts[2];
	return formattedDate;
	//return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
  }
function getMemberPayment(req,res){
	var requestData=generateRequestData(req);
	//return memberDAO.getMemberPayment(req.query.rollNo,req.query.membershipFlag,req.query.lockerFlag,req.query.year).then(function(response){
	return memberDAO.getMemberPaymentByFlag(requestData,req.query.reportFlag,req).then(function(response){
		var finalResult="";
		if(response!=null){
			finalResult={
				"status" : "Success",
				"data" : response
			}
		}else{
			finalResult={
				"status" : "Failure",
				"data" : "Error while getting members"
			}
		}
		res.send(finalResult)
	});
}
function generateRequestData(req){
	var data="";
	if(req.query.reportFlag==1){
		console.log(getTodayDate())
		data={
			"lockerFlag" : req.query.lockerFlag,
			"currentDate" : getTodayDate()
		}

	}else if(req.query.reportFlag==2){
		data={
			"fromDate" : req.query.fromDate,
			"toDate" : req.query.toDate,
		}
	}
	else if(req.query.reportFlag==3){
		data={
			"rollNo" :req.query.rollNo,
			"lockerFlag" : req.query.lockerFlag,
		}
	}else if(req.query.reportFlag==4){
		data={
			"membershipFlag" :req.query.membershipFlag,
			"year" : req.query.year
		}
	}else{
		data={
			"membershipFlag" :req.query.membershipFlag,
			"rollNo" : req.query.rollNo
		}
	}
	return data;
}
function getTodayDate(){
	var today = new Date();
	var dd = today.getDate();

	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10) 
	{
		dd='0'+dd;
	} 

	if(mm<10) 
	{
		mm='0'+mm;
	} 
	today = yyyy+'-'+mm+'-'+dd;
	return today;
}


function checkLockerAvailablity(req,res){
	return memberDAO.checkLockerAvailablity(req.query.lockerNo,req.query.fromDate,req.query.toDate,getTodayDate()).then(function(response){
		var finalResult="";
		if(response!=null){
			finalResult={
				"status" : "Success",
				"data" : response
			}
		}else{
			finalResult={
				"status" : "Failure",
				"data" : "Error while checking locker availability"
			}
		}
		res.send(finalResult)
	});
}

function surrenderLocker(req,res){
	var finalResult="";
	if(req.body.billNo!=null&&req.body.billNo!=undefined&&req.body.billNo!=""){
		return memberDAO.surrenderLocker(req.body,getTodayDate()).then(function (response){
			console.log(response)
			if(response!=null){
					finalResult={
						"status" : "Success",
						"message" : "Locker Updated Successfully",
					}
				
			}else{
				finalResult={
					"status" : "Failure",
					"message" : "Error while Updating Locker"
				}
			}
			res.send(finalResult);
		});
	}else{
		finalResult={
			"status" : "Failure",
			"message" : "Member ID is mandatory"
		}
	}
}