import { useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CellCard from './CellCard';
import StatsPanel from './StatsPanel';
import { simulateStep } from '../utils/balancing';

const initialCells = [3.85, 4.2, 3.75, 4.05];

function getStats(cells) {
  const maxVoltage = Math.max(...cells);
  const minVoltage = Math.min(...cells);

  return {
    maxVoltage,
    minVoltage,
    difference: maxVoltage - minVoltage,
  };
}

function Dashboard() {
  const [cells, setCells] = useState(initialCells);
  const [isBalancing, setIsBalancing] = useState(false);
  const [history, setHistory] = useState([
    {
      step: 0,
      ...Object.fromEntries(initialCells.map((voltage, index) => [`cell${index + 1}`, voltage])),
    },
  ]);

  const stats = useMemo(() => getStats(cells), [cells]);
  const highestIndex = cells.indexOf(stats.maxVoltage);
  const lowestIndex = cells.indexOf(stats.minVoltage);
  const isBalanced = stats.difference <= 0.05;

  useEffect(() => {
    if (!isBalancing) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCells((prevCells) => {
        const nextCells = simulateStep(prevCells);

        setHistory((prevHistory) => [
          ...prevHistory,
          {
            step: prevHistory.length,
            ...Object.fromEntries(
              nextCells.map((voltage, index) => [`cell${index + 1}`, Number(voltage.toFixed(3))])
            ),
          },
        ]);

        return nextCells;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBalancing]);

  useEffect(() => {
    if (isBalancing && isBalanced) {
      setIsBalancing(false);
    }
  }, [isBalancing, isBalanced]);

  const handleStartBalancing = () => {
    if (!isBalanced) {
      setIsBalancing(true);
    }
  };

  const statusText = isBalanced
    ? 'Balanced Successfully'
    : isBalancing
      ? 'Balancing in progress...'
      : 'Imbalance Detected';

  return (
    <main className="dashboard">
      <header>
        <h1>Battery Balancing System</h1>
        <p className="subtitle">Live voltage equalization dashboard</p>
      </header>

      <section className="cells-grid">
        {cells.map((voltage, index) => (
          <CellCard
            key={`cell-${index}`}
            index={index}
            voltage={voltage}
            isHighest={index === highestIndex}
            isLowest={index === lowestIndex}
          />
        ))}
      </section>

      <StatsPanel
        maxVoltage={stats.maxVoltage}
        minVoltage={stats.minVoltage}
        difference={stats.difference}
      />

      <section className="status-row">
        <p className={`status ${isBalanced ? 'success' : 'warning'}`}>{statusText}</p>
        <button type="button" onClick={handleStartBalancing} disabled={isBalancing || isBalanced}>
          {isBalancing ? 'Balancing...' : 'Start Balancing'}
        </button>
      </section>

      <section className="chart-panel">
        <h2>Voltage Over Time</h2>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="step" />
              <YAxis domain={[3.6, 4.3]} />
              <Tooltip />
              <Legend />
              {cells.map((_, index) => (
                <Line
                  key={`line-${index}`}
                  type="monotone"
                  dataKey={`cell${index + 1}`}
                  stroke={["#6b7280", "#ef4444", "#3b82f6", "#10b981"][index % 4]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;