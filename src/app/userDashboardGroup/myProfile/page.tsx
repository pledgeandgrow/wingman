'use client'

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function Page() {
  const { toast } = useToast();
  const [hasProfile, setHasProfile] = useState(false);
  const [user, setUser] = useState<any>(null);
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
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:mr-6 transition-colors duration-200">
      {/* Profile Header */}
      <div className="flex flex-col items-center border-b border-gray-200 dark:border-gray-700 p-6">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Profile Logo"
            width={80}
            height={80}
            className="rounded-full mb-4 ring-2 ring-blue-500 dark:ring-blue-400"
          />
        ) : (
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 flex items-center justify-center ring-2 ring-blue-500 dark:ring-blue-400">
            <span className="text-2xl text-blue-600 dark:text-blue-300">{user?.name?.charAt(0) || '?'}</span>
          </div>
        )}
        <h3 className="text-xl font-semibold">{user?.name || 'Utilisateur'}</h3>
        <p className="text-gray-500 dark:text-gray-400">{role || 'Rôle non défini'}</p>
      </div>

      {/* Verification Section */}
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">
          Vérifications effectuées par Wingman
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="text-green-500 dark:text-green-400 font-bold mr-2">✔</span> Adresse
            e-mail : {email}
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="text-green-500 dark:text-green-400 font-bold mr-2">✔</span> Numéro de
            téléphone : {user?.phone_number}
          </li>
        </ul>
      </div>

      {/* Identity Verification Section */}
      
    </div>
    {/* Right Section */}
    <div className="w-full max-w-lg">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6 transition-colors duration-200">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {hasProfile ? 'Modifier votre profil' : 'Créer votre profil'}
        </h2>
        <div className="space-y-4">
            {!user?.role && <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Note : </AlertTitle>
              <AlertDescription>
                 You can't modify your role after !
              </AlertDescription>
           </Alert>   }      
          {!user?.role && <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rôle
            </label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Sélectionnez votre rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sender">Sender</SelectItem>
                <SelectItem value="wingman">Wingman</SelectItem>
                <SelectItem value="receiver">Receiver</SelectItem>
              </SelectContent>
            </Select>
          </div> }

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Numéro de téléphone
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Votre numéro de téléphone"
              className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
        <Button
          onClick={updateProfile}
          disabled={isUpdating}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
        >
          {isUpdating ? 'Mise à jour...' : 'Mettre à jour le profil'}
        </Button>
        <div className="text-gray-700 dark:text-gray-300 space-y-2 mt-6">
          <p>Pas encore de trajet publié</p>
          <p>Membre depuis {formattedDate}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Page

