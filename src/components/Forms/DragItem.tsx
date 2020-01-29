import * as React from 'react'
import { useRef } from 'react'
import { XYCoord } from 'dnd-core'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: '50%',
}
interface DragItemProps {
  id: number
  index: number
  type: string
  title: string
  moveItem: (dragIndex: number, hoverIndex: number) => void
  handleDelete: (id: number) => void
}

const DragItem: React.FunctionComponent<DragItemProps> = (props: DragItemProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: 'card',
    hover(item: DragItemProps, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = props.index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      props.moveItem(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id: props.id, index: props.index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity }} key={props.id}>
      {props.title}
      <input type={props.type} />
      <button onClick={(): void => props.handleDelete(props.index)}>Delete</button>
    </div>
  )
}

export default DragItem
