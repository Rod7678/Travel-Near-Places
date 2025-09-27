import { useState } from 'react'
import logo from './assets/logo.png'
import { AVAILABLE_PLACES } from './data.js'
import Places from './components/Places.jsx'

function App() {

  return (
    <>
    <header>
      <img src={logo} alt="Styled globe" />
      <h1>placepicker</h1>
      <p>Create your personal collection of places you would like to visit or you have visited.</p>
    </header>
    <main>
      <Places title="I'd like to visit . . . ">
      </Places>
      <Places title="Available Places">
      </Places>
    </main>
    </>
  )
}

export default App
