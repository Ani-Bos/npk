import React from "react";
import Typewriter from "typewriter-effect";
import Login from "../pages/Login";

const Hero = () => {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#fffa92] to-white">
        <div className="px-6 py-12 lg:my-0 md:px-12 text-gray-800 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="lg:flex justify-between items-center  sm:flex-row">
              <div className="my-10">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-gray-600 mb-16">
                  Lorem ipsum
                  <br />
                  <span>Xentera</span>
                  {/* <span className="text-primary">among</span> */}
                  <span className="text-primary">
                    <Typewriter
                      options={{
                        autoStart: true,
                        loop: true,
                        delay: 100,
                        strings: ["Lorem", "Ipsum", "Set"],
                      }}
                    />
                  </span>
                </h1>
                <p class="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-lg dark:text-gray-600">
                  sab lite version bana denge
                </p>
                {/* <a
                  href="/login"
                  className="items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center bg-primary text-gray-500 hover:bg-transparent hover:outline rounded-lg"
                >
                  Get started
                </a> */}
                <a
                  href="/login"
                  class="inline-block rounded-3xl px-6 outline-1 py-1.5 text-base font-medium leading-7 text-gray-800 shadow-sm ring-1 ring-gray-600 hover:bg-transparent hover:outline rounded-full"
                >
                  Get Started
                </a>
              </div>
              <div className="grid place-items-center ">
                <img
                  className="rounded-full w-60 h-60"
                  src="./images/xx.jpeg"
                  alt="React Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
