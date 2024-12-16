import Image from 'next/image';
import Link from 'next/link'

export default function NotFound() {


  return (
    <div className="flex flex-col items-center  h-screen bg-gray-100 p-6">
     
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link href="/"
        className="mt-8 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
      >
        Go Back
      </Link>
    </div>
  );
}

  