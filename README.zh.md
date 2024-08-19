# 🌤️ 天气应用

[English](./README.md) | [中文](./README.zh.md)

一个轻量化的极简天气应用，使用 OpenWeatherMap API 实现。根据你的当前位置获取实时天气更新，支持不同单位之间的切换，并提供无缝的明暗模式和多语言支持。

## 🚀 功能

- **🌦️ 实时天气**：获取当前温度、湿度、气压和风速信息。
- **🌍 基于位置**：自动获取并显示你当前位置的天气数据。
- **🔄 单位转换**：在摄氏度、华氏度和开尔文之间切换。
- **🌓 主题支持**：支持明亮模式和暗黑模式。
- **🌐 多语言**：支持英语和中文，可轻松切换。
- **🔐 安全性**：通过 `babel-plugin-dotenv-import` 管理环境变量。

## 📦 安装

1. **克隆仓库：**
   ```bash
   git clone https://github.com/XindiShang/weather-app.git
   cd weather-app
   ```

2. **安装依赖：**
   ```bash
   pnpm install
   ```

3. **添加你的 API 密钥：**
   复制示例环境文件，并添加你的 OpenWeatherMap API 密钥：
   ```bash
   cp .env.example .env
   ```

4. **运行应用：**
   ```bash
   pnpm start
   ```

## 🛠️ 技术栈

- **React Native + Expo**
- **OpenWeatherMap API**
- **i18next** 用于多语言支持
- **babel-plugin-dotenv-import** 用于管理环境变量

## 💬 联系方式

如有问题或反馈，请联系 [shangxindi@gmail.com](mailto:shangxindi@gmail.com) 或在 [GitHub](https://github.com/XindiShang) 上找到我。

## 📄 许可证

本项目使用 MIT 许可证。