module.exports = (sequelize, DataTypes) => {
  return sequelize.define('info_student', {
    id_stud: { type: DataTypes.INTEGER, primaryKey: true },
    golos_student: { type: DataTypes.STRING },
    name_student: { type: DataTypes.STRING },
    school: { type: DataTypes.STRING },
    Sum: { type: DataTypes.INTEGER },
    nsba: { type: DataTypes.FLOAT },
    tkder: { type: DataTypes.STRING },
    level: { type: DataTypes.STRING },
    tkhsos: { type: DataTypes.STRING },
    shoaba: { type: DataTypes.STRING },
    door: { type: DataTypes.STRING },
    Year: { type: DataTypes.INTEGER },
    saf: { type: DataTypes.STRING },
    id_ked: { type: DataTypes.STRING }
  }, {
    tableName: 'info_student',
    timestamps: false
  });
};
