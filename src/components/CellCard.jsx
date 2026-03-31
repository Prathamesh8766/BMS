function CellCard({ voltage, isHighest, isLowest, index }) {
  const cardClasses = [
    'cell-card',
    isHighest ? 'highest' : '',
    isLowest ? 'lowest' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClasses}>
      <p className="cell-label">Cell {index + 1}</p>
      <p className="cell-voltage">{voltage.toFixed(2)}V</p>
      {isHighest && <span className="tag high-tag">Highest</span>}
      {isLowest && <span className="tag low-tag">Lowest</span>}
    </article>
  );
}

export default CellCard;