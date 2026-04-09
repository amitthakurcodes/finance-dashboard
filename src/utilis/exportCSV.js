export const exportCSV = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert("No data to export")
    return
  }

  const headers = ["Date", "Type", "Category", "Amount", "Description"]

  const rows = transactions.map(t => [
    t.date,
    t.type,
    t.categories?.name || "N/A",
    t.amount,
    t.description || ""
  ])

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map(e => e.join(",")).join("\n")

  const encodedUri = encodeURI(csvContent)

  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "transactions.csv")
  document.body.appendChild(link)

  link.click()
  document.body.removeChild(link)
}