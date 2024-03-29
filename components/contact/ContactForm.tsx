'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Mail, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Toaster } from '../ui/toaster';
import { toast } from '../ui/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  email: z.string().email(),
  subject: z.string().min(1, {
    message: 'must have a subject.',
  }),
  message: z.string().min(2, {
    message: 'subject must be at least 2 characters.',
  }),
  file: z.any().optional(),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    const res = await axios.post('/api/email', values).catch((error) => console.log(error));

    if (res?.status === 201) {
      toast({
        title: 'Message sent Successfully',
        variant: 'success',
      });
    }
  };

  return (
    <Form {...form}>
      <div className="flex justify-center pb-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 sm:w-[888px]">
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
          {/* <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-fit">
                <FormLabel className="flex items-center gap-2 uppercase cursor-pointer">
                  <Paperclip /> <span>Attach Files</span>
                </FormLabel>
                <FormControl>
                  <Input type="file" className="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="flex flex-wrap justify-center gap-8 mt-4 sm:justify-between">
            <Button
              className={buttonVariants({
                variant: 'square',
                className: 'w-52',
              })}
              type="submit"
            >
              <Send /> <span className="pl-4 uppercase">send</span>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <Mail />
                <span className="sm:text-xl">elalaouiyasmina@gmail.com</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </Form>
  );
}
