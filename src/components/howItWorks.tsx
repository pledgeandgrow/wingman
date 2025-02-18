import React from "react";
import { motion } from "framer-motion";
import { PaperAirplaneIcon, ClipboardDocumentCheckIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";

const HowItWorksTraveler = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Comment ça fonctionne pour les voyageurs ?</h2>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Étape 1 : Déclarer un trajet */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg w-80"
        >
          <PaperAirplaneIcon className="text-blue-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold">Déclarer son trajet</h3>
          <p className="text-gray-600">Indiquez votre destination, la date de votre voyage et le poids disponible dans vos bagages.</p>
        </motion.div>
        
        {/* Étape 2 : Accepter un colis */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg w-80"
        >
          <ClipboardDocumentCheckIcon className="text-green-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold">Accepter un colis</h3>
          <p className="text-gray-600">Consultez les demandes d'expédition et acceptez celles qui correspondent à votre trajet.</p>
        </motion.div>
        
        {/* Étape 3 : Livrer et être récompensé */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg w-80"
        >
          <HandThumbUpIcon className="text-red-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold">Livrer et être récompensé</h3>
          <p className="text-gray-600">Remettez le colis à son destinataire et recevez votre rémunération pour le service rendu.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorksTraveler;
