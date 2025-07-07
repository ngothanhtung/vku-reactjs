# useEffect Practice

## Weather App

Create a weather application user interface using React + TypeScript + CSS Module that displays the current weather in a clean and modern style.

![ui](./weather-app-ui.webp)


### 📱 UI Requirements:

Your weather app should match the layout shown in the reference image:

#### 1. **Top Bar:**

* A **search bar** at the top with placeholder text “Hanoi”.
* A **status bar** (time, Wi-Fi, battery, etc.) at the top of the phone frame (you can skip this in the actual UI implementation).

#### 2. **Current Weather Section:**

* Large temperature (e.g., `26°`).
* Weather condition text (e.g., `Sunny`) and a **sun icon**.
* Two smaller cards side-by-side:

  * **Humidity**: show value with `%`.
  * **Wind**: show wind speed in `km/h`.

#### 3. **Hourly Forecast Section:**

* A horizontal list showing:

  * Time slots (e.g., `Now`, `15:00`, `16:00`, `17:00`).
  * Temperature for each hour (e.g., `26°`, `25°`, etc.).
  * Weather icons (e.g., sunny).

### 4. APIs Info

- APIKEY: c9a0ca46550648b29ce125849232709

- Intro Request: https://www.weatherapi.com/docs/#intro-request


- Current Weather:  https://api.weatherapi.com/v1/current.json?key=c9a0ca46550648b29ce125849232709&q=Danang&aqi=no&lang=vi

- Hourly:  https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Danang&days=1&aqi=no&alerts=no&lang=vi

- Daily 5 days (days=5):  https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Danang&days=5&aqi=no&alerts=no&lang=vi

Note: Replace: 'Danang' by another city: Tokyo, bangkok ...