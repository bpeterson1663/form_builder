import * as React from 'react'
import { useState } from 'react'
import AddInput from './Forms/CreateField'

const Welcome: React.FunctionComponent = (): JSX.Element => {
  interface InputItem {
    title: string
    type: string
  }

  const [inputList, setInputList] = useState<InputItem[]>([])
  const handleNewItem = (data: InputItem): void => {
    const newList: InputItem[] = [...inputList, data]
    setInputList(newList)
  }

  const list = inputList.map((item, i) => {
    return (
      <div key={i}>
        {item.title} {item.type}
      </div>
    )
  })
  return (
    <div>
      <AddInput handleItemSubmit={handleNewItem} />
      {list}
    </div>
  )
}

export default Welcome
