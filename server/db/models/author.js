'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    firstName: { 
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Author.associate = function(models) {
 
    Author.hasMany(models.Blog, {
      foreignKey: 'authorId',
      sourceKey: 'id',
      as: 'blogs'
    });

  };
  return Author;
};