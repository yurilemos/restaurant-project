'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'

type ControllerProps = {
  control: any
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio'
  label?: string
  placeholder?: string
  description?: string
  onFieldChanged?: () => void
  defaultValue?: string
  className?: string
}

const Controller = ({
  control,
  name,
  type = 'text',
  label,
  placeholder,
  description,
  defaultValue,
  onFieldChanged,
  className,
}: ControllerProps) => {
  const [inputValue, setInputValue] = useState(defaultValue ?? '') // Estado para controlar o valor do input

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              value={inputValue} // Valor controlado
              onChange={(e) => {
                setInputValue(e.target.value) // Atualiza o estado com o novo valor
                field.onChange(e)
                onFieldChanged && onFieldChanged()
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Controller
