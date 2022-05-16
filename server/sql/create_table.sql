-- make Table
CREATE TABLE `blockdata` (
  `idx` INT(11) NOT NULL,
  `datas` VARCHAR(100) NOT NULL,
  `timestamps` VARCHAR(50) NOT NULL,
  `hashs` VARCHAR(100) NOT NULL,
  `previousHash` VARCHAR(100) NOT NULL,
  `difficulty` INT(11) default 0 NOT NULL,
  `nonce` INT(11) NOT NULL
) 
-- CREATE TABLE `blocks` (
--   `index` INT(11) NOT NULL PRIMARY kEY,
--   `data` VARCHAR(100) NULL,
--   `timestamp` TIMESTAMP default current_timestamp NULL,
--   `hash` VARCHAR(100) NOT NULL,
--   `previousHash` VARCHAR(100) NOT NULL,,
--   `difficulty` INT(11) default 0  NOT NULL,
--   `nonce` VARCHAR(64) NOT NULL
-- ) CHARSET=utdf8mb4 COLLATE=utf8m4_general_ci;

-- make wallet
CREATE TABLE `wallet` (
	`idx` INT(11) PRIMARY KEY auto_increment, 
    `passwd` VARCHAR(60) NOT NULL,
    `publickey` VARCHAR(65) NOT NULL,
    `privatekey` VARCHAR(65) NOT NULL
    );