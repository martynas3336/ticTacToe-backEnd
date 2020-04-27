FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE ticTacToe
ENV MYSQL_USER user
ENV MYSQL_PASSWORD password

ADD setup.sql /docker-entrypoint-initdb.d
