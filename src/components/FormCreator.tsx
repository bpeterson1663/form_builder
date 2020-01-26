import * as React from 'react'
import { useState } from 'react'
import CreateField from './Forms/CreateField'

const FormCreator: React.FunctionComponent = (): JSX.Element => {
  interface InputItem {
    title: string
    type: string
  }

  const [inputList, setInputList] = useState<InputItem[]>([])
  const handleNewItem = (data: InputItem): void => {
    const newList: InputItem[] = [...inputList, data]
    setInputList(newList)
  }

  const handleDelete = (id: number): void => {
    const newList: InputItem[] = [...inputList]
    newList.splice(id, 1)

    setInputList(newList)
  }

  return (
    <div>
      <CreateField handleItemSubmit={handleNewItem} />
      {inputList.map((item, i) => {
        return (
          <div key={i}>
            {item.title} <input type={item.type} /> <button onClick={(): void => handleDelete(i)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default FormCreator
