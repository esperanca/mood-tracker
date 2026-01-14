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

      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Quantidade',
            data: values,
            backgroundColor: '#1a1a1a',
            borderRadius: 2,
            barThickness: 24,
            maxBarThickness: 32
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
              titleColor: '#f5f5f0',
              bodyColor: '#f5f5f0',
              titleFont: { family: 'Space Mono', size: 10, weight: 'normal' },
              bodyFont: { family: 'Space Grotesk', size: 13 },
              padding: 12,
              cornerRadius: 8,
              displayColors: false,
              callbacks: {
                title: () => '',
                label: (context) => `${context.raw} registros`
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                color: '#1a1a1a',
                font: { size: 18 },
                padding: 8
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#ddd',
                drawBorder: false,
                lineWidth: 1
              },
              border: {
                display: false
              },
              ticks: {
                color: '#999',
                font: { family: 'Space Mono', size: 9 },
                padding: 8,
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
    height: 140px;
  }
</style>
