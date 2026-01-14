<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { MOODS } from '$lib/constants.js';

  let { distribution = {} } = $props();
  let canvas;
  let chart;

  onMount(async () => {
    if (browser) {
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);

      const ctx = canvas.getContext('2d');

      const labels = MOODS.map(m => m.emoji);
      const values = MOODS.map(m => distribution[m.value] || 0);
      const colors = MOODS.map(m => m.color);

      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Quantidade',
            data: values,
            backgroundColor: colors,
            borderRadius: 4,
            barThickness: 30
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
              borderWidth: 1
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#fff',
                font: { size: 20 }
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#333',
                drawBorder: false
              },
              ticks: {
                color: '#666',
                stepSize: 1
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
    if (chart) {
      const values = MOODS.map(m => distribution[m.value] || 0);
      chart.data.datasets[0].data = values;
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
    height: 180px;
  }
</style>
