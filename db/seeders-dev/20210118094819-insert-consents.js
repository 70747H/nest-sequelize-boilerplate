const sql = `
INSERT INTO consents(id,name,created_at,updated_at,deleted_at) VALUES (uuid(),'email_notifications',now(),now(),null);

INSERT INTO consents(id,name,created_at,updated_at,deleted_at) VALUES (uuid(),'sms_notifications',now(),now(),null);
`;

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('consents', [
    { name: 'email_notifications' },
    { name: 'sms_notifications' }
  ]),
  down: () => {},
};
