-- ===============================================
--   BASE DE DATOS: GRIFO
--   SISTEMA DE CONTROL DE VENTAS POR TRABAJADOR
-- ===============================================
drop database if exists grifo;
CREATE DATABASE grifo;
USE grifo;

-- ==========================
-- TABLA: trabajador
-- ==========================
CREATE TABLE trabajador (
    idtrabajador INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    turno ENUM('Mañana','Tarde','Noche') NOT NULL,
    dni CHAR(8) UNIQUE NOT NULL
);

-- ==========================
-- TABLA: combustible
-- ==========================
CREATE TABLE combustible (
    idcombustible INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(30) NOT NULL,
    precio DECIMAL(6,2) NOT NULL
);

-- ==========================
-- TABLA: venta
-- ==========================
CREATE TABLE venta (
    idventa INT AUTO_INCREMENT PRIMARY KEY,
    idtrabajador INT NOT NULL,
    idcombustible INT NOT NULL,
    hora TIME NOT NULL,
    galones DECIMAL(6,2) NOT NULL,
    importe DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (idtrabajador) REFERENCES trabajador(idtrabajador),
    FOREIGN KEY (idcombustible) REFERENCES combustible(idcombustible)
);

-- ======================================
-- INSERTAR DATOS DE EJEMPLO
-- ======================================

-- Trabajadores
INSERT INTO trabajador (nombre, turno, dni) VALUES
('Carlos Ramos','Mañana','42158796'),
('María Torres','Tarde','78521463'),
('Luis Argote','Noche','36521478'),
('Carolina Tello','Tarde','55698741');

-- Combustible
INSERT INTO combustible (tipo, precio) VALUES
('Gasolina 90', 17.50),
('Gasolina 95', 19.80),
('Diesel', 14.60),
('GLP', 8.10);

-- Ventas
INSERT INTO venta (idtrabajador, idcombustible, hora, galones, importe) VALUES
(1, 1, '08:15:00', 10.5, 183.75),
(1, 3, '09:20:00', 20.0, 292.00),
(2, 2, '14:10:00', 8.0, 158.40),
(2, 4, '15:00:00', 12.0, 97.20),
(3, 1, '22:45:00', 15.6, 273.00),
(3, 3, '23:10:00', 18.3, 267.18),
(4, 2, '16:35:00', 5.0, 99.00);


DELIMITER //

CREATE PROCEDURE buscar_trabajador(IN nom VARCHAR(80))
BEGIN
    SELECT dni, nombre, turno
    FROM trabajador
    WHERE nombre=nom;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE buscar_venta(IN denei CHAR(8))
BEGIN
    SELECT v.hora, c.tipo, v.importe
    FROM venta v
    JOIN combustible c ON c.idcombustible = v.idcombustible
    JOIN trabajador t ON t.idtrabajador = v.idtrabajador
    WHERE t.dni=denei;
END //

DELIMITER ;
CALL buscar_venta('78521463')