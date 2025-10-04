# Caso Técnico - Data Analytics - Monks

## Desafio Proposto

Você é responsável pelo software de gestão de uma concessionária multimarcas, e sua gestão solicitou um relatório sobre o desempenho de vendas dos veículos no último ano.

Ao verificar o banco de dados, você percebeu que algumas tabelas foram corrompidas durante uma atualização. Todos os nomes de veículos e marcas tiveram alguns de seus caracteres modificados: houve a substituição de todos os caracteres "a" por "æ" e "o" por "ø".
É preciso reverter essas substituições para recuperar os nomes originais antes de gerar o relatório.

Você também encontrou um problema com os valores de vendas: eles deveriam ser sempre do tipo number, mas alguns estão no formato string. É necessário converter esses valores de volta para number.

## Decisões Técnicas

- Optei por utilizar a estrutura de dados `Map` para facilitar o acesso e o mapeamento de quais caracteres seriam substituídos (por exemplo, "æ" por "a").

- Utilizei uma expressão regular (RegEx) global (`/[æø]/g`) para capturar todas as ocorrências dos caracteres corrompidos nas strings. Eu também poderia ter utilizado o método `replaceAll()`, no entanto, caso o utilizasse, precisaria executar um `replace` para cada caractere inválido, o que poderia prejudicar o desempenho.

- A arquitetura da solução foi pensada em torno da **legibilidade** e **manutenibilidade** do código, critérios de avaliação importantes. Por isso, optei por criar duas funções distintas e especializadas: `recoveryVehicles` e `recoveryBrands`. Embora essa abordagem introduza uma leve repetição de código, ela torna a lógica de validação de cada tipo de dado mais explícita e fácil de entender.

- Como alternativa, uma função genérica como `recoveryChars` (presente no código, como comentários nas linhas finais) utilizaria *propriedades computadas* para reduzir o número de linhas. No entanto, considerei que a complexidade sintática dessa abordagem poderia comprometer a clareza do código.

- Utilizei `camelCase` para a nomeação de funções e `snake_case` para váriaveis, conforme as convenções do JavaScript.

## Desafios Enfrentados

**1. Implementação de um Tratamento de Erros Resiliente**

Inicialmente, a estratégia de tratamento de erros utilizava `throw new Error` para sinalizar dados inválidos, como um nome de veículo com valor `null`.

Logo percebi que essa abordagem, embora segura, não era **resiliente**. A falha em um único registro interrompia todo o processo de recuperação, impedindo que os demais itens válidos fossem corrigidos. Um único dado corrompido invalidaria o lote inteiro.

A solução foi refatorar a lógica: em vez de interromper a execução, o sistema agora isola o erro. Uma mensagem de diagnóstico é registrada via `console.error`, e a função simplesmente avança para o próximo item. Essa mudança garante que o máximo de dados possíveis sejam recuperados, mesmo em casos onde temos dados nulos, fora do escopo de correção proposto.


