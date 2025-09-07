const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Quiz = sequelize.define('Quiz', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    time_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Время на прохождение в минутах, null если без ограничений'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'quizzes',
    timestamps: true,
    underscored: true
  });

  // Связи
  Quiz.associate = (models) => {
    Quiz.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author'
    });
    
    Quiz.hasMany(models.Question, {
      foreignKey: 'quiz_id',
      as: 'questions',
      onDelete: 'CASCADE'
    });
    
    Quiz.hasMany(models.QuizSession, {
      foreignKey: 'quiz_id',
      as: 'sessions',
      onDelete: 'CASCADE'
    });
  };

  return Quiz;
};
