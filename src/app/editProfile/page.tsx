

import user from "../assets/user.png";
import {GraduationCap, BriefcaseBusiness, House, Languages, CalendarCheck ,Music, Heart, NotepadText, Palette, BookOpenText, PawPrint, Earth,  Sun, Plane } from 'lucide-react'

function page() {
  





    return (
   
        <div className="min-h-screen bg-gray-100">


      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={user.src} // Replace with your profile image path
                alt="User Profile"
                className="w-28 h-28 rounded-full mb-4"
              />
              <button className="text-blue-600 font-semibold">Modifier</button>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6">
            {/* Profile Details */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Votre profil</h2>
              <p className="text-gray-600 mb-6">
                Les informations que vous transmettrez seront utilisées sur
                Airbnb pour aider les voyageurs et les hôtes à mieux vous
                connaître.{" "}
                <a href="#" className="text-blue-600">
                  En savoir plus
                </a>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-x-2">
    <GraduationCap />
    <p>L'endroit où vous avez étudié</p>
  </div>
  <div className="flex items-center gap-x-2">
    <BriefcaseBusiness />
    <p>Votre profession</p>
  </div>
  <div className="flex items-center gap-x-2">
    <House />
    <p>Le lieu où vous habitez</p>
  </div>
  <div className="flex items-center gap-x-2">
    <Languages />
    <p>Les langues que vous parlez</p>
  </div>
  <div className="flex items-center gap-x-2">
    <CalendarCheck />
    <p>La décennie de votre naissance</p>
  </div>
  <div className="flex items-center gap-x-2">
    <Music />
    <p>Votre chanson préférée au lycée</p>
  </div>
  <div className="flex items-center gap-x-2">
    <Heart />
    <p>Ce que vous adorez</p>
  </div>
  <div className="flex items-center gap-x-2">
    <NotepadText />
    <p>Une anecdote à votre sujet</p>
  </div>
  <div className="flex items-center gap-x-2">
    <Palette />
    <p>Le plus inutile de vos talents</p>
  </div>
  <div className="flex items-center gap-x-2">
    <BookOpenText />
    <p>Le titre de votre biographie</p>
  </div>
  <div className="flex items-center gap-x-2">
    <PawPrint />
    <p>Vos animaux de compagnie</p>
  </div>
              </div>
            </section>

            {/* About Section */}
            <section className="mt-8">
              <h3 className="text-lg font-semibold mb-4">À propos de vous</h3>
              <div className="border rounded-lg p-4">
                <p className="text-gray-600">
                  Écrivez un fait amusant et accrocheur.
                </p>
                <a href="#" className="text-blue-600 font-semibold">
                  Ajouter une présentation
                </a>
              </div>
            </section>

            {/* Passions Section */}
            <section className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Ce qui vous passionne</h3>
              <p className="text-gray-600 mb-4">
                Trouvez des points communs avec les autres voyageurs et hôtes en
                ajoutant des centres d'intérêt à votre profil.
              </p>
              <div className="flex space-x-4">
                <button className="border rounded-lg px-6 py-2 text-gray-600">
                  +
                </button>
                <button className="border rounded-lg px-6 py-2 text-gray-600">
                  +
                </button>
                <button className="border rounded-lg px-6 py-2 text-gray-600">
                  +
                </button>
              </div>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">
                Ajoutez des centres d'intérêt
              </a>
            </section>

            {/* Destinations Section */}
            <section className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Destinations précédentes</h3>
              <p className="text-gray-600 mb-4">
                Choisissez si d'autres personnes peuvent voir tous les endroits
                où vous avez séjourné sur Airbnb.
              </p>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-2">Prochaine destination</span>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-6 text-center flex items-center gap-x-2">
                <Earth /><p>Prochaine destination</p>
                </div>
                <div className="border rounded-lg p-6 text-center flex items-center gap-x-2">
                <Sun /> <p>Prochaine destination</p>
                </div>
                <div className="border rounded-lg p-6 text-center flex items-center gap-x-2">
                <Plane /><p>Prochaine destination</p>
                </div>
                <div className="border rounded-lg p-6 text-center flex items-center gap-x-2">
                  <BriefcaseBusiness/> <p>,Prochaine destination</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="flex justify-end mt-8">
              <button className="bg-black text-white px-6 py-2 rounded-lg">
                Terminé
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
	    )
}

export default page