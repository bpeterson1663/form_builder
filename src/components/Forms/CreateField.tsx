import * as React from 'react'
import { useForm } from 'react-hook-form'

interface InputItem {
  title: string
  type: string
}

interface AddInputProps {
  handleItemSubmit: (item: InputItem) => void
}

const AddInput: React.FunctionComponent<AddInputProps> = (props: AddInputProps): JSX.Element => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data: InputItem): void => {
    props.handleItemSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="title" ref={register} />
      <input name="type" ref={register({ required: true })} />
      {errors.type && <span>This field is required</span>}
      <input type="submit" />
    </form>
  )
}

export default AddInput
