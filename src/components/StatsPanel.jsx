function StatsPanel({ maxVoltage, minVoltage, difference }) {
  return (
    <section className="stats-panel">
      <h2>Pack Statistics</h2>
      <div className="stats-grid">
        <div>
          <p className="stat-title">Max Voltage</p>
          <p className="stat-value">{maxVoltage.toFixed(2)}V</p>
        </div>
        <div>
          <p className="stat-title">Min Voltage</p>
          <p className="stat-value">{minVoltage.toFixed(2)}V</p>
        </div>
        <div>
          <p className="stat-title">Difference</p>
          <p className="stat-value">{difference.toFixed(3)}V</p>
        </div>
      </div>
    </section>
  );
}

export default StatsPanel;