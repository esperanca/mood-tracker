<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let { data = [] } = $props();
  let canvas;
  let chart;

  onMount(async () => {
    if (browser && data.length > 0) {
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);

      const ctx = canvas.getContext('2d');

      const labels = data.map(d => d.date);
      const values = data.map(d => d.average);

      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Humor médio',
            data: values,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#3498db',
            spanGaps: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1a1a1a',
              titleColor: '#fff',
              bodyColor: '#aaa',
              borderColor: '#333',
              borderWidth: 1,
              callbacks: {
                label: (context) => {
                  const value = context.raw;
                  if (value === null) return 'Sem dados';
                  return `Humor: ${value.toFixed(1)}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: '#333',
                drawBorder: false
              },
              ticks: {
                color: '#666',
                font: { size: 10 }
              }
            },
            y: {
              min: 1,
              max: 5,
              grid: {
                color: '#333',
                drawBorder: false
              },
              ticks: {
                color: '#666',
                stepSize: 1,
                callback: (value) => {
                  const emojis = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😊' };
                  return emojis[value] || value;
                }
              }
            }
          }
        }
      });
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  $effect(() => {
    if (chart && data.length > 0) {
      chart.data.labels = data.map(d => d.date);
      chart.data.datasets[0].data = data.map(d => d.average);
      chart.update();
    }
  });
</script>

<div class="chart-container">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 200px;
  }
</style>
