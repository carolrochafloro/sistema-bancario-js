const express = require("express");
const rotas = express();
const {
  listagemContas,
  criarConta,
  atualizarDados,
  deletarConta,
  depositarSaldo,
  sacarSaldo,
  transferirSaldo,
  obterSaldo,
  obterExtrato,
} = require("./controladores/operacoes");
const {
  validarSenha,
  validarNovosDados,
  validarNumConta,
  validarContaBody,
  validarSenhaConta,
  validarSaldoConta,
} = require("./middleware/middleware");

rotas.get("/contas", validarSenha, listagemContas);
rotas.post("/contas", validarNovosDados, criarConta);
rotas.put(
  "/contas/atualizar/:numeroConta",

  validarNovosDados,
  validarNumConta,
  atualizarDados
);
rotas.delete("/contas/deletar/:numeroConta", validarNumConta, deletarConta);
rotas.post("/transacoes/depositar", validarContaBody, depositarSaldo);
rotas.post(
  "/transacoes/sacar",
  validarContaBody,
  validarSenhaConta,
  validarSaldoConta,
  sacarSaldo
);
rotas.post("/transacoes/transferir", validarSenhaConta, transferirSaldo);
rotas.get("/contas/saldo/", obterSaldo);
rotas.get("/contas/extrato", obterExtrato);

module.exports = rotas;
