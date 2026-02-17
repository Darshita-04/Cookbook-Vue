# 🍳 Cookbook - Vue Edition

A reactive and intuitive recipe discovery dashboard built with **Vue 3 (Composition API)**. 

## ✨ Key Features
- **Composition API:** Modern logic reuse using `setup()` and reactive refs.
- **Vue Router:** Efficient SPA routing for detail views.
- **Directives:** Clean template logic using `v-for` for ingredients and `v-if` for health information badges.
- **Scoped Styles:** Modular CSS to ensure the UI remains consistent and bug-free.

## 🛠️ Tech Stack
- **Framework:** Vue.js 3
- **Build Tool:** Vite
- **State/Logic:** Composition API
- **API Handling:** Fetch API

## 🚀 Quick Start
1. `npm install`
2. Create `.env` and add `VITE_API_KEY2=YOUR_API_KEY`
3. `npm run dev`

## 🔗 Live Deployment
[CookBook](https://cookbook-vue.vercel.app/)

## ⚠️ API Usage & Rate Limiting
This project uses the **Spoonacular Free Tier API**, which has a daily limit of **50 points**. 

Please note:
* Each search request and detail fetch consumes points.
* **If the limit is reached:** The application may return a `402 Payment Required` or `429 Too Many Requests` error.
* If the search results or recipe details fail to load in the live demo, it is likely due to the daily API quota being exhausted. The quota resets daily at midnight UTC.