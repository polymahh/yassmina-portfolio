import React from "react"
import Image from "next/image"
import { Download } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"

function page() {
  return (
    <section className="pt:8 container flex max-w-[1116px] flex-wrap-reverse justify-between  gap-6 pb-8 md:flex-nowrap md:pt-20 ">
      <div className="flex  flex-col items-start justify-center ">
        <h1 className="font-lamore text-4xl uppercase">
          Hi, I&apos;m Yasmina
          <br />
          El Alaoui Ismaili,
        </h1>
        <p className=" max-w-[544px] pb-12 pt-6 text-sm leading-7	">
          an architect based in Tangier. I specialize in innovative designs that
          seamlessly blend form and function. With a strong foundation in
          architectural principles and a commitment to excellence, I bring a
          fresh perspective to every project.
          <br />
          My keen eye for detail and proficiency in design tools make me a
          valuable asset in creating unique and impactful spaces.
        </p>
        <Button
          className={buttonVariants({
            variant: "square",
          })}
        >
          <Download />{" "}
          <span className="pl-2 font-light">Download my resume</span>
        </Button>
      </div>
      <div>
        <Image src={"/images/agent.png"} alt="girl" width={434} height={655} />
      </div>
    </section>
  )
}

export default page
