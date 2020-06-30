
class genericGA {

  constructor() {
    this.best = [];
    this.memory = [];
    this.population = [];
    this.currentGeneration = [];
  }

  async generatePopulation() {
    document.getElementById('status0').className = 'fas fa-spinner fa-spin';
    // Clearing status
    for (let i = 0; i < 6; i++) {
      document.getElementById('status' + i).className = 'far fa-circle';
    }
    // Validating inputs
    let populationSizeElement = document.getElementById('populationSize');
    populationSizeElement.setCustomValidity('');
    if (!populationSizeElement.checkValidity()) {
      populationSizeElement.setCustomValidity('Number must be between 1 and 9999');
      populationSizeElement.reportValidity();
      return;
    }
    this.populationSize = populationSizeElement.value;
    this.best = [];
    this.memory = [];
    this.population = [];
    this.currentGeneration = [];
    for (let i = 0; i < this.populationSize; i++) {
      this.population.push([(await this.generateChromosome())]);
    }
    document.getElementById('status0').className = 'far fa-check-circle';
  }

  async exercisePopulation(parameters) {
    document.getElementById('status1').className = 'fas fa-spinner fa-spin';
    let populationSize = this.population.length;
    this.currentGeneration = [];
    for (let i = 0; i < populationSize; i++) {
      let pertinence = await this.calculatePertinence(this.population[i]);
      this.currentGeneration.push({
        'genome': this.population[i],
        'pertinence': pertinence
      });
    }
    this.currentGeneration.sort((a, b) => (a.pertinence > b.pertinence) ? 1 : -1);
    document.getElementById('status1').className = 'far fa-check-circle';
  }

  async selection(parameters) {
    document.getElementById('status2').className = 'fas fa-spinner fa-spin';
    this.currentGeneration = this.currentGeneration.slice(0, parameters.eliteSize);
    this.best.push(this.currentGeneration[0].pertinence / document.getElementById('montecarloTrials').value);
    trainerInstance.memory.push((await navigator.storage.estimate()).usageDetails.indexedDB);
    chartInstance.updateChart();
    svgDraw(document.getElementById('bestButterfly').querySelector('svg:first-of-type'), this.currentGeneration[0].genome);
    svgDraw(document.getElementById('bestButterfly').querySelector('svg:last-of-type'), this.currentGeneration[0].genome, true);
    document.getElementById('status2').className = 'far fa-check-circle';
  }

  async crossover(parameters) {
    document.getElementById('status3').className = 'fas fa-spinner fa-spin';
    let populationSize = this.population.length;
    this.population = [];
    while (this.population.length < populationSize) {
      let parent1index = parseInt(Math.pow(Math.random(), 2) * parameters.eliteSize) % (parameters.eliteSize);
      let parent1 = this.currentGeneration[parent1index];
      let parent2index = parseInt(Math.pow(Math.random(), 2) * parameters.eliteSize) % (parameters.eliteSize);
      let parent2 = this.currentGeneration[parent2index];
      let child = [];
      while (child.length < parent1.genome.length) {
        if (Math.random() < crossoverProbability) {
          child.push(parent1.genome[child.length]);
        } else {
          child.push(parent2.genome[child.length]);
        }
      }
      this.population.push(shuffleArray(child));
    }
    document.getElementById('status3').className = 'far fa-check-circle';
  }

  async mutation(parameters) {
    document.getElementById('status4').className = 'fas fa-spinner fa-spin';
    for (let i = 0; i < this.population.length; i++) {
      for (let j = 0; j < this.population[i].length; j++) {
        for (let key of Object.keys(this.population[i][j])) {
          if (Math.random() < parameters.mutationProbability) {
            if (key.includes('Color')) {
              this.population[i][j][key] = randomColor();
            } else {
              if (Math.random() < 0.5) {
                this.population[i][j][key] += this.population[i][j][key] * Math.random() / 25;
              } else {
                this.population[i][j][key] -= this.population[i][j][key] * Math.random() / 25;
              }
            }
          }
        }
      }
    }
    document.getElementById('status4').className = 'far fa-check-circle';
    document.getElementById('status5').className = 'fas fa-spinner fa-spin';
    for (let i = 0; i < this.population.length; i++) {
      for (let j = 0; j < parameters.chromosomesExtension; j++) {
        this.population[i].push(await this.generateChromosome());
      }
    }
    document.getElementById('status5').className = 'far fa-check-circle';
  }

  async calculateGenerationParameters() {
    let eliteSizeElement = document.getElementById('eliteSize');
    eliteSizeElement.max = this.population.length;
    eliteSizeElement.setCustomValidity('');
    if (!eliteSizeElement.checkValidity()) {
      eliteSizeElement.setCustomValidity('Number must be between 1 and ' + this.population.length);
      eliteSizeElement.reportValidity();
      return;
    }
    let eliteSize = eliteSizeElement.value;
    let crossoverProbabilityElement = document.getElementById('crossoverProbability');
    crossoverProbabilityElement.setCustomValidity('');
    if (!crossoverProbabilityElement.checkValidity()) {
      crossoverProbabilityElement.setCustomValidity('Number must be between 1 and 100');
      crossoverProbabilityElement.reportValidity();
      return;
    }
    let crossoverProbability = crossoverProbabilityElement.value / 100;
    let mutationProbabilityElement = document.getElementById('mutationProbability');
    mutationProbabilityElement.setCustomValidity('');
    if (!mutationProbabilityElement.checkValidity()) {
      mutationProbabilityElement.setCustomValidity('Number must be between 1 and 100' + population.length);
      mutationProbabilityElement.reportValidity();
      return;
    }
    let mutationProbability = mutationProbabilityElement.value / 100;
    let chromosomesExtensionElement = document.getElementById('chromosomesExtension');
    chromosomesExtensionElement.setCustomValidity('');
    if (!chromosomesExtensionElement.checkValidity()) {
      chromosomesExtensionElement.setCustomValidity('Number must be between 0 and 9999');
      chromosomesExtensionElement.reportValidity();
      return;
    }
    let chromosomesExtension = chromosomesExtensionElement.value;
    return {
      'eliteSize': eliteSize,
      'crossoverProbability': crossoverProbability,
      'mutationProbability': mutationProbability,
      'chromosomesExtension': chromosomesExtension
    }
  }

  async calculateGeneration() {
    let populationGeneration = [];
    if (this.population.length < 1) {
      alert('Population has not been initialized');
      return;
    }
    // Clearing status
    for (let i = 1; i < 6; i++) {
      document.getElementById('status' + i).className = 'far fa-circle';
    }
    // Validting inputs
    let parameters = await this.calculateGenerationParameters();
    if (parameters === null) {
      return;
    }
    // Exercise
    await this.exercisePopulation(parameters);
    // Selection
    await this.selection(parameters);
    // Crossover
    await this.crossover(parameters);
    // Mutation
    await this.mutation(parameters);
    return;
  }

  async calculateNGeneration() {
    if (this.population.length < 1) {
      alert('Population has not been initialized');
      return;
    }
    // Clearing status
    for (let i = 1; i < 6; i++) {
      document.getElementById('status' + i).className = 'far fa-circle';
    }
    // Validting inputs
    let multiRunElement = document.getElementById('multiRun');
    multiRunElement.setCustomValidity('');
    if (!multiRunElement.checkValidity()) {
      multiRunElement.setCustomValidity('Number must be between 0 and 9999');
      multiRunElement.reportValidity();
      return;
    }
    let multiRun = multiRunElement.value;
    let times = [];
    document.getElementById('statusN').className = 'fas fa-spinner fa-spin';
    for (let i = 0; i < multiRun; i++) {
      let t = performance.now();
      await this.calculateGeneration();
      t = performance.now() - t;
      times.push(t);
      document.getElementById('generationTime').textContent = Math.round(average(times) / 1000, 1) + ' [s/generation]'
      // await delay(10000);
    }
    document.getElementById('statusN').className = '';
  }

}