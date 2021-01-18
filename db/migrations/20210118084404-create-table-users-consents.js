const sql = `
CREATE TABLE users_consents
(
    id         VARCHAR(36) DEFAULT (uuid()),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    user_id    VARCHAR(36) ,
    consent_id    VARCHAR(36) ,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (consent_id) REFERENCES consents (id)
);
`;

module.exports = {
    up: queryInterface => queryInterface.sequelize.query(sql),
    down: () => {},
};
