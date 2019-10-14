const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const db = require('../db/connection');

const users = db.get('users');

async function createAdminUser() {
  try {
    const user = await users.findOne({ role: 'admin' });
    if (!user) {
      await users.insert({
        username: 'Admin',
        password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 12),
        active: true,
        role: 'admin',
      });
      console.log('Admin user created!');
    } else {
      console.log('Admin user already exists!');
    }
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
}

createAdminUser();
