module.exports = (sequelize, type) => {
  return sequelize.define('configuration', {
      config_id : {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      config_type:type.STRING,
      config_value:type.STRING,
      from_date: {
          type: 'TIMESTAMP'
        },
        to_date: {
          type: 'TIMESTAMP'
        },
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