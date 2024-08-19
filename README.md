# 🌤️ Weather App

[English](./README.md) | [中文](./README.zh.md)

A lightweight and minimalist real-time weather app powered by the OpenWeatherMap API. Get instant weather updates based on your location, switch between different units, and enjoy seamless light/dark mode and multilingual support.

## 🚀 Features

- **🌦️ Real-time Weather**: Get current temperature, humidity, pressure, and wind speed.
- **🌍 Location-based**: Automatically fetches weather data based on your location.
- **🔄 Unit Conversion**: Switch between Celsius, Fahrenheit, and Kelvin.
- **🌓 Theme Support**: Light and dark mode available.
- **🌐 Multilingual**: Supports English and Chinese with easy switching.
- **🔐 Secure**: Environment variables managed with `babel-plugin-dotenv-import`.

## 📦 Installation

1. **Clone the repo**:
   ```bash
   git clone https://github.com/XindiShang/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Add your API key:**
   Copy the example environment file and add your OpenWeatherMap API key:
   ```bash
   cp .env.example .env
   ```

1. **Run the app:**
   ```bash
   pnpm start
   ```

## 🛠️ Tech Stack

- **React Native + Expo**
- **OpenWeatherMap API**
- **i18next** for localization
- **babel-plugin-dotenv-import** for environment variables

## 💬 Contact

Have questions or feedback? Reach out at [shangxindi@gmail.com](mailto:shangxindi@gmail.com) or find me on [GitHub](https://github.com/XindiShang).

## 📄 License

This project is licensed under the MIT License.