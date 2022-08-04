import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import Navigation from "../components/Navigation";
import { XIcon, SpeakerphoneIcon } from '@heroicons/react/outline'
import Link from "next/link";

const Home: NextPage = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); 

  const registerUserMutation = trpc.useMutation(["register-user"]);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    try {
      const _email = await registerUserMutation.mutate({ email });
      console.log({ _email });
      setSubmitted(true);
    } catch (error) {
      console.log({ error });
      setSubmitted(false);
    }

    setLoading(false);
  }

  return (
    <div className="h-screen bg-black">
      <Head>
        <title>Otus Finance</title>
        <meta
          name="description"
          content="Otus Finance Build and Manage Options Vaults"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation />
      <section className="relative w-full tails-selected-element">

        <div className="relative items-center justify-center w-full overflow-x-hidden sm:pt-4 md:pt-4">
          <div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto lg:flex-row xl:px-0">
            <div className="w-full py-20 pl-10 pr-10 lg:w-5/12 lg:py-32 lg:pr-0 tails-selected-element">
              <h1 className="text-4xl font-serif font-bold leading-tight text-white sm:text-4xl lg:pr-10">
                <span className="relative inline-block">
                  The Decentralized Options Vaults Marketplace
                </span>
                <span className="block">Built on Lyra.</span>
              </h1>
              <p className="font-sans text-md font-light text-gray sm:text-xl lg:pr-10 pt-10">
                Create or join the best performing options vaults. 
              </p>
              <p className="font-sans mt-6 text-sm font-bold text-gray lg:pr-10">
                Sign up for early access to create options vaults.
              </p>
              <form className="flex justify-between w-full mt-4 border-1 border-white" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="flex-1 w-auto pl-2 text-sm text-gray bg-dark-gray outline-none focus:outline-none"
                  placeholder="Enter Your Email"
                />
                <button
                  type="submit"
                  className="font-sans px-6 py-2 text-sm font-bold text-black bg-green hover:bg-dark-gray hover:text-white"
                >
                  {
                    loading ?
                    <>
                    <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Loading...
                    </> :
                    <>
                    {
                      submitted ? 
                      <>Ready!</> :
                      <>Get Notified</>
                    }
                    </>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0">
        <div className="bg-green">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-green">
                  <SpeakerphoneIcon className="h-6 w-6 text-black" aria-hidden="true" />
                </span>
                <p className="ml-3 font-medium text-black truncate">
                  <span className="md:hidden">We announced a new product!</span>
                  <span className="hidden md:inline">Big news! We're excited to announce public alpha testing of our backtest tool.</span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <Link
                  href="/backtest"
                  className="flex cursor-pointer items-center justify-center px-4 py-2 border-transparent shadow-sm text-sm font-medium  text-white bg-black hover:bg-dark-gray hover:text-white"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
