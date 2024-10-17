import React, { useEffect, useRef } from 'react';

const TradingViewChart = ({ selectedSymbol, selectedInterval, candlestickData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: chartRef.current.id,
        autosize: true,
        symbol: selectedSymbol,
        interval: selectedInterval,
        timezone: 'Etc/UTC',
        theme: 'Dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_legend: true,
        save_image: false,
        studies: ['MACD'],
        // Pass candlestick data to TradingView
        data: candlestickData.map(candle => ({
          time: candle.time / 1000, // TradingView expects time in seconds
          open: parseFloat(candle.open),
          high: parseFloat(candle.high),
          low: parseFloat(candle.low),
          close: parseFloat(candle.close),
        })),
      });
    };

    chartRef.current.appendChild(script);

    return () => {
      // Clean up the chart when the component unmounts
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, [selectedSymbol, selectedInterval, candlestickData]);

  return <div ref={chartRef} id="tradingview-chart" style={{ width: '100%', height: '600px' }} />;
};

export default TradingViewChart;

