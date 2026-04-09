import { AiOutlineCalendar } from "react-icons/ai"

export default function DateFilter({ fromDate, setFromDate, toDate, setToDate }) {

  const clearDates = () => {
    setFromDate('')
    setToDate('')
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-5 rounded-xl shadow mb-5 border dark:border-gray-700">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <AiOutlineCalendar className="text-indigo-600 text-xl" />
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Filter by Date
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

        {/* FROM */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border rounded p-2 mt-1 
            bg-white dark:bg-gray-700 
            text-gray-800 dark:text-white 
            dark:border-gray-600 
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* TO */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border rounded p-2 mt-1 
            bg-white dark:bg-gray-700 
            text-gray-800 dark:text-white 
            dark:border-gray-600 
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* RESET BUTTON */}
        <div>
          <button
            onClick={clearDates}
            className="w-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-white py-2 rounded transition"
          >
            Reset
          </button>
        </div>

      </div>

    </div>
  )
}