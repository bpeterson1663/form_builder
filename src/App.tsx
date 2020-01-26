import * as React from 'react'
import { hot } from 'react-hot-loader'
import './App.css'
import FormCreator from './components/FormCreator'

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
      <h1>Form Builder</h1>
      <FormCreator />
    </div>
  )
}

export default hot(module)(App)
