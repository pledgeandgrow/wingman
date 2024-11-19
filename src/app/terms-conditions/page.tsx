import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ConditionsGeneralesDeVente() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Conditions Générales de Vente</h1>
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
                Les présentes conditions générales de vente s'appliquent à toutes les ventes conclues sur le site Internet [Nom de votre site].
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>1. Objet</AccordionTrigger>
                  <AccordionContent>
                    <p>Les présentes conditions générales de vente visent à définir les relations contractuelles entre [Nom de votre entreprise] et l'acheteur ainsi que les conditions applicables à tout achat effectué par le biais du site internet [Nom de votre site].</p>
                    <p className="mt-2">L'acquisition d'un bien ou d'un service à travers le présent site implique une acceptation sans réserve par l'acheteur des présentes conditions de vente.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>2. Prix</AccordionTrigger>
                  <AccordionContent>
                    <p>Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d'expédition.</p>
                    <p className="mt-2">En cas de commande vers un pays autre que la France métropolitaine, vous êtes l'importateur du ou des produits concernés. Des droits de douane ou autres taxes locales ou droits d'importation ou taxes d'état sont susceptibles d'être exigibles. Ces droits et sommes ne relèvent pas du ressort de [Nom de votre entreprise]. Ils seront à votre charge et relèvent de votre entière responsabilité, tant en termes de déclarations que de paiements aux autorités et organismes compétents de votre pays.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>3. Commandes</AccordionTrigger>
                  <AccordionContent>
                    <p>Vous pouvez passer commande sur le site internet [Nom de votre site].</p>
                    <p className="mt-2">Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.</p>
                    <p className="mt-2">[Nom de votre entreprise] se réserve le droit de ne pas enregistrer un paiement, et de ne pas confirmer une commande pour quelque raison que ce soit, et plus particulièrement en cas de problème d'approvisionnement, ou en cas de difficulté concernant la commande reçue.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>4. Validation de votre commande</AccordionTrigger>
                  <AccordionContent>
                    <p>Toute commande figurant sur le site Internet [Nom de votre site] suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.</p>
                    <p className="mt-2">L'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction.</p>
                    <p className="mt-2">Vous déclarez en avoir parfaite connaissance.</p>
                    <p className="mt-2">La confirmation de commande vaudra signature et acceptation des opérations effectuées.</p>
                    <p className="mt-2">Un récapitulatif des informations de votre commande vous sera communiqué via l'adresse e-mail de confirmation de votre commande.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>5. Paiement</AccordionTrigger>
                  <AccordionContent>
                    <p>Le fait de confirmer votre commande implique pour vous l'obligation de payer le prix indiqué.</p>
                    <p className="mt-2">Le règlement de vos achats s'effectue par carte bancaire grâce au système sécurisé [Nom du système de paiement].</p>
                    <p className="mt-2">Le débit de la carte n'est effectué qu'au moment de l'expédition de la commande. En cas de livraisons fractionnées, seuls les produits expédiés sont débités.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>6. Rétractation</AccordionTrigger>
                  <AccordionContent>
                    <p>Conformément aux dispositions de l'article L.121-21 du Code de la Consommation, vous disposez d'un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité.</p>
                    <p className="mt-2">Les retours sont à effectuer dans leur état d'origine et complets (emballage, accessoires, notice). Dans ce cadre, votre responsabilité est engagée. Tout dommage subi par le produit à cette occasion peut être de nature à faire échec au droit de rétractation.</p>
                    <p className="mt-2">Les frais de retour sont [à votre charge / pris en charge par Nom de votre entreprise].</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>7. Livraison</AccordionTrigger>
                  <AccordionContent>
                    <p>Les produits sont livrés à l'adresse de livraison indiquée au cours du processus de commande, dans le délai indiqué sur la page de validation de la commande.</p>
                    <p className="mt-2">En cas de retard d'expédition, un mail vous sera adressé pour vous informer d'une éventuelle conséquence sur le délai de livraison qui vous a été indiqué.</p>
                    <p className="mt-2">Conformément aux dispositions légales, en cas de retard de livraison, vous bénéficiez de la possibilité d'annuler la commande dans les conditions et modalités définies à l'article L 138-2 du Code de la Consommation.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>8. Garantie</AccordionTrigger>
                  <AccordionContent>
                    <p>Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, prévues par les articles 1641 et suivants du Code civil. En cas de non-conformité d'un produit vendu, il pourra être retourné, échangé ou remboursé.</p>
                    <p className="mt-2">Toutes les réclamations, demandes d'échange ou de remboursement doivent s'effectuer par [moyen de contact] dans le délai de 30 jours de la livraison.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                  <AccordionTrigger>9. Responsabilité</AccordionTrigger>
                  <AccordionContent>
                    <p>Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de [Nom de votre entreprise] ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré. Il vous appartient de vérifier auprès des autorités locales les possibilités d'importation ou d'utilisation des produits ou services que vous envisagez de commander.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                  <AccordionTrigger>10. Propriété intellectuelle</AccordionTrigger>
                  <AccordionContent>
                    <p>Tous les éléments du site [Nom de votre site] sont et restent la propriété intellectuelle et exclusive de [Nom de votre entreprise]. Nul n'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu'ils soient logiciels, visuels ou sonores.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Des questions sur nos conditions générales de vente ?</h2>
              <p className="mb-4 text-gray-600">
                Si vous avez des questions concernant nos CGV, n'hésitez pas à nous contacter :
              </p>
              <Button>Contactez-nous</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}