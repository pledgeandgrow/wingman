import Image from "next/image";

export default function Home() {
  return (
    <>
    <div
     style={{background:"url(/assets/images/hero/hero.png"}}
     className="relative h-[80vh]  overflow-hidden py-24 lg:py-32">
        <div className="container">
          <div className="max-w-2xl text-center mx-auto">
            <h1 className="scroll-m-20 md:text-6xl text-wing-blue text-4xl font-extrabold tracking-tight ">
              It's more than <br /> just a trip
            </h1>
          
          </div>
        
        </div>
      </div>
    </>
  );
}
