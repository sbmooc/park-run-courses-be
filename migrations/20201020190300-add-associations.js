'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Courses', 'EventId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Courses',
      'EventId'
    )

  }
};