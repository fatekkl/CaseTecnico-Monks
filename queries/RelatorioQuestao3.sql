
/* Questão: Considere faixas de preço de venda dos carros a cada 10 mil reais.
Qual faixa mais vendeu carros? Quantos? */

/* Resposta:  

    A faixa de que mais vendeu carros foi a de 30000 - 39999. 
    511 Carros foram vendidos nessa faixa.

*/



SELECT 
    CONCAT(
        FLOOR(valor_do_veiculo / 10000) * 10000, 
        ' - ', 
        FLOOR(valor_do_veiculo / 10000) * 10000 + 9999
    ) AS faixa_preco,
    SUM(vendas) AS total_vendas
FROM vehicles_brands
GROUP BY faixa_preco
ORDER BY total_vendas DESC
LIMIT 1;

/*  Linha de racícionio para cálculo da faixa


    1. FLOOR(valor_do_veiculo / 10000) 
    - Divide o preço do veículo por 10.000 (tamanho da faixa) e arredonda para baixo.
    - Exemplo: 35.000 / 10.000 = 3.5 → FLOOR = 3.

    2. Multiplica por 10000
    - Recupera o **início da faixa**: 3 * 10000 = 30.000.

    3. Soma 9999
    - Define o **fim da faixa**: 30.000 + 9999 = 39.999.
    - Resultado: faixa de preço "30.000 – 39.999".

*/
