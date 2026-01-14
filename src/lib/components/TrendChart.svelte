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
            borderColor: '#1a1a1a',
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#1a1a1a',
            pointHoverBorderColor: '#f5f5f0',
            pointHoverBorderWidth: 2,
            spanGaps: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index'
          },
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
                label: (context) => {
                  const value = context.raw;
                  if (value === null) return 'Sem dados';
                  return `${value.toFixed(1)} / 5`;
                }
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
                color: '#999',
                font: { family: 'Space Mono', size: 9 },
                padding: 8
              }
            },
            y: {
              min: 1,
              max: 5,
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
                stepSize: 1,
                padding: 8,
                callback: (value) => value
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
    height: 160px;
  }
</style>
