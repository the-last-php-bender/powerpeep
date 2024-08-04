export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Batteries', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    batteryLevel: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isCharging: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Batteries');
}
