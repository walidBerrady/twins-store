const About = () => {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        {/* Hero section with background image */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 h-80 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About Twins Fragrances
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100 sm:max-w-3xl">
              Discover the art of luxury scents
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Story</h2>
            <div className="mt-6 text-gray-500 space-y-6">
              <p className="text-lg">
                Merhba bikom f Twins Fragrances, fin kayn passion dial l3otor o joda. 7na jm3na majmou3a kbira dial
                a7san l3otor l3alamiya bach ncharkoha m3akom.
              </p>
              <p className="text-lg">
                Bdina had lmachroo3 b hadaf basit: bach nwsslo l3tor lfakhra l kulchi, Lyoum
                kanbi3o 3tor 100% originale b sizes mokhtalifa 7sb dakchi li baghi kul wa7ed.
              </p>
              <p className="text-lg">
                7na hna bach n3awnouk tlqa l'parfum li kaynassbek.
              </p>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                className="w-full h-auto"
                src="https://thedecantden.com/cdn/shop/files/dior-sauvage-elixir-60ml_17257470_44567835_2048_533x.jpg?v=1690720221"
                alt="Twins Fragrances founder with perfume"
              />
            </div>
          </div>
        </div>

        {/* What We Offer section */}
        <div className="mt-24">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">Collection</h2>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {/* 5ml option */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">5ml Decants</h3>
                <p className="text-gray-600">
                  Mzyan bach tjarreb 3tor jdida wla Decants. 3tor originale b taman monassib.
                </p>
              </div>
            </div>

            {/* 10ml option */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">10ml Decants</h3>
                <p className="text-gray-600">10ml katkfik lmodda twila, b taman monassib.</p>
              </div>
            </div>

            {/* Full bottle option */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Full Parfum</h3>
                <p className="text-gray-600">
                  Jarreb Full parfum originale. Koulchi kiyji m3a packaging dyalo o certificat dial
                  originalité.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Promise section */}
        <div className="mt-24 bg-gray-50 rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Objectif Dyalna</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">F Twins Fragrances, kan garantiw:</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">100% Original</h3>
                <p className="mt-2 text-gray-600">Kol 3itr li kanbi3o original 100%.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">A7san Taman</h3>
                <p className="mt-2 text-gray-600">Kanbi3o b taman monassib bla manqsso mn ljoda.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Nasi7a Professionelle</h3>
                <p className="mt-2 text-gray-600">L'équipe dyalna katsa3dk tkhtar 3la 7sab daw9ek.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Packaging Mzyan</h3>
                <p className="mt-2 text-gray-600">
                  Kanpackiw l3tor b 3inaya bach ywslouk b7al li chritihom mn store bla myt5waw.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

