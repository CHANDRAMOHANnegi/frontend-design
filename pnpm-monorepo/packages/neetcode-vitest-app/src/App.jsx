import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="brand">NeetCode 150 — Vitest App</NavLink>
        <a href="https://vitest.dev" target="_blank" rel="noreferrer">Vitest</a>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Made for practicing DS&A. Edit code in the browser, run quick checks, then implement in <code>src/solutions</code> and run <code>npm run test</code>.</p>
      </footer>
    </div>
  )
}
