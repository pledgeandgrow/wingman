"use client"

import Image from "next/image";
import user from "../assets/user.png";
import {MessageSquareMore, Ban, Check  } from 'lucide-react'

function page() {
  



    return (
        <div className="min-h-screen">
  
        {/* Profile Content */}
        <main className="max-w-3xl mx-auto bg-white mt-8 p-6 rounded-lg shadow-lg">
          {/* Profile Header */}
          <div className="flex items-center">
            <Image
              src={user.src}
              alt="Jean"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-semibold">Jean</h1>
              <p className="text-gray-600">72 ans</p>
              <p className="text-gray-500 text-sm">Niveau d'expérience : Débutant</p>
            </div>
          </div>
  
          {/* Verified Section */}
          <section className="mt-6">
            <h2 className="text-lg font-medium">Jean a un Profil Vérifié</h2>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <span className="text-[#002366] mr-2"><Check /></span>
                Pièce d'identité vérifiée
              </li>
              <li className="flex items-center">
                <span className="text-[#002366] mr-2"><Check /></span>
                Adresse e-mail vérifiée
              </li>
              <li className="flex items-center">
                <span className="text-[#002366] mr-2"><Check /></span>
                Numéro de téléphone vérifié
              </li>
            </ul>
          </section>
  
          {/* About Section */}
          <section className="mt-6">
            <h2 className="text-lg font-medium">Faites connaissance avec Jean</h2>
            <p className="mt-2 flex items-center gap-x-2"><MessageSquareMore />  J'aime bien discuter quand je me sens à l'aise</p>
            <p className="mt-1 flex items-center gap-x-2"><Ban /> Je préfère ne pas voyager en compagnie d'animaux</p>
            <p className="mt-2 text-gray-500 text-sm">Jean est un membre non-professionnel.</p>
          </section>
  
          {/* Stats Section */}
          <section className="mt-6">
            <p>3 trajets publiés</p>
            <p>Membre depuis mars 2024</p>
          </section>
  
          {/* Report Section */}
          <div className="mt-8 text-center">
            <a
              href="#"
              className="text-blue-700 font-semibold hover:underline"
            >
              Signaler ce membre
            </a>
          </div>
        </main>
      </div>
	    )
}

export default page