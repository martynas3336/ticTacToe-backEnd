CREATE TABLE `log` (
  `id` varchar(36) NOT NULL,
  `tileId` varchar(255) NOT NULL,
  `main` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tile` (
  `id` varchar(36) NOT NULL,
  `grid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
