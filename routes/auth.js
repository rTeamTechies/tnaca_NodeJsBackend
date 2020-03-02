module.exports =  (router, expressApp,authMethods) => {
    router.post('/login',authMethods.login)
    router.post('/signup',authMethods.signup)
    return router
}