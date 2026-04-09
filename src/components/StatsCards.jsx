export default function StatsCards({ balance, income, expense }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">

      {/* ✅ Balance */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
        <h2 className={`text-xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          ₹{balance.toLocaleString()}
        </h2>
      </div>

      {/* ✅ Income */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">Income</p>
        <h2 className="text-xl font-bold text-green-500">
          ₹{income.toLocaleString()}
        </h2>
      </div>

      {/* ✅ Expense */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">Expense</p>
        <h2 className="text-xl font-bold text-red-500">
          ₹{expense.toLocaleString()}
        </h2>
      </div>

    </div>
  )
}