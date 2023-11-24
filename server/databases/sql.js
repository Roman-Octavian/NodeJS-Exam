export const clearAll = `DROP TABLE IF EXISTS boards, posts, replies, moderators`;

export const createBoards = `CREATE TABLE IF NOT EXISTS boards (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) UNIQUE NOT NULL
)`;

export const createPosts = `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    text VARCHAR(4000),
    image_original VARCHAR(255) NOT NULL,
    image_thumbnail VARCHAR(255) NOT NULL,
    date_time DATETIME NOT NULL,
    bump_order INT NOT NULL,

    boards_id INTEGER NOT NULL,
    KEY boards_id_idx (id)
)`;

export const createReplies = `CREATE TABLE IF NOT EXISTS replies (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(4000) NOT NULL,
    image_original VARCHAR(255),
    image_thumbnail VARCHAR(255),
    date_time DATETIME NOT NULL,

    posts_id INTEGER NOT NULL,
    KEY posts_id_idx (id)
)`;

export const createModerators = `CREATE TABLE IF NOT EXISTS moderators (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)`;

export const initializeAdmin = `INSERT INTO moderators(username, password)
    VALUES("admin", ?
)`;

export const initializeBoards = `INSERT INTO boards(name) 
VALUES("cats"),("random"),("trains"),("technology"),("paranormal")`