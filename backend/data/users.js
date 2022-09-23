import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: bcrypt.hashSync('test123', 18),
        isAdmin: true
    },
    {
        name: 'Peter Wu',
        email: 'peter@test.com',
        password: bcrypt.hashSync('test456', 18),
        isAdmin: false
    },
    {
        name: 'James Crown',
        email: 'james@test.com',
        password: bcrypt.hashSync('test789', 18),
        isAdmin: false
    }
];

export default users;
