SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS cv_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE cv_db;

CREATE TABLE IF NOT EXISTS persona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    foto VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS formacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    institucion VARCHAR(150) NOT NULL,
    anio VARCHAR(50) NOT NULL,
    persona_id INT,
    FOREIGN KEY (persona_id) REFERENCES persona(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO persona (nombre, apellido, ciudad, foto) VALUES
('Wilson', 'Flores', 'La Paz', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400');

INSERT INTO formacion (titulo, institucion, anio, persona_id) VALUES
('Ingeniería de Sistemas y Computación', 'Universidad Mayor', '2019 - 2024', 1),
('Diplomado en Desarrollo Full Stack', 'Instituto Tecnológico', '2025 - 2026', 1);