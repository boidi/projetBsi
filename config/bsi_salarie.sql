-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mer 20 Septembre 2017 à 20:24
-- Version du serveur :  5.7.19-0ubuntu0.17.04.1
-- Version de PHP :  7.0.23-1+ubuntu17.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `bsi_salarie`
--

-- --------------------------------------------------------

--
-- Structure de la table `avantages`
--

CREATE TABLE `avantages` (
  `id` int(11) NOT NULL,
  `detail` longtext,
  `valeur` float NOT NULL,
  `dateAvantages` year(4) NOT NULL,
  `id_salarie` int(11) NOT NULL,
  `idtype` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `avantages`
--

INSERT INTO `avantages` (`id`, `detail`, `valeur`, `dateAvantages`, `id_salarie`, `idtype`) VALUES
(26, '', 600, 2017, 5, 2),
(27, '1830 versés - 835 euros de prime de facturation .995 euros de pouvoir d\'achat en plus', 995, 2017, 14, 1),
(28, 'Forfait transport', 300, 2017, 5, 5),
(29, '', 400, 2017, 22, 2);

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `id` int(11) NOT NULL,
  `intitule` mediumtext NOT NULL,
  `datedebut` date NOT NULL,
  `datefin` date NOT NULL,
  `cout` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `formation`
--

INSERT INTO `formation` (`id`, `intitule`, `datedebut`, `datefin`, `cout`) VALUES
(24, 'Utilisation de l\'anglais en milieu professionnel', '2017-08-08', '2017-08-11', 1000),
(25, 'Méthode agile', '2017-08-08', '2017-08-10', 600),
(26, 'Suivi et management d\'une equipe sur un projet', '2017-08-28', '2017-09-05', 2500);

-- --------------------------------------------------------

--
-- Structure de la table `formation_salarie`
--

CREATE TABLE `formation_salarie` (
  `formation_id` int(11) NOT NULL,
  `salarie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `formation_salarie`
--

INSERT INTO `formation_salarie` (`formation_id`, `salarie_id`) VALUES
(24, 5),
(26, 5),
(25, 6),
(26, 6),
(24, 14),
(25, 14),
(24, 20),
(25, 20),
(26, 22);

-- --------------------------------------------------------

--
-- Structure de la table `remunerations`
--

CREATE TABLE `remunerations` (
  `id` int(11) NOT NULL,
  `variables` float DEFAULT NULL,
  `fixe` float NOT NULL,
  `detail` text,
  `annee` year(4) NOT NULL,
  `id_salarie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `remunerations`
--

INSERT INTO `remunerations` (`id`, `variables`, `fixe`, `detail`, `annee`, `id_salarie`) VALUES
(12, 1500, 21000, NULL, 2017, 14),
(13, 2000, 23000, 'Prime exceptionnelle', 2017, 5),
(17, 1700, 22000, '', 2016, 5),
(18, 1800, 25000, '', 2015, 20),
(19, 2000, 19000, '', 2014, 5),
(20, 1000, 20000, '', 2017, 22);

-- --------------------------------------------------------

--
-- Structure de la table `salarie`
--

CREATE TABLE `salarie` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `civilite` varchar(255) NOT NULL,
  `poste` varchar(255) NOT NULL,
  `nbre_enf_min` int(11) DEFAULT NULL,
  `nais_date` date DEFAULT NULL,
  `email` mediumtext,
  `mdp` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `codePoste` int(11) DEFAULT NULL,
  `isadmin` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `salarie`
--

INSERT INTO `salarie` (`id`, `nom`, `prenom`, `civilite`, `poste`, `nbre_enf_min`, `nais_date`, `email`, `mdp`, `login`, `adresse`, `codePoste`, `isadmin`) VALUES
(5, 'Tenor', 'Alice', 'madame', 'Assistante de direction', 2, '1985-12-09', 'tenor@hotmail.fr', '$2a$08$Dz5kw6wy3KsupnEuA0QPPu3QKEmRjG0Wlr071GTeKNVfTiNkioNOC', 'aten', '23 impasse du moulin ', 75018, 1),
(6, 'Dubois', 'Jules', 'monsieur', 'consultant', 2, '1979-06-04', 'duboi@gmail.com', 'dubois', 'jdubois', '2 bis Avenue foch ', 75016, 0),
(14, 'Dor', 'Rachel', 'Madame', 'Assistante Comptable', 2, '1980-09-21', 'dor@gmail.com', 'past', 'rdor', '2 bis Avenue foch ', 78200, 1),
(20, 'machin', 'bidule', 'Monsieur', 'test', 3, '1984-04-21', 'test@test.fr', 'test', 'test', 'test', 3245, 0),
(21, 'Denet', 'Jean', 'Monsieur', 'consultant', 1, '1981-09-20', 'denet@gmail.com', '$2a$08$oRFjzrk3JOzYh9.q4vAWc.28b1UaPTSbVF7AAAVT8gV/v507sDPFm', 'jdent', 'test', 92200, 0),
(22, 'younes', 'younes', 'Monsieur', 'consultant', 0, '1984-10-26', 'younu.saya@gmail.fr', '$2a$08$3iyAzfuQmrSi8lupn.FOCOsG9svHukJpqlSHWq.67ZyW4kK5uo5Xm', 'youne', 'rue de boulangerie', 93200, 0),
(23, 'bala', 'bala', 'Madame', 'Commercial', 0, '1998-03-12', 'test@gmail.com', '$2a$08$50K9IIsBuKE2cqKmsrGBNunKxs6sphPJXF.LqIeMdIi8MKiYY7bOy', 'bala', 'fefqdg', 92324, 0);

-- --------------------------------------------------------

--
-- Structure de la table `typeAvantages`
--

CREATE TABLE `typeAvantages` (
  `id` int(11) NOT NULL,
  `libelle` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `typeAvantages`
--

INSERT INTO `typeAvantages` (`id`, `libelle`) VALUES
(1, 'CESU'),
(2, 'Chèque vacances'),
(3, 'Chèque déjeuner '),
(4, 'Carte de transport'),
(5, 'Forfait téléphonique ');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `avantages`
--
ALTER TABLE `avantages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_salarie` (`id_salarie`),
  ADD KEY `fk_avantages_idx` (`idtype`);

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `formation_salarie`
--
ALTER TABLE `formation_salarie`
  ADD PRIMARY KEY (`formation_id`,`salarie_id`),
  ADD KEY `fk_formation_has_salarie_salarie1_idx` (`salarie_id`),
  ADD KEY `fk_formation_has_salarie_formation1_idx` (`formation_id`);

--
-- Index pour la table `remunerations`
--
ALTER TABLE `remunerations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_remunerations_1_idx` (`id_salarie`);

--
-- Index pour la table `salarie`
--
ALTER TABLE `salarie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mdp_UNIQUE` (`mdp`);

--
-- Index pour la table `typeAvantages`
--
ALTER TABLE `typeAvantages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `avantages`
--
ALTER TABLE `avantages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT pour la table `remunerations`
--
ALTER TABLE `remunerations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT pour la table `salarie`
--
ALTER TABLE `salarie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT pour la table `typeAvantages`
--
ALTER TABLE `typeAvantages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `avantages`
--
ALTER TABLE `avantages`
  ADD CONSTRAINT `fk_avantages_1` FOREIGN KEY (`idtype`) REFERENCES `typeAvantages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_salarie` FOREIGN KEY (`id_salarie`) REFERENCES `salarie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `formation_salarie`
--
ALTER TABLE `formation_salarie`
  ADD CONSTRAINT `fk_formation_has_salarie_formation1` FOREIGN KEY (`formation_id`) REFERENCES `formation` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_formation_has_salarie_salarie1` FOREIGN KEY (`salarie_id`) REFERENCES `salarie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `remunerations`
--
ALTER TABLE `remunerations`
  ADD CONSTRAINT `fk_remunerations` FOREIGN KEY (`id_salarie`) REFERENCES `salarie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
