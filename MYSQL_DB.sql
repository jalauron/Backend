CREATE DATABASE sql12738870;
USE sql12738870;

SHOW TABLES;

CREATE TABLE users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE KEY, 
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at datetime
    );

    SELECT * FROM users;

CREATE TABLE departments(
dept_id INT AUTO_INCREMENT PRIMARY KEY,
dept_code VARCHAR(255) NOT NULL,
dept_name VARCHAR(255) NOT NULL,
user_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at datetime,
FOREIGN KEY (user_id) REFERENCES users(user_id)
);

SELECT * FROM departments;


CREATE TABLE courses(
course_id INT AUTO_INCREMENT PRIMARY KEY,
course_code VARCHAR(255) NOT NULL,
course_name VARCHAR(255) NOT NULL,
user_id INT,
dept_id INT ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at datetime,
FOREIGN KEY(user_id)REFERENCES users(user_id),
FOREIGN KEY(dept_id)REFERENCES departments(dept_id)
);
SELECT * FROM courses;

CREATE TABLE students(
student_id INT AUTO_INCREMENT PRIMARY KEY,
lname VARCHAR(255) NOT NULL,
fname VARCHAR(255) NOT NULL,
mI VARCHAR(255) NOT NULL,
age INT(100) NOT NULL,
gender VARCHAR(100) NOT NULL,
user_id INT,
course_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at datetime, 
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

SELECT * FROM students;