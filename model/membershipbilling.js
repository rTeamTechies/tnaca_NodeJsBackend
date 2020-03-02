module.exports = (sequelize, type) => {
    return sequelize.define('membership_bilings', {
        bill_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bill_date : {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        bill_no : type.STRING,
        roll_no : type.INTEGER,
		name : type.STRING,
        locker_id:type.INTEGER,
        locker_location:type.STRING,
        from_date : type.DATEONLY,
        to_date : type.DATEONLY,
        subscription_year:type.INTEGER,
        subscription_type:type.STRING,
        payment_type: type.STRING,
        amount : type.STRING,
        membership_flag: type.INTEGER,
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