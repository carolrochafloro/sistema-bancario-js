let {
  banco,
  contas,
  saques,
  depositos,
  transferencias,
  numConta,
} = require("../bancodedados");

//middleware validar senha banco
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

//middleware validar novos dados
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

const validarSaldoConta = (req, res, next) => {
  let { numero_conta, valor } = req.body;
  numero_conta = Number(numero_conta);
  let contaInformada = contas.find((conta) => {
    return conta.numero === numero_conta;
  });

  if (contaInformada.saldo <= Number(valor)) {
    return res.status(400).json({ mensagem: "O saldo é insuficiente" });
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
};
