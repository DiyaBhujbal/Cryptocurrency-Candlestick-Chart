// // App.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
// import 'chartjs-adapter-date-fns';
// import { Chart } from 'react-chartjs-2';
// //import './App.css'; // You can remove this if you're not using other styles

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   CandlestickController,
//   CandlestickElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const App = () => {
//   const [selectedSymbol, setSelectedSymbol] = useState('ethusdt'); // Default ETH/USDT
//   const [selectedInterval, setSelectedInterval] = useState('1m');   // Default 1-minute interval
//   const [candlestickData, setCandlestickData] = useState({});

//   // WebSocket connection setup
//   useEffect(() => {
//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedSymbol}@kline_${selectedInterval}`);

//     ws.onmessage = (event) => {
//       const { k: candle } = JSON.parse(event.data);
//       const newCandle = {
//         t: candle.t,   // Time
//         o: candle.o,   // Open price
//         h: candle.h,   // High price
//         l: candle.l,   // Low price
//         c: candle.c,   // Close price
//       };

//       setCandlestickData((prevData) => ({
//         ...prevData,
//         [selectedSymbol]: [...(prevData[selectedSymbol] || []), newCandle],
//       }));
//     };

//     return () => ws.close();
//   }, [selectedSymbol, selectedInterval]);

//   // Load stored chart data from localStorage
//   useEffect(() => {
//     const storedData = localStorage.getItem(selectedSymbol);
//     if (storedData) {
//       setCandlestickData((prevData) => ({
//         ...prevData,
//         [selectedSymbol]: JSON.parse(storedData),
//       }));
//     }
//   }, [selectedSymbol]);

//   // Save candlestick data to localStorage when it changes
//   useEffect(() => {
//     if (candlestickData[selectedSymbol]) {
//       localStorage.setItem(selectedSymbol, JSON.stringify(candlestickData[selectedSymbol]));
//     }
//   }, [candlestickData, selectedSymbol]);

//   // Chart data configuration
//   const chartData = {
//     datasets: [{
//       label: `${selectedSymbol.toUpperCase()}`,
//       data: candlestickData[selectedSymbol]?.map((candle) => ({
//         x: new Date(candle.t),
//         o: candle.o,
//         h: candle.h,
//         l: candle.l,
//         c: candle.c,
//       })),
//       borderColor: 'green',
//       borderWidth: 1,
//     }]
//   };

//   // Chart options configuration
//   const chartOptions = {
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           unit: 'minute',
//         },
//         title: {
//           display: true,
//           text: 'Time',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Price',
//         },
//       },
//     },
//   };

//   // Handle symbol selection change
//   const handleSymbolChange = (symbol) => {
//     setSelectedSymbol(symbol);
//   };

//   // Handle interval selection change
//   const handleIntervalChange = (interval) => {
//     setSelectedInterval(interval);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Cryptocurrency Candlestick Chart</h1>
      
//       <div className="mb-4 flex justify-center space-x-4">
//         <select
//           value={selectedSymbol}
//           onChange={(e) => handleSymbolChange(e.target.value)}
//           className="p-2 border rounded-md bg-white shadow-md"
//         >
//           <option value="ethusdt">ETH/USDT</option>
//           <option value="bnbusdt">BNB/USDT</option>
//           <option value="dotusdt">DOT/USDT</option>
//         </select>

//         <select
//           value={selectedInterval}
//           onChange={(e) => handleIntervalChange(e.target.value)}
//           className="p-2 border rounded-md bg-white shadow-md"
//         >
//           <option value="1m">1 Minute</option>
//           <option value="3m">3 Minutes</option>
//           <option value="5m">5 Minutes</option>
//         </select>
//       </div>

//       <div className="candlestick-chart-container w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
//         {candlestickData[selectedSymbol] ? (
//           <Chart type="candlestick" data={chartData} options={chartOptions} />
//         ) : (
//           <p className="text-center text-gray-500">Loading data...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { Chart } from 'react-chartjs-2';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('ethusdt'); // Default ETH/USDT
  const [selectedInterval, setSelectedInterval] = useState('1m');   // Default 1-minute interval
  const [candlestickData, setCandlestickData] = useState({});

  // WebSocket connection setup
  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedSymbol}@kline_${selectedInterval}`);

    ws.onmessage = (event) => {
      const { k: candle } = JSON.parse(event.data);
      const newCandle = {
        t: candle.t,   // Time
        o: candle.o,   // Open price
        h: candle.h,   // High price
        l: candle.l,   // Low price
        c: candle.c,   // Close price
      };

      setCandlestickData((prevData) => ({
        ...prevData,
        [selectedSymbol]: [...(prevData[selectedSymbol] || []), newCandle],
      }));
    };

    return () => ws.close();
  }, [selectedSymbol, selectedInterval]);

  // Load stored chart data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(selectedSymbol);
    if (storedData) {
      setCandlestickData((prevData) => ({
        ...prevData,
        [selectedSymbol]: JSON.parse(storedData),
      }));
    }
  }, [selectedSymbol]);

  // Save candlestick data to localStorage when it changes
  useEffect(() => {
    if (candlestickData[selectedSymbol]) {
      localStorage.setItem(selectedSymbol, JSON.stringify(candlestickData[selectedSymbol]));
    }
  }, [candlestickData, selectedSymbol]);

  // Chart data configuration
  const chartData = {
    datasets: [{
      label: `${selectedSymbol.toUpperCase()}`,
      data: candlestickData[selectedSymbol]?.map((candle) => ({
        x: new Date(candle.t),
        o: candle.o,
        h: candle.h,
        l: candle.l,
        c: candle.c,
      })),
      borderColor: '#00ff00',
      borderWidth: 1,
    }]
  };

  // Chart options configuration
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
        title: {
          display: true,
          text: 'Time',
          color: '#ffffff'
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
      tooltip: {
        backgroundColor: '#2a2a2a',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      },
    },
    backgroundColor: '#111111',
  };

  // Handle symbol selection change
  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  // Handle interval selection change
  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-extrabold text-center text-green-400">
        Cryptocurrency Candlestick Chart
      </h1>
      
      <div className="mb-8 flex justify-center space-x-6">
        <select
          value={selectedSymbol}
          onChange={(e) => handleSymbolChange(e.target.value)}
          className="p-3 border border-transparent rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>

        <select
          value={selectedInterval}
          onChange={(e) => handleIntervalChange(e.target.value)}
          className="p-3 border border-transparent rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minutes</option>
          <option value="5m">5 Minutes</option>
        </select>
      </div>

      <div className="candlestick-chart-container w-full max-w-6xl bg-gray-800 shadow-lg rounded-lg p-4">
        {candlestickData[selectedSymbol] ? (
          <Chart type="candlestick" data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default App;
