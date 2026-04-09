export default function TransactionForm({ form, setForm, onSubmit, categories }) {

  const filteredCategories = categories.filter(c => c.type === form.type)

  return (
    <form 
      onSubmit={onSubmit} 
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col gap-3 mb-4"
    >

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
        required
      />

      {/* Type */}
      <select
        className="border p-2 rounded 
        bg-white dark:bg-gray-700 
        text-gray-800 dark:text-white 
        dark:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value, category_id: '' })}
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
        required
      >
        <option value="">Select Category</option>
        {filteredCategories.map(c => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.name}
          </option>
        ))}
      </select>

      {/* Description */}
      <input
        type="text"
        placeholder="Description"
        className="border p-2 rounded 
        bg-white dark:bg-gray-700 
        text-gray-800 dark:text-white 
        dark:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Button */}
      <button className="bg-green-500 dark:bg-green-600 text-white py-2 rounded hover:bg-green-600 dark:hover:bg-green-700 transition">
        Add Transaction
      </button>

    </form>
  )
}