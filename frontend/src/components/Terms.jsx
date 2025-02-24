"use client";

import { useState } from "react";
import {
  Scale,
  ShoppingBag,
  Truck,
  RefreshCw,
  Shield,
  UserCircle,
  Copyright,
  AlertCircle,
} from "lucide-react";

const Terms = () => {
  const [language, setLanguage] = useState("fr");

  const content = {
    fr: {
      title: "Conditions Générales de Vente",
      lastUpdated: "Dernière mise à jour",
      sections: [
        {
          icon: <Scale className="h-6 w-6" />,
          title: "Dispositions Générales",
          content: `Les présentes conditions générales de vente s'appliquent à toutes les ventes de parfums et produits connexes réalisées sur [votre-site.ma].

En passant commande sur notre site, le client reconnaît avoir pris connaissance des présentes conditions générales de vente et les accepter sans réserve.

Nous nous réservons le droit de modifier ces conditions à tout moment. Les conditions applicables sont celles en vigueur au moment de la commande.`,
        },
        {
          icon: <ShoppingBag className="h-6 w-6" />,
          title: "Commandes et Paiements",
          content: `Prix :
• Tous les prix sont indiqués en Dirhams Marocains (MAD)
• Les prix incluent la TVA (20%)
• Les frais de livraison sont facturés en supplément

Modes de paiement acceptés :
• Paiement à la livraison
• Carte bancaire
• Virement bancaire
• Paiement mobile

Validation de commande :
• Toute commande est confirmée par email
• Nous nous réservons le droit de refuser une commande en cas de motif légitime`,
        },
        {
          icon: <Truck className="h-6 w-6" />,
          title: "Livraison",
          content: `Zones de livraison :
• Livraison disponible dans tout le Maroc
• Délais variables selon la zone géographique

Frais de livraison :
• Calculés en fonction de la zone de livraison
• Gratuits à partir de 500 MAD d'achat (Casablanca)
• Gratuits à partir de 800 MAD d'achat (autres villes)

Suivi de commande :
• Numéro de suivi fourni par email et SMS
• Service client disponible pour toute question`,
        },
        {
          icon: <RefreshCw className="h-6 w-6" />,
          title: "Retours et Remboursements",
          content: `Conditions de retour :
• Délai de 7 jours après réception
• Produit non ouvert et dans son emballage d'origine
• Retour à la charge du client

Remboursements :
• Effectués sous 5 jours ouvrables après réception du retour
• Même moyen de paiement que l'achat
• Possibilité d'échange contre un autre produit`,
        },
        {
          icon: <UserCircle className="h-6 w-6" />,
          title: "Obligations du Client",
          content: `Le client s'engage à :
• Fournir des informations exactes et à jour
• Utiliser le site de manière loyale
• Ne pas revendre les produits achetés
• Respecter les droits de propriété intellectuelle

En cas de non-respect, nous nous réservons le droit de :
• Suspendre l'accès au compte
• Annuler les commandes en cours
• Refuser les commandes futures`,
        },
        {
          icon: <Copyright className="h-6 w-6" />,
          title: "Propriété Intellectuelle",
          content: `Tous les éléments du site sont protégés par le droit d'auteur :
• Photos des produits
• Descriptions
• Logo et charte graphique
• Textes et articles

Toute reproduction est strictement interdite sans autorisation écrite.`,
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: "Loi Applicable",
          content: `Les présentes conditions sont soumises au droit marocain.
En cas de litige, les tribunaux de Casablanca seront seuls compétents.

Conformité :
• Loi 31-08 sur la protection du consommateur
• Loi 09-08 sur la protection des données personnelles
• Code de commerce marocain`,
        },
      ],
    },
    en: {
      title: "Terms and Conditions",
      lastUpdated: "Last updated",
      sections: [
        {
          icon: <Scale className="h-6 w-6" />,
          title: "General Provisions",
          content: `These terms and conditions apply to all sales of perfumes and related products made on [your-site.ma].

By placing an order on our site, the customer acknowledges having read these terms and conditions and accepts them without reservation.

We reserve the right to modify these terms at any time. The applicable conditions are those in effect at the time of ordering.`,
        },
        {
          icon: <ShoppingBag className="h-6 w-6" />,
          title: "Orders and Payments",
          content: `Prices:
• All prices are in Moroccan Dirhams (MAD)
• Prices include VAT (20%)
• Shipping costs are charged additionally

Accepted payment methods:
• Cash on delivery
• Credit card
• Bank transfer
• Mobile payment

Order validation:
• All orders are confirmed by email
• We reserve the right to refuse an order for legitimate reasons`,
        },
        {
          icon: <Truck className="h-6 w-6" />,
          title: "Delivery",
          content: `Delivery zones:
• Delivery available throughout Morocco
• Delivery times vary by geographic area

Shipping costs:
• Calculated based on delivery zone
• Free from 500 MAD purchase (Casablanca)
• Free from 800 MAD purchase (other cities)

Order tracking:
• Tracking number provided by email and SMS
• Customer service available for any questions`,
        },
        {
          icon: <RefreshCw className="h-6 w-6" />,
          title: "Returns and Refunds",
          content: `Return conditions:
• 7-day period after receipt
• Unopened product in original packaging
• Return shipping at customer's expense

Refunds:
• Processed within 5 business days after receiving the return
• Same payment method as purchase
• Possibility to exchange for another product`,
        },
        {
          icon: <UserCircle className="h-6 w-6" />,
          title: "Customer Obligations",
          content: `The customer agrees to:
• Provide accurate and up-to-date information
• Use the site fairly
• Not resell purchased products
• Respect intellectual property rights

In case of non-compliance, we reserve the right to:
• Suspend account access
• Cancel current orders
• Refuse future orders`,
        },
        {
          icon: <Copyright className="h-6 w-6" />,
          title: "Intellectual Property",
          content: `All elements of the site are protected by copyright:
• Product photos
• Descriptions
• Logo and graphic charter
• Texts and articles

Any reproduction is strictly prohibited without written authorization.`,
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: "Applicable Law",
          content: `These terms are subject to Moroccan law.
In case of dispute, the courts of Casablanca will have exclusive jurisdiction.

Compliance:
• Law 31-08 on consumer protection
• Law 09-08 on personal data protection
• Moroccan Commercial Code`,
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

      {/* Terms Sections */}
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

      {/* Important Notice */}
      <div className="mt-8 p-4 bg-orange-50 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            {language === "fr" ? (
              <p>
                En utilisant notre site et nos services, vous acceptez ces
                conditions générales de vente. Nous vous recommandons de les
                consulter régulièrement car elles peuvent être modifiées.
              </p>
            ) : (
              <p>
                By using our site and services, you agree to these terms and
                conditions. We recommend checking them regularly as they may be
                updated.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
