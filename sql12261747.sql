-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freemysqlhosting.net
-- Generation Time: Oct 22, 2018 at 09:55 AM
-- Server version: 5.5.58-0ubuntu0.14.04.1
-- PHP Version: 7.0.32-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12261747`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Technical'),
(2, 'Aptitude'),
(3, 'Soft Skill');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(2, 'ROLE_ADMIN'),
(1, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `user_id` bigint(20) NOT NULL,
  `test_id` bigint(20) NOT NULL,
  `score` int(20) NOT NULL,
  `maximum_marks` int(20) NOT NULL,
  `subskills_breaksdown` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `cat_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`id`, `name`, `cat_id`) VALUES
(1, 'Java Developer Assessment', 1),
(2, '.NET Developer Assessment', 1),
(3, 'Python Developer Assessment', 1),
(4, 'Aptitude Test Basics', 2),
(5, 'Aptitude Test Intermediate', 2),
(6, 'Aptitude Test Advanced', 2),
(7, 'Communication Skills', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `id` bigint(20) NOT NULL,
  `subcat_id` bigint(20) NOT NULL,
  `questions` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `subcat_id`, `questions`) VALUES
(1, 1, '[ { \"sub_skill\": \"String Handling\", \"question\": \"Which of the following are incorrect form of StringBuffer class constructor?\", \"option\": { \"A\": \"StringBuffer(String str)\", \"B\": \"StringBuffer(int size , String str)\", \"C\": \"StringBuffer(int size)\", \"D\": \"StringBuffer()\" }, \"answer\": \"option.A\", \"difficulty level\": \"Medium\", \"mark\": 1 }, { \"sub_skill\": \"String Handling\", \"question\": \"Which of these operators can be used to concatenate two or more String objects?\", \"option\": { \"A\": \"+=\", \"B\": \"&\", \"C\": \"+\", \"D\": \"||\" }, \"answer\": \"option.C\", \"difficulty level\": \"Medium\", \"mark\": 1 }, { \"sub_skill\": \"String Handling\", \"question\": \"Which of these method of class String is used to extract a substring from a String object?\", \"option\": { \"A\": \"SubString()\", \"B\": \"Substring()\", \"C\": \"None of the mentioned\", \"D\": \"substring()\" }, \"answer\": \"option.D\", \"difficulty level\": \"Medium\", \"mark\": 1 }, { \"sub_skill\": \"Recursion\", \"question\": \"What is Recursion in Java?\", \"option\": { \"A\": \"Recursion is a process of defining a method that calls other methods repeatedly\", \"B\": \"Recursion is a process of defining a method that calls other methods which in turn call again this method\", \"C\": \"Recursion is a class\", \"D\": \"Recursion is a process of defining a method that calls itself repeatedly\" }, \"answer\": \"option.A\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Inheritance\", \"question\": \"Which of these keyword can be used in subclass to call the constructor of superclass?\", \"option\": { \"A\": \"super\", \"B\": \"this\", \"C\": \"extends\", \"D\": \"extent\" }, \"answer\": \"option.A\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Objects\", \"question\": \"Which of these method of Object class can clone an object?\", \"option\": { \"A\": \"Object clone()\", \"B\": \"clone()\", \"C\": \"copy()\", \"D\": \"Objectcopy()\" }, \"answer\": \"option.A\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Objects\", \"question\": \"Which of these is wrapper for simple data type char?\", \"option\": { \"A\": \"String\", \"B\": \"Character\", \"C\": \"Integer\", \"D\": \"Float\" }, \"answer\": \"option.B\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"String Handling\", \"question\": \"Which of these method of class String is used to check whether a given object starts with a particular string literal?\", \"option\": { \"A\": \"endsWith()\", \"B\": \"Starts()\", \"C\": \"ends()\", \"D\": \"startsWith()\" }, \"answer\": \"option.D\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Inheritance\", \"question\": \"A class member declared protected becomes member of subclass of which type?\", \"option\": { \"A\": \"public member\", \"B\": \"protected member\", \"C\": \"private member\", \"D\": \"static member\" }, \"answer\": \"option.C\", \"difficulty level\": \"Medium\", \"mark\": 1 }, { \"sub_skill\": \"Inheritance\", \"question\": \"A class member declared protected becomes member of subclass of which type?\", \"option\": { \"A\": \"public member\", \"B\": \"protected member\", \"C\": \"private member\", \"D\": \"static member\" }, \"answer\": \"option.C\", \"difficulty level\": \"Medium\", \"mark\": 1 } ]'),
(2, 2, '[ { \"sub_skill\": \"Operators\", \"question\": \"The correct way of incrementing the operators is :\", \"option\": { \"A\": \"++ 1\", \"B\": \"++1\", \"C\": \"=+1\", \"D\": \"+=1\" }, \"answer\": \"option.D\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Data Types\", \"question\": \"’Implicit Conversion’ follows the order of conversion as per compatibility of datatype as :\", \"option\": { \"A\": \"char > int > float\", \"B\": \"float > int > char\", \"C\": \"float > char > int\", \"D\": \"int > char > float\" }, \"answer\": \"option.A\", \"difficulty level\": \"Medium\", \"mark\": 1 }, { \"sub_skill\": \"Strings\", \"question\": \"How is a string typically processed?\", \"option\": { \"A\": \"On a character by character basis\", \"B\": \"None of the mentioned\", \"C\": \"Both On a character by character basis & On a string by string basis\", \"D\": \"On a string by string basis\" }, \"answer\": \"option.A\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Inheritance\", \"question\": \"Which of these base classes are accessible to the derived class members?\", \"option\": { \"A\": \"static\", \"B\": \"Shared\", \"C\": \"protected\", \"D\": \"private\" }, \"answer\": \"option.C\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Inheritance\", \"question\": \"Select the correct statement from the following:\", \"option\": { \"A\": \"We can override virtual as well as non virtual methods\", \"B\": \"When overriding a method, the names and type signatures of the override method must be the same as the virtual method that is being overriden\", \"C\": \"Abstract methods can be a virtual method\", \"D\": \"Static methods can be a virtual method\" }, \"answer\": \"option.B\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Inheritance\", \"question\": \"Which keyword is used to declare a base class method while performing overriding of base class methods?\", \"option\": { \"A\": \"extend\", \"B\": \"override\", \"C\": \"virtual\", \"D\": \"this\" }, \"answer\": \"option.C\", \"difficulty level\": \"Medium\", \"mark\": 1 }, { \"sub_skill\": \"Recursion\", \"question\": \"Which of these will happen if recursive method does not have a base case?\", \"option\": { \"A\": \"None of the mentioned\", \"B\": \"infinite loop condition occurrence\", \"C\": \"System gets hanged\", \"D\": \"After 10000 executions program will be automatically stopped\" }, \"answer\": \"option.B\", \"difficulty level\": \"Medium\", \"mark\": 1 }, { \"sub_skill\": \"Exception Handling\", \"question\": \" Which among the following is NOT an exception?\", \"option\": { \"A\": \"Arithmetic Overflow or underflow\", \"B\": \"All of the mentioned\", \"C\": \"Stack Overflow\", \"D\": \"Incorrect Arithmetic Expression\" }, \"answer\": \"option.D\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"Exception Handling\", \"question\": \"Select the correct statement about an Exception?\", \"option\": { \"A\": \"It occurs during loading of program\", \"B\": \"It occurs at run time\", \"C\": \"All of the mentioned\", \"D\": \"It occurs during Just-In-Time compilation\" }, \"answer\": \"option.B\", \"difficulty level\": \"Low\", \"mark\": 1 }, { \"sub_skill\": \"File Handling\", \"question\": \" Select the method used to write single byte to a file?\", \"option\": { \"A\": \"Write()\", \"B\": \"WriteByte()\", \"C\": \"Wrteline()\", \"D\": \"All of the mentioned\" }, \"answer\": \"option.C\", \"difficulty level\": \"Medium\", \"mark\": 1 } ]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `username`) VALUES
(1, 'jack@gmail.com', 'Jack', '$2a$10$1vl4HEpWpcycw4FqOhKP7.BFzhdGy8lnTw9fHhU9Kpa8OZ.W9/YZS', 'jacka'),
(2, 'pancham@gmail.com', 'Pancham', '$2a$10$2axckvlfL96MqY.kx8bflO3ZICmXNBT9WG9X4nVU2oNnvomC5Qsxi', 'panchamk'),
(3, 'parvkapadia@gmail.com', 'Parv', '$2a$10$i88ZhYXDyhw1053flcCubuHk.WOhJxussezuvXoH/KZZJztsO969q', 'parvk');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tests_ibfk_1` (`subcat_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  ADD KEY `FKhfh9dx7w3ubf1co1vdev94g3f` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`subcat_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
