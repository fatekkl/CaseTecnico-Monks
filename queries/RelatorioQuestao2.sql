
/* Questão: Qual veículo gerou a maior e menor receita? */


/* Resposta: 

    Maior: Forester, 4320000
    Menor: Palio, 8000
    
*/


/* Captura o veículo que gerou a maior receita, multiplicando o valor do veículo, pela quantidade de vendas do mesmo. Para capturar a maior receita, ele ordena do maior para o menor, e pega só primeiro*/

SELECT 
    nome,
    (vendas * valor_do_veiculo) AS receita
FROM vehicles_brands
ORDER BY receita DESC
LIMIT 1;


/* Captura o veículo que gerou a menor receita, multiplicando o valor do veículo, pela quantidade de vendas do mesmo. Para capturar a menor receita, ele ordena do menor para o maior, e pega só primeiro*/

SELECT 
    nome,
    (vendas * valor_do_veiculo) AS receita
FROM vehicles_brands
ORDER BY receita ASC
LIMIT 1;

