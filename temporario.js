const dados = [
  {
    id: 1,
    nome: "Caldeira",
    email: "caldeira@gmail.com",
    cargo: "professor",
  },
  {
    id: 2,
    nome: "Ivor Q. Pruitt",
    email: "tellus@outlook.org",
    cargo: "aluno",
    aulas: [
      {
        id: 1,
        nome: "Cursus Luctus Corporation",
        vista: false,
      },
      {
        id: 2,
        nome: "Mi Eleifend Corporation",
        vista: false,
      },
      {
        id: 3,
        nome: "Lacus Ut Nec Industries",
        vista: false,
      },
    ],
  },
];



console.log(criarAula("2", "API REST", "false"));
