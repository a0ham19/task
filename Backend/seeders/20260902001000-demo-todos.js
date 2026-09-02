"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert("todos", [
            {
                title: "Review the project requirements",
                completed: false,
            },
            {
                title: "Set up the local database",
                completed: true,
            },
            {
                title: "Run the application tests",
                completed: false,
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("todos", {
            title: [
                "Review the project requirements",
                "Set up the local database",
                "Run the application tests",
            ],
        });
    },
};