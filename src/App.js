import React from 'react'
import { WalkingTime } from './Components/WalkingTime'
import { Header } from './Components/Header'
import './App.css'

export const App = () => {
  return (
    <div className="App-Section">
      <Header />
      <WalkingTime />
    </div>
  )
}
