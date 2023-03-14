'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('users', [
    {
      name: 'foriokto',
      profession: 'admin Micro',
      role: 'admin',
      email: 'fpakpahan44@gmail.com',
      password: await bcrypt.hash('rahasia', 10),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'pakpahan',
      profession: 'BackEnd',
      role: 'student',
      email: 'poisedon@gmail.com',
      password: await bcrypt.hash('rahasia123', 10),
      created_at: new Date(),
      updated_at: new Date()
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
