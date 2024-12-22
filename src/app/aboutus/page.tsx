import React from "react";
import Member from "../assets/member.jpeg";
import  People from '../assets/people.jpg'
import Link from "next/link" 

const AboutPage = () => {
  return (
    <div className="">
      <header
        className="bg-cover bg-center text-white text-center py-16 aboutheader bg-wing-blue"
      >
        <h1 className="text-5xl font-extrabold">
          Making Sustainable Mobility Accessible to All
        </h1>
      </header>


      <section className="px-20 py-[110px] bg-white text-gray-800  max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Wingman: The First Community-Based Transportation App
        </h2>
        <p className="text-lg leading-relaxed">
        The platform connects drivers with free seats with passengers going in the same direction, so they can share the cost of the trip. BlaBlaCar's mission is to be the reference marketplace for shared travel. It brings together carpooling and bus rides in a single application to offer a wide choice of affordable and sustainable transport solutions. With over a decade of experience, BlaBlaCar has revolutionized the way people think about transportation by making it more social, cost-effective, and environmentally friendly.
        </p>
      </section>

      <section className="p-8 bg-wing-blue">
      <div className="max-w-6xl mx-auto h-screen sm:h-full lg:h-screen flex items-center">
        <div>
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Key Figures 2023</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { title: "80 million", subtitle: "Passengers by bus and carpooling" },
            { title: "21 countries", subtitle: "In the world" },
            { title: "5000", subtitle: "Connected bus operators" },
            { title: "800", subtitle: "Employees of 50 nationalities" },
            { title: "2 million", subtitle: "Tons of CO2 avoided" },
            { title: "513 million €", subtitle: "Saved by drivers" },
            { title: "104 million", subtitle: "Meetings between carpoolers" },
            { title: "2.4 million", subtitle: "Meeting points served" },
          ].map((figure, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold text-wing-blue">{figure.title}</h3>
              <p className="text-gray-700 mt-2">{figure.subtitle}</p>
            </div>
          ))}
        </div>
        </div>
        </div>
      </section>
    
      <div className="max-w-5xl mx-auto  h-screen sm:h-full lg:h-screen">
      <section className="px-8 bg-white py-20 h-screen flex items-center flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Founders</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Frédéric Mazzella", role: "President and Founder", img: Member },
            { name: "Frédéric Nappez", role: "Co-Founder & Technical Advisor", img: Member },
            { name: "Nicolas Brusson", role: "Co-founder and Managing Director", img: Member },
          ].map((founder, index) => (
            <div key={index} className="text-center">
              <img
                src={founder.img.src}
                alt={founder.name}
                className="rounded-lg w-60 h-60 mx-auto mb-4 shadow-md border border-gray-200"
              />
              <p className="text-xl font-semibold text-gray-800">{founder.name}</p>
              <p className="text-gray-600">{founder.role}</p>
            </div>
          ))}
        </div>
      </section>
      </div>

      <div className="bg-[#E6ECED]">
      <div className="max-w-5xl mx-auto flex items-center h-screen sm:h-full lg:h-screen">
      <section className="px-20 py-[110px]  text-gray-800  max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
        How it all began…
        </h2>
        <p className="text-lg leading-relaxed">
        <div className="mb-4">In December 2003, Fred wanted to spend Christmas with his family in Vendée. Without a car and with full trains, he was able to count on his sister, who made a detour to come and pick him up.</div>

        <div className="mb-4">Along the way, he was struck by the number of drivers alone in their cars and devised a network to optimise these empty seats.</div>

        <div  className="mb-4">20 years later, Fred, Francis, Nicolas and the BlaBlaCar teams have transformed this simple idea into the first carpooling platform, connecting millions of travelers all over the world.</div></p>
      </section>
      </div>
      </div>

      <div className="max-w-5xl mx-auto flex items-center h-screen sm:h-full lg:h-screen">
      <section className="px-20 py-20  text-gray-50 bg-wing-blue rounded-3xl flex justify-between items-center">
        <div className="w-[50%]">
        <h2 className="text-3xl font-bold mb-4">
        Our culture
        </h2>
        <p className="text-lg py-6">
        Discover our six BlaBlaPrinciples which serve as a compass to guide our behaviors and decisions.</p>
        <Link href="/" className="font-bold ">➜ Learn more about our culture.</Link><br />
        <button className="border-2 border-wing-orange px-6 py-2 rounded-full text-lg hover:bg-white hover:text-wing-blue hover:font-bold mt-4">Join us</button>
        </div>
        <div className="w-[50%]">
        <img
                src={People.src}
                alt="Description of the plane image"
                className="rounded-lg"
              />
        </div>
      </section>
      </div>

     
      </div>

  );
};

export default AboutPage;
