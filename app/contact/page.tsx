import { ContactForm } from '@/components/contact/ContactForm';

function Contact() {
  return (
    <section className="container flex flex-col gap-6 pt-6 pb-8 my-auto md:py-10">
      <div className="flex flex-col items-center gap-6 ">
        <h1 className="items-center text-4xl font-lamore md:text-5xl">CONTACT ME</h1>
        <p className="max-w-[660px] text-center font-sans text-xl text-muted-foreground">Let&apos;s chat</p>
      </div>
      <ContactForm />
    </section>
  );
}

export default Contact;
