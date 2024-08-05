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

export function SelectCategory() {
  return (
    <Select>
      <SelectTrigger className="w-[250px]">
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
          <SelectItem value="olympics">Olympics</SelectItem>
          <SelectItem value="style">Style</SelectItem>
          <SelectItem value="science">Science</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
