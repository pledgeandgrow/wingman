import Image from "next/image";
import user from "../assets/user.png";
import {
  ShieldCheck,
  CalendarCheck2,
  CalendarClock,
  PawPrint,
  Users,
  Plane,
  Star,
} from "lucide-react";
import plane from "../assets/plane.png";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-800">
      <div className="text-3xl font-bold mb-6">Tuesday December 31</div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-[7]">
          <div
            className="mb-6 bg-white  rounded-lg p-6 flex gap-6"
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <div>
              <h2 className="text-lg font-semibold">07:00</h2>
              <p className="text-sm text-gray-500">7:20 am</p>
              <h2 className="text-lg font-semibold mt-4">14:20</h2>
            </div>

            <div className="flex justify-center items-center h-[75px] mt-2">
              <div className="relative h-full">
                {/* Vertical Line */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full border-l-4 border-wing-blue"></div>
                {/* Top Circle */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border-2 border-wing-blue rounded-full bg-white"></div>
                {/* Bottom Circle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border-2 border-wing-blue rounded-full bg-white"></div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">07:00 - Chatillon</h2>
              <p className="text-sm text-gray-500">87 Av. de Paris</p>
              <h2 className="text-lg font-semibold mt-4">14:20 - Marseille</h2>
              <p className="text-sm text-gray-500">81 Avenue of Marshal Foch</p>
            </div>
          </div>

          <div
            className="bg-white  rounded-lg p-6"
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={user}
                alt="Profile Picture"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <span className="font-medium">Amen</span>
                <p className="text-sm text-gray-500 flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="M12 3a.75.75 0 0 1 .673.418l2.374 4.812 5.31.772a.75.75 0 0 1 .416 1.28l-3.842 3.745.907 5.289a.75.75 0 0 1-1.088.79L12 17.61l-4.75 2.497a.75.75 0 0 1-1.088-.79l.907-5.29-3.842-3.745a.75.75 0 0 1 .415-1.28l5.31-.77 2.376-4.813A.75.75 0 0 1 12 3"
                    />
                  </svg>
                  <span>4.9/5 - 22 reviews</span>
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <ShieldCheck />
                Verified Profile
              </li>
              <li className="flex items-center gap-2">
                <CalendarCheck2 />
                Never cancels your trips
              </li>
              <li className="flex items-center gap-2">
                <CalendarClock />
                Your booking will be confirmed when the driver accepts your
                request
              </li>
              <li className="flex items-center gap-2">
                <PawPrint />I love animals. Woof!
              </li>
              <li className="flex items-center gap-2">
                <Users />
                Max. 2 in the back
              </li>
              <li className="flex items-center gap-2">
                <Plane />
                Flight A123
              </li>
            </ul>

            <div className="mt-6 ">
              <a
                href="#"
                className="inline-block border border-wing-blue text-wing-blue py-2 px-4 rounded-lg hover:bg-wing-blue hover:text-white"
              >
                Contact Amen
              </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-[3]">
          <div
            className="mb-6 bg-white  rounded-lg p-4"
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <div className="text-lg font-bold">Tuesday December 31</div>
            <div className="flex gap-6 border-b border-red mb-2 p-2">
              <div>
                <h2 className="text-lg font-semibold">07:00</h2>
                <p className="text-sm text-gray-500">7:20 am</p>
                <h2 className="text-lg font-semibold mt-4">14:20</h2>
              </div>

              <div className="flex justify-center items-center h-[75px] mt-2">
                <div className="relative h-full">
                  {/* Vertical Line */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full border-l-4 border-wing-blue"></div>
                  {/* Top Circle */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border-2 border-wing-blue rounded-full bg-white"></div>
                  {/* Bottom Circle */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border-2 border-wing-blue rounded-full bg-white"></div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold">07:00 - Chatillon</h2>
                <p className="text-sm text-gray-500">87 Av. de Paris</p>
                <h2 className="text-lg font-semibold mt-4">
                  14:20 - Marseille
                </h2>
                <p className="text-sm text-gray-500">
                  81 Avenue of Marshal Foch
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={plane.src}
                alt="Description of the plane image"
                className="-rotate-12"
                style={{ zIndex: 2 }}
              />
              <Image
                src={user}
                alt="Profile Picture"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <span className="font-medium">Amen</span>
                <p className="text-sm text-gray-500 flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="M12 3a.75.75 0 0 1 .673.418l2.374 4.812 5.31.772a.75.75 0 0 1 .416 1.28l-3.842 3.745.907 5.289a.75.75 0 0 1-1.088.79L12 17.61l-4.75 2.497a.75.75 0 0 1-1.088-.79l.907-5.29-3.842-3.745a.75.75 0 0 1 .415-1.28l5.31-.77 2.376-4.813A.75.75 0 0 1 12 3"
                    />
                  </svg>
                  <span>4.9</span>
                </p>
              </div>
            </div>
          </div>

          <div
            className="mb-4 bg-white  rounded-lg p-4 flex justify-between items-center "
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <p className="text-lg font-bold text-gray-500">1 passenger</p>
            <p className="text-xl font-semibold">77.79 &euro;</p>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-wing-blue text-white py-2 rounded-lg shadow-md">
              Reservation request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
