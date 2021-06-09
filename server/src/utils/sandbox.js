const User = require('../models/User');
const Role = require('../models/Role');

async function getRoles() {
    const userRole = await Role.where({ id: 4 }).fetch({
        withRelated: ['users'],
        require: true,
    });
}

const userRole = Role.where({ id: 4 }).fetch({
    require: true,
    withRelated: ['users'],
}).then((id) => console.log(id));

// console.log(userRole);
