import { useState } from 'react'
import './App.css'
import ProductManagement from './components/ProductManagement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductManagement />
    </>
  )
}

export default App
