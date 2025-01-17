import { Apple, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Globe, Instagram, Facebook, Twitter } from 'lucide-react';

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
                <li><Link href="/aboutus" className="text-gray-50 hover:text-gray-300 transition-colors">About us</Link></li>
                <li><Link href="/becomeWingman" className="text-gray-50 hover:text-gray-300 transition-colors">Become a wingman</Link></li>
                <li><Link href="/gift-card" className="text-gray-50 hover:text-gray-300 transition-colors">Gift Cards</Link></li>
                <li><Link href="/e-sim" className="text-gray-50 hover:text-gray-300 transition-colors">E SIM</Link></li>
                <li><Link href="#" className="text-gray-50 hover:text-gray-300 transition-colors">Investors</Link></li>
                <li><Link href="/premium-packages" className="text-gray-50 hover:text-gray-300 transition-colors">Premium packages</Link></li>
                <li><Link href="#" className="text-gray-50 hover:text-gray-300 transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 sm:mb-6">Info Contact</h2>
              <ul className="space-y-2">
                <li><Link href="/bookWingman" className="text-gray-50 hover:text-gray-300 transition-colors">bookwingman</Link></li>
               
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
      {/* bottom footer */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm text-white border-t border-gray-300 py-4 px-12">
        {/* Left Section */}
        <div className="space-x-2 md:space-x-4">
          <span>© 2024 Wingman, Inc.</span>
          <span>·</span>
          <a href="#" className="hover:underline">
            Confidentialité
          </a>
          <span>·</span>
          <a href="#" className="hover:underline">
            Conditions générales
          </a>
          <span>·</span>
          <a href="#" className="hover:underline">
            Plan du site
          </a>
          <span>·</span>
          <a href="#" className="hover:underline">
            Fonctionnement du site
          </a>
          <span>·</span>
          <a href="#" className="hover:underline">
            Infos sur l’entreprise
          </a>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <span className="flex items-center">
                  <Globe  className="w-4 h-4"  /> <span className="ml-1">Français (FR)</span>
            </span>
            <span>·</span>
            <span>€ EUR</span>
          </div>
          <div className="flex space-x-4">
  <a href="#" className="hover:underline">
    <Facebook className="w-4 h-4" />
  </a>
  <a href="#" className="hover:underline">
    <Twitter className="w-4 h-4" />
  </a>
  <a href="#" className="hover:underline">
    <Instagram className="w-4 h-4" />
  </a>
</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
