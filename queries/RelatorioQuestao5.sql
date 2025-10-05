/* Questão: Existe alguma relação entre os veículos mais vendidos? */

/* Resposta: Sim, existe. Os veículos mais vendidos são os modelos Mobi, Up e Picanto. Esses carros têm uma faixa de preço parecida (25.000 – 35.000) e, dentro do segmento de 
veículos, são conhecidos por serem compactos.
Além disso, todos os três têm uma quantidade de vendas semelhante, cerca de 40 a 52 unidades. Outro ponto é a demanda consistente: com exceção do Picanto, os outros dois 
veículos aparecem de forma constante, sempre com a mesma média de vendas. Esse pode ser o principal motivo da diferença tão grande entre o primeiro e o segundo lugar (Mobi e Up) em relação ao Picanto. */


/* Para sustentar a resposta acima, utilizei de algumas queries SQL vou detalhar elas abaixo: */


/* Captura informações dos veículos e ordena elas baseadas nas vendas, destacando que os 10 mais vendidos tem uma faixa de preço parecida, assim como a quantidade de vendas e demandas */

SELECT nome, data, vendas, valor_do_veiculo, vendas * valor_do_veiculo AS receita
FROM vehicles_brands
ORDER BY vendas DESC
LIMIT 10;


/* Da mesma forma que na questão 3, fiz a captura de uma faixa de preço, mas dessa vez mais específica, a cada 5000. Comprovando que os 10 veículos mais vendidos, estão nessa faixa de preço e dando destaque no quanto isso foi importante */

SELECT 
    CONCAT(
        FLOOR(valor_do_veiculo / 5000) * 5000, 
        ' - ', 
        FLOOR(valor_do_veiculo / 5000) * 5000 + 9999
    ) AS faixa_preco,
    SUM(vendas) AS total_vendas
FROM vehicles_brands
GROUP BY faixa_preco
ORDER BY total_vendas DESC
LIMIT 1;