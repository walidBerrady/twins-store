import { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  Mail,
  Cookie,
  UserCircle,
  Bell,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState("fr"); // 'fr' for French, 'en' for English

  const content = {
    fr: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour",
      sections: [
        {
          icon: <UserCircle className="h-6 w-6" />,
          title: "Collecte des Informations",
          content: `Nous collectons les informations suivantes :
            • Nom et prénom
            • Adresse email
            • Numéro de téléphone
            • Adresse de livraison
            • Historique des commandes
            • Préférences de parfums
            Ces informations sont nécessaires pour traiter vos commandes et améliorer votre expérience d'achat.`,
        },
        {
          icon: <Eye className="h-6 w-6" />,
          title: "Utilisation des Données",
          content: `Vos données sont utilisées pour :
            • Traiter et livrer vos commandes
            • Vous informer sur l'état de vos commandes
            • Personnaliser votre expérience d'achat
            • Vous envoyer des offres promotionnelles (avec votre consentement)
            • Améliorer nos services`,
        },
        {
          icon: <Cookie className="h-6 w-6" />,
          title: "Cookies et Traceurs",
          content: `Nous utilisons des cookies pour :
            • Maintenir votre session
            • Mémoriser vos préférences
            • Analyser le trafic du site
            • Personnaliser votre expérience
            Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.`,
        },
        {
          icon: <Lock className="h-6 w-6" />,
          title: "Protection des Données",
          content: `Nous protégeons vos données par :
            • Un cryptage SSL
            • Des accès sécurisés
            • Des sauvegardes régulières
            • Une politique stricte de confidentialité pour nos employés`,
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: "Vos Droits",
          content: `Conformément à la loi marocaine 09-08, vous disposez des droits suivants :
            • Accès à vos données personnelles
            • Rectification de vos données
            • Suppression de vos données
            • Opposition au traitement
            • Retrait du consentement`,
        },
        {
          icon: <Bell className="h-6 w-6" />,
          title: "Communications Marketing",
          content: `Vous pouvez choisir de recevoir nos communications marketing par :
            • Email
            • SMS
            • WhatsApp
            Vous pouvez vous désabonner à tout moment via le lien dans nos emails ou en nous contactant.`,
        },
        {
          icon: <Mail className="h-6 w-6" />,
          title: "Contact",
          content: `Pour toute question concernant vos données personnelles :
            Email : privacy@votresite.ma
            Téléphone : +212 5XX-XXXXXX
            Adresse : [Votre adresse à Casablanca]`,
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated",
      sections: [
        {
          icon: <UserCircle className="h-6 w-6" />,
          title: "Information Collection",
          content: `We collect the following information:
            • First and last name
            • Email address
            • Phone number
            • Delivery address
            • Order history
            • Perfume preferences
            This information is necessary to process your orders and improve your shopping experience.`,
        },
        {
          icon: <Eye className="h-6 w-6" />,
          title: "Data Usage",
          content: `Your data is used for:
            • Processing and delivering your orders
            • Keeping you informed about your orders
            • Personalizing your shopping experience
            • Sending promotional offers (with your consent)
            • Improving our services`,
        },
        {
          icon: <Cookie className="h-6 w-6" />,
          title: "Cookies and Tracking",
          content: `We use cookies to:
            • Maintain your session
            • Remember your preferences
            • Analyze site traffic
            • Personalize your experience
            You can disable cookies in your browser settings.`,
        },
        {
          icon: <Lock className="h-6 w-6" />,
          title: "Data Protection",
          content: `We protect your data through:
            • SSL encryption
            • Secure access
            • Regular backups
            • Strict employee confidentiality policy`,
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: "Your Rights",
          content: `In accordance with Moroccan law 09-08, you have the following rights:
            • Access to your personal data
            • Correction of your data
            • Deletion of your data
            • Opposition to processing
            • Withdrawal of consent`,
        },
        {
          icon: <Bell className="h-6 w-6" />,
          title: "Marketing Communications",
          content: `You can choose to receive our marketing communications via:
            • Email
            • SMS
            • WhatsApp
            You can unsubscribe at any time via the link in our emails or by contacting us.`,
        },
        {
          icon: <Mail className="h-6 w-6" />,
          title: "Contact",
          content: `For any questions regarding your personal data:
            Email: privacy@yoursite.ma
            Phone: +212 5XX-XXXXXX
            Address: [Your address in Casablanca]`,
        },
      ],
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Language Toggle */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-lg border p-1">
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              language === "fr"
                ? "bg-primary text-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setLanguage("fr")}
          >
            Français
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              language === "en"
                ? "bg-primary text-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
        </div>
      </div>

      {/* Title and Last Updated */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{content[language].title}</h1>
        <p className="text-gray-600">
          {content[language].lastUpdated}: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8">
        {content[language].sections.map((section, index) => (
          <section
            key={index}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {section.icon}
              {section.title}
            </h2>
            <div className="text-gray-600 whitespace-pre-line">
              {section.content}
            </div>
          </section>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        {language === "fr" ? (
          <p>
            Cette politique de confidentialité est conforme à la loi marocaine
            09-08 relative à la protection des personnes physiques à l'égard du
            traitement des données à caractère personnel.
          </p>
        ) : (
          <p>
            This privacy policy complies with Moroccan law 09-08 regarding the
            protection of individuals with regard to the processing of personal
            data.
          </p>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
