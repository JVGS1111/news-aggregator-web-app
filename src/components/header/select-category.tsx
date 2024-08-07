/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Control, Controller } from 'react-hook-form'

interface SelectCategoryProps {
  control: Control<any>
  name: string
}

export function SelectCategory({ control, name }: SelectCategoryProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          value={field.value}
        >
          <SelectTrigger className="w-full xs:max-w-[250px] ">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="world">World</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="movies">Movies</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="style">Style</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  )
}
