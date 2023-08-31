//BANCO DE DADOS

//IMPORTANDO ARQUIVO DADOS => RENOMEANDO O OBJETO DADOS PARA "BANCO DE DADOS"
//CONST DESESTRUTURADA PARA IMPORTAR DADOS
const { dados: bancoDeDados } = require("../../dados");

//FUNCAO MOSTRAR LISTA DE AULAS

const listarAulas = (req, res) => {
    console.log("A requisição passou por aqui.")
  // CASO PRECISE TESTAR => //return res.json(req.params);
  //res.json === RESPONDENDO / (req.params) === OS PARAMETROS RECEBIDOS NA URL

  //DESESTRUTURAÇÃO DO OBJETO "id"
  const { id } = req.params;

  //COMO FOI PASSADO POR ROTA "/aulas/:id", NAO PRECISA MAIS VALIDAR
  // if (!id) {
  //   return "O campo id é obrigatório.";
  // }

  //.find => METODO DE ARRAY PARA ENCONTRAR O QUE SE BUSCA
  //CONVERTER "id" QUE CHEGA COMO COMO STRING DO FRONTEND PARA NUMERO
  const pessoaEncontrada = bancoDeDados.find(
    (pessoa) => pessoa.id === Number(id)
  );

  if (!pessoaEncontrada) {
    //POR CONVENCAO PASSAR OS STATUS
    //404 === NOT FOUND
    return res.status(404).json({ mensagem: "Pessoa não encontrada." });
  }

  //VERIFICAR SE CARGO E DIFERENTE DE ALUNO, SE TIVER EM QUALQUER OUTRO CARGO, RETORNA ERRO.
  if (pessoaEncontrada.cargo !== "aluno") {
    //POR CONVENCAO PASSAR OS STATUS
    //403 ===ACESSO RESTRITO / AREA RESTRITA / PROIBIDO
    return res
      .status(403)
      .json({ mensagem: "As aulas estão associadas apenas à alunos" });
  }
  //POR CONVENCAO PASSAR OS STATUS
  //200 === OK
  return res.status(200).json(pessoaEncontrada.aulas);
};

//FUNCAO LISTAR AULA ESPECIFICA
const listarAula = (req, res) => {
  // IMPORTANDO PARAMETROS DE REQUISICAO ATRAVES DA CONST DESESTRUTURADA
  const { id, idAula } = req.params;

  //VALIDACAO SE OS CAMPOS ESTAO SENDO PREENCHIDOS COM NUMEROS
  if (isNaN(Number(id)) || isNaN(Number(idAula))) {
    //400 === BAD REQUEST
    return res
      .status(400)
      .json({ mensagem: "Os identificadores devem ser numéricos." });
  }

  //BUSCAR ID DO ALUNO => SE NAO ENCONTRADO, RETORNAR ERRO
  const alunoEncontrado = bancoDeDados.find((aluno) => aluno.id === Number(id));
  //VALIDACAO SE EXISTE O ID DA AULA
  if (!alunoEncontrado) {
    return res.status(404).json({ mensagem: "Aluno não encontrado." });
  }

  if (alunoEncontrado.cargo !== "aluno") {
    return res
      .status(403)
      .json({ mensagem: "As aulas estão associadas apenas à alunos." });
  }

  //BUSCAR ID DA AULA => SE NAO ENCONTRADO, RETORNAR ERRO
  const aulaEncontrada = alunoEncontrado.aulas.find(
    (aula) => aula.id === Number(idAula)
  );
  //VALIDACAO SE EXISTE O ID DA AULA
  if (!aulaEncontrada) {
    return res.status(404).json({ mensagem: "Aula não encontrada." });
  }
  //SE ENCONTRAR ID DO ALUNO E ID DA AULA, RETORNAR INFORMAÇOES REQUISITADAS!
  return res.status(200).json(aulaEncontrada);
};

//POST => creat => CRIAR AULA

let proximoId = 16;
const criarAula = (req, res) => {
    //CONSTANTE DESESTRUTURADA COM ID RECEBENDO DO PARAMETRO DA REQUISICAO
    const { id } = req.params;
    //CONSTANTE DESESTRUTURADA COM NOME E VISTA RECEBENDO DO CORPO DA REQUISICAO
    const { nome, vista } = req.body;

    //TESTE PRA VERIFICAR ERRO
    // console.log(req.body);
    // console.log(req.params);
    // return
    //VALIDACOES
  if (!id || !nome || vista === undefined) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const pessoaEncontrada = bancoDeDados.find((pessoa) => pessoa.id === Number(id));

  if (!pessoaEncontrada) {
    return res.status(404).json({ mensagem: "Aluno não encontrado." });
  }

  if (pessoaEncontrada.cargo !== "aluno") {
    return res.status(403).json({ mensagem: "As aulas estão associadas somente à alunos." });
  }

  //CONVERSAO DE STRING EM BOOLEAN
  const vistaBooleana = vista === "true" ? Boolean(vista) : false;

  //CONST COM OBJETOS ID, NOME, VISTA => DAS AULAS A SEREM CRIADAS
  const novaAula = {
    id: proximoId,
    nome: nome,
    vista: vistaBooleana,
  };
  //INCREMENTANDO +1 NO ID
  proximoId++;
  //ADICIONANDO ELEMENTO NO ARRAY / METODO DE ARRAY=> .push
  pessoaEncontrada.aulas.push(novaAula);
  //RETORNAR PESSOA ENCONTRADA COM A MODIFICACAO
  //STATUS "201" === CREATED
  return res.status(201).json(pessoaEncontrada.aulas);
};

//EXPORTANDO PARA QUE SEJA IMPORTADO NO PRINCIPAL
module.exports = {
  listarAulas,
  listarAula,
  criarAula
};
