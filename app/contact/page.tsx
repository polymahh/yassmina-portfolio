import React from "react"

import { ContactForm } from "@/components/contact/ContactForm"

function page() {
  return (
    <section className="container flex h-full flex-col  gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center gap-6 ">
        <h1 className="text-5xl font-lamore">CONTACT ME</h1>
        <p className="text-xl text-muted-foreground max-w-[660px] text-center font-sans">
          Have A Project in mind ? A Question ? A Collaboration or Just Want To
          Say Hello ? Feel Free To Get In Touch !
        </p>
      </div>
      <ContactForm />
    </section>
  )
}

export default page
