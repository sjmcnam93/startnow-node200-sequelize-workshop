'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blog = sequelize.define('Blog', {
    title: {
      type: DataTypes.STRING,
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
    article: {
      type: DataTypes.TEXT,
    },
    published: {
      type: DataTypes.DATE,
      allowNull: true
    },
    featured: {
      type: DataTypes.BOOLEAN,
    }
  }, {});
  Blog.associate = function(models) {

    Blog.belongsTo(models.Author, {
      foreignKey: 'authorId',
      targetKey: 'id',
      as: 'author'
    });
  };
  return Blog;
};