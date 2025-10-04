/* Questão: Qual a receita das 3 marcas que têm os menores tickets médios? */

/* Resposta: 

    Marca       Receita     Ticket Médio
    Nissan	    601.000      26130
    Fiat	    15.447.000	 35674
    Volkswagen	15.540.000	 39341


 */

SELECT 
    marca,
    SUM(vendas * valor_do_veiculo) AS receita,
    SUM(vendas * valor_do_veiculo) / SUM(vendas) AS ticket_medio
FROM vehicles_brands
GROUP BY marca
ORDER BY ticket_medio ASC
LIMIT 3;


/* Calcula a receita e o ticket médio, ordena de acordo com a marca e ordena do menor valor de ticket médio para o maior */
