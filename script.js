document.getElementById('calculateButton').addEventListener('click', () => {
  const input = document.getElementById('dataInput').value;
  const numbers = input.split(',').map(Number).filter(num => !isNaN(num));

  if (numbers.length !== 10) {
    alert('Por favor, insira exatamente 10 números.');
    return;
  }

  const mean = calculateMean(numbers);
  const median = calculateMedian(numbers);
  const mode = calculateMode(numbers);
  const variance = calculateVariance(numbers, mean);
  const stdDev = Math.sqrt(variance);
  const cv = (stdDev / mean) * 100;
  const stdError = stdDev / Math.sqrt(numbers.length);

  displayResults({ mean, median, mode, variance, stdDev, cv, stdError });
});

function calculateMean(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function calculateMedian(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function calculateMode(numbers) {
  const frequency = {};
  numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
  const maxFrequency = Math.max(...Object.values(frequency));
  const modes = Object.keys(frequency).filter(num => frequency[num] === maxFrequency);
  return modes.length === numbers.length ? '-' : modes.join(', ');
}

function calculateVariance(numbers, mean) {
  return numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
}

function displayResults(results) {
  document.getElementById('mean').textContent = results.mean.toFixed(4);
  document.getElementById('median').textContent = results.median.toFixed(4);
  document.getElementById('mode').textContent = results.mode;
  document.getElementById('variance').textContent = results.variance.toFixed(4);
  document.getElementById('stdDev').textContent = results.stdDev.toFixed(4);
  document.getElementById('cv').textContent = results.cv.toFixed(4) + '%';
  document.getElementById('stdError').textContent = results.stdError.toFixed(4);
}
