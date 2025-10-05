const fs = require('fs');


const corrupted_vehicles = require('./broken_database_1.json')
const corrupted_brands = require('./broken_database_2.json')





const wrong_chars_map = new Map([
    ["æ", "a"],
    ["ø", "o"]
])

const wrong_chars_regex = /[æø]/g



function recoveryVehicles(charsToMap) {
    return corrupted_vehicles.map(vehicle => {

        if (typeof (vehicle.vendas) != 'string' && typeof (vehicle.vendas) != 'number') {
            console.error(`As vendas de ${vehicle.nome} são inválidas (${typeof (vehicle.vendas)}) `);

           return vehicle
        }

        if (typeof (vehicle.nome) != 'string') {
            console.error(`O campo "nome" é inválido: esperado string, mas recebido (${vehicle.nome})`
            );

            return vehicle
        }

        if (isNaN(Number(vehicle.vendas))) {
            console.error(`As vendas do veículo ${vehicle.nome} não podem ser convertidas pra um número válido`);
            
            return vehicle
        }

        // As hipóteses acima, tratam casos onde podemos receber caracteres que não teriam valor numérico, ou mesmo, um caso de falta de valor, como null ou undefined

        return {
            ...vehicle,
            vendas: Number(vehicle.vendas),
            nome: vehicle.nome.replace(wrong_chars_regex, char => {
                return charsToMap.get(char)
            }).trim()

        }
    })
}

function recoveryBrands(charsToMap) {
    return corrupted_brands.map(brand => {
            if (typeof brand.marca !== 'string') {
                console.error(
                    `O campo "marca" do item com ID ${brand.id || 'desconhecido'} é inválido: esperado string, recebido ${typeof brand.marca} (${brand.marca})`
                );

                return brand
            }

            return {
                ...brand,
                marca: brand.marca.replace(wrong_chars_regex, char => charsToMap.get(char)).trim()
            };
        });
}




const fixed_vehicles = JSON.stringify(recoveryVehicles(wrong_chars_map), null, 2)

fs.writeFileSync('fixed_database_1.json', fixed_vehicles, 'utf-8')


const fixed_brands = JSON.stringify(recoveryBrands(wrong_chars_map), null, 2)

fs.writeFileSync('fixed_database_2.json', fixed_brands, 'utf-8')






console.log('----- VEICULOS -----')
console.log(fixed_vehicles)
console.log('--------------------')

console.log('----- MARCAS -----')
console.log(fixed_brands)
console.log('--------------------')




// Essa é uma função que funciona de forma dinâmica, que poupa bastante código. Apesar disso, considero a sintaxe dela ( usando nomes de propriedades computados ) dificil de ler, achei interessante mostrar ela aqui, mas preferi seguir com a outra opção por questão de facilidade de leitura

// function recoveryChars(charsToMap, corruptedArray, corruptedField) {
//     return corruptedArray.map(item => {
//         return {
//             ...item,
//             [corruptedField]: item[corruptedField].replace(wrong_chars_regex, char => {
//                 return charsToMap.get(char)
//             })
//         }
//     })
// }


