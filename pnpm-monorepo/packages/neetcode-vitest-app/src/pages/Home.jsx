import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { problems } from '../data/problems.js'

export default function Home() {
  const [q, setQ] = useState('')
  const [diff, setDiff] = useState('all')

  const filtered = useMemo(() => {
    return problems.filter(p => {
      const byQ = p.title.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())
      const byDiff = diff === 'all' || p.difficulty.toLowerCase() === diff
      return byQ && byDiff
    })
  }, [q, diff])

  return (
    <div className="grid">
      <div className="card">
        <div className="searchbar">
          <input className="input" placeholder="Search title or category..." value={q} onChange={e => setQ(e.target.value)} />
          <select className="input" style={{maxWidth: 180}} value={diff} onChange={e => setDiff(e.target.value)}>
            <option value="all">All difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="list">
          {filtered.map(p => (
            <Link key={p.slug} to={`/p/${p.slug}`} className="problem-item">
              <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
                <strong>{p.title}</strong>
                <span className="tag">{p.difficulty}</span>
              </div>
              <div className="meta">
                <span>{p.category}</span>
                <a href={p.link} target="_blank" rel="noreferrer">View on LeetCode ↗</a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
