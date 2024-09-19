const Report = require('./report');
const Product = require('./product');
const User = require('./user');

User.hasMany(Product, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Report, { foreignKey: 'product_id' });
Report.belongsTo(Product, { foreignKey: 'product_id' });
