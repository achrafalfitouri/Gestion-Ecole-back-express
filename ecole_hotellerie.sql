-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 09, 2025 at 05:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecole_hotellerie`
--

-- --------------------------------------------------------

--
-- Table structure for table `absence`
--

CREATE TABLE `absence` (
  `ID_Absence` int(11) NOT NULL,
  `ID_Etudiant` int(11) DEFAULT NULL,
  `ID_Classe` int(11) DEFAULT NULL,
  `DateDebutAbsence` date DEFAULT NULL,
  `DateFinAbsence` date DEFAULT NULL,
  `Nb_Heure` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `absence`
--

INSERT INTO `absence` (`ID_Absence`, `ID_Etudiant`, `ID_Classe`, `DateDebutAbsence`, `DateFinAbsence`, `Nb_Heure`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2023-09-20', '2023-09-20', 1, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 2, 2, '2023-09-21', '2023-09-21', 2, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, 3, 3, '2023-09-22', '2023-09-22', 2, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, 4, 4, '2023-09-23', '2023-09-23', 3, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, 5, 5, '2023-09-24', '2023-09-24', 2, '2024-07-17 19:10:16', '2024-07-17 19:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `anneescolaire`
--

CREATE TABLE `anneescolaire` (
  `ID_AnneeScolaire` int(11) NOT NULL,
  `AnneeScolaire` varchar(9) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `DateDebut` date NOT NULL,
  `DateFin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anneescolaire`
--

INSERT INTO `anneescolaire` (`ID_AnneeScolaire`, `AnneeScolaire`, `created_at`, `updated_at`, `DateDebut`, `DateFin`) VALUES
(1, '2023-2024', '2024-07-17 19:10:16', '2024-07-17 19:10:16', '2023-09-01', '2024-06-30'),
(2, '2024-2025', '2024-07-17 19:11:16', '2024-07-17 21:13:28', '2024-09-01', '2025-06-30');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `ID_Classe` int(11) NOT NULL,
  `NomClasse` varchar(100) NOT NULL,
  `ID_Filiere` int(11) DEFAULT NULL,
  `Groupe` varchar(100) DEFAULT NULL,
  `Niveau` varchar(100) DEFAULT NULL,
  `ID_AnneeScolaire` int(11) DEFAULT NULL,
  `Remarques` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`ID_Classe`, `NomClasse`, `ID_Filiere`, `Groupe`, `Niveau`, `ID_AnneeScolaire`, `Remarques`, `created_at`, `updated_at`) VALUES
(1, 'Classe1', 1, 'A', '1er annee', 1, NULL, '2024-07-17 19:10:16', '2024-07-17 21:46:58'),
(2, 'Classe2', 2, 'B', '2eme annee\n', 1, NULL, '2024-07-17 19:10:16', '2024-07-17 21:47:19'),
(3, 'Classe3', 3, 'C', '3eme annee\n\n', 1, NULL, '2024-07-17 19:10:16', '2024-07-17 21:47:50'),
(4, 'Classe4', 4, 'D', '4eme annee\n\n', 2, NULL, '2024-07-17 19:10:16', '2024-07-17 21:48:31'),
(5, 'Classe5', 5, 'E', '5eme annee\n', 2, NULL, '2024-07-17 19:10:16', '2024-07-17 21:48:53'),
(6, 'Classe1', 1, 'A', '1er annee\n', 2, NULL, '2024-07-17 19:10:16', '2024-07-17 21:48:45'),
(7, 'Classe6', 5, 'G1', NULL, 2, 'hhhhh', '2024-07-17 21:51:43', '2024-07-17 21:51:43');

--
-- Triggers `classes`
--
DELIMITER $$
CREATE TRIGGER `update_nombre_classe_on_delete` AFTER DELETE ON `classes` FOR EACH ROW BEGIN
    UPDATE filiere 
    SET NombreClasse = NombreClasse - 1 
    WHERE ID_Filiere = OLD.ID_Filiere;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_nombre_classe_on_insert` AFTER INSERT ON `classes` FOR EACH ROW BEGIN
    UPDATE filiere 
    SET NombreClasse = NombreClasse + 1 
    WHERE ID_Filiere = NEW.ID_Filiere;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_nombre_classe_on_update` AFTER UPDATE ON `classes` FOR EACH ROW BEGIN
    IF OLD.ID_Filiere != NEW.ID_Filiere THEN
        UPDATE filiere 
        SET NombreClasse = NombreClasse - 1 
        WHERE ID_Filiere = OLD.ID_Filiere;
        
        UPDATE filiere 
        SET NombreClasse = NombreClasse + 1 
        WHERE ID_Filiere = NEW.ID_Filiere;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `classesetudiants`
--

CREATE TABLE `classesetudiants` (
  `ID_Classe` int(11) NOT NULL,
  `ID_Etudiant` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detailsfacture`
--

CREATE TABLE `detailsfacture` (
  `ID_DetailFacture` int(11) NOT NULL,
  `ID_Facture` int(11) DEFAULT NULL,
  `Article` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Quantite` int(11) NOT NULL,
  `PrixUnitaire` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detailsfacture`
--

INSERT INTO `detailsfacture` (`ID_DetailFacture`, `ID_Facture`, `Article`, `Description`, `Quantite`, `PrixUnitaire`, `created_at`, `updated_at`) VALUES
(1, 1, 'mousse', 'cousina', 10, 100.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 2, 'frchita', 'cousina', 20, 200.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, 3, 'zlafa', 'cousina', 30, 300.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, 4, 'tbssil', 'cousina', 40, 400.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, 5, 'm9la', 'cousina', 50, 500.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(6, 6, 'souris', 'ff', 2, 10.00, '2024-07-18 12:57:26', '2024-07-18 12:57:26'),
(7, 7, 'souris', 'jj', 3, 50.00, '2024-07-18 13:38:20', '2024-07-18 13:38:20'),
(8, 7, 'clavier', 'jj', 4, 40.00, '2024-07-18 13:38:20', '2024-07-18 13:38:20');

-- --------------------------------------------------------

--
-- Table structure for table `etudiants`
--

CREATE TABLE `etudiants` (
  `ID_Etudiant` int(11) NOT NULL,
  `NumEtudiant` varchar(50) NOT NULL,
  `PrenomEtudiant` varchar(100) NOT NULL,
  `NomEtudiant` varchar(100) NOT NULL,
  `CIN` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Sexe` enum('Masculin','Féminin') NOT NULL,
  `DateNaissance` date DEFAULT NULL,
  `LieuNaissance` varchar(100) DEFAULT NULL,
  `Adresse` varchar(255) DEFAULT NULL,
  `Tel` varchar(15) DEFAULT NULL,
  `Nationalite` varchar(50) DEFAULT NULL,
  `ID_Filiere` int(11) NOT NULL,
  `ID_Classe` int(11) DEFAULT NULL,
  `PhotoProfil` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `etudiants`
--

INSERT INTO `etudiants` (`ID_Etudiant`, `NumEtudiant`, `PrenomEtudiant`, `NomEtudiant`, `CIN`, `Email`, `Sexe`, `DateNaissance`, `LieuNaissance`, `Adresse`, `Tel`, `Nationalite`, `ID_Filiere`, `ID_Classe`, `PhotoProfil`, `created_at`, `updated_at`) VALUES
(1, '2023001', 'Etudiant1', 'Nom1', 'E123456', 'etudiant1@example.com', 'Masculin', '2000-01-01', 'Ville1', 'Adresse1', '0600000001', 'Marocaine', 1, 1, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, '2023002', 'Etudiant2', 'Nom2', 'F123456', 'etudiant2@example.com', 'Féminin', '2000-02-02', 'Ville2', 'Adresse2', '0600000002', 'Marocaine', 2, 2, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, '2023003', 'Etudiant3', 'Nom3', 'G123456', 'etudiant3@example.com', 'Masculin', '2000-03-03', 'Ville3', 'Adresse3', '0600000003', 'Marocaine', 3, 3, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, '2023004', 'Etudiant4', 'Nom4', 'H123456', 'etudiant4@example.com', 'Féminin', '2000-04-04', 'Ville4', 'Adresse4', '0600000004', 'Marocaine', 4, 4, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, '2023005', 'Etudiant5', 'Nom5', 'I123456', 'etudiant5@example.com', 'Masculin', '2000-05-05', 'Ville5', 'Adresse5', '0600000005', 'Marocaine', 5, 5, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(6, '2023006', 'Etudiant6', 'Nom6', 'J123456', 'etudiant6@example.com', 'Masculin', '2000-06-06', 'Ville6', 'Adresse6', '0600000006', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(7, '2023007', 'Etudiant7', 'Nom7', 'K123456', 'etudiant7@example.com', 'Féminin', '2000-07-07', 'Ville7', 'Adresse7', '0600000007', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(8, '2023008', 'Etudiant8', 'Nom8', 'L123456', 'etudiant8@example.com', 'Masculin', '2000-08-08', 'Ville8', 'Adresse8', '0600000008', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(9, '2023009', 'Etudiant9', 'Nom9', 'M123456', 'etudiant9@example.com', 'Féminin', '2000-09-09', 'Ville9', 'Adresse9', '0600000009', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(10, '2023010', 'Etudiant10', 'Nom10', 'N123456', 'etudiant10@example.com', 'Masculin', '2000-10-10', 'Ville10', 'Adresse10', '0600000010', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(11, '2023011', 'Etudiant11', 'Nom11', 'O123456', 'etudiant11@example.com', 'Féminin', '2000-11-11', 'Ville11', 'Adresse11', '0600000011', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(12, '2023012', 'Etudiant12', 'Nom12', 'P123456', 'etudiant12@example.com', 'Masculin', '2000-12-12', 'Ville12', 'Adresse12', '0600000012', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(13, '2023013', 'Etudiant13', 'Nom13', 'Q123456', 'etudiant13@example.com', 'Féminin', '2000-01-13', 'Ville13', 'Adresse13', '0600000013', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(14, '2023014', 'Etudiant14', 'Nom14', 'R123456', 'etudiant14@example.com', 'Masculin', '2000-02-14', 'Ville14', 'Adresse14', '0600000014', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(15, '2023015', 'Etudiant15', 'Nom15', 'S123456', 'etudiant15@example.com', 'Féminin', '2000-03-15', 'Ville15', 'Adresse15', '0600000015', 'Marocaine', 1, 1, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(16, '2023016', 'Etudiant16', 'Nom16', 'T123456', 'etudiant16@example.com', 'Masculin', '2000-04-16', 'Ville16', 'Adresse16', '0600000016', 'Marocaine', 2, 2, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(17, '2023017', 'Etudiant17', 'Nom17', 'U123456', 'etudiant17@example.com', 'Féminin', '2000-05-17', 'Ville17', 'Adresse17', '0600000017', 'Marocaine', 2, 2, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(18, '2023018', 'Etudiant18', 'Nom18', 'V123456', 'etudiant18@example.com', 'Masculin', '2000-06-18', 'Ville18', 'Adresse18', '0600000018', 'Marocaine', 2, 2, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(19, '2023019', 'Etudiant19', 'Nom19', 'W123456', 'etudiant19@example.com', 'Féminin', '2000-07-19', 'Ville19', 'Adresse19', '0600000019', 'Marocaine', 2, 2, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(20, '2023020', 'Etudiant20', 'Nom20', 'X123456', 'etudiant20@example.com', 'Masculin', '2000-08-20', 'Ville20', 'Adresse20', '0600000020', 'Marocaine', 3, 3, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(21, '2023021', 'Etudiant21', 'Nom21', 'Y123456', 'etudiant21@example.com', 'Féminin', '2000-09-21', 'Ville21', 'Adresse21', '0600000021', 'Marocaine', 3, 3, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(22, '2023022', 'Etudiant22', 'Nom22', 'Z123456', 'etudiant22@example.com', 'Masculin', '2000-10-22', 'Ville22', 'Adresse22', '0600000022', 'Marocaine', 3, 3, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(23, '2023023', 'Etudiant23', 'Nom23', 'A234567', 'etudiant23@example.com', 'Féminin', '2000-11-23', 'Ville23', 'Adresse23', '0600000023', 'Marocaine', 3, 3, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(24, '2023024', 'Etudiant24', 'Nom24', 'B234567', 'etudiant24@example.com', 'Masculin', '2000-12-24', 'Ville24', 'Adresse24', '0600000024', 'Marocaine', 3, 3, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(25, '2023025', 'Etudiant25', 'Nom25', 'C234567', 'etudiant25@example.com', 'Féminin', '2000-01-25', 'Ville25', 'Adresse25', '0600000025', 'Marocaine', 4, 4, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(26, '2023026', 'Etudiant26', 'Nom26', 'D234567', 'etudiant26@example.com', 'Masculin', '2000-02-26', 'Ville26', 'Adresse26', '0600000026', 'Marocaine', 4, 4, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(27, '2023027', 'Etudiant27', 'Nom27', 'E234567', 'etudiant27@example.com', 'Féminin', '2000-03-27', 'Ville27', 'Adresse27', '0600000027', 'Marocaine', 4, 4, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(28, '2023028', 'Etudiant28', 'Nom28', 'F234567', 'etudiant28@example.com', 'Masculin', '2000-04-28', 'Ville28', 'Adresse28', '0600000028', 'Marocaine', 5, 5, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(29, '2023029', 'Etudiant29', 'Nom29', 'G234567', 'etudiant29@example.com', 'Féminin', '2000-05-29', 'Ville29', 'Adresse29', '0600000029', 'Marocaine', 5, 5, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(30, '2023030', 'Etudiant30', 'Nom30', 'H234567', 'etudiant30@example.com', 'Masculin', '2000-06-30', 'Ville30', 'Adresse30', '0600000030', 'Marocaine', 5, 5, NULL, '2024-07-17 19:19:10', '2024-07-17 19:19:10'),
(31, '2023031', 'Etudiant31', 'Nom31', 'I234567', 'etudiant31@example.com', 'Masculin', '2024-07-18', 'Ville31', 'Adresse31', '0600000031', 'Marocaine', 1, 6, 'PhotoProfil_1721303629472.png', '2024-07-17 19:31:01', '2024-07-18 12:53:49'),
(32, '2023032', 'Etudiant32', 'Nom32', 'J234567', 'etudiant32@example.com', 'Féminin', '2000-08-02', 'Ville32', 'Adresse32', '0600000032', 'Marocaine', 1, 6, NULL, '2024-07-17 19:31:01', '2024-07-17 19:31:01'),
(33, '2023033', 'Etudiant33', 'Nom33', 'K234567', 'etudiant33@example.com', 'Masculin', '2000-09-03', 'Ville33', 'Adresse33', '0600000033', 'Marocaine', 1, 6, NULL, '2024-07-17 19:31:01', '2024-07-17 19:31:01'),
(34, '2023034', 'Etudiant34', 'Nom34', 'L234567', 'etudiant34@example.com', 'Féminin', '2000-10-04', 'Ville34', 'Adresse34', '0600000034', 'Marocaine', 1, 6, NULL, '2024-07-17 19:31:01', '2024-07-17 19:31:01'),
(35, '2023035', 'Etudiant35', 'Nom35', 'M234567', 'etudiant35@example.com', 'Masculin', '2000-11-05', 'Ville35', 'Adresse35', '0600000035', 'Marocaine', 1, 6, NULL, '2024-07-17 19:31:01', '2024-07-17 19:31:01');

--
-- Triggers `etudiants`
--
DELIMITER $$
CREATE TRIGGER `update_nombre_etudiant_on_delete` AFTER DELETE ON `etudiants` FOR EACH ROW BEGIN
    UPDATE filiere 
    SET NombreEtudiant = NombreEtudiant - 1 
    WHERE ID_Filiere = OLD.ID_Filiere;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_nombre_etudiant_on_insert` AFTER INSERT ON `etudiants` FOR EACH ROW BEGIN
    UPDATE filiere 
    SET NombreEtudiant = NombreEtudiant + 1 
    WHERE ID_Filiere = NEW.ID_Filiere;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_nombre_etudiant_on_update` AFTER UPDATE ON `etudiants` FOR EACH ROW BEGIN
    IF OLD.ID_Filiere != NEW.ID_Filiere THEN
        UPDATE filiere 
        SET NombreEtudiant = NombreEtudiant - 1 
        WHERE ID_Filiere = OLD.ID_Filiere;
        
        UPDATE filiere 
        SET NombreEtudiant = NombreEtudiant + 1 
        WHERE ID_Filiere = NEW.ID_Filiere;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_nombre_etudiant_stat` AFTER INSERT ON `etudiants` FOR EACH ROW BEGIN
    DECLARE filiere_id INT;
    DECLARE anneescolaire_id INT;
    DECLARE nombre_etudiant INT;

    -- Get the filiere ID and anneescolaire ID for the new student
    SELECT c.ID_Filiere, c.ID_AnneeScolaire INTO filiere_id, anneescolaire_id
    FROM classes c
    JOIN etudiants e ON c.ID_Classe = e.ID_Classe
    WHERE e.ID_Etudiant = NEW.ID_Etudiant;

    -- Calculate the number of students in the filiere and anneescolaire
    SELECT COUNT(e.ID_Etudiant) INTO nombre_etudiant
    FROM etudiants e
    JOIN classes c ON e.ID_Classe = c.ID_Classe
    WHERE c.ID_Filiere = filiere_id AND c.ID_AnneeScolaire = anneescolaire_id;

    -- Update or insert into the stats table
    INSERT INTO stats (Stat_name, Stat_value)
    VALUES ('NombreEtudiant_Filiere_' || filiere_id, nombre_etudiant)
    ON DUPLICATE KEY UPDATE Stat_value = nombre_etudiant;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `factures`
--

CREATE TABLE `factures` (
  `ID_Facture` int(11) NOT NULL,
  `TypeFacture` enum('Entree','Sortie') NOT NULL,
  `DateFacture` date DEFAULT NULL,
  `SousMontant` decimal(10,2) DEFAULT NULL,
  `Montant` decimal(10,2) DEFAULT NULL,
  `ID_Taxe` int(11) DEFAULT NULL,
  `ID_Fournisseur` int(11) DEFAULT NULL,
  `ID_Etudiant` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `factures`
--

INSERT INTO `factures` (`ID_Facture`, `TypeFacture`, `DateFacture`, `SousMontant`, `Montant`, `ID_Taxe`, `ID_Fournisseur`, `ID_Etudiant`, `created_at`, `updated_at`) VALUES
(1, 'Entree', '2023-07-01', 1000.00, 1000.00, NULL, 1, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 'Entree', '2023-07-02', 4000.00, 4000.00, NULL, 2, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, 'Entree', '2023-07-03', 9000.00, 9000.00, NULL, 3, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, 'Sortie', '2023-07-04', 16000.00, 16000.00, NULL, 4, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, 'Sortie', '2023-07-05', 25000.00, 25000.00, NULL, 5, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(6, 'Entree', '2024-07-18', 20.00, 24.00, 1, 1, NULL, '2024-07-18 12:57:26', '2024-07-18 12:57:26'),
(7, 'Entree', '2024-07-18', 310.00, 372.00, 1, 2, NULL, '2024-07-18 13:38:19', '2024-07-18 13:38:19'),
(8, 'Entree', '2024-09-14', 5000.00, 1000.00, NULL, NULL, 1, '2024-09-14 11:27:12', '2024-09-14 11:27:12');

-- --------------------------------------------------------

--
-- Table structure for table `filiere`
--

CREATE TABLE `filiere` (
  `ID_Filiere` int(11) NOT NULL,
  `NomFiliere` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `NombreEtudiant` int(11) DEFAULT 0,
  `NombreClasse` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `filiere`
--

INSERT INTO `filiere` (`ID_Filiere`, `NomFiliere`, `created_at`, `updated_at`, `NombreEtudiant`, `NombreClasse`) VALUES
(1, 'Informatique', '2024-07-17 19:10:16', '2024-07-17 19:31:01', 16, 2),
(2, 'Gestion', '2024-07-17 19:10:16', '2024-07-17 19:19:10', 5, 1),
(3, 'Hôtellerie', '2024-07-17 19:10:16', '2024-07-17 19:19:10', 6, 1),
(4, 'Tourisme', '2024-07-17 19:10:16', '2024-07-17 19:19:10', 4, 1),
(5, 'Commerce', '2024-07-17 19:10:16', '2024-07-17 21:51:43', 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `formateurs`
--

CREATE TABLE `formateurs` (
  `ID_Formateur` int(11) NOT NULL,
  `NomFormateur` varchar(100) NOT NULL,
  `PrenomFormateur` varchar(100) NOT NULL,
  `CIN` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Titre` varchar(50) DEFAULT NULL,
  `Diplome` varchar(100) DEFAULT NULL,
  `ID_Filiere` int(11) DEFAULT NULL,
  `EtatFormateur` varchar(50) DEFAULT NULL,
  `Adresse` varchar(255) DEFAULT NULL,
  `Tel` varchar(15) DEFAULT NULL,
  `DateNaissance` date DEFAULT NULL,
  `Salaire` bigint(30) DEFAULT NULL,
  `Mois_Paie` enum('Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre') DEFAULT NULL,
  `Contrat` enum('CDI','CDD','INT','STG','APP','TP','PT','SAS') NOT NULL,
  `DateEmbauche` date DEFAULT NULL,
  `PhotoProfil` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formateurs`
--

INSERT INTO `formateurs` (`ID_Formateur`, `NomFormateur`, `PrenomFormateur`, `CIN`, `Email`, `Titre`, `Diplome`, `ID_Filiere`, `EtatFormateur`, `Adresse`, `Tel`, `DateNaissance`, `Salaire`, `Mois_Paie`, `Contrat`, `DateEmbauche`, `PhotoProfil`, `created_at`, `updated_at`) VALUES
(1, 'Formateur1', 'Prenom1', 'F123456', 'formateur1@example.com', 'Professeur', 'PhD', 1, 'Actif', 'Adresse1', '0700000001', '1980-01-01', 12000, 'Janvier', 'CDI', '2015-01-01', NULL, '2024-07-17 19:10:16', '2024-07-18 00:56:24'),
(2, 'Formateur2', 'Prenom2', 'G123456', 'formateur2@example.com', 'Professeur', 'PhD', 2, 'Actif', 'Adresse2', '0700000002', '1982-02-02', 11000, 'Janvier', 'CDI', '2016-02-01', NULL, '2024-07-17 19:10:16', '2024-07-18 00:56:29'),
(3, 'Formateur3', 'Prenom3', 'H123456', 'formateur3@example.com', 'Professeur', 'PhD', 3, 'Actif', 'Adresse3', '0700000003', '1984-03-03', 11500, 'Mars', 'CDI', '2017-03-01', NULL, '2024-07-17 19:10:16', '2024-07-18 00:56:36'),
(4, 'Formateur4', 'Prenom4', 'I123456', 'formateur4@example.com', 'Professeur', 'PhD', 4, 'Actif', 'Adresse4', '0700000004', '1986-04-04', 11800, 'Mars', 'CDI', '2018-04-01', NULL, '2024-07-17 19:10:16', '2024-07-18 00:56:40'),
(5, 'Formateur5', 'Prenom5', 'J123456', 'formateur5@example.com', 'Professeur', 'PhD', 5, 'Actif', 'Adresse5', '0700000005', '1988-05-05', 11900, 'Mars', 'CDI', '2019-05-01', NULL, '2024-07-17 19:10:16', '2024-07-18 00:56:46');

-- --------------------------------------------------------

--
-- Table structure for table `fournisseurs`
--

CREATE TABLE `fournisseurs` (
  `ID_Fournisseur` int(11) NOT NULL,
  `NomFournisseur` varchar(100) NOT NULL,
  `Adresse` varchar(255) DEFAULT NULL,
  `Tel` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fournisseurs`
--

INSERT INTO `fournisseurs` (`ID_Fournisseur`, `NomFournisseur`, `Adresse`, `Tel`, `Email`, `created_at`, `updated_at`) VALUES
(1, 'Fournisseur1', 'Adresse1', '0600000001', 'fournisseur1@example.com', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 'Fournisseur2', 'Adresse2', '0600000002', 'fournisseur2@example.com', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, 'Fournisseur3', 'Adresse3', '0600000003', 'fournisseur3@example.com', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, 'Fournisseur4', 'Adresse4', '0600000004', 'fournisseur4@example.com', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, 'Fournisseur5', 'Adresse5', '0600000005', 'fournisseur5@example.com', '2024-07-17 19:10:16', '2024-07-17 19:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `inscription`
--

CREATE TABLE `inscription` (
  `ID_Inscription` int(11) NOT NULL,
  `ID_Etudiant` int(11) DEFAULT NULL,
  `DateDebutInscription` date DEFAULT NULL,
  `DateFinInscription` date DEFAULT NULL,
  `Mois_Paie` enum('Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre') NOT NULL,
  `FraisInscription` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inscription`
--

INSERT INTO `inscription` (`ID_Inscription`, `ID_Etudiant`, `DateDebutInscription`, `DateFinInscription`, `Mois_Paie`, `FraisInscription`, `created_at`, `updated_at`) VALUES
(1, 1, '2023-09-01', '2023-10-01', 'Janvier', 1000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 2, '2023-09-02', '2023-10-02', 'Janvier', 1000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, 3, '2023-09-03', '2023-10-03', 'Mars', 1000.00, '2024-07-17 19:10:16', '2024-07-18 01:52:48'),
(4, 4, '2023-09-04', '2023-10-04', 'Mars', 1000.00, '2024-07-17 19:10:16', '2024-07-18 01:52:52'),
(5, 5, '2023-09-05', '2023-10-05', 'Mars', 1000.00, '2024-07-17 19:10:16', '2024-07-18 01:52:57'),
(6, 31, '2024-07-16', '2024-07-17', 'Janvier', 1000.00, '2024-07-19 02:33:43', '2024-09-14 10:31:23');

-- --------------------------------------------------------

--
-- Table structure for table `matieres`
--

CREATE TABLE `matieres` (
  `ID_Matiere` int(11) NOT NULL,
  `NomMatiere` varchar(100) NOT NULL,
  `ID_Classe` int(11) DEFAULT NULL,
  `ID_Formateur` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matieres`
--

INSERT INTO `matieres` (`ID_Matiere`, `NomMatiere`, `ID_Classe`, `ID_Formateur`, `created_at`, `updated_at`) VALUES
(1, 'Mathematiques', 1, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 'Physique', 2, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, 'Chimie', 3, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, 'Biologie', 4, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, 'Informatique', 5, NULL, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(6, 'java', 1, 5, '2024-09-14 11:12:04', '2024-09-14 11:12:04');

-- --------------------------------------------------------

--
-- Table structure for table `modepaiement`
--

CREATE TABLE `modepaiement` (
  `ID_ModePaiement` int(11) NOT NULL,
  `ModePaiement` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modepaiement`
--

INSERT INTO `modepaiement` (`ID_ModePaiement`, `ModePaiement`, `created_at`, `updated_at`) VALUES
(1, 'Chèque', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 'Espèce', '2024-07-17 19:10:16', '2024-07-17 19:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `niveau`
--

CREATE TABLE `niveau` (
  `ID_Niveau` int(11) NOT NULL,
  `ID_Classe` int(11) DEFAULT NULL,
  `Niveau` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `niveau`
--

INSERT INTO `niveau` (`ID_Niveau`, `ID_Classe`, `Niveau`, `created_at`, `updated_at`) VALUES
(1, 1, 'Débutant', '2024-07-17 19:10:16', '2024-07-17 19:34:24'),
(2, 2, 'Intermédiaire', '2024-07-17 19:10:16', '2024-07-17 19:34:31'),
(3, 3, 'Avancé', '2024-07-17 19:10:16', '2024-07-17 19:34:36'),
(4, 4, 'Expert', '2024-07-17 19:10:16', '2024-07-17 19:34:39');

-- --------------------------------------------------------

--
-- Table structure for table `paiementetudiants`
--

CREATE TABLE `paiementetudiants` (
  `ID_PaiementEtudiants` int(11) NOT NULL,
  `ID_Inscription` int(11) DEFAULT NULL,
  `ID_TypePaiement` int(11) DEFAULT NULL,
  `ID_Etudiant` int(11) DEFAULT NULL,
  `DatePaiementEtudiants` date DEFAULT NULL,
  `Montant` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Reste` decimal(10,2) DEFAULT 0.00,
  `MontantTotal` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paiementetudiants`
--

INSERT INTO `paiementetudiants` (`ID_PaiementEtudiants`, `ID_Inscription`, `ID_TypePaiement`, `ID_Etudiant`, `DatePaiementEtudiants`, `Montant`, `created_at`, `updated_at`, `Reste`, `MontantTotal`) VALUES
(1, 1, 1, 1, '2023-09-10', 5000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', -4000.00, 1000.00),
(2, 2, 2, 2, '2023-09-11', 6000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', -5000.00, 1000.00),
(3, 3, 1, 3, '2023-09-12', 7000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', -6000.00, 1000.00),
(4, 4, 2, 4, '2023-09-13', 8000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', -7000.00, 1000.00),
(5, 5, 1, 5, '2023-09-14', 9000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', -8000.00, 1000.00);

--
-- Triggers `paiementetudiants`
--
DELIMITER $$
CREATE TRIGGER `before_insert_paiementetudiants` BEFORE INSERT ON `paiementetudiants` FOR EACH ROW BEGIN
  DECLARE frais_inscription DECIMAL(10,2);
  
  -- Récupérer les frais d'inscription à partir de l'ID_Inscription de la nouvelle ligne
  SELECT FraisInscription INTO frais_inscription 
  FROM inscription 
  WHERE ID_Inscription = NEW.ID_Inscription;
  
  -- Calculer le montant total
  
    SET NEW.Reste = frais_inscription - NEW.Montant;
    SET NEW.MontantTotal = frais_inscription ;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_paiementetudiants` BEFORE UPDATE ON `paiementetudiants` FOR EACH ROW BEGIN
  DECLARE frais_inscription DECIMAL(10,2);
  
  -- Récupérer les frais d'inscription à partir de l'ID_Inscription de la ligne existante
  SELECT FraisInscription INTO frais_inscription 
  FROM inscription 
  WHERE ID_Inscription = NEW.ID_Inscription;
  
  -- Calculer le montant total
   SET NEW.Reste = frais_inscription - NEW.Montant;
    SET NEW.MontantTotal = frais_inscription ;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `paiementpersonnel`
--

CREATE TABLE `paiementpersonnel` (
  `ID_PaiementPersonnel` int(11) NOT NULL,
  `ID_Personnel` int(11) DEFAULT NULL,
  `ID_TypePaiement` int(11) DEFAULT NULL,
  `DatePaiementPersonnel` date DEFAULT NULL,
  `Montant` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Reste` decimal(10,2) DEFAULT NULL,
  `MontantTotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paiementpersonnel`
--

INSERT INTO `paiementpersonnel` (`ID_PaiementPersonnel`, `ID_Personnel`, `ID_TypePaiement`, `DatePaiementPersonnel`, `Montant`, `created_at`, `updated_at`, `Reste`, `MontantTotal`) VALUES
(1, 1, 1, '2023-09-15', 15000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 0.00, 15000.00),
(2, 2, 2, '2023-09-16', 8000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 0.00, 8000.00),
(3, 3, 1, '2023-09-17', 6000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 0.00, 6000.00),
(4, 4, 2, '2023-09-18', 9000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 0.00, 9000.00),
(5, 5, 1, '2023-09-19', 5000.00, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 0.00, 5000.00);

--
-- Triggers `paiementpersonnel`
--
DELIMITER $$
CREATE TRIGGER `before_insert_paiementpersonnel` BEFORE INSERT ON `paiementpersonnel` FOR EACH ROW BEGIN
 DECLARE salaires DECIMAL(10,2);
  
  -- Fetch the Salaire of the personnel
  SELECT Salaire INTO salaires 
  FROM personnel 
  WHERE ID_Personnel = NEW.ID_Personnel;
  
  -- Calculate the Reste and set MontantTotal
  SET NEW.Reste = salaires - NEW.Montant;
  SET NEW.MontantTotal = salaires;
    

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_paiementpersonnel` BEFORE UPDATE ON `paiementpersonnel` FOR EACH ROW BEGIN
   DECLARE salaires DECIMAL(10,2);
  
  -- Fetch the Salaire of the personnel
  SELECT Salaire INTO salaires 
  FROM personnel 
  WHERE ID_Personnel = NEW.ID_Personnel;
  
  -- Calculate the Reste and set MontantTotal
  SET NEW.Reste = salaires - NEW.Montant;
  SET NEW.MontantTotal = salaires;
    

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `personnel`
--

CREATE TABLE `personnel` (
  `ID_Personnel` int(11) NOT NULL,
  `EtatPersonnel` varchar(50) DEFAULT NULL,
  `NomPersonnel` varchar(100) NOT NULL,
  `PrenomPersonnel` varchar(100) NOT NULL,
  `CIN` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Titre` varchar(50) DEFAULT NULL,
  `Salaire` decimal(10,2) DEFAULT NULL,
  `Mois_Paie` enum('Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre') DEFAULT NULL,
  `Contrat` enum('CDI','CDD','INT','STG','APP','TP','PT','SAS') NOT NULL,
  `DateEmbauche` date DEFAULT NULL,
  `DateNaissance` date DEFAULT NULL,
  `PhotoProfil` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personnel`
--

INSERT INTO `personnel` (`ID_Personnel`, `EtatPersonnel`, `NomPersonnel`, `PrenomPersonnel`, `CIN`, `Email`, `Titre`, `Salaire`, `Mois_Paie`, `Contrat`, `DateEmbauche`, `DateNaissance`, `PhotoProfil`, `created_at`, `updated_at`) VALUES
(1, 'Actif', 'Doe', 'John', 'A123456', 'johndoe@example.com', 'Directeur', 15000.00, 'Janvier', 'CDI', '2020-01-15', '1980-05-20', NULL, '2024-07-17 19:10:16', '2024-07-18 00:56:56'),
(2, 'Actif', 'Smith', 'Jane', 'B123456', 'janesmith@example.com', 'Secrétaire', 8000.00, 'Janvier', 'CDI', '2018-03-22', '1985-07-10', NULL, '2024-07-17 19:10:16', '2024-07-18 00:57:04'),
(3, 'Actif', 'Brown', 'Charlie', 'C123456', 'charliebrown@example.com', 'Technicien', 6000.00, 'Mars', 'CDI', '2019-09-30', '1990-11-25', NULL, '2024-07-17 19:10:16', '2024-07-18 00:57:30'),
(4, 'Actif', 'Johnson', 'Chris', 'D123456', 'chrisjohnson@example.com', 'Comptable', 9000.00, 'Mars', 'CDI', '2017-06-10', '1982-02-15', NULL, '2024-07-17 19:10:16', '2024-07-18 00:57:36'),
(5, 'Actif', 'Williams', 'Pat', 'E123456', 'patwilliams@example.com', 'Agent', 5000.00, 'Mars', 'CDD', '2021-08-05', '1992-12-05', NULL, '2024-07-17 19:10:16', '2024-07-18 00:57:41');

-- --------------------------------------------------------

--
-- Table structure for table `planning`
--

CREATE TABLE `planning` (
  `ID_Planning` int(11) NOT NULL,
  `ID_Classe` int(11) NOT NULL,
  `ID_Matiere` int(11) NOT NULL,
  `ID_Salle` int(11) DEFAULT NULL,
  `ID_Formateur` int(11) DEFAULT NULL,
  `Jour` enum('Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche') NOT NULL,
  `HeureDebut` time NOT NULL,
  `HeureFin` time NOT NULL,
  `Nb_Heure` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `planning`
--

INSERT INTO `planning` (`ID_Planning`, `ID_Classe`, `ID_Matiere`, `ID_Salle`, `ID_Formateur`, `Jour`, `HeureDebut`, `HeureFin`, `Nb_Heure`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, 'Lundi', '08:00:00', '10:00:00', 2, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 2, 2, 2, 2, 'Mardi', '10:00:00', '12:00:00', 2, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, 3, 3, 3, 3, 'Mercredi', '14:00:00', '16:00:00', 2, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, 4, 4, 4, 4, 'Jeudi', '08:00:00', '10:00:00', 2, '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, 5, 5, 5, 5, 'Vendredi', '10:00:00', '12:00:00', 2, '2024-07-17 19:10:16', '2024-07-17 19:10:16');

--
-- Triggers `planning`
--
DELIMITER $$
CREATE TRIGGER `update_salle_disponibilite` AFTER INSERT ON `planning` FOR EACH ROW BEGIN
    DECLARE creneaux TEXT;

    -- Récupérer les créneaux affectés
    SET creneaux = (
        SELECT GROUP_CONCAT(CONCAT(p.Jour, ': ', p.HeureDebut, '-', p.HeureFin) SEPARATOR ', ')
        FROM planning p
        WHERE p.ID_Salle = NEW.ID_Salle
    );

    -- Mettre à jour la table salle
    UPDATE salle s
    SET s.CreneauxAffectes = creneaux
    WHERE s.ID_Salle = NEW.ID_Salle;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_salle_disponibilite_delete` AFTER DELETE ON `planning` FOR EACH ROW BEGIN
    DECLARE creneaux TEXT;

    -- Récupérer les créneaux affectés
    SET creneaux = (
        SELECT GROUP_CONCAT(CONCAT(p.Jour, ': ', p.HeureDebut, '-', p.HeureFin) SEPARATOR ', ')
        FROM planning p
        WHERE p.ID_Salle = OLD.ID_Salle
    );

    -- Mettre à jour la table salle
    UPDATE salle s
    SET s.CreneauxAffectes = creneaux
    WHERE s.ID_Salle = OLD.ID_Salle;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_salle_disponibilite_update` AFTER UPDATE ON `planning` FOR EACH ROW BEGIN
    DECLARE creneaux TEXT;

    -- Récupérer les créneaux affectés
    SET creneaux = (
        SELECT GROUP_CONCAT(CONCAT(p.Jour, ': ', p.HeureDebut, '-', p.HeureFin) SEPARATOR ', ')
        FROM planning p
        WHERE p.ID_Salle = NEW.ID_Salle
    );

    -- Mettre à jour la table salle
    UPDATE salle s
    SET s.CreneauxAffectes = creneaux
    WHERE s.ID_Salle = NEW.ID_Salle;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rendezvous`
--

CREATE TABLE `rendezvous` (
  `ID_RendezVous` int(11) NOT NULL,
  `DateRendezVous` date NOT NULL,
  `HeureDebut` time NOT NULL,
  `HeureFin` time NOT NULL,
  `Sujet` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rendezvous`
--

INSERT INTO `rendezvous` (`ID_RendezVous`, `DateRendezVous`, `HeureDebut`, `HeureFin`, `Sujet`, `Description`, `created_at`, `updated_at`) VALUES
(1, '2023-09-25', '09:00:00', '10:00:00', 'Entretien', 'Meet', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, '2023-09-26', '10:00:00', '11:00:00', 'Suivi', 'Meet', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, '2023-09-27', '11:00:00', '12:00:00', 'Orientation', 'Meet', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, '2023-09-28', '12:00:00', '13:00:00', 'Conseil', 'Meet', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, '2023-09-29', '13:00:00', '14:00:00', 'Assistance', 'Meet', '2024-07-17 19:10:16', '2024-07-17 19:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `ID_Role` int(11) NOT NULL,
  `NomRole` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`ID_Role`, `NomRole`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 'User', '2024-07-17 19:10:16', '2024-07-17 19:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `salle`
--

CREATE TABLE `salle` (
  `ID_Salle` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Capacite` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `CreneauxAffectes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salle`
--

INSERT INTO `salle` (`ID_Salle`, `Nom`, `Capacite`, `created_at`, `updated_at`, `CreneauxAffectes`) VALUES
(1, 'Salle1', 30, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 'Lundi: 08:00:00-10:00:00'),
(2, 'Salle2', 25, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 'Mardi: 10:00:00-12:00:00'),
(3, 'Salle3', 35, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 'Mercredi: 14:00:00-16:00:00'),
(4, 'Salle4', 40, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 'Jeudi: 08:00:00-10:00:00'),
(5, 'Salle5', 20, '2024-07-17 19:10:16', '2024-07-17 19:10:16', 'Vendredi: 10:00:00-12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `stages`
--

CREATE TABLE `stages` (
  `ID_Stage` int(11) NOT NULL,
  `ID_Etudiant` int(11) DEFAULT NULL,
  `ID_Classe` int(11) DEFAULT NULL,
  `Entreprise` varchar(100) NOT NULL,
  `DateDebut` date DEFAULT NULL,
  `DateFin` date DEFAULT NULL,
  `Tuteur` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stages`
--

INSERT INTO `stages` (`ID_Stage`, `ID_Etudiant`, `ID_Classe`, `Entreprise`, `DateDebut`, `DateFin`, `Tuteur`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Entreprise1', '2023-09-25', '2023-11-25', 'Tuteur1', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 2, 2, 'Entreprise2', '2023-09-26', '2023-11-26', 'Tuteur2', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(3, 3, 3, 'Entreprise3', '2023-09-27', '2023-11-27', 'Tuteur3', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(4, 4, 4, 'Entreprise4', '2023-09-28', '2023-11-28', 'Tuteur4', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(5, 5, 5, 'Entreprise5', '2023-09-29', '2023-11-29', 'Tuteur5', '2024-07-17 19:10:16', '2024-07-17 19:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `ID_Stats` int(11) NOT NULL,
  `Stat_name` varchar(255) NOT NULL,
  `Stat_value` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`ID_Stats`, `Stat_name`, `Stat_value`, `updated_at`, `created_at`) VALUES
(1, '1', 1, '2024-07-17 18:10:16', '2024-07-17 18:10:16'),
(2, '1', 1, '2024-07-17 18:10:16', '2024-07-17 18:10:16'),
(3, '1', 1, '2024-07-17 18:10:16', '2024-07-17 18:10:16'),
(4, '1', 1, '2024-07-17 18:10:16', '2024-07-17 18:10:16'),
(5, '1', 1, '2024-07-17 18:10:16', '2024-07-17 18:10:16'),
(6, '1', 2, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(7, '1', 3, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(8, '1', 4, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(9, '1', 5, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(10, '1', 6, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(11, '1', 7, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(12, '1', 8, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(13, '1', 9, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(14, '1', 10, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(15, '1', 11, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(16, '1', 2, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(17, '1', 3, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(18, '1', 4, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(19, '1', 5, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(20, '1', 2, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(21, '1', 3, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(22, '1', 4, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(23, '1', 5, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(24, '1', 6, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(25, '1', 2, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(26, '1', 3, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(27, '1', 4, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(28, '1', 2, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(29, '1', 3, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(30, '1', 4, '2024-07-17 18:19:10', '2024-07-17 18:19:10'),
(31, '1', 1, '2024-07-17 18:31:01', '2024-07-17 18:31:01'),
(32, '1', 2, '2024-07-17 18:31:01', '2024-07-17 18:31:01'),
(33, '1', 3, '2024-07-17 18:31:01', '2024-07-17 18:31:01'),
(34, '1', 4, '2024-07-17 18:31:01', '2024-07-17 18:31:01'),
(35, '1', 5, '2024-07-17 18:31:01', '2024-07-17 18:31:01');

-- --------------------------------------------------------

--
-- Table structure for table `taxes`
--

CREATE TABLE `taxes` (
  `ID_Taxe` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Valeur` decimal(5,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taxes`
--

INSERT INTO `taxes` (`ID_Taxe`, `Nom`, `Valeur`, `created_at`, `updated_at`) VALUES
(1, 'TVA', 20.00, '2024-07-17 18:10:16', '2024-07-17 18:10:16'),
(2, 'IS', 30.00, '2024-07-17 18:10:16', '2024-07-17 18:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `typepaiement`
--

CREATE TABLE `typepaiement` (
  `ID_TypePaiement` int(11) NOT NULL,
  `TypePaiement` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `typepaiement`
--

INSERT INTO `typepaiement` (`ID_TypePaiement`, `TypePaiement`, `created_at`, `updated_at`) VALUES
(1, 'Sur place', '2024-07-17 19:10:16', '2024-07-17 19:10:16'),
(2, 'A la livraison', '2024-07-17 19:10:16', '2024-07-17 19:10:16');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `ID_Utilisateur` int(11) NOT NULL,
  `NomUtilisateur` varchar(100) NOT NULL,
  `PrenomUtilisateur` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `MotDePasse` varchar(255) NOT NULL,
  `ID_Role` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilisateurs`
--

INSERT INTO `utilisateurs` (`ID_Utilisateur`, `NomUtilisateur`, `PrenomUtilisateur`, `Email`, `MotDePasse`, `ID_Role`, `created_at`, `updated_at`) VALUES
(5, 'Alfitouri', 'Achraf', 'achrafalfitouri@gmail.com', '$2a$10$RO5u.u.VcrWrrHfAUnsMN.YwvzE8CIQNmk9jrV1suiBeEByW874qC', 1, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(6, 'Nghimi', 'Taha', 'taha@mail.com', '$2b$10$Q.iRkX2/hryDsdm1QzaRt.8NfZsEyiq5RSICC6i8Ii7H9ZUyBRnKq', 1, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(34, 'Nghimi', 'Taha', 'taha1@mail.com', '$2b$10$ZlZThM9poJb/B3rYGgttMOnrxcENInJVJLtmfgAMjpSrJw2y6Th4W', NULL, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(35, 'Alfitouria', 'Achrafa', 'achrafalfitouri1@gmail.com', '$2b$10$KAN2acOLMQGjJXJYN8WYcub83eV4PPhioCuW6k8Zr90ol7w9Eh8mK', NULL, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(36, 'Alfitouridc', 'Achrafdcd', 'achrafaldcfitouri1@gmail.com', '$2b$10$mRNl9vh8b7JLUT8uiyI9zeCc/QNTKE3cmoOgscvo7o1RsXPLPlZTG', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(37, 'Smfvith', 'Jane', 'jadsmith@example.com', '$2b$10$ScGNQEBmhFVGfGyzhmSTq.UcMjSWGfEMbNNgu1gpFUASxAF..a7Iy', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(38, 'Smfvith', 'Jane', 'jad1smith@example.com', '$2b$10$xC2CgVqiepUp1G2oy/Rto.VlT4Bq0NcwpSIqitOU761Frvvr2s2nu', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(39, 'Smfvith', 'Jane', 'jad12smith@example.com', '$2b$10$TQOh7.OY5/nV3zldVipr/u1hVVErcZVu7KEwMJm6zUV5B8vPw/Sme', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(40, 'Smfvith', 'Jane', 'jad123smith@example.com', '$2b$10$QzZslyjks1ycYh3.2OeB3efDkSYuuz7ejApifY4JJL1aHOv5QWULG', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(41, 'Smfvith', 'Jane', 'jad1234smith@example.com', '$2b$10$bmiF3UwitgCwPShMq4HPTu1rUI02InF20d3eB1DFen.t2/ZDWewLO', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(42, 'Smfvith', 'Jane', 'jad12345smith@example.com', '$2b$10$0DtrMZUWjv2ttNKboTnw/O.S1j1OCbWspBLUsJnchPZejPt0tdlK6', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(43, 'Smfvith', 'Jane', 'jad123456smith@example.com', '$2b$10$tdPiICwHZZBV1iBUbWu6ueHvijHUnkmpJ1zXaOV3Q5FY5VamPqUcO', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(44, 'Smfvith', 'Jane', 'jad1234567smith@example.com', '$2b$10$bu/oZ8.8LFVJNajoOKFvOuM44i5YSclN46PmFrTQ6Mwo0pHpJZEZa', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(45, 'Smfvith', 'Jane', 'jad12345678smith@example.com', '$2b$10$MLYE/URzzX90sjmo3PYCZ.IkhceFt9qI7.pfQq30bpwMwuK6Itl3q', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(46, 'Smfvith', 'Jane', 'jad123456789smith@example.com', '$2b$10$23cz4m6x8/xgPiQbYb8Wi.LVNNXOyDS0tDKdz5lPnZOuVtGP64LIO', 2, '2024-07-02 20:38:38', '2024-07-02 20:38:38'),
(47, 'Alfitouri', 'Achraf', 'achrafalfitoazazzezuri1@gmail.com', '$2b$10$RrFTTChrT2Bewe.pVtpmc.wJNfuWpWEAAA.E8WvHVZA1xsXH7l/3i', 1, NULL, NULL),
(50, 'Alfitouri', 'Achraf', 'achrafcccalfitouri1@gmail.com', '$2b$10$kQSgg9Abp5F2Lm.ncWjZ6uIUN2arWYdvN6uYtPveSmyfEt7FkgIU.', 1, NULL, NULL),
(51, 'Alfitouri', 'Achraf', 'achrafalfitortrtrtrturi1@gmail.com', '$2b$10$u5Uyia3ev6Fgz/DrcpTj6.PzMGmaQBs9hLljY5RL8zHzCB.WooRPy', 2, '2024-07-03 18:40:53', '2024-07-03 19:56:41'),
(52, 'Alfitouri', 'Achraf', 'achrafffffffffffffffffffalfitouri1@gmail.com', '$2b$10$NVwlEB9FPu2jpZyFgEX/vuW6cH701ifp.fWBcyMPmrVrFngNgmsSW', 1, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absence`
--
ALTER TABLE `absence`
  ADD PRIMARY KEY (`ID_Absence`),
  ADD KEY `ID_Etudiant` (`ID_Etudiant`),
  ADD KEY `fk_absence_classe` (`ID_Classe`);

--
-- Indexes for table `anneescolaire`
--
ALTER TABLE `anneescolaire`
  ADD PRIMARY KEY (`ID_AnneeScolaire`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`ID_Classe`),
  ADD KEY `ID_Filiere` (`ID_Filiere`),
  ADD KEY `fk_classes_anneescolaire` (`ID_AnneeScolaire`);

--
-- Indexes for table `classesetudiants`
--
ALTER TABLE `classesetudiants`
  ADD PRIMARY KEY (`ID_Classe`,`ID_Etudiant`),
  ADD KEY `fk_classesetudiants_etudiants` (`ID_Etudiant`);

--
-- Indexes for table `detailsfacture`
--
ALTER TABLE `detailsfacture`
  ADD PRIMARY KEY (`ID_DetailFacture`),
  ADD KEY `ID_Facture` (`ID_Facture`);

--
-- Indexes for table `etudiants`
--
ALTER TABLE `etudiants`
  ADD PRIMARY KEY (`ID_Etudiant`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `CIN` (`CIN`),
  ADD KEY `ID_Filiere` (`ID_Filiere`),
  ADD KEY `fk_etudiants_classes` (`ID_Classe`);

--
-- Indexes for table `factures`
--
ALTER TABLE `factures`
  ADD PRIMARY KEY (`ID_Facture`),
  ADD KEY `ID_Fournisseur` (`ID_Fournisseur`),
  ADD KEY `ID_Etudiant` (`ID_Etudiant`),
  ADD KEY `factures_ibfk_3` (`ID_Taxe`);

--
-- Indexes for table `filiere`
--
ALTER TABLE `filiere`
  ADD PRIMARY KEY (`ID_Filiere`),
  ADD UNIQUE KEY `NomFiliere` (`NomFiliere`);

--
-- Indexes for table `formateurs`
--
ALTER TABLE `formateurs`
  ADD PRIMARY KEY (`ID_Formateur`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `CIN` (`CIN`),
  ADD KEY `ID_Filiere` (`ID_Filiere`);

--
-- Indexes for table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD PRIMARY KEY (`ID_Fournisseur`);

--
-- Indexes for table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`ID_Inscription`),
  ADD KEY `ID_Etudiant` (`ID_Etudiant`);

--
-- Indexes for table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`ID_Matiere`),
  ADD KEY `fk_matieres_classes` (`ID_Classe`),
  ADD KEY `fk_matieres_formateurs` (`ID_Formateur`);

--
-- Indexes for table `modepaiement`
--
ALTER TABLE `modepaiement`
  ADD PRIMARY KEY (`ID_ModePaiement`);

--
-- Indexes for table `niveau`
--
ALTER TABLE `niveau`
  ADD PRIMARY KEY (`ID_Niveau`),
  ADD KEY `ID_Classe` (`ID_Classe`);

--
-- Indexes for table `paiementetudiants`
--
ALTER TABLE `paiementetudiants`
  ADD PRIMARY KEY (`ID_PaiementEtudiants`),
  ADD KEY `ID_Inscription` (`ID_Inscription`),
  ADD KEY `ID_TypePaiement` (`ID_TypePaiement`),
  ADD KEY `paiementetudiants_ibfk_3` (`ID_Etudiant`);

--
-- Indexes for table `paiementpersonnel`
--
ALTER TABLE `paiementpersonnel`
  ADD PRIMARY KEY (`ID_PaiementPersonnel`),
  ADD KEY `ID_Personnel` (`ID_Personnel`),
  ADD KEY `ID_TypePaiement` (`ID_TypePaiement`);

--
-- Indexes for table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`ID_Personnel`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `CIN` (`CIN`);

--
-- Indexes for table `planning`
--
ALTER TABLE `planning`
  ADD PRIMARY KEY (`ID_Planning`),
  ADD KEY `ID_Classe` (`ID_Classe`),
  ADD KEY `ID_Matiere` (`ID_Matiere`),
  ADD KEY `ID_Salle` (`ID_Salle`),
  ADD KEY `ID_Formateur` (`ID_Formateur`);

--
-- Indexes for table `rendezvous`
--
ALTER TABLE `rendezvous`
  ADD PRIMARY KEY (`ID_RendezVous`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID_Role`);

--
-- Indexes for table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`ID_Salle`);

--
-- Indexes for table `stages`
--
ALTER TABLE `stages`
  ADD PRIMARY KEY (`ID_Stage`),
  ADD KEY `ID_Etudiant` (`ID_Etudiant`),
  ADD KEY `stages_ibfk_2` (`ID_Classe`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`ID_Stats`);

--
-- Indexes for table `taxes`
--
ALTER TABLE `taxes`
  ADD PRIMARY KEY (`ID_Taxe`);

--
-- Indexes for table `typepaiement`
--
ALTER TABLE `typepaiement`
  ADD PRIMARY KEY (`ID_TypePaiement`);

--
-- Indexes for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`ID_Utilisateur`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `ID_Role` (`ID_Role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absence`
--
ALTER TABLE `absence`
  MODIFY `ID_Absence` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `anneescolaire`
--
ALTER TABLE `anneescolaire`
  MODIFY `ID_AnneeScolaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `ID_Classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `detailsfacture`
--
ALTER TABLE `detailsfacture`
  MODIFY `ID_DetailFacture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `etudiants`
--
ALTER TABLE `etudiants`
  MODIFY `ID_Etudiant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `factures`
--
ALTER TABLE `factures`
  MODIFY `ID_Facture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `filiere`
--
ALTER TABLE `filiere`
  MODIFY `ID_Filiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `formateurs`
--
ALTER TABLE `formateurs`
  MODIFY `ID_Formateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  MODIFY `ID_Fournisseur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `ID_Inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `ID_Matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `modepaiement`
--
ALTER TABLE `modepaiement`
  MODIFY `ID_ModePaiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `ID_Niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `paiementetudiants`
--
ALTER TABLE `paiementetudiants`
  MODIFY `ID_PaiementEtudiants` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `paiementpersonnel`
--
ALTER TABLE `paiementpersonnel`
  MODIFY `ID_PaiementPersonnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `ID_Personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `planning`
--
ALTER TABLE `planning`
  MODIFY `ID_Planning` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rendezvous`
--
ALTER TABLE `rendezvous`
  MODIFY `ID_RendezVous` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `ID_Role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `salle`
--
ALTER TABLE `salle`
  MODIFY `ID_Salle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stages`
--
ALTER TABLE `stages`
  MODIFY `ID_Stage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `ID_Stats` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `taxes`
--
ALTER TABLE `taxes`
  MODIFY `ID_Taxe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `typepaiement`
--
ALTER TABLE `typepaiement`
  MODIFY `ID_TypePaiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `ID_Utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`ID_Etudiant`) REFERENCES `etudiants` (`ID_Etudiant`),
  ADD CONSTRAINT `fk_absence_classe` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`) ON DELETE CASCADE;

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`ID_Filiere`) REFERENCES `filiere` (`ID_Filiere`),
  ADD CONSTRAINT `fk_classes_anneescolaire` FOREIGN KEY (`ID_AnneeScolaire`) REFERENCES `anneescolaire` (`ID_AnneeScolaire`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `classesetudiants`
--
ALTER TABLE `classesetudiants`
  ADD CONSTRAINT `classesetudiants_ibfk_1` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`),
  ADD CONSTRAINT `classesetudiants_ibfk_2` FOREIGN KEY (`ID_Etudiant`) REFERENCES `etudiants` (`ID_Etudiant`),
  ADD CONSTRAINT `fk_classesetudiants_classes` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_classesetudiants_etudiants` FOREIGN KEY (`ID_Etudiant`) REFERENCES `etudiants` (`ID_Etudiant`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailsfacture`
--
ALTER TABLE `detailsfacture`
  ADD CONSTRAINT `detailsfacture_ibfk_1` FOREIGN KEY (`ID_Facture`) REFERENCES `factures` (`ID_Facture`);

--
-- Constraints for table `etudiants`
--
ALTER TABLE `etudiants`
  ADD CONSTRAINT `etudiants_ibfk_1` FOREIGN KEY (`ID_Filiere`) REFERENCES `filiere` (`ID_Filiere`),
  ADD CONSTRAINT `fk_etudiant_classe` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`);

--
-- Constraints for table `factures`
--
ALTER TABLE `factures`
  ADD CONSTRAINT `factures_ibfk_1` FOREIGN KEY (`ID_Fournisseur`) REFERENCES `fournisseurs` (`ID_Fournisseur`),
  ADD CONSTRAINT `factures_ibfk_2` FOREIGN KEY (`ID_Etudiant`) REFERENCES `etudiants` (`ID_Etudiant`),
  ADD CONSTRAINT `factures_ibfk_3` FOREIGN KEY (`ID_Taxe`) REFERENCES `taxes` (`ID_Taxe`);

--
-- Constraints for table `formateurs`
--
ALTER TABLE `formateurs`
  ADD CONSTRAINT `formateurs_ibfk_1` FOREIGN KEY (`ID_Filiere`) REFERENCES `filiere` (`ID_Filiere`);

--
-- Constraints for table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `inscription_ibfk_1` FOREIGN KEY (`ID_Etudiant`) REFERENCES `etudiants` (`ID_Etudiant`);

--
-- Constraints for table `matieres`
--
ALTER TABLE `matieres`
  ADD CONSTRAINT `fk_matieres_classes` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_matieres_formateurs` FOREIGN KEY (`ID_Formateur`) REFERENCES `formateurs` (`ID_Formateur`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matieres_ibfk_1` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`),
  ADD CONSTRAINT `matieres_ibfk_2` FOREIGN KEY (`ID_Formateur`) REFERENCES `formateurs` (`ID_Formateur`);

--
-- Constraints for table `niveau`
--
ALTER TABLE `niveau`
  ADD CONSTRAINT `niveau_ibfk_1` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`);

--
-- Constraints for table `paiementetudiants`
--
ALTER TABLE `paiementetudiants`
  ADD CONSTRAINT `paiementetudiants_ibfk_1` FOREIGN KEY (`ID_Inscription`) REFERENCES `inscription` (`ID_Inscription`),
  ADD CONSTRAINT `paiementetudiants_ibfk_2` FOREIGN KEY (`ID_TypePaiement`) REFERENCES `typepaiement` (`ID_TypePaiement`),
  ADD CONSTRAINT `paiementetudiants_ibfk_3` FOREIGN KEY (`ID_Etudiant`) REFERENCES `etudiants` (`ID_Etudiant`);

--
-- Constraints for table `paiementpersonnel`
--
ALTER TABLE `paiementpersonnel`
  ADD CONSTRAINT `paiementpersonnel_ibfk_1` FOREIGN KEY (`ID_Personnel`) REFERENCES `personnel` (`ID_Personnel`),
  ADD CONSTRAINT `paiementpersonnel_ibfk_2` FOREIGN KEY (`ID_TypePaiement`) REFERENCES `typepaiement` (`ID_TypePaiement`);

--
-- Constraints for table `planning`
--
ALTER TABLE `planning`
  ADD CONSTRAINT `planning_ibfk_1` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`),
  ADD CONSTRAINT `planning_ibfk_2` FOREIGN KEY (`ID_Matiere`) REFERENCES `matieres` (`ID_Matiere`),
  ADD CONSTRAINT `planning_ibfk_3` FOREIGN KEY (`ID_Salle`) REFERENCES `salle` (`ID_Salle`),
  ADD CONSTRAINT `planning_ibfk_4` FOREIGN KEY (`ID_Formateur`) REFERENCES `formateurs` (`ID_Formateur`);

--
-- Constraints for table `stages`
--
ALTER TABLE `stages`
  ADD CONSTRAINT `stages_ibfk_1` FOREIGN KEY (`ID_Etudiant`) REFERENCES `etudiants` (`ID_Etudiant`),
  ADD CONSTRAINT `stages_ibfk_2` FOREIGN KEY (`ID_Classe`) REFERENCES `classes` (`ID_Classe`);

--
-- Constraints for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`ID_Role`) REFERENCES `roles` (`ID_Role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
