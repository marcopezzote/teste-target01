const fs = require("fs");
const xml2js = require("xml2js");

fs.readFile("faturamento.xml", "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo XML:", err);
    return;
  }

  xml2js.parseString(data, (err, result) => {
    if (err) {
      console.error("Erro ao parsear o XML:", err);
      return;
    }

    const estados = result.faturamento.estados[0].estado;

    const totalFaturamento = estados.reduce(
      (total, estado) => total + parseFloat(estado.faturamento[0]),
      0
    );

    estados.forEach((estado) => {
      const faturamentoEstado = parseFloat(estado.faturamento[0]);
      const percentual = ((faturamentoEstado / totalFaturamento) * 100).toFixed(
        2
      );
      console.log(
        `O percentual de representação de ${estado.nome[0]} é ${percentual}%`
      );
    });
  });
});
