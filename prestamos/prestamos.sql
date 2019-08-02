-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-08-2019 a las 08:40:00
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prestamos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `cedula` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `empresa` varchar(100) NOT NULL,
  `nit` bigint(21) NOT NULL,
  `salario` bigint(21) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `estado` varchar(12) NOT NULL,
  `valor` varchar(30) NOT NULL,
  `motivo` varchar(200) NOT NULL,
  `fecha_solicitud` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellidos`, `cedula`, `fecha_nacimiento`, `empresa`, `nit`, `salario`, `fecha_ingreso`, `estado`, `valor`, `motivo`, `fecha_solicitud`) VALUES
(1, 'Danny Alejandro', 'Rojas Fuentes', 1093786701, '0000-00-00', '', 0, 0, '0000-00-00', '', '', '', '0000-00-00'),
(2, 'danny', 'rojas', 1093786702, '1996-07-28', 'imaginamos', 940234, 4000000, '2017-02-20', '1', '50.000.000', '', '2019-08-02'),
(3, 'danny', 'rojas', 1093786703, '1996-07-28', 'imaginamos', 784324, 700000, '2018-01-01', '', '0', 'Tu crÃ©dito ha sido rechazo porque no ganas el salario suficiente.', '2019-08-02'),
(4, 'dadas', 'dasdas', 12321441, '1998-09-29', 'sadasd', 4324324, 600000, '2018-01-01', '', '0', 'Tu crÃ©dito ha sido rechazo porque no ganas el salario suficiente.', '2019-08-02'),
(5, 'dadasd', 'dasd', 4328423, '1997-09-28', 'dadasd', 232434, 500000, '2017-01-01', '', '0', 'Tu crÃ©dito ha sido rechazo porque no ganas el salario suficiente.', '2019-08-02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
