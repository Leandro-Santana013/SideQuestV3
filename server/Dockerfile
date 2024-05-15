FROM mysql:latest

# Define variáveis de ambiente para configurar o MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=db_sidequest

# Copia arquivos SQL para serem executados durante a inicialização
RUN mkdir -p /docker-entrypoint-mysql-initdb.d
# COPY ./src/database.sql /docker-entrypoint-mysql-initdb.d/
