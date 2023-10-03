let { banco, contas } = require("../bancodedados");

//validar senha do banco - rota listar
const validarSenha = (req, res, next) => {
  const { senha_banco } = req.query;
  if (!senha_banco) {
    return res.status(400).json({ mensagem: "Não foi informada a senha." });
  }
  if (senha_banco !== banco.senha) {
    return res.status(401).json({ mensagem: "A senha está incorreta." });
  }
  next();
};

//validar novos dados - rota atualizar
const validarNovosDados = (req, res, next) => {
  let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os dados são obrigatórios." });
  }
  let cpfInformado = contas.some((usuario) => {
    return usuario.usuario.cpf === cpf;
  });
  let emailInformado = contas.some((usuario) => {
    return usuario.usuario.email === email;
  });
  if (cpfInformado || emailInformado) {
    return res
      .status(400)
      .json({ mensagem: "Já existe uma conta com o CPF ou e-mail informado" });
  }
  next();
};

//validar conta como parâmetro de URL
const validarNumConta = (req, res, next) => {
  const { numeroConta } = req.params;

  let contaInformada = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!contaInformada) {
    return res
      .status(400)
      .json({ mensagem: "Conta não informada ou não existente" });
  }
  next();
};
//validar conta body - rota deposito, saque e transf.
const validarContaBody = (req, res, next) => {
  let { numero_conta } = req.body;

  numero_conta = Number(numero_conta);
  let contaInformada = contas.find((conta) => {
    return conta.numero === numero_conta;
  });

  if (!contaInformada) {
    return res.status(400).json({ mensagem: "Conta não informada" });
  }
  next();
};
//validar senha conta body - rota deposito, saque e transf
const validarSenhaConta = (req, res, next) => {
  let { senha } = req.body;

  let senhaVerificar = contas.find((conta) => {
    return conta.usuario.senha === senha;
  });

  if (!senhaVerificar || senhaVerificar.usuario.senha !== senha) {
    return res.status(400).json({ mensagem: "A senha é inválida" });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: "É necessário informar a senha." });
  }

  next();
};

//validar saldo - rota saque
const validarSaldoConta = (req, res, next) => {
  let { numero_conta, valor } = req.body;
  numero_conta = Number(numero_conta);
  let contaInformada = contas.find((conta) => {
    return conta.numero === numero_conta;
  });
  if (contaInformada.saldo < Number(valor)) {
    return res.status(400).json({ mensagem: "O saldo é insuficiente" });
  }
  next();
};
//validar conta e senha query - rotas extrato e saldo
const validarContaQuery = (req, res, next) => {
  const { numero_conta, senha } = req.query;
  let numeroConta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });
  if (!numeroConta) {
    return res
      .status(400)
      .json({ mensagem: "A conta não foi informada ou não existe" });
  }
  if (senha !== numeroConta.usuario.senha) {
    return res.status(400).json({ mensagem: "Senha incorreta" });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: "A senha não foi informada" });
  }
  next();
};

module.exports = {
  validarSenha,
  validarNovosDados,
  validarNumConta,
  validarContaBody,
  validarSenhaConta,
  validarSaldoConta,
  validarContaQuery,
};
