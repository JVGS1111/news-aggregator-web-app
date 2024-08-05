import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'phosphor-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Control, Controller } from 'react-hook-form'

interface DatePickerProps {
  control: Control<any>
  name: string
}

export function DatePicker({ control, name }: DatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start border-slate-600 bg-transparent text-left  font-medium text-slate-600  xs:max-w-[250px] ',
                !field.value && 'text-muted-foreground',
              )}
            >
              <CalendarIcon
                className="mr-2 h-6 w-6 text-slate-600"
                size={20}
                weight="light"
              />
              {field.value ? (
                format(field.value, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
