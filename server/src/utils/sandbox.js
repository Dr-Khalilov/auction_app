const User = require('../models/User');


async function getUserRole() {
    const userRole = await User.where({ id:4 }).fetch({
        withRelated: ['roles_users'],
    }, { require: false });
    return userRole;
}

console.log(getUserRole());