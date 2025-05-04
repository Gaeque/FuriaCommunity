!! ATENÇÃO !!
Verifique o uso de **PORTAS** em conflito

Ajuste as configurações de **CORS** no backend

Ajuste os endpoints do Front em furia-Front\src>api.tsx alterar a baseURL

Ajuste o endpoint do WebSocket para o chat funcionar corretamente em: furia-Front\src>WebSocketService.tsx const socketUrl = " "

Atente-se a **usuário e senha** do banco de dados PostgreSQL

Não utilizei variaveis de ambiente, tipo .env, tudo está exposto 

Caso encontre erros ao iniciar o banco de dados, considere limpar os volumes com:
"docker-compose down -v && docker-compose up -d"


Tecnologias Necessárias:

Node.js v22.14.0 e NPM 11.2.0
Java 21
Apache Maven 3.9.9
Docker e Docker Compose

1. Clonar o Repositório : https://github.com/Gaeque/FuriaCommunity

Rodando o Frontend 

Abrir a pasta "furia-Front" com o VSCode(IDE de sua escolha)
Abrir o terminal e executar 'npm install"
Executar com npm rum dev

Abrirá um servidor de desenvolvimento em localhost;

Rodando o Backend

Abrir a pasta "furia-Back" com o Intellij(IDE de sua escolha)
Abra um terminal
Compile a aplicação com "mvn clean install"
Rode o container Docker usando "docker-compose up -d"
Execute a aplicação com "mvn spring:boot run"

O banco de dados utilizado foi um PostgreSQL rodando dentro de um container Docker.
Utilizei a IDE DBeaver para as consultas ao banco de dados

Para dúvidas ou sugestões, abra uma **Issue** no repositório:  
https://github.com/Gaeque/FuriaCommunity

