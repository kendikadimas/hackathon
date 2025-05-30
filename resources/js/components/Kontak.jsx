import React from "react";

const Kontak = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Div Kiri - Kontak Kami */}
      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Kontak Kami</h2>
        <p className="text-base mb-2">Alamat: Jl. Contoh No.123, Purwokerto</p>
        <p className="text-base mb-2">Telepon: (0281) 123456</p>
        <p className="text-base mb-2">Email: info@contoh.com</p>
        <p className="text-base">Jam Operasional: Senin - Sabtu, 08.00 - 17.00</p>
      </div>

      {/* Div Kanan - Google Maps Embed */}
      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.1132322025337!2d109.26976338028908!3d-7.415019574423247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655fcabb5fbda3%3A0x9146682eaeaef311!2sKEBULI%20AJB%20UMKM%20UMP!5e0!3m2!1sid!2sid!4v1748603455876!5m2!1sid!2sid"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Kontak;
