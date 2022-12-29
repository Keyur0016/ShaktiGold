-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql206.epizy.com
-- Generation Time: Dec 29, 2022 at 08:22 AM
-- Server version: 10.3.27-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epiz_32934333_Shaktigold`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_password`) VALUES
(1, 'Shaktigold', 'Keyur@123');

-- --------------------------------------------------------

--
-- Table structure for table `afcjeymrdi`
--

CREATE TABLE `afcjeymrdi` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `afcjeymrdi`
--

INSERT INTO `afcjeymrdi` (`Product_key`, `Product_id`, `Product_information`, `Product_image1`, `Product_image2`, `Product_image3`, `Product_weight`, `Product_type`, `Product_size`, `Product_discount_price`, `Product_retail_price`, `Product_tag_number`, `Product_sold_status`) VALUES
(9, 'ysjklfqemtcrbxw', 'Gold ring 916', 'http://res.cloudinary.com/smartinfo/image/upload/v1672220824/korq7ydmldahaoabnozr.jpg', 'None', 'None', '12.880', 'Gold', '19', '11500', '12000', 'SAG001', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `aifjdknhsg`
--

CREATE TABLE `aifjdknhsg` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `Banner_id` int(11) NOT NULL,
  `Option` varchar(200) NOT NULL,
  `Image` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`Banner_id`, `Option`, `Image`) VALUES
(51, 'Banner', 'https://res.cloudinary.com/smartinfo/image/upload/v1672129444/B3_cr3vyz.png'),
(58, 'Banner', 'https://res.cloudinary.com/smartinfo/image/upload/v1672129227/B2_d5jrng.jpg'),
(60, 'Status', 'http://res.cloudinary.com/smartinfo/image/upload/v1672233435/yni0jwle59stu4h2h08r.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `bsyuzrojxd`
--

CREATE TABLE `bsyuzrojxd` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bxywceqmjs`
--

CREATE TABLE `bxywceqmjs` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Category_id` int(11) NOT NULL,
  `Category_name` varchar(100) NOT NULL,
  `Category_option` varchar(100) NOT NULL,
  `Category_image` varchar(1000) NOT NULL,
  `Category_table` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Category_id`, `Category_name`, `Category_option`, `Category_image`, `Category_table`) VALUES
(32, 'Jeans ring', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671382840/d4rgqgut09gtclgrn2qb.png', 'afcjeymrdi'),
(33, 'Ladies ring ', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671383086/btgji6mq6snj3gzv3cax.png', 'zilhtwmgfy'),
(34, 'Earrings', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671383257/qlfwjn1nyzzqjtttvunj.png', 'zinhtouraw'),
(35, 'Pendalset', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671383388/omqonai1uqklewmipljh.png', 'lfxwdgkbej'),
(36, 'Chain ', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671383414/gzrzbt51myzeeq1yodoo.png', 'kqwfxmsbgv'),
(37, 'àª®àª¾àª³àª¾', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671383593/iuffr2psyfq22owr8uh0.png', 'vgaqcblikf'),
(38, 'àª²à«‹àª‚àª— àª¹àª¾àª°', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671385690/zdccueoqyj4tui4lipl0.jpg', 'oijfdtlwxq'),
(39, 'Bangles', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671386763/easgzrnlyskvlnkxhoda.png', 'mzpuqlgydo'),
(40, 'Pendal', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671386887/xhtliu80sipjkapulk45.png', 'odyjhncsai'),
(41, 'àª¨àªœàª°à«€àª¯àª¾', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671387022/vzbtl1zcticdptwd0jgb.jpg', 'owbfkgcduj'),
(42, 'Bracelet', 'Gold', 'http://res.cloudinary.com/smartinfo/image/upload/v1671387203/wxkqymekioaau5i3iu62.jpg', 'bxywceqmjs'),
(43, 'Jeans ring', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671388647/tjfl2fzv4xpusoypa5aq.png', 'bsyuzrojxd'),
(44, 'Ladies ring ', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671388911/bzeu92zgzf9npo41sni4.jpg', 'pjrhvmuwoq'),
(45, 'Chain', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671389271/rdpgkn7qgr4bofzew7yu.jpg', 'vdroawjxgz'),
(46, 'Bracelet', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671389752/gxkkr1cld50dpqelb8iw.jpg', 'eckzbgqsaj'),
(47, 'Anklet ', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671390968/z2kq5im94zydzgl3s2yb.jpg', 'sfpgjknbua'),
(48, 'àªªàª¾àª¯àª²', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671391021/ihgqmidqt4epe0rviuo5.jpg', 'aifjdknhsg'),
(49, 'àª•àª¡àª²à«€', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671391106/scc5j9oqm5m40djcvhws.jpg', 'uqvmzofnkh'),
(50, 'àªà«àª¡àª¾', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671391529/m3cqicrzwsppkdulea9g.jpg', 'rwuftcvshj'),
(51, 'àªµàª¾àª¸àª£', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671391584/ni7yveaby9iogo3xaneh.jpg', 'hordtislby'),
(52, 'àª®à«‚àª°à«àª¤àª¿', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671391820/becz79pzp6eqj2kekzfd.png', 'jtmiwondcl'),
(53, 'Gold / Silver coin', 'Silver', 'http://res.cloudinary.com/smartinfo/image/upload/v1671391876/iwlb57uvrteoidffa3gm.jpg', 'qscgfeilyt');

-- --------------------------------------------------------

--
-- Table structure for table `eckzbgqsaj`
--

CREATE TABLE `eckzbgqsaj` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `eqknxgwyci`
--

CREATE TABLE `eqknxgwyci` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fiqudbremyzxjtp`
--

CREATE TABLE `fiqudbremyzxjtp` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fiqudbremyzxjtp`
--

INSERT INTO `fiqudbremyzxjtp` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'watchlist', 'upfzxajmhwcykol', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'order-item-0', 'upfzxajmhwcykol', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'address-0', 'Akash bhuva', 'G-404 Askon resident', 'Mota varachha', 'Mota varachha', '394101', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Order', '09458613', 'Pending', 'Cash on delivery', 'None', '28-12-2022', '-', '-', '22200', 'Akash bhuva', '9725675759', 'G-404 Askon resident', 'Mota varachha', 'Mota varachha', '394101', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `goldprice`
--

CREATE TABLE `goldprice` (
  `Price_id` int(11) NOT NULL,
  `Price_date` varchar(100) NOT NULL,
  `22K_price` varchar(100) NOT NULL,
  `18K_price` varchar(100) NOT NULL,
  `916_price` varchar(100) NOT NULL,
  `Silver_price` varchar(100) NOT NULL,
  `24K_price` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `goldprice`
--

INSERT INTO `goldprice` (`Price_id`, `Price_date`, `22K_price`, `18K_price`, `916_price`, `Silver_price`, `24K_price`) VALUES
(46, '19-12-2022', '2200', '1800', '917', '1874', '2400'),
(47, '22-12-2022', '99', '88', '88', '66', '99'),
(48, '28-12-2022', '49500', '44500', '49500', '67500', '56300');

-- --------------------------------------------------------

--
-- Table structure for table `hordtislby`
--

CREATE TABLE `hordtislby` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `jdapbfhrilkwtzu`
--

CREATE TABLE `jdapbfhrilkwtzu` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jdapbfhrilkwtzu`
--

INSERT INTO `jdapbfhrilkwtzu` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'watchlist', 'ysjklfqemtcrbxw', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'order-item-0', 'ysjklfqemtcrbxw', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'address-0', 'Nitin', '24,25 ABC', 'Mota Varachha ', 'Sudama chowk', '394101', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Order', '70965841', 'Pending', 'Cash on delivery', 'None', '28-12-2022', '-', '-', '11500', 'Nitin', '9979341117', '24,25 ABC', 'Mota Varachha ', 'Sudama chowk', '394101', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `jtmiwondcl`
--

CREATE TABLE `jtmiwondcl` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kqwfxmsbgv`
--

CREATE TABLE `kqwfxmsbgv` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lfxwdgkbej`
--

CREATE TABLE `lfxwdgkbej` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mzpuqlgydo`
--

CREATE TABLE `mzpuqlgydo` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `odyjhncsai`
--

CREATE TABLE `odyjhncsai` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `oijfdtlwxq`
--

CREATE TABLE `oijfdtlwxq` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Order_data`
--

CREATE TABLE `Order_data` (
  `Order_key` int(11) NOT NULL,
  `Order_id` varchar(100) NOT NULL,
  `Order_total` varchar(100) NOT NULL,
  `Order_username` varchar(100) NOT NULL,
  `Street_address` varchar(100) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `Landmark` varchar(100) NOT NULL,
  `Pincode` varchar(100) NOT NULL,
  `Mobile_number` varchar(100) NOT NULL,
  `Order_place_date` varchar(100) NOT NULL,
  `Order_deliver_date` varchar(100) NOT NULL,
  `Order_cancel_reason` varchar(100) NOT NULL,
  `Payment_method` varchar(100) NOT NULL,
  `Payment_id` varchar(100) NOT NULL,
  `Order_status` varchar(100) NOT NULL,
  `Userid` varchar(100) NOT NULL,
  `Refund_status` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Order_data`
--

INSERT INTO `Order_data` (`Order_key`, `Order_id`, `Order_total`, `Order_username`, `Street_address`, `Area`, `Landmark`, `Pincode`, `Mobile_number`, `Order_place_date`, `Order_deliver_date`, `Order_cancel_reason`, `Payment_method`, `Payment_id`, `Order_status`, `Userid`, `Refund_status`) VALUES
(278, '38950274', '11500', 'Keyur', 'A-201', 'Sheb', 'Shsb', '394102', '6354757251', '29-12-2022', '-', '- ', 'Cash on delivery', 'None', 'Pending', 'uxcoznimjtgadkf', 'No'),
(276, '16329054', '11500', 'Keyur', 'A-201', 'Sheb', 'Shsb', '394102', '6354757251', '29-12-2022', '29-12-2022-17-5-5', 'Not like', 'Payment success', 'pay_Kxi6RuIbKYHDdW', 'User-cancel', 'uxcoznimjtgadkf', 'No'),
(277, '80157263', '11500', 'Keyur', 'A-201', 'Sheb', 'Shsb', '394102', '6354757251', '29-12-2022', '29-12-2022-17-10-25', 'Zvzzv', 'Cash on delivery', 'None', 'User-cancel', 'uxcoznimjtgadkf', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `Order_product_data`
--

CREATE TABLE `Order_product_data` (
  `Order_product_key` int(11) NOT NULL,
  `Product_id` varchar(100) NOT NULL,
  `Product_image1` varchar(1000) NOT NULL,
  `Product_image2` varchar(1000) NOT NULL,
  `Product_image3` varchar(1000) NOT NULL,
  `Product_information` varchar(300) NOT NULL,
  `Product_weight` varchar(400) NOT NULL,
  `Product_size` varchar(100) NOT NULL,
  `Product_discount_price` varchar(100) NOT NULL,
  `Product_retail_price` varchar(100) NOT NULL,
  `Product_type` varchar(100) NOT NULL,
  `Order_id` varchar(100) NOT NULL,
  `Product_tag` varchar(100) NOT NULL,
  `Category_id` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Order_product_data`
--

INSERT INTO `Order_product_data` (`Order_product_key`, `Product_id`, `Product_image1`, `Product_image2`, `Product_image3`, `Product_information`, `Product_weight`, `Product_size`, `Product_discount_price`, `Product_retail_price`, `Product_type`, `Order_id`, `Product_tag`, `Category_id`) VALUES
(313, 'ysjklfqemtcrbxw', 'http://res.cloudinary.com/smartinfo/image/upload/v1672220824/korq7ydmldahaoabnozr.jpg', 'None', 'None', 'Gold ring 916', '12.880', '19', '11500', '12000', 'Gold', '12876450', '', 'afcjeymrdi'),
(314, 'ysjklfqemtcrbxw', 'http://res.cloudinary.com/smartinfo/image/upload/v1672220824/korq7ydmldahaoabnozr.jpg', 'None', 'None', 'Gold ring 916', '12.880', '19', '11500', '12000', 'Gold', '58647930', '', 'afcjeymrdi'),
(315, 'ysjklfqemtcrbxw', 'http://res.cloudinary.com/smartinfo/image/upload/v1672220824/korq7ydmldahaoabnozr.jpg', 'None', 'None', 'Gold ring 916', '12.880', '19', '11500', '12000', 'Gold', '16329054', '', 'afcjeymrdi'),
(316, 'ysjklfqemtcrbxw', 'http://res.cloudinary.com/smartinfo/image/upload/v1672220824/korq7ydmldahaoabnozr.jpg', 'None', 'None', 'Gold ring 916', '12.880', '19', '11500', '12000', 'Gold', '80157263', '', 'afcjeymrdi'),
(317, 'ysjklfqemtcrbxw', 'http://res.cloudinary.com/smartinfo/image/upload/v1672220824/korq7ydmldahaoabnozr.jpg', 'None', 'None', 'Gold ring 916', '12.880', '19', '11500', '12000', 'Gold', '38950274', '', 'afcjeymrdi');

-- --------------------------------------------------------

--
-- Table structure for table `owbfkgcduj`
--

CREATE TABLE `owbfkgcduj` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pjrhvmuwoq`
--

CREATE TABLE `pjrhvmuwoq` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(100) NOT NULL,
  `Category_id` varchar(100) NOT NULL,
  `Category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`Product_key`, `Product_id`, `Category_id`, `Category_name`) VALUES
(10, 'xpezrloqidkwaft', 'afcjeymrdi', 'Jeans ring '),
(13, 'rmquvzdecahyxwg', 'bsyuzrojxd', 'Jeans ring'),
(14, 'kmfqciwjxpsrugb', 'afcjeymrdi', 'Jeans ring'),
(15, 'vbznxcploitsahm', 'afcjeymrdi', 'Jeans ring'),
(16, 'ukohqenritwzyjg', 'afcjeymrdi', 'Jeans ring'),
(17, 'mwvbyudilhgornk', 'afcjeymrdi', 'Jeans ring'),
(18, 'lqoazteiypgndjs', 'zilhtwmgfy', 'Ladies ring '),
(19, 'yupntfowjzvasxc', 'afcjeymrdi', 'Jeans ring'),
(20, 'kedxyhtqjzvbgal', 'afcjeymrdi', 'Jeans ring'),
(21, 'ysjklfqemtcrbxw', 'afcjeymrdi', 'Jeans ring'),
(22, 'dzqrcpkxiwsoyle', 'bsyuzrojxd', 'Jeans ring'),
(23, 'cvldbmnehuiowrp', 'zilhtwmgfy', 'Ladies ring '),
(24, 'upfzxajmhwcykol', 'afcjeymrdi', 'Jeans ring');

-- --------------------------------------------------------

--
-- Table structure for table `qijgptuwyaoflzm`
--

CREATE TABLE `qijgptuwyaoflzm` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qijgptuwyaoflzm`
--

INSERT INTO `qijgptuwyaoflzm` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'order-item-0', 'cvldbmnehuiowrp', 'zilhtwmgfy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'address-0', 'Divya vipul bhuva', 'B-27, radhakrishna society, ', 'Mota varacha', 'Rajhans shopping', '394101', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Order', '72345061', 'Pending', 'Cash on delivery', 'None', '28-12-2022', '-', '-', '12000', 'Divya vipul bhuva', '9824113124', 'B-27, radhakrishna society, ', 'Mota varacha', 'Rajhans shopping', '394101', 'No'),
(6, 'watchlist', 'dzqrcpkxiwsoyle', 'bsyuzrojxd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `qscgfeilyt`
--

CREATE TABLE `qscgfeilyt` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `refund_payment_data`
--

CREATE TABLE `refund_payment_data` (
  `Refund_payment_key` int(11) NOT NULL,
  `Payment_id` varchar(100) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Mobilenumber` varchar(100) NOT NULL,
  `Order_id` varchar(100) NOT NULL,
  `Order_date` varchar(100) NOT NULL,
  `Refund_status` varchar(100) NOT NULL,
  `Order_total` varchar(100) NOT NULL,
  `User_id` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `refund_payment_data`
--

INSERT INTO `refund_payment_data` (`Refund_payment_key`, `Payment_id`, `Username`, `Mobilenumber`, `Order_id`, `Order_date`, `Refund_status`, `Order_total`, `User_id`) VALUES
(4, 'pay_Kxi6RuIbKYHDdW', 'Keyur', '6354757251', '16329054', '29-12-2022', 'Pending', '11500', 'uxcoznimjtgadkf');

-- --------------------------------------------------------

--
-- Table structure for table `rslkpwagdeibnxq`
--

CREATE TABLE `rslkpwagdeibnxq` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rslkpwagdeibnxq`
--

INSERT INTO `rslkpwagdeibnxq` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'order-item-0', 'kedxyhtqjzvbgal', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'address-0', 'Keyur Rameshbhai Vaghasiya', 'A-201, Shayam Antillia ', 'Mota varachha ', 'Mahadev chowk', '394101', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Order', '40917258', 'Server-cancel', 'Cash on delivery', 'None', '28-12-2022', '28-12-2022', 'Because of out of stock', '800', 'Keyur Rameshbhai Vaghasiya', '6354757251', 'A-201, Shayam Antillia ', 'Mota varachha ', 'Mahadev chowk', '394101', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `rwuftcvshj`
--

CREATE TABLE `rwuftcvshj` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sfpgjknbua`
--

CREATE TABLE `sfpgjknbua` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `uqvmzofnkh`
--

CREATE TABLE `uqvmzofnkh` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE `userdata` (
  `Userid` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Mobilenumber` varchar(100) NOT NULL,
  `Password` varchar(1000) NOT NULL,
  `Tablename` varchar(100) NOT NULL,
  `Account_create_time` varchar(100) NOT NULL DEFAULT current_timestamp(),
  `Notification_id` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`Userid`, `Username`, `Mobilenumber`, `Password`, `Tablename`, `Account_create_time`, `Notification_id`) VALUES
(80, 'Keyur', '6354757251', '$2y$10$XvL7YjoCBcik8MaJQNim0uGjFmuMgAHhLRtsY7kKAibXbfS1zj5VK', 'uxcoznimjtgadkf', '2022-12-28 09:32:21', 'cl-ZW4xTR0O0aprmvtwH7H:APA91bFF3Xmo4TrmptnEkxe4xdAI1BmpoK3ZgsqbQVOou5Dquo-NbY9HskTtxQYXgcsFI1CCHCCHyBKhtGVAhvx82eucUrgcRRv1JnyQFJmOgY5aIchPh58ZQa4V7qpJQcuG2pJfffK8');

-- --------------------------------------------------------

--
-- Table structure for table `uxcoznimjtgadkf`
--

CREATE TABLE `uxcoznimjtgadkf` (
  `User_key` int(11) NOT NULL,
  `Option` varchar(100) DEFAULT NULL,
  `Data1` varchar(200) DEFAULT NULL,
  `Data2` varchar(200) DEFAULT NULL,
  `Data3` varchar(200) DEFAULT NULL,
  `Data4` varchar(200) DEFAULT NULL,
  `Data5` varchar(200) DEFAULT NULL,
  `Data6` varchar(200) DEFAULT NULL,
  `Data7` varchar(200) DEFAULT NULL,
  `Data8` varchar(200) DEFAULT NULL,
  `Data9` varchar(200) DEFAULT NULL,
  `Data10` varchar(100) DEFAULT NULL,
  `Data11` varchar(100) DEFAULT NULL,
  `Data12` varchar(100) DEFAULT NULL,
  `Data13` varchar(100) DEFAULT NULL,
  `Data14` varchar(100) DEFAULT NULL,
  `Data15` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `uxcoznimjtgadkf`
--

INSERT INTO `uxcoznimjtgadkf` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`) VALUES
(1, 'cart-id', '5', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'address', '1', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'watchlist', 'ysjklfqemtcrbxw', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'order-item-0', 'ysjklfqemtcrbxw', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'address-0', 'Keyur', 'A-201', 'Sheb', 'Shsb', '394102', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Order', '12876450', 'Online payment failed', 'Payment failed', 'None', '29-12-2022', '-', '-', '11500', 'Keyur', '6354757251', 'A-201', 'Sheb', 'Shsb', '394102', 'No'),
(7, 'order-item-1', 'ysjklfqemtcrbxw', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Order', '58647930', 'Online payment failed', 'Payment failed', 'None', '29-12-2022', '-', '-', '11500', 'Keyur', '6354757251', 'A-201', 'Sheb', 'Shsb', '394102', 'No'),
(9, 'order-item-2', 'ysjklfqemtcrbxw', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Order', '16329054', 'User-cancel', 'Payment success', 'pay_Kxi6RuIbKYHDdW', '29-12-2022', '29-12-2022-17-5-5', 'Not like', '11500', 'Keyur', '6354757251', 'A-201', 'Sheb', 'Shsb', '394102', 'No'),
(11, 'order-item-3', 'ysjklfqemtcrbxw', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Order', '80157263', 'User-cancel', 'Cash on delivery', 'None', '29-12-2022', '29-12-2022-17-10-25', 'Zvzzv', '11500', 'Keyur', '6354757251', 'A-201', 'Sheb', 'Shsb', '394102', 'No'),
(13, 'order-item-4', 'ysjklfqemtcrbxw', 'afcjeymrdi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Order', '38950274', 'Pending', 'Cash on delivery', 'None', '29-12-2022', '-', '-', '11500', 'Keyur', '6354757251', 'A-201', 'Sheb', 'Shsb', '394102', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `vdroawjxgz`
--

CREATE TABLE `vdroawjxgz` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vgaqcblikf`
--

CREATE TABLE `vgaqcblikf` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `zilhtwmgfy`
--

CREATE TABLE `zilhtwmgfy` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `zinhtouraw`
--

CREATE TABLE `zinhtouraw` (
  `Product_key` int(11) NOT NULL,
  `Product_id` varchar(40) DEFAULT NULL,
  `Product_information` varchar(500) DEFAULT NULL,
  `Product_image1` varchar(1000) DEFAULT NULL,
  `Product_image2` varchar(1000) DEFAULT NULL,
  `Product_image3` varchar(1000) DEFAULT NULL,
  `Product_weight` varchar(100) DEFAULT NULL,
  `Product_type` varchar(30) DEFAULT NULL,
  `Product_size` varchar(30) DEFAULT NULL,
  `Product_discount_price` varchar(100) DEFAULT NULL,
  `Product_retail_price` varchar(100) DEFAULT NULL,
  `Product_tag_number` varchar(100) DEFAULT NULL,
  `Product_sold_status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `afcjeymrdi`
--
ALTER TABLE `afcjeymrdi`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `aifjdknhsg`
--
ALTER TABLE `aifjdknhsg`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`Banner_id`);

--
-- Indexes for table `bsyuzrojxd`
--
ALTER TABLE `bsyuzrojxd`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `bxywceqmjs`
--
ALTER TABLE `bxywceqmjs`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Category_id`);

--
-- Indexes for table `eckzbgqsaj`
--
ALTER TABLE `eckzbgqsaj`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `eqknxgwyci`
--
ALTER TABLE `eqknxgwyci`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `fiqudbremyzxjtp`
--
ALTER TABLE `fiqudbremyzxjtp`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `goldprice`
--
ALTER TABLE `goldprice`
  ADD PRIMARY KEY (`Price_id`);

--
-- Indexes for table `hordtislby`
--
ALTER TABLE `hordtislby`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `jdapbfhrilkwtzu`
--
ALTER TABLE `jdapbfhrilkwtzu`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `jtmiwondcl`
--
ALTER TABLE `jtmiwondcl`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `kqwfxmsbgv`
--
ALTER TABLE `kqwfxmsbgv`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `lfxwdgkbej`
--
ALTER TABLE `lfxwdgkbej`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `mzpuqlgydo`
--
ALTER TABLE `mzpuqlgydo`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `odyjhncsai`
--
ALTER TABLE `odyjhncsai`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `oijfdtlwxq`
--
ALTER TABLE `oijfdtlwxq`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `Order_data`
--
ALTER TABLE `Order_data`
  ADD PRIMARY KEY (`Order_key`);

--
-- Indexes for table `Order_product_data`
--
ALTER TABLE `Order_product_data`
  ADD PRIMARY KEY (`Order_product_key`);

--
-- Indexes for table `owbfkgcduj`
--
ALTER TABLE `owbfkgcduj`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `pjrhvmuwoq`
--
ALTER TABLE `pjrhvmuwoq`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `qijgptuwyaoflzm`
--
ALTER TABLE `qijgptuwyaoflzm`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `qscgfeilyt`
--
ALTER TABLE `qscgfeilyt`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `refund_payment_data`
--
ALTER TABLE `refund_payment_data`
  ADD PRIMARY KEY (`Refund_payment_key`);

--
-- Indexes for table `rslkpwagdeibnxq`
--
ALTER TABLE `rslkpwagdeibnxq`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `rwuftcvshj`
--
ALTER TABLE `rwuftcvshj`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `sfpgjknbua`
--
ALTER TABLE `sfpgjknbua`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `uqvmzofnkh`
--
ALTER TABLE `uqvmzofnkh`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`Userid`);

--
-- Indexes for table `uxcoznimjtgadkf`
--
ALTER TABLE `uxcoznimjtgadkf`
  ADD PRIMARY KEY (`User_key`);

--
-- Indexes for table `vdroawjxgz`
--
ALTER TABLE `vdroawjxgz`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `vgaqcblikf`
--
ALTER TABLE `vgaqcblikf`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `zilhtwmgfy`
--
ALTER TABLE `zilhtwmgfy`
  ADD PRIMARY KEY (`Product_key`);

--
-- Indexes for table `zinhtouraw`
--
ALTER TABLE `zinhtouraw`
  ADD PRIMARY KEY (`Product_key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `afcjeymrdi`
--
ALTER TABLE `afcjeymrdi`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `aifjdknhsg`
--
ALTER TABLE `aifjdknhsg`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `Banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `bsyuzrojxd`
--
ALTER TABLE `bsyuzrojxd`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bxywceqmjs`
--
ALTER TABLE `bxywceqmjs`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `eckzbgqsaj`
--
ALTER TABLE `eckzbgqsaj`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eqknxgwyci`
--
ALTER TABLE `eqknxgwyci`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fiqudbremyzxjtp`
--
ALTER TABLE `fiqudbremyzxjtp`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `goldprice`
--
ALTER TABLE `goldprice`
  MODIFY `Price_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `hordtislby`
--
ALTER TABLE `hordtislby`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jdapbfhrilkwtzu`
--
ALTER TABLE `jdapbfhrilkwtzu`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jtmiwondcl`
--
ALTER TABLE `jtmiwondcl`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kqwfxmsbgv`
--
ALTER TABLE `kqwfxmsbgv`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lfxwdgkbej`
--
ALTER TABLE `lfxwdgkbej`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mzpuqlgydo`
--
ALTER TABLE `mzpuqlgydo`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `odyjhncsai`
--
ALTER TABLE `odyjhncsai`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oijfdtlwxq`
--
ALTER TABLE `oijfdtlwxq`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Order_data`
--
ALTER TABLE `Order_data`
  MODIFY `Order_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- AUTO_INCREMENT for table `Order_product_data`
--
ALTER TABLE `Order_product_data`
  MODIFY `Order_product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=318;

--
-- AUTO_INCREMENT for table `owbfkgcduj`
--
ALTER TABLE `owbfkgcduj`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pjrhvmuwoq`
--
ALTER TABLE `pjrhvmuwoq`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `qijgptuwyaoflzm`
--
ALTER TABLE `qijgptuwyaoflzm`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `qscgfeilyt`
--
ALTER TABLE `qscgfeilyt`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `refund_payment_data`
--
ALTER TABLE `refund_payment_data`
  MODIFY `Refund_payment_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rslkpwagdeibnxq`
--
ALTER TABLE `rslkpwagdeibnxq`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rwuftcvshj`
--
ALTER TABLE `rwuftcvshj`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sfpgjknbua`
--
ALTER TABLE `sfpgjknbua`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uqvmzofnkh`
--
ALTER TABLE `uqvmzofnkh`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userdata`
--
ALTER TABLE `userdata`
  MODIFY `Userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `uxcoznimjtgadkf`
--
ALTER TABLE `uxcoznimjtgadkf`
  MODIFY `User_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vdroawjxgz`
--
ALTER TABLE `vdroawjxgz`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vgaqcblikf`
--
ALTER TABLE `vgaqcblikf`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zilhtwmgfy`
--
ALTER TABLE `zilhtwmgfy`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `zinhtouraw`
--
ALTER TABLE `zinhtouraw`
  MODIFY `Product_key` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
