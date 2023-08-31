// VALIDACOES

const validarIndex = (req, res, next) => {
    const { id } = req.params;

    //VERIFICAR SE É UM NUMERO
    if (isNaN(Number(id))) {
      //POR CONVENCAO PASSAR OS STATUS
      //400 === BAD REQUEST
  
      return res.status(400).json({ mensagem: "O id deve ser numérico." });
    }
    next();
};



module.exports = {
    validarIndex
}
