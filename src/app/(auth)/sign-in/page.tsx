import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <section
        id='sign-in-container'
        className='w-screen h-screen flex flex-col justify-center items-center'
    >
        <SignIn />;
    </section>
  )
}