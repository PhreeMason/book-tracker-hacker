'use client';
import { useBookContext } from '@/providers/BookContextProvider';
import { v4 as uuidv4 } from 'uuid';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils';
import { format } from "date-fns"
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const bookFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  status: z.enum(["COMPLETE", "IN_PROGRESS", "NOT_STARTED"]),
  currentPage: z.coerce.number(),
  totalPages: z.coerce.number(),
  notes: z.array(z.string()),
  readingWindow: z.object({
    from: z.date(),
    to: z.date().min(new Date(), { message: "completion date must be in the future" }),
  }),
  actualCompletionDate: z.nullable(z.number()),
});

bookFormSchema.refine(obj => obj.totalPages > obj.currentPage, {
  message: "Total pages must be greater than current page",
});

type BookFormValues = z.infer<typeof bookFormSchema>

const defaultValues: Partial<BookFormValues> = {
  id: '',
  title: '',
  author: '',
  currentPage: 0,
  totalPages: 0,
  readingWindow: {
    from: new Date(),
    to: new Date(),
  },
  status: 'NOT_STARTED',
  notes: [],
  actualCompletionDate: null,
};

const BookScheduleForm = () => {
  const { dispatch } = useBookContext();
  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  })

  const handleSubmit = (bookSchedule: BookFormValues) => {
    const startDate = new Date(bookSchedule.readingWindow.from).getTime();
    const endDate = new Date(bookSchedule.readingWindow.to).getTime();
    form.reset();
    dispatch({
      type: 'ADD_BOOK',
      payload: {
        ...bookSchedule,
        id: uuidv4(),
        readingWindow: {
          from: startDate,
          to: endDate,
        }
      }
    })
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Add To Schedule</CardTitle>
        <CardDescription>
          Form for adding more books.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Moby Dick" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Herman Melville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="totalPages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Pages</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="currentPage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Page</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>


            <FormField
              control={form.control}
              name="readingWindow"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dates</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Start and end date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default BookScheduleForm;