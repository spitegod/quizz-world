const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const QuizSession = sequelize.define('QuizSession', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    max_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Максимально возможный балл за квиз'
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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
    tableName: 'quiz_sessions',
    timestamps: true,
    underscored: true
  });

  // Связи
  QuizSession.associate = (models) => {
    QuizSession.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    
    QuizSession.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      as: 'quiz'
    });
    
    QuizSession.hasMany(models.UserAnswer, {
      foreignKey: 'session_id',
      as: 'user_answers',
      onDelete: 'CASCADE'
    });
  };

  // Подсчет очков за сессию
  QuizSession.prototype.calculateScore = async function() {
    const userAnswers = await this.getUser_answers({
      include: [{
        model: sequelize.models.AnswerOption,
        as: 'answer_option',
        attributes: ['is_correct']
      }]
    });

    let score = 0;
    
    userAnswers.forEach(answer => {
      if (answer.answer_option && answer.answer_option.is_correct) {
        score += answer.points_earned || 0;
      }
    });

    return score;
  };

  return QuizSession;
};
