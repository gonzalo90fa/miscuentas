-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-02-2021 a las 18:52:21
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
-- Base de datos: `gma-mi-billetera`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts_user1`
--

CREATE TABLE `accounts_user1` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(500) COLLATE utf8_bin NOT NULL,
  `reserve` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `accounts_user1`
--

INSERT INTO `accounts_user1` (`id`, `name`, `description`, `reserve`) VALUES
(1, 'Efectivo', 'Dinero en efectivo (billetera y demás).', 9110),
(2, 'Mercado Pago', 'Dinero en Mercado Pago', 11527.9),
(3, 'Plazo fijo', 'Plazo fijo con fecha 20. Suma $629,50 / mes.', 21400),
(4, 'Banco Patagonia', '-', 12500),
(5, 'Banco Galicia', '-', 10750);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `records_user1`
--

CREATE TABLE `records_user1` (
  `id` int(11) NOT NULL,
  `operation` varchar(50) COLLATE utf8_bin NOT NULL,
  `affectedAccounts` varchar(150) COLLATE utf8_bin NOT NULL,
  `amounts` varchar(150) COLLATE utf8_bin NOT NULL,
  `date` varchar(50) COLLATE utf8_bin NOT NULL,
  `origin` varchar(50) COLLATE utf8_bin NOT NULL,
  `note` varchar(500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tabla con todos los registros de operaciones del usuario.';

--
-- Volcado de datos para la tabla `records_user1`
--

INSERT INTO `records_user1` (`id`, `operation`, `affectedAccounts`, `amounts`, `date`, `origin`, `note`) VALUES
(1, 'income', 'Efectivo,Mercado Pago', '11700,10000', '02/09/2020 08:38', 'Página web Corralón', '-'),
(2, 'expense', 'Efectivo', '5260.32', '28/02/2021 17:23', 'Batería computadora', '-'),
(3, 'transfer', 'Efectivo,Mercado Pago', '3500,4750', '19/08/20 11:00', 'Banco Patagonia', 'Se sacó dinero del banco y parte se cargó a Mercado Pago.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts_user1`
--
ALTER TABLE `accounts_user1`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `records_user1`
--
ALTER TABLE `records_user1`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
