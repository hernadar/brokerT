-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema brokertosi
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema brokertosi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `brokertosi` DEFAULT CHARACTER SET utf8 ;
USE `brokertosi` ;

-- -----------------------------------------------------
-- Table `brokertosi`.`properties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `brokertosi`.`properties` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mode` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `money` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NULL DEFAULT NULL,
  `departament` VARCHAR(45) NULL DEFAULT NULL,
  `province` VARCHAR(45) NULL DEFAULT NULL,
  `bedroom` INT(11) NULL DEFAULT NULL,
  `bathroom` INT(11) NULL DEFAULT NULL,
  `m2` DECIMAL(10,0) NULL DEFAULT NULL,
  `garage` TINYINT(4) NULL DEFAULT NULL,
  `detail` VARCHAR(1000) NULL DEFAULT NULL,
  `pets` TINYINT(4) NULL DEFAULT NULL,
  `credit` TINYINT(4) NULL DEFAULT NULL,
  `qtyScope` INT(11) NULL DEFAULT NULL,
  `pool` TINYINT(4) NULL DEFAULT NULL,
  `expenses` TINYINT(4) NULL DEFAULT NULL,
  `expensesCost` DECIMAL(10,0) NULL DEFAULT NULL,
  `private` TINYINT(4) NULL DEFAULT NULL,
  `antiquity` VARCHAR(45) NULL DEFAULT NULL,
  `careful` VARCHAR(45) NULL DEFAULT NULL,
  `floors` INT(11) NULL DEFAULT NULL,
  `heat` TINYINT(4) NULL DEFAULT NULL,
  `furniture` TINYINT(4) NULL DEFAULT NULL,
  `geoLink` VARCHAR(500) NULL DEFAULT NULL,
  `m2Total` DECIMAL(10,0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `brokertosi`.`propertypictures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `brokertosi`.`propertypictures` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  `properties_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_propertyPictures_properties1_idx` (`properties_id` ASC),
  CONSTRAINT `fk_propertyPictures_properties1`
    FOREIGN KEY (`properties_id`)
    REFERENCES `brokertosi`.`properties` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
