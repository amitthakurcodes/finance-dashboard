export default function SearchFilter({
  search,
  setSearch,
  filterType,
  setFilterType
}) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow mb-4 flex flex-col sm:flex-row gap-3 items-center">

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="🔍 Search description or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full 
        bg-white dark:bg-gray-700 
        text-gray-800 dark:text-white 
        dark:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* 🔽 Filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="border p-2 rounded 
        bg-white dark:bg-gray-700 
        text-gray-800 dark:text-white 
        dark:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

    </div>
  )
}