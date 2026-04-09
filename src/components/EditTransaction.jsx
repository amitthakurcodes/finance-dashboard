export default function EditTransaction({
  form,
  setForm,
  onSubmit,
  categories,
  onCancel
}) {
  const filteredCategories = categories.filter(c => c.type === form.type)

  return (
    <form 
      onSubmit={onSubmit} 
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow flex flex-col gap-3 mb-4"
    >

      <h2 className="font-semibold text-lg">✏️ Edit Transaction</h2>

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 rounded 
        bg-white dark:bg-gray-700 
        text-gray-800 dark:text-white 
        dark:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      {/* Type */}
      <select
        className="border p-2 rounded 
        bg-white dark:bg-gray-700 
        text-gray-800 dark:text-white 
        dark:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* Category */}
      <select
        className="border p-2 rounded 
        bg-white dark:bg-gray-700 
        text-gray-800 dark:text-white 
        dark:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.category_id}
        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
      >
        <option value="">Select Category</option>
        {filteredCategories.map(c => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.name}
          </option>
        ))}
      </select>

      {/* Update Button */}
      <button className="bg-blue-500 dark:bg-blue-600 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition">
        Update Transaction
      </button>

      {/* Cancel Button */}
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 text-white py-2 rounded transition"
      >
        Cancel
      </button>

    </form>
  )
}