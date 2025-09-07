const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserAnswer = sequelize.define('UserAnswer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    answer_text: {
      type: DataTypes.TEXT,
      comment: 'Для текстовых ответов',
      allowNull: true
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    points_earned: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quiz_sessions',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    answer_option_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Может быть null для текстовых ответов
      references: {
        model: 'answer_options',
        key: 'id'
      },
      onDelete: 'SET NULL'
    }
  }, {
    tableName: 'user_answers',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['session_id', 'question_id'],
        name: 'unique_answer_per_question'
      }
    ]
  });

  // Связи
  UserAnswer.associate = (models) => {
    UserAnswer.belongsTo(models.QuizSession, {
      foreignKey: 'session_id',
      as: 'session'
    });
    
    UserAnswer.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question'
    });
    
    UserAnswer.belongsTo(models.AnswerOption, {
      foreignKey: 'answer_option_id',
      as: 'answer_option'
    });
  };

  return UserAnswer;
};
