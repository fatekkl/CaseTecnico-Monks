const corrupted_vehicles = require('./broken_database_1.json')
const corrupted_brands = require('./broken_database_2.json')



const wrongCharsMap = new Map([
    ["æ", "a"],
    ["ø", "o"]
])

const wrongCharsRegex = /[æø]/g



function recoveryVehiclesJson(charsToMap) {
    return JSON.stringify(corrupted_vehicles.map(vehicle => {

        if (typeof (vehicle.vendas) != 'string' && typeof (vehicle.vendas) != 'number') {
            throw new Error(`As vendas de ${vehicle.nome} são inválidas (${typeof (vehicle.vendas)}) `);
        }

        if (typeof (vehicle.nome) != 'string') {
            throw new Error(`O campo "nome" é inválido: esperado string, mas recebido (${vehicle.nome})`
            );

        }

        if (isNaN(Number(vehicle.vendas))) {
            throw new Error(`As vendas do veículo ${vehicle.nome} não podem ser convertidas pra um número válido`);
            
        }

        // As hipóteses acima, tratam casos onde podemos receber caracteres que não teriam valor numérico, ou mesmo, um caso de falta de valor, como null ou undefined

        return {
            ...vehicle,
            vendas: Number(vehicle.vendas),
            nome: vehicle.nome.replace(wrongCharsRegex, char => {
                return charsToMap.get(char)
            })

        }
    }))
}

function recoveryBrandsJson(charsToMap) {
    return JSON.stringify(
        corrupted_brands.map(brand => {
            // Validação do campo "marca"
            if (typeof brand.marca !== 'string') {
                throw new Error(
                    `O campo "marca" do item com ID ${brand.id || 'desconhecido'} é inválido: esperado string, recebido ${typeof brand.marca} (${brand.marca})`
                );
            }

            return {
                ...brand,
                marca: brand.marca.replace(wrongCharsRegex, char => charsToMap.get(char))
            };
        })
    );
}




const fixed_vehicles = recoveryVehiclesJson(wrongCharsMap)


const fixed_brands = recoveryBrandsJson(wrongCharsMap)




// console.log('----- MARCAS -----')

// console.log(fixed_brands)

console.log('----- VEICULOS -----')
console.log(fixed_vehicles)



// Essa é uma função que funciona de forma dinâmica, que poupa bastante código. Apesar disso, considero a sintaxe dela ( usando nomes de propriedades computados ) dificil de ler, achei interessante mostrar ela aqui, mas preferi seguir com a outra opção por questão de facilidade de leitura

// function recoveryChars(charsToMap, corruptedArray, corruptedField) {
//     return corruptedArray.map(item => {
//         return {
//             ...item,
//             [corruptedField]: item[corruptedField].replace(wrongCharsRegex, char => {
//                 return charsToMap.get(char)
//             })
//         }
//     })
// }


