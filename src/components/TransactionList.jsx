export default function TransactionList({ transactions, onDelete, onEdit, loading }) {
    return (
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
            
            <h3 className="font-semibold mb-3">📄 Transactions</h3>

            {transactions.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No transactions</p>
            ) : (
                <div className="flex flex-col gap-2">

                    {transactions.map(t => (
                        <div 
                            key={t.id} 
                            className="flex justify-between items-center border-b dark:border-gray-700 pb-2"
                        >

                            {/* Left side */}
                            <div>
                                <p className="font-medium">
                                    {t.categories?.icon} {t.categories?.name}
                                </p>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t.description || 'No description'}
                                </p>

                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {new Date(t.date).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Right side */}
                            <div className="text-right">

                                <p className={`font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                    {t.type === 'income' ? '+' : '-'}₹{t.amount}
                                </p>

                                <div className="flex gap-2 justify-end mt-1">

                                    {/* Edit */}
                                    <button
                                        onClick={() => onEdit(t)}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        ✏️
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => onDelete(t.id)}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}