var connection=require('../sqlconfig/config')
module.exports =  {
    getMembers:getMembers,
    getMembersById:getMembersById,
    checkMemberCount:checkMemberCount,
    saveMember:saveMember,
    editMember:editMember,
    makePayment:makePayment,
    getMemberPayment:getMemberPayment,
    saveCostData:saveCostData,
    getCost:getCost,
    saveAdvocateDonationData:saveAdvocateDonationData,
    getAdvocateDonationData:getAdvocateDonationData,
    getMemberPaymentByFlag:getMemberPaymentByFlag,
    checkJCCount:checkJCCount,
    checkAdvCount:checkAdvCount,
    checkMemberAllCount:checkMemberAllCount,
    getMembersByFlag:getMembersByFlag,
    checkLockerAvailablity:checkLockerAvailablity,
    surrenderLocker:surrenderLocker,
    getBillNo:getBillNo
  }

  function getMembers(req){
    return new Promise((resolve, reject) => {
        connection.Members.findAll({
          attributes: { exclude: ['created_at','updated_at','created_user_id','upd_user_id'] },
        })
          .then(member => {
              resolve(member);
          })
      })
  }
  function getMembersByFlag(req){
    var where="";
    if(req.query.resultFlag==0)
        where={active_flag : req.query.activeFlag}
    else if(req.query.resultFlag==1)
       where={welfare_fund_member : req.query.welfareFundMemberFlag}
    else
        where={lifetime_member_flag : req.query.lifeTimeMemberFlag}
    return new Promise((resolve, reject) => {
        connection.Members.findAll({
          attributes: { exclude: ['created_at','updated_at','created_user_id','upd_user_id'] },
          where : where
        })
          .then(member => {
              resolve(member);
          })
      })
  }
  function getCost(){
    return new Promise((resolve, reject) => {
        connection.JudgeCost.findAll({
          attributes: { exclude: ['created_at','updated_at','created_user_id','upd_user_id'] }
        })
          .then(member => {
              resolve(member);
          })
      })
  }

  function getAdvocateDonationData(){
    return new Promise((resolve, reject) => {
        connection.AdvocateDonation.findAll({
          attributes: { exclude: ['created_at','updated_at','created_user_id','upd_user_id'] }
        })
          .then(member => {
              resolve(member);
          })
      })
  }

  function getMembersById(id){
    var where = {
      roll_no : id
    }
    return new Promise((resolve, reject) => {
        connection.Members.findAll({
            where : where
        })
          .then(member => {
              resolve(member);
          })
      })
  }
  function checkMemberCount(data){
    try{
        return new Promise((resolve, reject) => {
            connection.Members.count({
              where: {
                roll_no : data
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
  function checkMemberAllCount(){
    try{
      return new Promise((resolve, reject) => {
          connection.MembershipBilling.count()
            .then(result => {
                resolve(result);
            })
        })
    }catch(err){
      throw err;
    }
  }

  function checkJCCount(){
    try{
      return new Promise((resolve, reject) => {
          connection.JudgeCost.count()
            .then(result => {
                resolve(result);
            })
        })
    }catch(err){
      throw err;
    }
  }
  function checkAdvCount(){
    try{
      return new Promise((resolve, reject) => {
          connection.AdvocateDonation.count()
            .then(result => {
                resolve(result);
            })
        })
    }catch(err){
      throw err;
    }
  }
  
  function saveMember(data){
    try{
        const saveData={
          roll_no : data.rollNo,
          name : data.name,
          mobile_number : data.mobileNumber,
          father_name : data.fatherName,
          email : data.email,
          blood_group : data.bloodGroup,
          home_address : data.homeAddress,
          dob : data.dob,
          doj : data.doj,
          office_address : data.officeAddress,
          advocate_name : data.advocateName,
          advocate_home_address : data.advocateHomeAddress,
          advocate_office_address : data.advocateOfficeAddress,
          advocate_mobile_number : data.advocateMobileNumber,
          advocate_email : data.advocateEmail,
          active_flag : data.activeFlag,
          membership_flag : data.membershipFlag,
          locker_flag : data.lockerFlag,
          lifetime_member_flag : data.lifeTimeMemberFlag,
          welfare_fund_member : data.welfareFundMemberFlag
        }
        return new Promise((resolve, reject) => {
          connection.Members.create(saveData)
          .then((rowsUpdated)=> {
              resolve(rowsUpdated);
          })
        })
      }catch(err){
        throw err;
      }
  }
  function editMember(data){
    try{
      const where = {
        member_id:data.memberId
      }
        const updateData={
          roll_no : data.rollNo,
          name : data.name,
          mobile_number : data.mobileNumber,
          father_name : data.fatherName,
          email : data.email,
          blood_group : data.bloodGroup,
          home_address : data.homeAddress,
          dob : data.dob,
          doj : data.doj,
          office_address : data.officeAddress,
          advocate_name : data.advocateName,
          advocate_home_address : data.advocateHomeAddress,
          advocate_office_address : data.advocateOfficeAddress,
          advocate_mobile_number : data.advocateMobileNumber,
          advocate_email : data.advocateEmail,
          active_flag : data.activeFlag,
          membership_flag : data.membershipFlag,
          locker_flag : data.lockerFlag,
          lifetime_member_flag : data.lifeTimeMemberFlag,
          welfare_fund_member : data.welfareFundMemberFlag
        }
        return new Promise((resolve, reject) => {
          connection.Members.update(updateData,{where:where})
          .then((rowsUpdated)=> {
              resolve(rowsUpdated);
          })
        })
      }catch(err){
        throw err;
      }
  }
  function makePayment(data,billNo){
    try{
        const saveData={
          bill_no : billNo,
		      name: data.name,
          roll_no : data.rollNo,
          from_date : data.fromDate,
          locker_id : data.lockerId,
          locker_location :  data.lockerLocation,
          to_date : data.toDate,
          subscription_year : data.subscriptionYear,
          subscription_type : data.subscriptionType,
          payment_type : data.paymentType,
          amount : data.amount,
          membership_flag : data.membershipFlag == undefined ? 0 : data.membershipFlag,
          locker_flag : data.lockerFlag == undefined ? 0 : data.lockerFlag,
          lifetime_member_flag : data.lifetimeMemberFlag == undefined ? 0 : data.lifetimeMemberFlag,
          welfare_fund_member : data.welfareFundMember == undefined ? 0 : data.welfareFundMember
        }
        
        return new Promise((resolve, reject) => {
          connection.MembershipBilling.create(saveData)
          .then((rowsUpdated)=> {
              resolve(rowsUpdated);
          })
        })
      }catch(err){
        throw err;
      }
  }
  function getMemberPayment(id,membershipFlag,lockerFlag,subscriptionYear){
    var where = {};

    if(subscriptionYear != undefined){
      where = {
        subscription_year:subscriptionYear
      }
    }else if(membershipFlag != undefined){
      where = {
        roll_no:id,
        membership_flag:membershipFlag
      }
    }else if(lockerFlag != undefined){
      where = {
        roll_no:id,
        locker_flag:lockerFlag
      }
    }  
    return new Promise((resolve, reject) => {
        connection.MembershipBilling.findAll({
          attributes: { exclude: ['created_at','updated_at','created_user_id','upd_user_id'] },
          where : where
        })
          .then(member => {
              resolve(member);
          })
      })
  }
  function getMemberPaymentByFlag(data,reportFlag,req){
    var where=generatewhere(data,reportFlag);
    if(reportFlag!=2){
      if(reportFlag==1){
        return new Promise((resolve, reject) => {
            connection.MembershipBilling.sequelize.query('SELECT * from membership_bilings where (to_Date >= "'+data.currentDate+'" ) and locker_flag='+data.lockerFlag+'',
            )
              .then(member => {
                  resolve(member[0]);
              })
          })
      }else{
        return new Promise((resolve, reject) => {
            connection.MembershipBilling.findAll({
              attributes: { exclude: ['created_at','updated_at','created_user_id','upd_user_id'] },
              where : where
            })
              .then(member => {
                  resolve(member);
              })
          })
       }
      }else{
        var columnName=req.query.statusFlag==1?'locker_flag':'membership_flag';
        return new Promise((resolve, reject) => {
                connection.MembershipBilling.sequelize.query('SELECT * from membership_bilings where (DATE(bill_date) >= "'+data.fromDate+'" AND DATE(bill_date) <= "'+data.toDate+'") and '+columnName+'=1',
                )
                  .then(member => {
                      resolve(member[0]);
                  })
              })
              
      }
  }
  function generatewhere(data,reportFlag){
    var where;
    if(reportFlag==1){
      where={
        "locker_flag":data.lockerFlag
      }
    }else if(reportFlag==2){
      where={
        from_date : {
          $gte: data.fromDate
        },
        to_date : {
          $lte: data.toDate
        }
      }
    }
    else if(reportFlag==3){
      where={
        "roll_no":data.rollNo,
        "locker_flag":data.lockerFlag
      }
    }else if(reportFlag==4){
      where={
        "membership_flag" :data.membershipFlag,
        "subscription_year" : data.year
      }
    }else{
      where={
        "membership_flag" :data.membershipFlag,
        "roll_no":data.rollNo,
      }
    }
    return where;
  }

  function saveCostData(data,billNo){
    try{
      const saveData={
        bill_no : billNo,
        judge_id : data.judgeId,
        judge_name : data.judgeName,
        case_no : data.caseNo,
        amount : data.amount,
        payment_type : data.paymentType,
        bill_date : data.billDate
      }
      return new Promise((resolve, reject) => {
        connection.JudgeCost.create(saveData)
        .then((rowsUpdated)=> {
            resolve(rowsUpdated);
        })
      })
    }catch(err){
      throw err;
    }
  }

  function saveAdvocateDonationData(data,billNo){
    try{
      const saveData={
        bill_no : billNo,
        adv_roll_no : data.advRollNo,
        adv_name : data.advName,
        amount : data.amount,
        payment_type : data.paymentType,
        bill_date : data.billDate
      }
      return new Promise((resolve, reject) => {
        connection.AdvocateDonation.create(saveData)
        .then((rowsUpdated)=> {
            resolve(rowsUpdated);
        })
      })
    }catch(err){
      throw err;
    }
  }
  
   function checkLockerAvailablity(lockerNo, fromDate, toDate, currentDate){
	return new Promise((resolve, reject) => {		
			connection.MembershipBilling.sequelize.query('SELECT * from membership_bilings where (to_date >= "'+fromDate+'" and from_date <= "'+toDate+'" and locker_id = "'+lockerNo+'")')
			  .then(member => {
				  resolve(member[0]);
			  })
		  })
  }
  
  function surrenderLocker(data,currentDate){
    try{
      const where = {
        bill_no:data.billNo
      }
        const updateData={
          to_date : currentDate
        }
        return new Promise((resolve, reject) => {
          connection.MembershipBilling.update(updateData,{where:where})
          .then((rowsUpdated)=> {
              resolve(rowsUpdated);
          })
        })
      }catch(err){
        throw err;
      }
  }

  function getBillNo(flag){
    var where ;
    if(flag == 1){
      where = {
        "config_type" : 'SUBS_BILLNO'
      }
    }else if(flag ==2){
      where = {
        "config_type" :'LOCK_BILLNO'
      }
    }else if(flag ==3){
      where = {
        "config_type" :'JUDGECOST_BILLNO'
      }
    }else if(flag ==4){
      where = {
        "config_type" :'ADVDONA_BILLNO'
      }
    }
    return new Promise((resolve, reject) => {
        connection.Configuration.findAll({
            where : where
        })
          .then(billNoRes => {
              resolve(billNoRes);
          })
      })
	
  }