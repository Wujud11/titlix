'use client'

import { useState } from 'react'

export default function TitleGeneratorPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ type: string; text: string }[]>([])

  const generateTitles = async () => {
    setLoading(true)
    setResult([])

    try {
      const res = await fetch('/api/generate-titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      })

      const data = await res.json()
      setResult(data.titles)
    } catch (err) {
      console.error('Error generating titles:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">ولّد عنوان لمنتجك 🧠</h1>

      <textarea
        className="w-full border border-gray-300 p-3 rounded mb-4"
        placeholder="اكتب وصف منتجك هنا..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        onClick={generateTitles}
        disabled={loading || !input}
      >
        {loading ? 'جاري التوليد...' : 'ولّد العناوين'}
      </button>

      <div className="mt-6 space-y-4">
        {result.map((item, idx) => (
          <div key={idx} className="border p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{item.type}</p>
            <p className="font-semibold">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
