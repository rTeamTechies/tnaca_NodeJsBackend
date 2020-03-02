module.exports = (sequelize, type) => {
    return sequelize.define('member', {
        member_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roll_no:type.INTEGER,
        name:type.STRING,
        mobile_number:type.STRING,
        father_name:type.STRING,
        email:type.STRING,
        blood_group:type.STRING,
        home_address:type.STRING,
        dob:type.DATE,
        doj:type.DATE,
        office_address: type.STRING,
        advocate_name : type.STRING,
        advocate_home_address : type.STRING,
        advocate_office_address: type.STRING,
        advocate_mobile_number: type.STRING,
        advocate_email: type.STRING,
        active_flag: type.INTEGER,
        inactive_reason: type.STRING,
        membership_flag : type.INTEGER,
        locker_flag : type.INTEGER,
        lifetime_member_flag : type.INTEGER,
        welfare_fund_member : type.INTEGER,
        created_at: {
            type: 'TIMESTAMP'
          },
          updated_at: {
            type: 'TIMESTAMP'
          },
        created_user_id: type.INTEGER,
        upd_user_id: type.INTEGER,
    },{
        timestamps: false
    })
};