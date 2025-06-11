import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Title,
    Tooltip
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function DonutChartCard({ chartdata }) {

    // useEffect(() => {
    //     console.log('data in chart card => ', chartdata)
    // }, [chartdata])

   const donutChartData = {
    labels: chartdata.label, 
    datasets: [{
        label: chartdata.title,
        data: chartdata.value[0],
        backgroundColor: chartdata.color,
        borderColor:  chartdata.color,
        borderWidth: 1,
        hoverOffset: 4
    }]
}

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: chartdata.title || 'Chart Overview'
            }
        }
    };

    return (
            <div className='w-full sm:w-3/4  h-full'>
                <Doughnut data={donutChartData} options={chartOptions} />
            </div>
    );
}

export default DonutChartCard;