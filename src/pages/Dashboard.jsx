import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'

// ✅ Components
import Navbar from '../components/Navbar'
import StatsCards from '../components/StatsCards'
import Chart from '../components/Chart'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import EditTransaction from '../components/EditTransaction'
import SearchFilter from '../components/SearchFilter'
import DateFilter from '../components/DateFilter'
import ExportCSVButton from '../components/ExportCSVButton'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // ✅ Filters
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    category_id: '',
    description: '',
    date: new Date().toLocaleDateString('en-CA')
  })

  // ✅ Load data
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    fetchCategories()
    fetchTransactions()
  }, [])

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    setCategories(data || [])
  }

  const fetchTransactions = async () => {
    setLoading(true)

    const { data } = await supabase
      .from('transactions')
      .select('*, categories(name, icon)')
      .order('created_at', { ascending: false })

    setTransactions(data || [])
    setLoading(false)
  }

  // ✅ Add
  const handleAddTransaction = async (e) => {
    e.preventDefault()

    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('transactions').insert([{
      ...form,
      amount: parseFloat(form.amount),
      user_id: user.id
    }])

    setForm({
      amount: '',
      type: 'expense',
      category_id: '',
      description: '',
      date: new Date().toLocaleDateString('en-CA')
    })

    setShowForm(false)
    fetchTransactions()
  }

  // ✅ Delete
  const handleDelete = async (id) => {
    await supabase.from('transactions').delete().eq('id', id)
    fetchTransactions()
  }

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // ✅ Edit
  const handleEdit = (t) => {
    setForm({
      amount: t.amount,
      type: t.type,
      category_id: t.category_id,
      description: t.description || '',
      date: t.date
    })

    setEditingId(t.id)
  }

  // ✅ Update
  const handleUpdate = async (e) => {
    e.preventDefault()

    await supabase
      .from('transactions')
      .update({
        ...form,
        amount: parseFloat(form.amount)
      })
      .eq('id', editingId)

    setEditingId(null)

    setForm({
      amount: '',
      type: 'expense',
      category_id: '',
      description: '',
      date: new Date().toLocaleDateString('en-CA')
    })

    fetchTransactions()
  }

  // ✅ Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null)
  }

  // ✅ Stats
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const balance = totalIncome - totalExpense

  // ✅ Chart Data
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        const name = t.categories?.name || 'Other'
        if (!acc[name]) acc[name] = { name, value: 0 }
        acc[name].value += parseFloat(t.amount)
      }
      return acc
    }, {})
  )

  // ✅ Filter Logic
  const filteredTransactions = transactions.filter(t => {

    const matchSearch =
      t.description?.toLowerCase().includes(search.toLowerCase()) ||
      t.categories?.name?.toLowerCase().includes(search.toLowerCase())

    const matchFilter =
      filterType === 'all' || t.type === filterType

    const transactionDate = new Date(t.date)

    const matchFromDate = fromDate
      ? transactionDate >= new Date(fromDate)
      : true

    const matchToDate = toDate
      ? transactionDate <= new Date(toDate)
      : true

    return matchSearch && matchFilter && matchFromDate && matchToDate
  })

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden">

      <Navbar user={user} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto p-4 pb-20 text-gray-800 dark:text-white">

        {/* Stats */}
        <StatsCards
          balance={balance}
          income={totalIncome}
          expense={totalExpense}
        />

        {/* Chart */}
        <Chart data={categoryData} />

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-4">

          <SearchFilter
            search={search}
            setSearch={setSearch}
            filterType={filterType}
            setFilterType={setFilterType}
          />

          <DateFilter
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />

        </div>

        {/* Add button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-4 dark:bg-indigo-500"
        >
          {showForm ? 'Cancel' : '+ Add Transaction'}
        </button>

        {/* Add Form */}
        {showForm && (
          <TransactionForm
            form={form}
            setForm={setForm}
            onSubmit={handleAddTransaction}
            categories={categories}
          />
        )}

        {/* Edit Form */}
        {editingId && (
          <EditTransaction
            form={form}
            setForm={setForm}
            onSubmit={handleUpdate}
            categories={categories}
            onCancel={handleCancelEdit}
          />
        )}

        {/* List */}
        <TransactionList
          transactions={filteredTransactions}
          onDelete={handleDelete}
          onEdit={handleEdit}
          loading={loading}
        />

        {/* ✅ EXPORT BUTTON AT BOTTOM */}
        <div className="mt-4">
          <ExportCSVButton transactions={filteredTransactions} />
        </div>

      </div>
    </div>
  )
}