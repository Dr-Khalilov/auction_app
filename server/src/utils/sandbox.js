const User = require('../models/User');
const Role = require('../models/Role');

try {
    const userRole = await User.where({ id: 4 }).fetch({
        withRelated: ['roles'],
        require: true,
    });
    console.log(userRole);
} catch (err) {
    console.error(err);
}


