import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import {getLastNDays} from '../src/DateFunctions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'My Hiked Distance',
    },
  },
};

export function LineChart( {dataSet}) {

    const [period, setPeriod] = React.useState<number>(30);
    const [label, setLabel] = useState<string>(`Last ${period} days`)
    const [dataOnLine, setData] = useState<number[]>([]);

    const handlePeriod = (event: React.MouseEvent<HTMLElement>, newPeriod: number) => {
      setPeriod(newPeriod);
      setLabel(`Last ${period} days`);
      getLastNDays(period);
    };

    let labels = getLastNDays(period);
    // if (labelType === "monthly"){
    //     labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // }
    console.log(dataSet);

    const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: label,
            data: dataSet,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  return (
    
    <>
        <Line options={options} data={data} />
        
        <ToggleButtonGroup
            value={period}
            exclusive
            onChange={handlePeriod}
            aria-label="text alignment"
        >
            <ToggleButton value={30} aria-label="monthly">
                Monthly
            </ToggleButton>
            <ToggleButton value={7} aria-label="weekly">
                Weekly
            </ToggleButton>

        </ToggleButtonGroup></>
    );
}