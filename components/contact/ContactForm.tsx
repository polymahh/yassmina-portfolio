"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Mail, Paperclip, Phone, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const contactSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email(),
  subject: z.string().min(1, {
    message: "must have a subject.",
  }),
  message: z.string().min(2, {
    message: "subject must be at least 2 characters.",
  }),
  file: z.any().optional(),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    console.log(values)

    axios.post("/api/email", values).catch((error) => console.log(error))
  }

  return (
    <Form {...form}>
      <div className="flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[888px] flex-col gap-8"
        >
          <div className="flex flex-wrap gap-6 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grow sm:w-1/2">
                  <FormLabel className="uppercase">name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" grow sm:w-1/2">
                  <FormLabel className="uppercase">email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase">subject</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase">message</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-fit">
                <FormLabel className="flex cursor-pointer items-center gap-2 uppercase">
                  <Paperclip /> <span>Attach Files</span>
                </FormLabel>
                <FormControl>
                  <Input type="file" className="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              className={buttonVariants({
                variant: "square",
                className: "w-52",
              })}
              type="submit"
            >
              <Send /> <span className="pl-4 uppercase">send</span>
            </Button>
            <div>
              <div className="flex items-center gap-2 pb-6">
                <Phone />
                <span className="text-xl">(+212) 634 259 698</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail />
                <span className="text-xl">Hello@Yasmina.com</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Form>
  )
}
