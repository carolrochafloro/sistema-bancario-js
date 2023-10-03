# Sistema bancário

Este é um projeto desenvolvido como parte do desafio do módulo 2 do curso "Desenvolvimento de Software com foco em back-end" oferecido pela Cubos Academy. O objetivo principal deste projeto é praticar a criação e configuração de requisições HTTP em um ambiente de desenvolvimento back-end.

## Sobre o Projeto
Este projeto é uma API RESTful (Representational State Transfer) de um sistema bancário.  
Foi desenvolvido utilizando a linguagem JavaScript e as tecnologias Node.js e NPM (Node Package Manager).
Os dados do sistema são armazenados em memória, mas há planos para futura integração com um banco de dados.
Todas as respostas das requisições são formatadas em JSON (JavaScript Object Notation), tornando-as facilmente legíveis e manipuláveis.  

![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)

## Funcionalidades Principais
Este sistema bancário oferece as seguintes funcionalidades principais:  

- Listar Contas: Rota para listar todas as contas cadastradas. Para acessar, utilize a rota http://localhost:3000/contas?senha_banco=Cubos123Bank.

- Criar Conta: Rota para criar uma nova conta bancária. Para acessar, utilize a rota http://localhost:3000/contas.

- Alterar Dados de Usuário: Rota para alterar os dados de um usuário de uma conta específica. Para acessar, utilize uma rota como http://localhost:3000/contas/1?senha=1234, onde "1" é o número da conta.

- Deletar Conta: Rota para deletar uma conta bancária. Para acessar, utilize uma rota como http://localhost:3000/contas/deletar/1, onde "1" é o número da conta.

- Depositar em Conta: Rota para realizar um depósito em uma conta bancária. Para acessar, utilize a rota http://localhost:3000/transacoes/depositar.

- Sacar da Conta: Rota para realizar um saque em uma conta bancária. Para acessar, utilize a rota http://localhost:3000/transacoes/sacar.

- Transferência entre Contas: Rota para realizar uma transferência de fundos entre duas contas bancárias. Para acessar, utilize a rota http://localhost:3000/transacoes/transferir.

- Exibir Saldo da Conta: Rota para consultar o saldo de uma conta bancária específica. Para acessar, utilize uma rota como http://localhost:3000/contas/saldo?numero_conta=1&senha=1234, onde "1" é o número da conta.

- Exibir Extrato da Conta: Rota para listar as transações realizadas em uma conta bancária específica. Para acessar, utilize uma rota como http://localhost:3000/contas/extrato?numero_conta=1&senha=1234, onde "1" é o número da conta.

## Executando o Projeto
Para executar o projeto em seu ambiente local, siga os passos abaixo:

- Certifique-se de ter o Node.js e o NPM instalados em sua máquina.

- Clone este repositório para o seu computador.

- Navegue até a pasta do projeto e execute o seguinte comando para instalar as dependências: *npm install*
  
- Após a instalação das dependências, inicie o servidor local com o seguinte comando: *npm start*  

- Agora, você pode usar uma ferramenta de requisições HTTP, como o Insomnia, para enviar requisições para as rotas mencionadas anteriormente.  

**Lembre-se de ajustar as configurações, como a URL e as informações necessárias nas requisições, para se adequarem ao seu ambiente de desenvolvimento.**

Este é um projeto em desenvolvimento, e atualizações e melhorias podem ser implementadas no futuro.

![image](https://github.com/carolrochafloro/sistema-bancario-js/assets/127871333/a07b6596-7fc9-4814-9a99-d397bee2b250)
