
import React, { useState, useEffect, useRef } from 'react';
import TradingViewChart from './TradingViewChart';
import './App.css';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(() => {
    return localStorage.getItem('selectedSymbol') || 'ETHUSDT'; // Default to ETH/USDT
  });
  const [selectedInterval, setSelectedInterval] = useState(() => {
    return localStorage.getItem('selectedInterval') || '1'; // Default to 1 minute
  });
  const [candlestickData, setCandlestickData] = useState(() => {
    const storedData = localStorage.getItem(`${selectedSymbol}_candlestickData`);
    return storedData ? JSON.parse(storedData) : [];
  });
  const [loading, setLoading] = useState(true);

  // Store historical data in-memory and in localStorage
  const historicalData = useRef({
    ETHUSDT: JSON.parse(localStorage.getItem('ETHUSDT_candlestickData')) || [],
    BNBUSDT: JSON.parse(localStorage.getItem('BNBUSDT_candlestickData')) || [],
    DOTUSDT: JSON.parse(localStorage.getItem('DOTUSDT_candlestickData')) || [],
  });

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedSymbol.toLowerCase()}@kline_${selectedInterval}`);

    ws.onopen = () => {
      setLoading(false); // Loading complete when WebSocket opens
    };

    ws.onmessage = (event) => {
      const { k: candle } = JSON.parse(event.data);
      const newCandle = {
        time: candle.t,
        open: candle.o,
        high: candle.h,
        low: candle.l,
        close: candle.c,
      };

      // Update in-memory historical data
      historicalData.current[selectedSymbol].push(newCandle);
      
      // Save updated data in state
      setCandlestickData([...historicalData.current[selectedSymbol]]);

      // Persist updated data to localStorage
      localStorage.setItem(`${selectedSymbol}_candlestickData`, JSON.stringify(historicalData.current[selectedSymbol]));
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setLoading(false);
    };

    ws.onclose = () => {
      setLoading(false);
    };

    return () => ws.close(); // Close the WebSocket connection on cleanup
  }, [selectedSymbol, selectedInterval]);

  // Handle symbol change
  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol.toUpperCase());
    setLoading(true);

    // Restore data from in-memory storage or reset
    const storedData = historicalData.current[symbol.toUpperCase()] || [];
    setCandlestickData(storedData);

    // Persist symbol change in localStorage
    localStorage.setItem('selectedSymbol', symbol.toUpperCase());
  };

  // Handle interval change
  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    setLoading(true);

    // Restore data from in-memory storage or reset
    setCandlestickData(historicalData.current[selectedSymbol] || []);

    // Persist interval change in localStorage
    localStorage.setItem('selectedInterval', interval);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-extrabold text-center text-green-400">
        Cryptocurrency TradingView Chart with WebSocket Data
      </h1>

      <div className="mb-8 flex justify-center space-x-6">
        <select
          value={selectedSymbol}
          onChange={(e) => handleSymbolChange(e.target.value)}
          className="p-3 border border-transparent rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="ETHUSDT">ETH/USDT</option>
          <option value="BNBUSDT">BNB/USDT</option>
          <option value="DOTUSDT">DOT/USDT</option>
        </select>

        <select
          value={selectedInterval}
          onChange={(e) => handleIntervalChange(e.target.value)}
          className="p-3 border border-transparent rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="1">1 Minute</option>
          <option value="3">3 Minutes</option>
          <option value="5">5 Minutes</option>
        </select>
      </div>

      <div className="candlestick-chart-container w-full max-w-6xl bg-gray-800 shadow-lg rounded-lg p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-green-400">Loading data...</p>
          </div>
        ) : (
          <TradingViewChart selectedSymbol={selectedSymbol} selectedInterval={selectedInterval} candlestickData={candlestickData} />
        )}
      </div>
    </div>
  );
};

export default App;
