'use client'

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function Page() {
  const { toast } = useToast();
  const [hasProfile, setHasProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        console.error('Error fetching session:', sessionError);
        return;
      }

      const sessionUser = sessionData.session.user;
      setAvatarUrl(sessionUser.user_metadata?.avatar_url || null);
      setEmail(sessionUser.email || '');

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
      } else {
        setUser(userData);
        setHasProfile(!!userData);
        setRole(userData.role || '');
        setPhoneNumber(userData.phone_number || '');
      }
    };

    fetchUserData();
  }, []);
  
  const createdAt = user?.created_at ? new Date(user.created_at) : null;
  const formattedDate = createdAt ? createdAt.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Date inconnue';

  const updateProfile = async () => {
    setIsUpdating(true);
    const { data, error } = await supabase
      .from('users')
      .update({ role, phone_number: phoneNumber })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive",
      });
    } else {
      setUser({ ...user, role, phone_number: phoneNumber });
      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour avec succès.",
      });
    }
    setIsUpdating(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-6 md:mb-0 md:mr-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center border-b border-gray-200 p-6">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Profile Logo"
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
              <span className="text-2xl text-gray-600">{user?.name?.charAt(0) || '?'}</span>
            </div>
          )}
          <h3 className="text-xl font-semibold">{user?.name || 'Utilisateur'}</h3>
          <p className="text-gray-500">{role || 'Rôle non défini'}</p>
          {/* <span className="text-gray-600 font-medium text-center mt-4">
            6<br />
            <span className="text-sm">Mois sur Airbnb</span>
          </span> */}
        </div>

        {/* Verification Section */}
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-2">
            Vérifications effectuées par Wingman
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 font-bold mr-2">✔</span> Adresse
              e-mail : {email}
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 font-bold mr-2">✔</span> Numéro de
              téléphone : {user.phone_number}
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
          <Button className="w-full">
            Vérifier mon identité
          </Button>
        </div>
      </div>
      {/* Right Section */}
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {hasProfile ? 'Modifier votre profil' : 'Créer votre profil'}
          </h2>
          <div className="space-y-4">
          <div>
  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
    Rôle
  </label>
  <Select value={role} onValueChange={setRole}>
    <SelectTrigger>
      <SelectValue placeholder="Sélectionnez votre rôle" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="sender">Sender</SelectItem>
      <SelectItem value="wingman">Wingman</SelectItem>
      <SelectItem value="receiver">Receiver</SelectItem>
    </SelectContent>
  </Select>
</div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de téléphone
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Votre numéro de téléphone"
              />
            </div>
          </div>
          <Button
            onClick={updateProfile}
            disabled={isUpdating}
            className="w-full mt-4"
          >
            {isUpdating ? 'Mise à jour...' : 'Mettre à jour le profil'}
          </Button>
          <div className="text-gray-700 space-y-2 mt-6">
            <p>Pas encore de trajet publié</p>
            <p>Membre depuis {formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

