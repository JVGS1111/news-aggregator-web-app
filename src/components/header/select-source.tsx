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

interface SelectSourceProps {
  control: Control<any>
  name: string
}

export function SelectSource({ control, name }: SelectSourceProps) {
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
            <SelectValue placeholder="Select a source" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sources</SelectLabel>
              <SelectItem value="the_new_york_times">
                The New York Times
              </SelectItem>
              <SelectItem value="the_guardian">The Guardian</SelectItem>
              <SelectItem value="open_news">Open News</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  )
}
