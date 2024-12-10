// Adiciona um ouvinte de evento para o botão de cálculo
document.getElementById('botaoCalcular').addEventListener('click', () => {
  
  // Obtém o valor inserido pelo usuário (uma lista de números separados por vírgulas)
  const entrada = document.getElementById('entradaDados').value;
  
  // Converte o valor inserido em um array de números, removendo qualquer valor que não seja numérico
  const numeros = entrada.split(',').map(Number).filter(num => !isNaN(num));

  // Verifica se o usuário inseriu exatamente 10 números
  if (numeros.length !== 10) {
    alert('Por favor, insira exatamente 10 números.');
    return; // Caso não tenha inserido 10 números, não continua com o cálculo
  }

  // Calcula a média dos números
  const media = calcularMedia(numeros);
  
  // Calcula a mediana dos números
  const mediana = calcularMediana(numeros);
  
  // Calcula a moda dos números
  const moda = calcularModa(numeros);
  
  // Calcula a variância, passando também a média dos números como parâmetro
  const variancia = calcularVariancia(numeros, media);
  
  // Calcula o desvio padrão, que é a raiz quadrada da variância
  const desvioPadrao = Math.sqrt(variancia);
  
  // Calcula o coeficiente de variação (CV), que é o desvio padrão dividido pela média, multiplicado por 100 para ser apresentado em percentual
  const cv = (desvioPadrao / media) * 100;
  
  // Calcula o erro padrão, que é o desvio padrão dividido pela raiz quadrada do número de elementos
  const erroPadrao = desvioPadrao / Math.sqrt(numeros.length);

  // Exibe os resultados na página, chamando a função exibirResultados
  exibirResultados({ media, mediana, moda, variancia, desvioPadrao, cv, erroPadrao });
});

// Função para calcular a média
function calcularMedia(numeros) {
  return numeros.reduce((a, b) => a + b, 0) / numeros.length;
}

// Função para calcular a mediana
function calcularMediana(numeros) {
  const ordenados = [...numeros].sort((a, b) => a - b); // Ordena os números em ordem crescente
  const meio = Math.floor(ordenados.length / 2); // Encontra o índice do meio
  // Se a quantidade de números for ímpar, a mediana é o número do meio
  // Se for par, a mediana é a média dos dois números do meio
  return ordenados.length % 2 === 0
    ? (ordenados[meio - 1] + ordenados[meio]) / 2
    : ordenados[meio];
}

// Função para calcular a moda (valor que mais se repete)
function calcularModa(numeros) {
  const frequencia = {}; // Objeto para contar a frequência de cada número
  numeros.forEach(num => frequencia[num] = (frequencia[num] || 0) + 1); // Conta as ocorrências dos números
  
  // Encontra a maior frequência
  const frequenciaMaxima = Math.max(...Object.values(frequencia));
  
  // Filtra os números que possuem a maior frequência
  const modas = Object.keys(frequencia).filter(num => frequencia[num] === frequenciaMaxima);
  
  // Se todos os números são únicos (não há repetição), retorna um "-"
  // Caso contrário, retorna os números mais frequentes
  return modas.length === numeros.length ? '-' : modas.join(', ');
}

// Função para calcular a variância (média dos quadrados das diferenças entre cada número e a média)
function calcularVariancia(numeros, media) {
  return numeros.reduce((soma, num) => soma + Math.pow(num - media, 2), 0) / numeros.length;
}

// Função para exibir os resultados no HTML
function exibirResultados(resultados) {
  // Atualiza o conteúdo de vários elementos HTML com os resultados calculados
  document.getElementById('media').textContent = resultados.media.toFixed(4); // Exibe a média com 4 casas decimais
  document.getElementById('mediana').textContent = resultados.mediana.toFixed(4); // Exibe a mediana com 4 casas decimais
  document.getElementById('moda').textContent = resultados.moda; // Exibe a moda
  document.getElementById('variancia').textContent = resultados.variancia.toFixed(4); // Exibe a variância com 4 casas decimais
  document.getElementById('desvioPadrao').textContent = resultados.desvioPadrao.toFixed(4); // Exibe o desvio padrão com 4 casas decimais
  document.getElementById('cv').textContent = resultados.cv.toFixed(4) + '%'; // Exibe o coeficiente de variação com 4 casas decimais e o símbolo de porcentagem
  document.getElementById('erroPadrao').textContent = resultados.erroPadrao.toFixed(4); // Exibe o erro padrão com 4 casas decimais
}

// Adiciona o ouvinte de evento para a tecla Enter no campo de entrada de dados
document.getElementById('entradaDados').addEventListener('keydown', (event) => {
  // Verifica se a tecla pressionada foi o Enter (código de tecla 13)
  if (event.key === 'Enter') {
    // Impede que a página seja recarregada (comportamento padrão ao pressionar Enter)
    event.preventDefault();
    // Simula o clique no botão de cálculo
    document.getElementById('botaoCalcular').click();
  }
});
