-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 07, 2024 at 10:43 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `inventory_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `stock` int(11) DEFAULT '0',
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `description`, `stock`, `price`, `created_at`) VALUES
(1, 'Laptop', 'High-end gaming laptop', 19, '1200.00', '2024-11-06 11:28:56'),
(2, 'USL Tie', 'USL Tie', 400, '250.00', '2024-11-06 12:05:47'),
(3, '44th Anniversary Pen', '44th Anniversary Pen', 450, '50.00', '2024-11-06 13:22:05'),
(4, 'House T-Shirts', 'Medium Sized House T-Shirts ', 499, '150.00', '2024-11-06 14:09:55'),
(5, 'Branded Exercise Book ', '80 Pages ', 400, '50.00', '2024-11-07 10:17:33');

-- --------------------------------------------------------

--
-- Table structure for table `item_history`
--

CREATE TABLE `item_history` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `change_type` enum('restock','order') NOT NULL,
  `quantity` int(11) NOT NULL,
  `change_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item_history`
--

INSERT INTO `item_history` (`id`, `item_id`, `change_type`, `quantity`, `change_date`) VALUES
(1, 4, 'order', 5, '2024-11-06 16:38:59'),
(2, 1, 'restock', 5, '2024-11-06 16:54:47'),
(3, 4, 'restock', 5, '2024-11-06 17:25:50'),
(4, 1, 'restock', 5, '2024-11-07 09:46:27'),
(5, 1, 'order', 1, '2024-11-07 09:47:18'),
(6, 4, 'order', 1, '2024-11-07 09:47:18');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `order_date`) VALUES
(1, '', '2024-11-06 12:39:17'),
(2, 'Tejan Kamara', '2024-11-06 13:53:17'),
(3, 'Tejan Kamara', '2024-11-06 13:54:11'),
(4, 'Tejan Kamara', '2024-11-06 14:06:41'),
(5, 'Tejan Kamara', '2024-11-06 14:07:08'),
(6, 'Tejan Kamara', '2024-11-06 14:21:37'),
(7, 'Tejan Kamara', '2024-11-06 14:21:37'),
(8, 'Tejan Kamara', '2024-11-06 14:21:46'),
(9, 'Tejan Kamara', '2024-11-06 14:21:46'),
(10, 'Tejan Kamara', '2024-11-06 14:21:48'),
(11, 'Tejan Kamara', '2024-11-06 14:21:48'),
(12, 'Tejan Kamara', '2024-11-06 14:21:48'),
(13, 'Tejan Kamara', '2024-11-06 14:21:48'),
(14, 'Tejan Kamara', '2024-11-06 14:21:48'),
(15, 'Tejan Kamara', '2024-11-06 14:21:48'),
(16, 'Tejan Kamara', '2024-11-06 14:21:49'),
(17, 'Tejan Kamara', '2024-11-06 14:21:49'),
(18, 'Tejan Kamara', '2024-11-06 14:21:49'),
(19, 'Tejan Kamara', '2024-11-06 14:21:49'),
(20, 'Tejan Kamara', '2024-11-06 14:21:51'),
(21, 'Tejan Kamara', '2024-11-06 14:21:51'),
(22, 'Tejan Kamara', '2024-11-06 14:21:51'),
(23, 'Tejan Kamara', '2024-11-06 14:21:51'),
(24, 'Tejan Kamara', '2024-11-06 14:21:55'),
(25, 'Tejan Kamara', '2024-11-06 14:21:55'),
(26, 'Tejan Kamara', '2024-11-06 14:21:56'),
(27, 'Tejan Kamara', '2024-11-06 14:21:56'),
(28, 'Tejan Kamara', '2024-11-06 14:25:08'),
(29, 'Tejan Kamara', '2024-11-06 14:25:08'),
(30, 'Tejan Kamara', '2024-11-06 14:25:09'),
(31, 'Tejan Kamara', '2024-11-06 14:25:09'),
(32, 'Tejan Kamara', '2024-11-06 14:25:09'),
(33, 'Tejan Kamara', '2024-11-06 14:25:09'),
(34, 'Tejan Kamara', '2024-11-06 14:25:09'),
(35, 'Tejan Kamara', '2024-11-06 14:25:09'),
(36, 'Tejan Kamara', '2024-11-06 14:25:09'),
(37, 'Tejan Kamara', '2024-11-06 14:25:09'),
(38, 'Tejan Kamara', '2024-11-06 14:25:09'),
(39, 'Tejan Kamara', '2024-11-06 14:25:09'),
(40, 'Tejan Kamara', '2024-11-06 14:25:10'),
(41, 'Tejan Kamara', '2024-11-06 14:25:10'),
(42, 'Tejan Kamara', '2024-11-06 14:25:46'),
(43, 'Tejan Kamara', '2024-11-06 14:25:46'),
(44, 'Tejan Kamara', '2024-11-06 14:25:47'),
(45, 'Tejan Kamara', '2024-11-06 14:25:47'),
(46, 'Tejan Kamara', '2024-11-06 14:25:47'),
(47, 'Tejan Kamara', '2024-11-06 14:25:47'),
(48, 'Tejan Kamara', '2024-11-06 14:25:48'),
(49, 'Tejan Kamara', '2024-11-06 14:25:48'),
(50, 'Tejan Kamara', '2024-11-06 14:25:48'),
(51, 'Tejan Kamara', '2024-11-06 14:25:48'),
(52, 'Tejan Kamara', '2024-11-06 14:28:17'),
(53, 'Tejan Kamara', '2024-11-06 14:28:17'),
(54, 'Tejan Kamara', '2024-11-06 14:28:18'),
(55, 'Tejan Kamara', '2024-11-06 14:28:18'),
(56, 'Aminata Angie', '2024-11-06 16:38:59'),
(57, 'Tejan Kamara', '2024-11-07 09:47:18');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `item_id`, `quantity`) VALUES
(1, 56, 4, 5),
(2, 57, 1, 1),
(3, 57, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `restock`
--

CREATE TABLE `restock` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `restock_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `restock`
--

INSERT INTO `restock` (`id`, `item_id`, `quantity`, `restock_date`) VALUES
(1, 1, 5, '2024-11-06 11:28:56');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `transaction_type` enum('order','restock') NOT NULL,
  `quantity` int(11) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'hajafatmatatimbo@gmail.com', '$2y$10$F1ye7BNYysIPWQMqjYQ4fuUOmtni0Dttj./6SMP/Jg1Ml9o1BX386', '2024-11-07 06:38:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `item_history`
--
ALTER TABLE `item_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `restock`
--
ALTER TABLE `restock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `item_history`
--
ALTER TABLE `item_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `restock`
--
ALTER TABLE `restock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item_history`
--
ALTER TABLE `item_history`
  ADD CONSTRAINT `item_history_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `restock`
--
ALTER TABLE `restock`
  ADD CONSTRAINT `restock_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE;
