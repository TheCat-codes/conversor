import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const Measures = {
    celsius: 'celsius',
    farenheit: 'farenheit'
  }

  type Measure = keyof typeof Measures

  const [measure, setMeasure] = useState<Measure>('celsius')
  const [result, setResult] = useState<number>(0)
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMeasure(event.target.value as Measure)
  }

  const handleConvert = ( value:number ) => {
    switch(measure) {
      case 'celsius': {
        const answer = (value * 9/5) + 32
        setResult(answer)
        return
      }
      case 'farenheit' : {
        const answer = (value - 32) * 5/9
        setResult(answer)
        return
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    const parsed = parseFloat(raw)

    if(isNaN(parsed) || raw === '') {
      setValue(0)
      return
    }

    setValue(parsed)
  } 

  useEffect(() => {
    handleConvert(value)
  }, [measure, value])

  const letter = measure === 'celsius' ? 'F°' : 'C°'

  return (
    <>
      <h1>TEMPERATURE METER</h1>
      <div className="sets">
        <select className='select' onChange={handleChange}>
          {
            Object.entries(Measures).map(([key, value]) => {
              return <option key={key} value={key}>{value}</option>
            })
          }
        </select>
        <input className='input' value={value} onChange={handleInputChange} type="number" />
        <button onClick={() => handleConvert(value)}>Convert</button>
      </div>
      <h2>T: {result} {letter}</h2>
    </>
  )
}

export default App
