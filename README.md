# Case Técnico - Data Analytics - Monks

 - Links Importantes:

    [Relatório de Vendas](./RelatórioVendas-Monks.pdf)
    [Looker Studio](https://lookerstudio.google.com/u/0/reporting/4e3d1fde-9960-4812-a965-4403aff9f1dd/page/nrWaF)
    [Drive](https://drive.google.com/drive/folders/1h1eYhSlzBDFLa960ltJPsDdoc4GsKiS9?hl=pt-br)



## Como executar a solução?

Para execução do projeto, você precisa ter o [Node](https://nodejs.org/pt/download) instalado na sua máquina, você pode baixar clicando no link anterior.
Para fins de facilidade na hora de clonar o projeto, também recomendo você ter o [Git](https://git-scm.com/downloads) baixado, mas não é obrigatório.

Caso você *possua* o Git instalado, você pode clonar o projeto com o comando: `git clone https://github.com/fatekkl/CaseTecnico-Monks`. Acesse a pasta com o comando `cd CaseTecnico-Monks`, em seguida execute o projeto com `node .\dataRecovery.js`.


Caso *NÃO* utilize a ferramenta *Git*, você deve baixar o .zip clicando no botão verde, escrito `<> Code` e apertando em `Download Zip`. Após isso, extraia a pasta e acesse o projeto com o comando `cd CaseTecnico-Monks`, em seguida execute o projeto com `node .\dataRecovery.js`.


## Desafio Proposto

Você é responsável pelo software de gestão de uma concessionária multimarcas, e sua gestão solicitou um relatório sobre o desempenho de vendas dos veículos no último ano.

Ao verificar o banco de dados, você percebeu que algumas tabelas foram corrompidas durante uma atualização. Todos os nomes de veículos e marcas tiveram alguns de seus caracteres modificados: houve a substituição de todos os caracteres "a" por "æ" e "o" por "ø".
É preciso reverter essas substituições para recuperar os nomes originais antes de gerar o relatório.

Você também encontrou um problema com os valores de vendas: eles deveriam ser sempre do tipo number, mas alguns estão no formato string. É necessário converter esses valores de volta para number.

## Decisões Técnicas

### JavaScript
- Optei por utilizar a estrutura de dados `Map` para facilitar o acesso e o mapeamento de quais caracteres seriam substituídos (por exemplo, "æ" por "a").
- Utilizei uma expressão regular (REGEX) global (/[æø]/g) para capturar todas as ocorrências dos caracteres corrompidos nas strings. Eu também poderia ter utilizado o método replaceAll(), no entanto, caso o utilizasse, precisaria executar um replace para cada caractere inválido, o que poderia prejudicar o desempenho.
- A arquitetura da solução foi pensada em torno da **legibilidade** e **manutenibilidade** do código, critérios de avaliação importantes. Por isso, optei por criar duas funções distintas e especializadas: recoveryVehicles e recoveryBrands. Embora essa abordagem introduza uma leve repetição de código, ela torna a lógica de validação de cada tipo de dado mais explícita e fácil de entender.
- Como alternativa, uma função genérica como recoveryChars (presente no código, como comentários nas linhas finais) utilizaria *propriedades computadas* para reduzir o número de linhas. No entanto, considerei que a complexidade sintática dessa abordagem poderia comprometer a clareza do código.
- Utilizei `camelCase` para a nomeação de funções e `snake_case` para variáveis.

### SQL
- Durante a criação das tabelas, unifiquei as informações necessárias, através de um 'JOIN', mesclando elementos da tabela de veiculos e marcas. Optei por criar como tabela por ser algo mais conhecido, porém uma VIEW funcionaria perfeitamente também.
- Já falando sobre as queries, em sua maioria foram usadas funções mais básicas como `SELECT`, `ORDER BY`, `LIMIT`, `FLOOR` e `CONCAT`.
- Dentro de cada arquivo, tem comentários explicando o que cada comando está fazendo e a linha de racicionio por trás.


## Desafios Enfrentados

**1. Implementação de um Tratamento de Erros Resiliente**

    Inicialmente, a estratégia de tratamento de erros utilizava `throw new Error` para sinalizar dados inválidos, como um nome de veículo com valor `null`.

    Logo percebi que essa abordagem, embora segura, não era **resiliente**. A falha em um único registro interrompia todo o processo de recuperação, impedindo que os demais itens válidos fossem corrigidos. Um único dado corrompido invalidaria o lote inteiro.

    A solução foi refatorar a lógica: em vez de interromper a execução, o sistema agora isola o erro. Uma mensagem de diagnóstico é registrada via `console.error`, e a função simplesmente avança para o próximo item. Essa mudança garante que o máximo de dados possíveis sejam recuperados, mesmo em casos onde temos dados nulos, fora do escopo de correção proposto.

**2. Análise e Relatório sobre os veículos mais vendidos.**

    Quando li sobre essa pergunta, percebi que ela não era tão técnica, em quesito SQL e tive que analisar os dados com mais cautela, rodando diversas queries e pesquisando sobre os modelos de carro e entender melhor a relação entre os carros mais vendidos.


**3. Criação das tabelas para visualização no Looker Studio .**

    Durante o desenvolvimento, tive a idéia de criar um report no Google Looker Studio, para facilitar a visualização das respostas, tive algumas dificuldades pra deixar a visualização dos dados da forma como eu queria, principalmente por que ainda não entendia direito a diferença entre as métricas e dimensões 😅😅, mas tentando diversas opções, consegui um resultado satisfatório. Criei 4 páginas, uma para cada finalidade sendo elas, visualização dos veículos ordenados pelo número de vendas, veículos ordenados pela quantidade de receita gerada,  marcas ordenadas pelo ticket médio e faixas de preço mais vendidas.



## Próximos Passos

  - [x] Implementar gráficos no Looker Studio, baseados nas bases de dados corrigidas.
  - [x] Criar o PDF respondendo as perguntas nele
  - [x] Colocar documento no Google Drive
