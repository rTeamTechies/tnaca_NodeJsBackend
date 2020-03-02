module.exports = (sequelize, type) => {
    return sequelize.define('just_cost_billing', {
        cost_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bill_no:type.STRING,
        judge_id:type.INTEGER,
        judge_name:type.STRING,
        case_no:type.STRING,
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