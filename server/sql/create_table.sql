-- make Table
CREATE TABLE `blocks` (
  `index` INT(11) NOT NULL PRIMARY kEY,
  `data` VARCHAR(100) NULL,
  `timestamp` TIMESTAMP default current_timestamp NULL,
  `hash` VARCHAR(100) NOT NULL,
  `previousHash` VARCHAR(100) NOT NULL,,
  `difficulty` INT(11) default 0  NOT NULL,
  `nonce` VARCHAR(64) NOT NULL
) CHARSET=utdf8mb4 COLLATE=utf8m4_general_ci;