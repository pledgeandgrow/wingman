import React from 'react'
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


function page() {
  return (
<div className="min-h-screen bg-gray-50">
      <header className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Politique de confidentialité</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="mb-4 text-gray-600">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
              <p className="mb-6 text-gray-800">
                Nous nous engageons à protéger votre vie privée et à traiter vos données personnelles avec le plus grand soin. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>1. Collecte des informations</AccordionTrigger>
                  <AccordionContent>
                    Nous collectons des informations lorsque vous utilisez notre site web, vous inscrivez à notre newsletter, remplissez un formulaire ou interagissez avec nos services. Ces informations peuvent inclure votre nom, adresse e-mail, numéro de téléphone et d'autres détails que vous fournissez volontairement.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>2. Utilisation des informations</AccordionTrigger>
                  <AccordionContent>
                    Nous utilisons les informations que nous collectons pour :
                    <ul className="list-disc pl-5 mt-2">
                      <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                      <li>Améliorer notre site web et nos services</li>
                      <li>Vous envoyer des e-mails périodiques</li>
                      <li>Traiter les transactions</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>3. Protection des informations</AccordionTrigger>
                  <AccordionContent>
                    Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>4. Divulgation à des tiers</AccordionTrigger>
                  <AccordionContent>
                    Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers. Cela n'inclut pas les tiers de confiance qui nous aident à exploiter notre site web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>5. Consentement</AccordionTrigger>
                  <AccordionContent>
                    En utilisant notre site, vous consentez à notre politique de confidentialité.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Des questions ou des préoccupations ?</h2>
              <p className="mb-4 text-gray-600">
                Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter en utilisant les informations ci-dessous :
              </p>
              <Button>Contactez-nous</Button>
            </div>
          </div>
        </div>
      </main>
    </div>  )
}

export default page