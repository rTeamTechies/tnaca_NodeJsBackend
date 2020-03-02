module.exports = (sequelize, type) => {
    return sequelize.define('user_login', {
        user_id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name:type.STRING,
        secret_key: type.STRING,
        email : type.STRING,
        phone_number : type.STRING,
        password : type.STRING,
        user_type: type.STRING,
        active_flag: type.STRING,
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