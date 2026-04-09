import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export default function Chart({ data }) {

  const COLORS = ['#6c63ff', '#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#ec4899']

  return (
    <div className="bg-white p-4 rounded-xl dark:bg-gray-800 shadow mb-4">
      <h3 className="mb-2 font-semibold">📊 Expense by Category</h3>

      {data.length === 0 ? (
        <p className="text-gray-500">No data</p>
      ) : (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={100}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}