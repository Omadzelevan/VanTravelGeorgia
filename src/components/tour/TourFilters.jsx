export default function TourFilters({ setFilter }) {
  return (
    <div className="tour-filters">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("mountain")}>Mountain</button>
      <button onClick={() => setFilter("wine")}>Wine</button>
      <button onClick={() => setFilter("sea")}>Sea</button>
      <button onClick={() => setFilter("culture")}>Culture</button>
    </div>
  );
}
