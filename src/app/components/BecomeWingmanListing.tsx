// components/ListingSection.js
import Image from 'next/image';
import VideoPlayer from '../components/VideoPlayer';


export default function ListingSection() {
  return (
    <section className="text-center py-10 px-4 bg-gray-50">
      <h2 className="text-xl md:text-3xl font-semibold mb-4">Posting your flight on Wingman is easy</h2>
      <div className="my-6">
      <VideoPlayer />
      </div>
      <p className="text-gray-600 mb-4">
        Post a flight in a few steps and manage everything on your mobile device.
      </p>
      <button className="bg-wing-blue text-white py-2 px-6 rounded-md">Post an ad</button>
    </section>
  );
}
