

/* Questão: Qual marca teve o maior volume de vendas? */

/* Resposta: 

    Fiat
*/

/* Captura a marca que teve o maior número de vendas */

SELECT 
    marca,
    SUM(vendas) AS total_vendas
FROM vehicles_brands
GROUP BY marca
ORDER BY total_vendas DESC
LIMIT 1;

