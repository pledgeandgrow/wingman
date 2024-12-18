// components/CoHostSection.js
import Image from "next/image";

export default function CoHostSection() {
  return (
    <section className="text-center py-10 px-4 bg-white">
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        A co-traveller can earn money with you
      </h2>
      <p className="text-gray-600 mb-8">
        Travelling with friends? Earn money together by renting you available space and helping carry other items
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { name: "Priscilla", img: "/images/priscilla.jpg" },
          { name: "Sid", img: "/images/sid.jpg" },
        ].map((host, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-40 text-center"
          >
            <Image
              src={host.img}
              alt={`Co-host ${host.name}`}
              width={80}
              height={80}
              className="rounded-full mx-auto mb-2"
            />
            <h3 className="font-medium">{host.name}</h3>
            <p className="text-gray-500 text-sm">Reliable and guest-friendly</p>
          </div>
        ))}
      </div>
    </section>
  );
}
