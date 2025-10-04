CREATE TABLE vehicles_brands AS
SELECT 
    v.data,
    v.id_marca_ AS id_marca,
    b.marca,
    v.vendas,
    v.valor_do_veiculo,
    v.nome
FROM vehicles v
JOIN brands b 
    ON v.id_marca_ = b.id_marca;
