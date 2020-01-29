import * as React from 'react'
import { useForm } from 'react-hook-form'

import OPTIONS from './FieldOptions.constant'

interface InputItem {
  title: string
  type: string
}

interface AddInputProps {
  handleItemSubmit: (item: InputItem) => void
}

const AddInput: React.FunctionComponent<AddInputProps> = (props: AddInputProps): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm()
  const onSubmit = (data: InputItem): void => {
    props.handleItemSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="title" ref={register({ required: true })} />
      {errors.title && <span>This field is required</span>}
      <select name="type" ref={register({ required: true })}>
        {OPTIONS.map((option, i) => {
          return (
            <option key={i} value={option.type}>
              {option.display}
            </option>
          )
        })}
      </select>
      {errors.type && <span>This field is required</span>}
      <input type="submit" />
    </form>
  )
}

export default AddInput
