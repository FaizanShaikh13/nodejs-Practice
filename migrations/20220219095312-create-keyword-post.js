"use strict";

// const keywords = require("../models/keywords");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("keyword_post", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      keyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "keywords",
          key: "id",
        },
        onDelete:'cascade'
        
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
        onDelete:'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("keyword_post");
  },
};
