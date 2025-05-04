document.getElementById('gastos-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Obter salário
    const salario = parseFloat(document.getElementById('salario').value);
  
    // Obter os valores dos gastos
    const gastos = {
      'Luz e Gás': parseFloat(document.getElementById('eletricidade').value),
      'Água': parseFloat(document.getElementById('agua').value),
      'Convênio Médico': parseFloat(document.getElementById('saude').value),
      'Renda': parseFloat(document.getElementById('renda').value),
      'Faculdade': parseFloat(document.getElementById('estudos').value),
      'Transporte': parseFloat(document.getElementById('transporte').value),
      'Internet': parseFloat(document.getElementById('internet').value)
    };
  
    // Calcular total de despesas
    const totalDespesas = Object.values(gastos).reduce((acc, val) => acc + val, 0);
  
    // Calcular saldo
    const saldo = salario - totalDespesas;
  
    // Exibir o dashboard
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  
    // Atualizar os cards
    document.getElementById('saldo-card').innerText = `Saldo atual: € ${saldo.toFixed(2)}`;
    document.getElementById('despesas-card').innerText = `Despesas totais: € ${totalDespesas.toFixed(2)}`;
  
    // Criar os gráficos
    criarGraficos(gastos, salario, totalDespesas);
  });
  
  function criarGraficos(gastos, salario, totalDespesas) {
    const cores = ['#f4d38a', '#f1bebe', '#ea9393', '#488399', '#d8d8d8','#ccc', '#f5ede1'];
  
    // Gráfico de Pizza
    const ctxPizza = document.createElement('canvas');
    document.getElementById('grafico-pizza').innerHTML = '';
    document.getElementById('grafico-pizza').appendChild(ctxPizza);
  
    new Chart(ctxPizza, {
      type: 'doughnut',
      data: {
        labels: Object.keys(gastos),
        datasets: [{
          data: Object.values(gastos),
          backgroundColor: cores
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Despesas por categoria'
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  
    // Gráfico de Barras
    const ctxBarras = document.createElement('canvas');
    document.getElementById('grafico-barras').innerHTML = '';
    document.getElementById('grafico-barras').appendChild(ctxBarras);
  
    new Chart(ctxBarras, {
      type: 'bar',
      data: {
        labels: ['Salário', 'Despesas', 'Saldo'],
        datasets: [{
          label: 'Valor em €',
          data: [salario, totalDespesas, salario - totalDespesas],
          backgroundColor: ['#f4d38a', '#ea9393', '#488399']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Balanço Mensal'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }