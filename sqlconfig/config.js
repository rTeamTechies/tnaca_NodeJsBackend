var UserLogin =require('../model/UserLogin');
var ConfigurationDetails =require('../model/configuration');
var MembersDetails =require('../model/member');
 var MemberShipbillingDetails = require('../model/membershipbilling');
var JudgeCostDetails = require ('../model/JudgeCostBilling')
var AdvocateDonationDetails = require('../model/AdvocateDonationBilling')
var Sequelize = require('sequelize');
const sequelizeData=new Sequelize('lockerdb','root','root',{
     dialect : 'mysql',
     port: 3306
})

const User=UserLogin(sequelizeData,Sequelize.DataTypes);
const Configuration=ConfigurationDetails(sequelizeData,Sequelize.DataTypes);
const Members=MembersDetails(sequelizeData,Sequelize.DataTypes);
const MembershipBilling = MemberShipbillingDetails(sequelizeData,Sequelize.DataTypes);
const JudgeCost = JudgeCostDetails(sequelizeData,Sequelize.DataTypes);
const AdvocateDonation = AdvocateDonationDetails(sequelizeData,Sequelize.DataTypes);

sequelizeData.sync().then(() => {
     console.log("DB connected")
});

module.exports =  {
	User,
     Configuration,
     Members,
     MembershipBilling,
     JudgeCost,
     AdvocateDonation
}