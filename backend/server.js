require('dotenv').config();

const app = require('./app');
const sequelize = require('./database');

const PORT = 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB Connected');

    // 🔴 للتطوير فقط (يمسح الجداول)
    await sequelize.sync({ force: true });

    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );

  } catch (err) {
    console.error(err);
  }
};

startServer();
