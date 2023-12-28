import React from "react"
import Image from "next/image"
import { Download } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"

function page() {
  return (
    <section className="container flex max-w-[1116px] justify-between  gap-6 pb-8 pt-20 md:py-10">
      <div className="flex  flex-col items-start justify-center ">
        <h1 className="font-lamore text-4xl uppercase">
          Hi, I&apos;m Yasmina
          <br />
          El Alaoui Ismaili,
        </h1>
        <p className=" text-sm pt-6 pb-12 max-w-[544px] leading-7	">
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
          <span className="font-light pl-2">Download my resume</span>
        </Button>
      </div>
      <div>
        <Image src={"/images/agent.png"} alt="girl" width={434} height={655} />
      </div>
    </section>
  )
}

export default page
