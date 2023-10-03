let {
  contas,
  saques,
  depositos,
  transferencias,
  numConta,
} = require("../bancodedados");

//listagem - conta validada no midd
const listagemContas = (req, res) => {
  return res.json(contas);
};
//criar conta - dados validados no midd
const criarConta = (req, res) => {
  let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const novaConta = {
    numero: numConta++,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };
  contas.push(novaConta);
  return res.status(200).send();
};
//atualizar - dados validados no midd
const atualizarDados = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const { numeroConta } = req.params;

  let contaAtualizada = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  contaAtualizada.usuario.nome = nome;
  contaAtualizada.usuario.cpf = cpf;
  contaAtualizada.usuario.data_nascimento = data_nascimento;
  contaAtualizada.usuario.telefone = telefone;
  contaAtualizada.usuario.email = email;
  contaAtualizada.usuario.senha = senha;

  return res.status(200).send();
};
//deletar conta
const deletarConta = (req, res) => {
  //validar se o saldo é 0
  const { numeroConta } = req.params;
  let contaDeletar = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (contaDeletar.saldo !== 0) {
    return res
      .status(400)
      .json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  contas = contas.filter((conta) => {
    return conta.numero !== Number(numeroConta);
  });
  return res.status(200).send();
};
//depositar - contas origem e destino, senha e saldo validados no midd
const depositarSaldo = (req, res) => {
  const { numero_conta, valor } = req.body;
  let saldoAdicionar = Number(valor);
  const contaDepositar = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });
  if (!valor) {
    return res.status(400).json({ mensagem: "O valor é obrigatório" });
  }
  if (valor <= 0) {
    return res.status(400).json({ mensagem: "Valor inválido" });
  }
  contaDepositar.saldo += saldoAdicionar;
  const dataHora = new Date();
  const dataFormat = dataHora.toISOString();
  const dataSplit = dataFormat.split("T");
  const dia = dataSplit[0];
  const hora = dataSplit[1].substring(0, 8);

  const novoDeposito = {
    data: `${dia} ${hora}`,
    numero_conta: Number(numero_conta),
    valor,
  };

  depositos.push(novoDeposito);
  return res.status(200).json({ mensagem: "Saldo adicionado com sucesso" });
};
//sacar - contas origem e destino, senha e saldo validados no midd
const sacarSaldo = (req, res) => {
  const { numero_conta, valor } = req.body;
  let saldoSubtrair = Number(valor);
  if (!valor) {
    return res.status(400).json({ mensagem: "O valor é obrigatório" });
  }
  if (!numero_conta) {
    return res
      .status(400)
      .json({ mensagem: "É obrigatório informar a conta." });
  }
  const contaSacar = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });
  const dataHora = new Date();
  const dataFormat = dataHora.toISOString();
  const dataSplit = dataFormat.split("T");
  const dia = dataSplit[0];
  const hora = dataSplit[1].substring(0, 8);

  contaSacar.saldo -= saldoSubtrair;
  const novoSaque = {
    data: `${dia} ${hora}`,
    numero_conta: Number(numero_conta),
    valor,
  };
  saques.push(novoSaque);
  return res.status(200).json({ mensagem: "Saque realizado com sucesso" });
};
//transferir - contas origem e destino, senha e saldo validados no midd
const transferirSaldo = (req, res) => {
  let { numero_conta_origem, numero_conta_destino, valor } = req.body;
  numero_conta_origem = Number(numero_conta_origem);
  let contaOrigem = contas.find((conta) => {
    return conta.numero === numero_conta_origem;
  });
  if (!contaOrigem) {
    return res
      .status(400)
      .json({ mensagem: "Conta origem não informada ou não existente" });
  }
  //validar destino
  let contaDestino = contas.find((conta) => {
    return conta.numero === Number(numero_conta_destino);
  });

  if (!contaDestino) {
    return res
      .status(400)
      .json({ mensagem: "Conta destino não informada ou não existente" });
  }

  if (contaOrigem === contaDestino) {
    return res
      .statos(400)
      .json({ mensagem: "A transferência não pode ser para a mesma conta." });
  }
  //validar saldo conta origem
  if (contaOrigem.saldo <= Number(valor) || !valor) {
    return res.status(400).json({
      mensagem: "O saldo é insuficiente ou o valor não foi informado",
    });
  }
  //senha > middleware
  //subtrair saldo destino, somar saldo origem
  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  //hora
  const dataHora = new Date();
  const dataFormat = dataHora.toISOString();
  const dataSplit = dataFormat.split("T");
  const dia = dataSplit[0];
  const hora = dataSplit[1].substring(0, 8);
  //push obj transferencia
  const novaTransferencia = {
    data: `${dia} ${hora}`,
    numero_conta_origem: Number(numero_conta_origem),
    numero_conta_destino: Number(numero_conta_destino),
    valor,
  };
  transferencias.push(novaTransferencia);
  return res.status(200).send();
};
//saldo - query params validados no midd
const obterSaldo = (req, res) => {
  const { numero_conta, senha } = req.query;
  //Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
  let numeroConta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });
  // Exibir o saldo da conta bancária em questão
  return res.status(200).json({ saldo: numeroConta.saldo });
};
//extrato - query params validados no midd
const obterExtrato = (req, res) => {
  const { numero_conta, senha } = req.query;
  //Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
  let numeroConta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });
  const extSaques = saques.filter((mov) => {
    return mov.numero_conta === Number(numero_conta);
  });
  const extDepositos = depositos.filter((mov) => {
    return mov.numero_conta === Number(numero_conta);
  });
  const extTransferencias = transferencias.filter((mov) => {
    return (
      mov.numero_conta_origem === Number(numero_conta) ||
      mov.numero_conta_destino === Number(numero_conta)
    );
  });

  return res.status(200).json({
    Saques: extSaques,
    Depósitos: extDepositos,
    Transferêcias: extTransferencias,
  });
};

module.exports = {
  listagemContas,
  criarConta,
  atualizarDados,
  deletarConta,
  depositarSaldo,
  sacarSaldo,
  transferirSaldo,
  obterSaldo,
  obterExtrato,
};
