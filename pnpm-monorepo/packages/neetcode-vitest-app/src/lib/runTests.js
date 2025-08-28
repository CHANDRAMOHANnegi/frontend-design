// Very lightweight test runner for the browser page.
// It runs the exported function from user code against provided cases.
export function runQuickChecks({ code, fnName, cases }) {
  const logs = []
  const captureLog = (...args) => logs.push(args.map(String).join(' '))

  // sandboxed Function: expose only console.log and standard JS
  let exportedFn = null
  try {
    const wrapped = `${code}\n; return typeof ${fnName} === 'function' ? ${fnName} : null;`
    exportedFn = new Function(wrapped)()
    if (!exportedFn) {
      return { ok: false, output: logs.join('\n'), summary: `No function named ${fnName} exported.` }
    }
  } catch (err) {
    return { ok: false, output: logs.join('\n'), summary: 'Build error: ' + err.message }
  }

  let passed = 0
  const total = cases.length
  const details = []

  for (const [idx, c] of cases.entries()) {
    try {
      const res = exportedFn(...Object.values(c.input))
      const pass = deepEqual(res, c.output)
      if (pass) passed++
      details.push(`#${idx+1} ${pass ? 'PASS' : 'FAIL'}\n  input: ${JSON.stringify(c.input)}\n  expected: ${JSON.stringify(c.output)}\n  got: ${JSON.stringify(res)}`)
    } catch (err) {
      details.push(`#${idx+1} ERROR\n  input: ${JSON.stringify(c.input)}\n  error: ${err.message}`)
    }
  }

  const summary = `Passed ${passed}/${total} cases`
  return { ok: passed === total, output: details.join('\n\n'), summary }
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
