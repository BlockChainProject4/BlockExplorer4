CREATE TABLE `blockInfo` (
  `index` INT(11) NOT NULL PRIMARY kEY AUTO_INCREMENT,
  `data` VARCHAR(100) NOT NULL,
  `timestamp` TEXT NULL,
  `hash` VARCHAR(100) NOT NULL,
  `date` TIMESTAMP default current_timestamp NOT NULL,
  `previousHash` INT(11) default 0  NOT NULL,
  `difficulty` INT(11) default 0  NOT NULL,
  `nonce` INT(11) default 0  NOT NULL
)




-- [
--   {
--     idx:0,
--     subject:'asdf',
--     content:'asdfasd'
--   },
--   {
--     idx:0,
--     subject:'asdf',
--     content:'asdfasd'
--   },
-- ]


블록 구성
[헤더]
- version / string
- index / number
- previouseHash / string
- time / number
- merkleRoot / string
- body / object
