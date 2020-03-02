module.exports = (sequelize, type) => {
    return sequelize.define('advocate_donation_billing', {
        donation_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bill_no:type.STRING,
        adv_roll_no:type.INTEGER,
        adv_name:type.STRING,
        amount:type.STRING,
        payment_type:type.STRING,
        bill_date:type.DATE,
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