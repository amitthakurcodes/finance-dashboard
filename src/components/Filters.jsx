export default function Filters({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select
        className="border p-2 rounded"
        value={filter.type}
        onChange={(e) => setFilter({ ...filter, type: e.target.value })}
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  )
}