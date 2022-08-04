CREATE DATABASE process.env.DB_NAME;
CREATE TABLE user_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'USER'
);
CREATE TABLE basket (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_table(id)
);
CREATE TABLE device (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  price INT NOT NULL,
  rating INT NOT NULL,
  img VARCHAR(255) NOT NULL
  FOREIGN KEY (type_id) REFERENCES type(id)
  FOREIGN KEY (brand_id) REFERENCES brand(id)
);
CREATE TABLE basket_device (
  id SERIAL PRIMARY KEY,
  basket_id INT NOT NULL,
  device_id INT NOT NULL,
  FOREIGN KEY (basket_id) REFERENCES basket(id),
  FOREIGN KEY (device_id) REFERENCES device(id)
);

CREATE TABLE type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
);
CREATE TABLE brand (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
);
CREATE TABLE rating (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  device_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_table(id),
  FOREIGN KEY (device_id) REFERENCES device(id),
  rating INT NOT NULL
);
CREATE TABLE device_info (
  id SERIAL PRIMARY KEY,
  device_id INT NOT NULL,
  type_id INT NOT NULL,
  brand_id INT NOT NULL,
  FOREIGN KEY (device_id) REFERENCES device(id),
  FOREIGN KEY (type_id) REFERENCES type(id),
  FOREIGN KEY (brand_id) REFERENCES brand(id)
);
CREATE TABLE type_brand (
  id SERIAL PRIMARY KEY,
  type_id INT NOT NULL,
  brand_id INT NOT NULL,
  FOREIGN KEY (type_id) REFERENCES type(id),
  FOREIGN KEY (brand_id) REFERENCES brand(id)
);