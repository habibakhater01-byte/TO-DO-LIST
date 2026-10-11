CREATE TABLE
    TODO (
        id serial PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        body VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        done BOOLEAN DEFAULT FALSE,
        archived BOOLEAN NOT NULL DEFAULT FALSE
    );