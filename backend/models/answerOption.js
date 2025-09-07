const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AnswerOption = sequelize.define('AnswerOption', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    option_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Порядковый номер варианта ответа'
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      }
    }
  }, {
    tableName: 'answer_options',
    timestamps: false,
    underscored: true,
    defaultScope: {
      order: [['order', 'ASC']]
    }
  });

  // Связи
  AnswerOption.associate = (models) => {
    AnswerOption.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question'
    });
    
    AnswerOption.hasMany(models.UserAnswer, {
      foreignKey: 'answer_option_id',
      as: 'user_answers',
      onDelete: 'CASCADE'
    });
  };

  return AnswerOption;
};
