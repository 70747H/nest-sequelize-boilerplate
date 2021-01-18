const sql = `INSERT INTO users(id,
    email,
    created_at,
    updated_at,
    deleted_at)
VALUES ('00000000-0000-0000-0000-000000000000',
'kentloog@gmail.com',
now(),
now(),
null);
`;

module.exports = {
    up: queryInterface => queryInterface.bulkInsert('users', [
      { id: '00000000-0000-0000-0000-000000000000', email: '70747h@gmail.com' },
    ]),
    down: () => {},
  };