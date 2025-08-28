import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { problems } from '../data/problems.js'
import { runQuickChecks } from '../lib/runTests.js'

export default function Problem() {
  const { slug } = useParams()
  const prob = useMemo(() => problems.find(p => p.slug === slug), [slug])

  const [code, setCode] = useState(prob?.signature ?? '')
  const [result, setResult] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(`code:${slug}`)
    setCode(saved || prob?.signature || '')
    setResult(null)
  }, [slug, prob])

  if (!prob) return <p>Problem not found.</p>

  const run = () => {
    const out = runQuickChecks({ code, fnName: prob.fnName, cases: prob.tests })
    setResult(out)
    localStorage.setItem(`code:${slug}`, code)
  }

  const reset = () => {
    setCode(prob.signature)
  }

  const download = () => {
    const blob = new Blob([code], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${prob.slug}.js`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid">
      <div className="card">
        <h2 style={{marginTop:0}}>{prob.title}</h2>
        <div className="tags">
          <span className="tag">{prob.difficulty}</span>
          <span className="tag">{prob.category}</span>
          <a className="tag" href={prob.link} target="_blank" rel="noreferrer">LeetCode ↗</a>
        </div>
        <p style={{opacity:.95, lineHeight:1.6}}>{prob.description}</p>
      </div>

      <div className="cols">
        <div className="card">
          <h3 style={{marginTop:0}}>Editor (JavaScript)</h3>
          <textarea className="editor" spellCheck="false" value={code} onChange={e => setCode(e.target.value)} />
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button className="btn" onClick={run}>Run Quick Checks</button>
            <button className="btn" onClick={reset}>Reset</button>
            <button className="btn" onClick={download}>Download .js</button>
          </div>
          <p style={{opacity:.8, marginTop:8}}>Tip: Solutions you try here are saved in your browser (localStorage).</p>
        </div>

        <div className="card">
          <h3 style={{marginTop:0}}>Test Cases</h3>
          <pre className="results">{JSON.stringify(prob.tests, null, 2)}</pre>
          <h3>Results</h3>
          <div className="results">
            {result ? (<><strong>{result.summary}</strong>\n\n{result.output}</>) : 'Run to see results...'}
          </div>
        </div>
      </div>
    </div>
  )
}
