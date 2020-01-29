import * as React from 'react'
import { useForm, ErrorMessage, FormContext, useFormContext } from 'react-hook-form'
import OPTIONS from './FieldOptions.constant'

interface InputItem {
  title: string
  type: string
}

interface AddInputProps {
  handleItemSubmit: (item: InputItem) => void
}

const AddInput: React.FunctionComponent<AddInputProps> = (props: AddInputProps): JSX.Element => {
  const methods = useForm()
  const watchValidation = methods.watch('showValidation')
  const onSubmit = (data: InputItem): void => {
    props.handleItemSubmit(data)
    methods.reset({
      showValidation: null,
    })
  }

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input name="title" ref={methods.register({ required: true })} />
        {methods.errors.title && <span>This field is required</span>}
        <ErrorMessage errors={methods.errors} name="title" />
        <select name="type" ref={methods.register({ required: true })}>
          {OPTIONS.map((option, i) => {
            return (
              <option key={i} value={option.type}>
                {option.display}
              </option>
            )
          })}
        </select>
        {methods.errors.type && <span>This field is required</span>}
        <label>Validation</label>
        <input name="showValidation" ref={methods.register} type="checkbox" />
        {watchValidation ? <Validation /> : null}
        <input type="submit" value="Submit" />
      </form>
    </FormContext>
  )
}
const Validation: React.FunctionComponent = (): JSX.Element => {
  const { register, getValues, errors } = useFormContext()
  const validateParams = (value: string): boolean => {
    return getValues().minLength
      ? parseInt(getValues().minLength) > 0 && parseInt(getValues().minLength) <= parseInt(value)
      : true
  }
  return (
    <div>
      <label>Required</label>
      <input type="checkbox" name="required" ref={register} />
      <label>Min Length</label>
      <input type="number" name="minLength" ref={register} />
      <label>Max Length</label>
      <input type="number" name="maxLength" ref={register({ validate: validateParams })} />
      {errors.maxLength && <span>Max Length must be greater than Min length</span>}
    </div>
  )
}
export default AddInput
