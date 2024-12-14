"use client"

import { useState } from "react";
import user from "../assets/user.png";

function page() {
  

    const [hasProfile, setHasProfile] = useState(false); // State to toggle profile info

    return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">


<div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center border-b border-gray-200 p-6">
        <img
          src={user.src} // Replace with your actual image path
          alt="Profile Logo"
          className="w-20 h-20 rounded-full mb-4"
        />
        <h3 className="text-xl font-semibold">Rent Your Home</h3>
        <p className="text-gray-500">Voyageur</p>
        <span className="text-gray-600 font-medium text-center mt-4">
          6<br />
          <span className="text-sm">Months on Wingman</span>
        </span>
      </div>

      {/* Verification Section */}
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">
          Vérifications effectuées par Rent Your Home
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 font-bold mr-2">✔</span> Adresse
            e-mail
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-green-500 font-bold mr-2">✔</span> Numéro de
            téléphone
          </li>
        </ul>
      </div>

      {/* Identity Verification Section */}
      <div className="p-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold mb-2">
          Procédez à la vérification de votre identité
        </h4>
        <p className="text-gray-500 text-sm mb-4">
          Avant de réserver ou d'accueillir des voyageurs sur Airbnb, vous
          devez effectuer cette procédure.
        </p>
        <button className="w-full bg-[#002366] text-white font-semibold py-2 rounded-md hover:bg-blue-900 transition">
          Vérifier mon identité
        </button>
      </div>
    </div>
    {/* Left Section */}
    <div className="w-full max-w-lg p-6">
      {hasProfile ? (
        // Profile Information Layout
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div className="text-gray-700 text-lg">
            <p>
              <span className="font-semibold">Niveau d'expérience :</span>{" "}
              Débutant
            </p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="text-green-500 text-lg font-bold">✔</span>
            <p>Numéro de téléphone vérifié</p>
          </div>
          <hr className="border-gray-300" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Faites connaissance avec Mehdi
            </h3>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 text-lg">💬</span>
              <p className="text-gray-700">
                J'aime bien discuter quand je me sens à l'aise
              </p>
            </div>
            <p className="text-gray-600">
              Mehdi est un membre non-professionnel.
            </p>
          </div>
          <hr className="border-gray-300" />
          <div className="text-gray-700 space-y-2">
            <p>Pas encore de trajet publié</p>
            <p>Membre depuis novembre 2024</p>
          </div>
        </div>
      ) : (
        // Prompt to Complete Profile Layout
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Il est temps de créer votre profil
          </h2>
          <p className="text-gray-600 mb-6">
            Votre profil joue un rôle important dans toutes les réservations.
            Créez le vôtre pour aider les hôtes et voyageurs à mieux vous
            connaître.
          </p>
          <button
            className="w-full bg-[#002366] text-white font-semibold py-2 rounded-md hover:bg-blue-900 transition"
            onClick={() => setHasProfile(true)}
          >
            Créer un profil
          </button>
        </div>
      )}
    </div>

    {/* Right Section */}
  
  </div>
	    )
}

export default page