# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# BMS
Requirements:
1. Tech Stack:
* React (with Vite)
* Functional components
* useState, useEffect
* Basic CSS (or Tailwind if possible)
2. Project Structure:
* src/* components/  * Dashboard.jsx,* CellCard.jsx* StatsPanel.jsx,*
 utils/,* balancing.js
  * App.jsx
3. Core Features:
A. Input Section:

* Hardcoded initial array:
  const initialCells = [3.85, 4.20, 3.75, 4.05];
* Display all cells
B. Imbalance Detection:
* Calculate:
  * max voltage
  * min voltage
  * difference
* If difference > 0.05 → show "Imbalance Detected"
C. Highlight:
* Highlight highest voltage cell in red
* Highlight lowest voltage cell in blue
D. Balancing Simulation:
* Button: "Start Balancing"
* When clicked:
  * Run loop using setInterval
  * Reduce highest cell by 0.05 every iteration
  * OR transfer from highest to lowest (advanced)
* Stop when difference <= 0.05
E. Live Updates:
* Show updated voltages in UI dynamically

F. Final State:

* Show "Balanced Successfully"

4. UI Requirements:

* Dashboard layout with:

  * Title: "Battery Balancing System"
  * Cards for each cell
  * Stats panel:
    * Max
    * Min
    * Difference
  * Status message
5. CellCard Component:

* Props:
  * voltage
  * isHighest
  * isLowest
* Style:

  * Red border → highest
  * Blue border → lowest
6. StatsPanel Component:
* Show:

  * Max Voltage
  * Min Voltage
  * Difference
7. balancing.js:
* Export function:
  simulateStep(cells)
* Logic:
  * Find max index
  * Reduce it slightly OR transfer to min
8. Extra Features:
* Add graph using chart library (Recharts or Chart.js)
* Show voltage over time
9. Code Quality:
* Clean, readable
* Proper comments
* No unnecessary complexity
10. Output:
* Provide full working code
* Include instructions to run:
  npm install
  npm run dev
Make UI look modern and clean.
