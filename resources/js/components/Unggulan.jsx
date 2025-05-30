import React from "react";
import { FaMoneyBillWave, FaTruck, FaListAlt, FaUtensils } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="w-full px-6 py-12 bg-white">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Image */}
        <img
          src="/kebulikrispi.jpg"
          alt="Nasi Kebuli Krispi"
          className="w-full h-full object-cover rounded-xl shadow-md"
        />

        {/* Right: Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Kenapa Kebuli Ayam Krispi?
          </h2>

          <div className="space-y-6 text-gray-700 text-sm md:text-base">
            <Feature
              icon={<FaMoneyBillWave className="text-yellow-500 text-xl" />}
              title="Harga Terjangkau"
              description="Makanan lezat tidak harus mahal. Sajian berkualitas dengan harga bersahabat untuk semua kalangan."
            />

            <Feature
              icon={<FaUtensils className="text-yellow-500 text-xl" />}
              title="Rasa Autentik Timur Tengah"
              description="Dimasak dengan resep asli rempah Timur Tengah yang berpadu sempurna dengan lidah Nusantara."
            />

            <Feature
              icon={<FaTruck className="text-yellow-500 text-xl" />}
              title="Pelayanan Cepat & Ramah"
              description="Makan di tempat, bungkus, atau delivery—semuanya cepat, bersih, dan penuh senyum."
            />

            <Feature
              icon={<FaListAlt className="text-yellow-500 text-xl" />}
              title="Pilihan Menu Variatif"
              description="Mulai dari ayam krispi, kambing, sate, hingga sayur segar yang bisa dikombinasikan sesuka hati."
            />
          </div>
        </div>
      </div>

      {/* Highlight Produk Best Seller */}
      <div className="max-w-screen-xl mx-auto mt-16">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
          🌟 Produk Unggulan: Nasi Kebuli Krispi
        </h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg text-sm md:text-base text-gray-700 space-y-3">
          <p><strong>Perpaduan Rasa Unik:</strong> Nasi kebuli berbumbu rempah yang gurih berpadu dengan ayam krispi renyah di luar, lembut di dalam.</p>
          <p><strong>Tekstur Menggoda:</strong> Ayam krispi digoreng hingga golden brown dan disajikan panas, memberikan kriuk nikmat di tiap gigitan.</p>
          <p><strong>Pelengkap Lengkap:</strong> Disajikan dengan sambal khas, acar segar, dan kerupuk gurih yang menyempurnakan kelezatan.</p>
          <p><strong>Favorit Keluarga:</strong> Pilihan utama pelanggan dari segala usia karena kelezatan dan keunikannya yang bikin nagih.</p>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div>{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

export default WhyChooseUs;
