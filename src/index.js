//CONSTANTE EXPRESS RECEBENDO O MODULO DO EXPRESS
const express = require("express");

//IMPORTANDO ARQUIVO DADOS => RENOMEANDO O OBJETO DADOS PARA "BANCO DE DADOS"
const { dados: bancoDeDados } = require("../dados.js");

//CRIAR UMA APLICACAO A PARTIR DO EXPRESS
const app = express();

//CONTANTE COM O NUMERO DA PORTA
const PORTA = 3000;

//CONFIGURAR TRANSITAÇÃO VIA JSON  INTERMEDIARIO PRA RECONHECER JSON

app.use(express.json());

//CRIACAO DA ROTA COM PARAMETRO ID, POR QUE SE NAO BATER NA ROTA, NAO CHEGA
//NAO PRECISA NEM VERIFICAR, SE TEM ID OU NAO. => O PARAMETRO "id" FAZ PARTE DA ROTA

app.get("/aulas/:id", (req, res) => {
  // CASO PRECISE TESTAR => res.json === RESPONDENDO / (req.params) === OS PARAMETROS RECEBIDOS NA URL
  //return res.json(req.params); 

  //DESESTRUTURAÇÃO DO OBJETO "id"
  const { id } = req.params;

  //VERIFICAR SE É UM NAO NUMERO
  if (isNaN(Number(id))) {
    //POR CONVENCAO PASSAR OS STATUS
    //400 === BAD REQUEST

    return res.status(400).json({ mensagem: "O id deve ser numérico." });
  }

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
});

app.listen(PORTA, () => {
  console.log(`API rodando na porta ${PORTA}!`);
});
