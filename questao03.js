const fs = require("fs");

// Lê os dados do arquivo JSON
const faturamentoMensal = JSON.parse(
  fs.readFileSync("faturamento.json", "utf8")
);

function analisarFaturamento(faturamento) {
  const diasComFaturamento = faturamento.filter((dia) => dia.valor > 0);
  const valores = diasComFaturamento.map((dia) => dia.valor);

  const menorValor = Math.min(...valores);
  const maiorValor = Math.max(...valores);
  const mediaMensal =
    valores.reduce((acc, val) => acc + val, 0) / valores.length;
  const diasAcimaDaMedia = diasComFaturamento.filter(
    (dia) => dia.valor > mediaMensal
  ).length;

  console.log(`Menor faturamento: R$ ${menorValor.toFixed(2)}`);
  console.log(`Maior faturamento: R$ ${maiorValor.toFixed(2)}`);
  console.log(`Dias com faturamento acima da média: ${diasAcimaDaMedia}`);
}

analisarFaturamento(faturamentoMensal);
