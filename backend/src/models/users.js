module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    preemision: { type: DataTypes.STRING } // مثال: "admin,add,edit,delete"
  }, {
    tableName: 'users',
    timestamps: false
  });
};
