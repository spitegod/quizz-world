const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    question_type: {
      type: DataTypes.ENUM('single', 'multiple', 'text'),
      defaultValue: 'single',
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 0
      }
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Порядковый номер вопроса в квизе'
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quizzes',
        key: 'id'
      }
    }
  }, {
    tableName: 'questions',
    timestamps: true,
    underscored: true,
    defaultScope: {
      order: [['order', 'ASC']]
    }
  });

  // Связи
  Question.associate = (models) => {
    Question.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      as: 'quiz'
    });
    
    Question.hasMany(models.AnswerOption, {
      foreignKey: 'question_id',
      as: 'options',
      onDelete: 'CASCADE'
    });
    
    Question.hasMany(models.UserAnswer, {
      foreignKey: 'question_id',
      as: 'user_answers',
      onDelete: 'CASCADE'
    });
  };

  return Question;
};
