-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;
-- ************************************** `user_login`

CREATE TABLE `user_login`
(
 `user_id`         integer NOT NULL ,
 `user_name`       varchar(45) NOT NULL ,
 `password`        varchar(45) NOT NULL ,
 `email`           varchar(45) NULL ,
 `secret_key`      varchar(45) NULL ,
 `phone_number`    varchar(45) NULL ,
 `user_type`       varchar(45) NULL ,
 `active_flag`     varchar(45) NOT NULL ,
 `created_at`      datetime NOT NULL ,
 `created_user_id` integer NOT NULL ,
 `updated_at`      datetime NULL ,
 `upd_user_id`     integer NULL ,

PRIMARY KEY (`user_id`)
);

-- ************************************** `member`

CREATE TABLE `member`
(
 `member_id`                        integer NOT NULL ,
 `roll_no`                   integer NOT NULL ,
 `name`                      varchar(100) NOT NULL ,
 `mobile_number`             varchar(45) NULL ,
 `father_name`               varchar(100) NULL ,
 `email`                     varchar(100) NULL ,
 `blood_group`               varchar(45) NULL ,
 `home_address`              varchar(100) NULL ,
 `dob`                       date NULL ,
 `office_address`            varchar(100) NULL ,
 `advocate_name`             varchar(100) NULL ,
 `advocate_home_address`     varchar(100) NULL ,
 `advocate_office_address`   varchar(100) NULL ,
 `advocate_mobile_number`    integer NULL ,
 `advocate_email`            varchar(100) NULL ,
 `active_flag`               Integer NULL ,
 `membership_flag`            Integer  NULL ,
 `created_at`                datetime NOT NULL ,
 `created_user_id`           varchar(45) NOT NULL ,
 `updated_at`                Integer NULL ,
 `upd_user_id`               Integer NULL ,

PRIMARY KEY (`member_id`)
);

-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;
-- ************************************** `locker_member`

CREATE TABLE `locker_member`
(
 `lock_id`              integer NOT NULL ,
 `roll_no`         integer NOT NULL ,
 `name`            varchar(100) NOT NULL ,
 `father_name`     varchar(100) NOT NULL ,
 `mobil_number`    integer NOT NULL ,
 `email`           varchar(100) NOT NULL ,
 `dob`             date NOT NULL ,
 `blood_group`     varchar(45) NOT NULL ,
 `home_address`    varchar(100) NOT NULL ,
 `office_address`  varchar(100) NOT NULL ,
 `active_flag`     varchar(45) NOT NULL ,
 `created_dt`      datetime NOT NULL ,
 `created_user_id` varchar(45) NOT NULL ,
 `updated_dt`      datetime NOT NULL ,
 `upd_user_id`     varchar(100) NOT NULL ,

PRIMARY KEY (`lock_id`)
);


-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `locker_subscription_billing`

CREATE TABLE `membership_biling`
(
 `bill_no`         integer NOT NULL ,
 `bill_date`       datetime NOT NULL ,
 `roll_no`         integer NOT NULL ,
 `locker_id`       integer NOT NULL ,
 `locker_location` varchar(45) NULL ,
 `from_date`       datetime NOT NULL ,
 `to_date`         datetime NOT NULL ,
 `amount`          varchar(255) NOT NULL ,
 `payment_type`     varchar(45) NULL ,
 `membership_flag`     integer NOT NULL ,
 `created_at`      datetime NOT NULL ,
 `created_user_id` integer NULL ,
 `updated_at`      datetime NOT NULL ,
 `upd_user_id`     integer NULL ,

PRIMARY KEY (`bill_no`)
);







-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `configuration`

CREATE TABLE `configuration`
(
 `config_id`              integer NOT NULL ,
 `config_type`     varchar(45) NOT NULL ,
 `config_value`    varchar(45) NOT NULL ,
 `from_date`       datetime NULL ,
 `to_date`         datetime NULL ,
 `created_at`      datetime NOT NULL ,
 `created_user_id`      integer NULL ,
 `upd_user_id`     integer NULL ,

PRIMARY KEY (`config_id`)
);
















