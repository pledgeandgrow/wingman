import { Apple, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div
      className="text-white mt-10 bg-[#1E3A8A] bg-cover bg-blend-overlay"
    >
      <footer className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 sm:mb-6">Informations</h2>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-50 hover:text-gray-300 transition-colors">Help Center</Link></li>
                <li><Link href="/terms-conditions" className="text-gray-50 hover:text-gray-300 transition-colors">Terms and Conditions</Link></li>
                <li><Link href="/privacyPolicy" className="text-gray-50 hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legalNotice" className="text-gray-50 hover:text-gray-300 transition-colors">Legal Notice</Link></li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 sm:mb-6">Wingman</h2>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-50 hover:text-gray-300 transition-colors">About us</Link></li>
                <li><Link href="#" className="text-gray-50 hover:text-gray-300 transition-colors">Become a wingman</Link></li>
                <li><Link href="/myFlights" className="text-gray-50 hover:text-gray-300 transition-colors">My Flights</Link></li>
                <li><Link href="/myItems" className="text-gray-50 hover:text-gray-300 transition-colors">My Items</Link></li>
                <li><Link href="/gift-card" className="text-gray-50 hover:text-gray-300 transition-colors">Gift Cards</Link></li>
                <li><Link href="/e-sim" className="text-gray-50 hover:text-gray-300 transition-colors">E SIM</Link></li>
                <li><Link href="#" className="text-gray-50 hover:text-gray-300 transition-colors">Investors</Link></li>
                <li><Link href="#" className="text-gray-50 hover:text-gray-300 transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 sm:mb-6">Info Contact</h2>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-50 hover:text-gray-300 transition-colors">Lorem ipsum dolor sit amet consectetur.</Link></li>
                <li><Link href="/bookWingman" className="text-gray-50 hover:text-gray-300 transition-colors">bookwingman</Link></li>
                <li><Link href="/myProfile" className="text-gray-50 hover:text-gray-300 transition-colors">MyProfile</Link></li>
                <li><Link href="/editProfile" className="text-gray-50 hover:text-gray-300 transition-colors">EditProfile</Link></li>
                <li><Link href="/userProfile" className="text-gray-50 hover:text-gray-300 transition-colors">UserProfile</Link></li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 sm:mb-6">Download App</h2>
              <div className="space-y-4">
                <Link
                  href="#"
                  className="flex items-center space-x-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Apple className="w-6 h-6" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center space-x-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <PlayCircle className="w-6 h-6" />
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
