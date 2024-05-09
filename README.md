# SideQuestV3

BACKEND

PRIMEIRO DE TUDO EM UM AMBIENTE DE DESENVOLVIMENTO COM PESSOAS E MUITO INTERESSANTE USAR DOCKER para o backend

o DOCKER tem um poder incrivel de fazer renderizar imagens de tecnologias sem ter instaladas localmente
no pc de vcs , a grande vantagem e que todo mundo tera a mesma imagem e roda sem ter error em qualquer PC
recomendo de mais a procurar a respeito de container e imagens , vou escrever um resuminho aqui
um container carrega uma imagem quando vc usa o docker vc tem que ter um container com uma imagem
no caso vamos supor criei um container chamado sidequestContainer e dentro dele e necessario usar uma imagem
no caso o sideQuest_imgDb_mysql , estou deixando um arquivo dockerfile criado para somente para deixar todo mundo
atualizado e nao ter problemas com o docker por que no final de contas o que interessa é o banco de dados, o docker file cria uma imagem e o script ta buscando a imagem do mysql , vcs poderiam criar uma aplicação completa com o docker usando varios container ai seria necessario criar um docker compose mas pra esse momento o dockerfile ja basta, talvez nem seja necessario por que é só o banco de dados vcs poderiam usar a imagem public do mysql tbm mas para deixar tudo organizado vou deixar aqui os comandos para a inicialização do docker na maquina de vcs , prestem atenção RECOMENDO DE MAIS USAREM LINUX EXISTE UM ABISMO ENTRE DESENVOLVEDORES QUE ESTAO ACOSTUMADO COM TERMINAL E OS QUE NAO ESTAO, "aaaaa mas eu so gosto de linux pra jogar jogo nutella de fortnight mimimi" faz um dual boot instala linux na sua maquina , pq pra jogar no linux e uma bosta mesmo , aaaa mesmo assim quero usar windows pq sou acostumado com esse sistema pessado cheio de regra chata . entao vc tem que procurar por usar o WSL pesquisa ai tbm ja to falando de mais olha sobre o WSL , ele é uma maneira de usar terminal do linux no windows , ou entao se vc for muito netella pode usar o git bash pra esses comandos mais basicos a seguir

Observer o arquivo dockerfile

FROM mysql:latest

# Define variáveis de ambiente para configurar o MySQL

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=db_sidequest

# Copia arquivos SQL para serem executados durante a inicialização

COPY ./database/databa.db/ /docker-entrypoint-initdb.d/

muito simples ne ele pega a imagem mysql la do dockerhub define ali o nome do banco e é a senha root , aqui ja e uma parada do mysql vc nao precisa definir um usuario root pq se vc define o passwordroot o root ja é o root kkkkkk , basicamente so estamos criando uma imagem mysql com o nome sidequest é isso

primeiro comando entao espero que abre seu terminal boladao linux e cola e aperta ENTER (NEM PRECISO DIZER QUE É PRA BAIXAR O DOCKER NÉ, BAIXA DE ACORDO COM O SEU SISTEMA E LEGAL TBM TER O DOCKER DESKTOP SO PRA VER QUAIS CONTAINER E IMAGENS ESTAO BAIXADOS E RODANDO)
docker build -t my_mysql_db .

esse comando vai criar a sua imagem chamada my_mysql_db

precisamos agora criar o container proximo comando

docker run -d -p 3306:3306 --name mysql_personal_container my_mysql_db

aqui criamos o container chamado mysql_pernal_container as tags -d quer dizer para rodar em segundo plano -p e aonde sera disponibilizado a rota do container e aonde devemos acessar ela --name e pra nomear o container pq se nao ele gera um nome aleatorio e no final my_mysql_db porra é a imagem que a gente criaou anteriormente pronto finalmente vc tem o seu banco de dados

agora vc consegue usar qualquer vizualidador de banco de dados o mysql tem o proprio dele chamado mysql workbench , eu recomando o dbeaver que nele vc consegue configurar qualquer banco de dados ai é com vcs

tive muito problemas com relação a criação de tabelas e população mas ja esta resolvido basta vc rodar o comando

node database/db.js
que as tabelas serao criadas e populadas obs: preste atenção em qual pasta vc esta se vc estiver no diretorio aonde ver o client e server entao obviamento o comando deve ser node server/database/db.js
