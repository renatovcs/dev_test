USE test_db;

CREATE TABLE IF NOT EXISTS api_user (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,                   
    firstName VARCHAR(100) NOT NULL,         
    lastName VARCHAR(100) NOT NULL,          
    email VARCHAR(100) NOT NULL       
);

CREATE TABLE IF NOT EXISTS api_post (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,                   
    title VARCHAR(100) NOT NULL,             
    description VARCHAR(100) NOT NULL,       
    userId INT UNSIGNED NOT NULL,                  
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES api_user(id) 
);   