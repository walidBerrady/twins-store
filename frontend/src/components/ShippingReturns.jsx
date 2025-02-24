"use client";

import { useState } from "react";
import {
  Truck,
  Package,
  RefreshCw,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";

const ShippingReturns = () => {
  const [activeTab, setActiveTab] = useState("shipping");

  const shippingZones = [
    {
      name: "Zone 1 - Grandes Villes",
      cities: "Casablanca, Rabat, Salé, Témara, Kénitra",
      time: "24-48 heures",
      cost: "30 MAD",
    },
    {
      name: "Zone 2 - Villes Principales",
      cities: "Marrakech, Fès, Tanger, Meknès, Agadir, Oujda",
      time: "2-3 jours",
      cost: "40 MAD",
    },
    {
      name: "Zone 3 - Autres Villes",
      cities: "Autres villes et centres urbains",
      time: "3-5 jours",
      cost: "50 MAD",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("shipping")}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeTab === "shipping"
              ? "bg-primary text-black"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Livraison
        </button>
        <button
          onClick={() => setActiveTab("returns")}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeTab === "returns"
              ? "bg-primary text-black"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Retours
        </button>
      </div>

      {/* Shipping Content */}
      {activeTab === "shipping" && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Truck className="h-6 w-6" />
              Zones de Livraison
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {shippingZones.map((zone, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2">{zone.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{zone.cities}</p>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {zone.time}
                    </span>
                    <span className="font-semibold">{zone.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Informations de Livraison
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Méthodes de livraison :</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Livraison à domicile</li>
                  <li>Point relais (disponible dans certaines villes)</li>
                  <li>Retrait en magasin (Casablanca uniquement)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Suivi de commande :</h3>
                <p className="text-sm text-gray-600">
                  Un numéro de suivi vous sera envoyé par SMS et email dès que
                  votre commande sera expédiée.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note :</strong> Les délais de livraison peuvent être
                  plus longs pendant les périodes de fête (Aïd, Ramadan, etc.).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Calculer les frais de livraison
            </h2>
            <ShippingCalculator />
          </section>
        </div>
      )}

      {/* Returns Content */}
      {activeTab === "returns" && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6" />
              Politique de Retour
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-4">
                Nous acceptons les retours dans les 7 jours suivant la réception
                de votre commande.
              </p>
              <h3 className="font-semibold mb-2">Conditions de retour :</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Le produit doit être non utilisé et dans son emballage
                  d'origine
                </li>
                <li>Le reçu ou la preuve d'achat est obligatoire</li>
                <li>Les échantillons ne sont pas éligibles aux retours</li>
                <li>Les frais de retour sont à la charge du client</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Package className="h-6 w-6" />
              Processus de Retour
            </h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">1. Contactez-nous</h3>
                <p>
                  Appelez notre service client ou envoyez un email pour initier
                  votre retour.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">2. Emballage</h3>
                <p>
                  Emballez soigneusement le produit dans son emballage
                  d'origine.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">3. Expédition</h3>
                <p>Envoyez le colis à notre adresse de retour à Casablanca.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">4. Remboursement</h3>
                <p>
                  Le remboursement sera effectué sous 3-5 jours ouvrables après
                  réception du retour.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Notes Importantes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                Les remboursements sont effectués via le mode de paiement
                initial
              </li>
              <li>
                Pour les paiements en espèces à la livraison, le remboursement
                sera effectué par virement bancaire
              </li>
              <li>
                En cas de produit endommagé, contactez-nous dans les 24h suivant
                la réception
              </li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

const ShippingCalculator = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);

  const cities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fès",
    "Tanger",
    "Meknès",
    "Agadir",
    "Oujda",
    "Kénitra",
    "Témara",
    "Salé",
    "Autre",
  ];

  const calculateShipping = (e) => {
    e.preventDefault();
    let cost = 0;

    // Simple shipping cost calculation based on city
    if (["Casablanca", "Rabat", "Salé", "Témara", "Kénitra"].includes(city)) {
      cost = 30;
    } else if (
      ["Marrakech", "Fès", "Tanger", "Meknès", "Agadir", "Oujda"].includes(city)
    ) {
      cost = 40;
    } else {
      cost = 50;
    }

    setResult({
      cost: `${cost} MAD`,
      time:
        cost === 30 ? "24-48 heures" : cost === 40 ? "2-3 jours" : "3-5 jours",
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <form onSubmit={calculateShipping} className="space-y-4">
        <div>
          <label htmlFor="city" className="block text-sm mb-1">
            Sélectionnez votre ville
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Choisir une ville</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Calculer
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">
            Frais de livraison pour {city} :
          </h4>
          <div className="space-y-1 text-sm">
            <p>Coût : {result.cost}</p>
            <p>Délai estimé : {result.time}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingReturns;
