# Sistema bancário

Projeto desenvolvido para o desafio do módulo 2 do curso Desenvolvimento de Software com foco em back-end da Cubos Academy.  

**Objetivo**  
Prática da criação e configuração de requisições HTTP.  

**Sobre o projeto**  
- API REST.
- Desenvolvido em Javascript utilizando Node.js e o NPM.
- Os dados são persistentes em memória, mas em breve será integrado a um banco de dados.
- Retorno das requisições: JSON


**Execução**
O projeto é executado através do Node.js e as requisições são enviadas através do Insomnia com as rotas abaixo.  
- Listar contas - http://localhost:3000/contas?senha_banco=Cubos123Bank
- Criar conta - http://localhost:3000/contas
- Alterar dados de usuário - http://localhost:3000/contas/1?senha=1234
- Deletar conta - http://localhost:3000/contas/deletar/1
- Depositar em conta - http://localhost:3000/transacoes/depositar
- Sacar da conta - http://localhost:3000/transacoes/sacar
- Transferência entre contas - http://localhost:3000/transacoes/transferir
- Exibir saldo da conta - http://localhost:3000/contas/saldo?numero_conta=1&senha=1234
- Exibit extrato da conta - http://localhost:3000/contas/extrato?numero_conta=1&senha=1234

![image](https://github.com/carolrochafloro/sistema-bancario-js/assets/127871333/a07b6596-7fc9-4814-9a99-d397bee2b250)
