import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Mentions Légales</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="mb-6 text-gray-600">
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site [Nom du Site] l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
              </p>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Éditeur du site</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>[Nom de la société]</p>
                  <p>[Adresse du siège social]</p>
                  <p>SIRET : [Numéro SIRET]</p>
                  <p>Capital social : [Montant du capital social] €</p>
                  <p>Téléphone : [Numéro de téléphone]</p>
                  <p>Email : [Adresse email]</p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Directeur de la publication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>[Nom et prénom du directeur de la publication]</p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Hébergeur</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>[Nom de l'hébergeur]</p>
                  <p>[Adresse de l'hébergeur]</p>
                  <p>Téléphone : [Numéro de téléphone de l'hébergeur]</p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Propriété intellectuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Données personnelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Les informations recueillies sur ce site sont traitées selon les dispositions du Règlement Général sur la Protection des Données (RGPD) et de la loi Informatique et Libertés. Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Liens hypertextes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Le site [Nom du Site] peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site [Nom du Site]. Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Des questions ou des préoccupations ?</h2>
              <p className="mb-4 text-gray-600">
                Si vous avez des questions concernant ces mentions légales, vous pouvez nous contacter en utilisant les informations ci-dessous :
              </p>
              <Button>Contactez-nous</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}