'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com'
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com'
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com'
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: [
        'alice@example.com',
        'bob@example.com',
        'charlie@example.com'
      ]
    });
  }
};
