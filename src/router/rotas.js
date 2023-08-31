//ROTAS

const express = require("express");
const { listarAulas, listarAula, criarAula } = require("../controller/alunos");
const { validarIndex } = require("../middleware/validar-index");

const rotas = express();

// O INTERMEDIARIO "validarCORPO" VALIDA ANTES DE LIBERAR PRA ROTA
rotas.get("/alunos/:id/aulas", validarIndex, listarAulas);
//rotas.use(validarCorpo) => EXEMPLO DO QUE ESTA SENDO DITO ABAIXO => SE DESEJAR
//PASSAR ANTES NO INTERMEDIARIO
rotas.get("/alunos/:id/aulas/:idAula", listarAula);
rotas.post("/alunos/:id", validarIndex, criarAula)

//CASO QUEIRA VALIDAR/PROTEGER VARIAS ROTAS 
//E POSSIVEL USAR
//rotas.use(validarCorpo) => AS ROTAS QUE ESTIVEREM EMBAIXO DESSA LINHA 
//PASSARÃO ANTES PELO INTERMEDIARO


//EXPORTANDO PARA QUE SEJA IMPORTADO NO PRINCIPAL
module.exports = {
    rotas
};
