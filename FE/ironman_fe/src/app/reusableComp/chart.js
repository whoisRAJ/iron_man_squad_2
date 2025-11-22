import  {Chart}  from 'primereact/chart';

export default function ChartCompData(dataForChart) {
    console.log('chart data in chart comp', dataForChart);
      const chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: '#1669bbff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#d3f516ff'
                    },
                    grid: {
                        color: '#0acf66ff'
                    }
                },
                y: {
                    ticks: {
                        color: '#d6440fff'
                    },
                    grid: {
                        color: '#090000ff'
                    }
                }
            }
        };

    return (
            <div className="card">
            <Chart type="line" data={dataForChart?.data} options={chartOptions} />
        </div>
    )
}
