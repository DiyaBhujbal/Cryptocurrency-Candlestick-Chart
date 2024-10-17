# Cryptocurrency TradingView Chart with Binance WebSocket DataProject Overview

This project implements a real-time cryptocurrency candlestick chart using Binance WebSocket data. Users can switch between different cryptocurrencies (ETH/USDT, BNB/USDT, DOT/USDT) and select candlestick intervals (1 minute, 3 minutes, 5 minutes). The data is displayed on a responsive TradingView chart, which updates in real-time. Previously received candlestick data is persisted in local storage, ensuring that historical data is retained even when switching between symbols.

# Features
Real-Time WebSocket Data: Connects to Binance WebSocket to receive real-time candlestick data.

Cryptocurrency Selection: Users can switch between ETH/USDT, BNB/USDT, and DOT/USDT.

Time Interval Selection: Supports 1-minute, 3-minute, and 5-minute candlestick intervals.

Data Persistence: Candlestick data is stored in both localStorage and an in-memory structure to maintain historical data even when switching between cryptocurrencies.

Responsive Chart: Uses the TradingView widget to display candlestick charts in a user-friendly, responsive design.

Live Updates: The chart updates in real-time as new WebSocket messages are received from Binance.

# Project Structure
App.jsx: Manages the WebSocket connection, user interface, and candlestick data storage.

TradingViewChart.jsx: Renders the TradingView candlestick chart.

App.css: Contains styles for the user interface and layout.

# Dependencies
React: Used for building the user interface.

TradingView Widget: Used for displaying the candlestick chart.

WebSocket API: Used to receive real-time candlestick data from Binance.

# Future Enhancements
Add more cryptocurrencies dynamically.

Improve error handling and reconnection logic for WebSocket connections.
