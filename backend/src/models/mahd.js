module.exports = (sequelize, DataTypes) => {
  return sequelize.define('mahd', {
    id_stud: { type: DataTypes.INTEGER, primaryKey: true },
    golos_student: { type: DataTypes.STRING },
    name_student: { type: DataTypes.STRING },
    school: { type: DataTypes.STRING },
    Sum: { type: DataTypes.INTEGER },
    tkder: { type: DataTypes.STRING },
    tkhsos: { type: DataTypes.STRING },
    shoaba: { type: DataTypes.STRING },
    door: { type: DataTypes.STRING },
    Year: { type: DataTypes.INTEGER }
  }, {
    tableName: 'mahd',
    timestamps: false
  });
};
