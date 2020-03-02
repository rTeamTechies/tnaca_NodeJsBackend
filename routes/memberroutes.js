module.exports =  (router, expressApp,memberMethods) => {
    router.get('/getMembers',memberMethods.getMembers)
    router.get('/getMembersByFlag',memberMethods.getMembersByFlag)
    router.get('/getMemberById',memberMethods.getMemberById)
    router.get('/getMemberPayment',memberMethods.getMemberPayment)
    router.post('/addMember',memberMethods.addMember)
    router.put('/editMember',memberMethods.editMember)
    router.post('/memberPayment',memberMethods.memberPayment)
    router.post('/addCost',memberMethods.addCost)
    router.get('/getJudgeCost',memberMethods.getCost)
    router.post('/addAdvDonation',memberMethods.addAdvDonation)
    router.get('/getAdvDonation',memberMethods.getAdvDonation)
	router.get('/checkLockerAvailablity',memberMethods.checkLockerAvailablity)
	router.put('/surrenderLocker',memberMethods.surrenderLocker)
    
    return router
}