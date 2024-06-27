const User = require('../model/User');

const seed = async () => {
    try {
      await User.deleteMany({});
      const adminUser = new User({ useranme: 'admin', email: 'admin@example.com', password: '123456',role:"admin" });
      const employeeUser = new User({username: 'employee', email: 'employee@example.com', password: '123456',role:'employee' });
      await adminUser.save();
      console.log('Admin user created:', adminUser);
      await employeeUser.save();
      console.log('Employee user created:', employeeUser);
    } catch (error) {
      console.error(error);
    }
  };

module.exports = { seed };