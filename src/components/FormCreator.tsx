import * as React from 'react'
import { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import CreateField from './Forms/CreateField'
import update from 'immutability-helper'
import DragItem from './Forms/DragItem'

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
  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = inputList[dragIndex]
      setInputList(
        update(inputList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem],
          ],
        }),
      )
    },
    [inputList],
  )
  const renderInput = (item: InputItem, i: number): JSX.Element => {
    return (
      <DragItem id={i} index={i} type={item.type} title={item.title} moveItem={moveItem} handleDelete={handleDelete} />
    )
  }

  return (
    <div>
      <CreateField handleItemSubmit={handleNewItem} />
      <DndProvider backend={Backend}>
        {inputList.map((item, i) => {
          return <div key={i}>{renderInput(item, i)}</div>
        })}
      </DndProvider>
    </div>
  )
}

export default FormCreator
