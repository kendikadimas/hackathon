import { FaQuoteLeft } from 'react-icons/fa';

const testimonialsData = [
  {
    id: 1,
    name: "Ibu Retno - Wangon",
    text: "Masya Allah, Nasi Kebulinya enak banget! Bumbunya itu lho, meresap sempurna ke nasi dan daging kambingnya. Dagingnya empuk, gak ada bau prengus sama sekali. Anak-anak di rumah juga pada doyan. Pasti jadi langganan ini mah!",
    image: "testi1.jpg", // DIUBAH: Sumber gambar testimoni pertama
    imageAlt: "Testimoni Nasi Kebuli Ajibarang dari Ibu Retno berupa chat",
  },
  {
    id: 2,
    name: "Mas Budi - Purwokerto",
    text: "Akhirnya nemu Nasi Kebuli yang rasanya otentik di sekitar Ajibarang! Porsinya pas, gak pelit bumbu. Ayam bakarnya juga juara, empuk dan bumbunya nendang. Cocok banget buat acara kumpul keluarga atau sekadar makan siang istimewa. Recommended!",
    image: "testi2.jpg", // DIUBAH: Sumber gambar testimoni kedua
    imageAlt: "Foto Nasi Kebuli Ayam yang dipesan Mas Budi",
  },
  {
    id: 3,
    name: "Keluarga Bapak Agus - Ajibarang",
    text: "Langganan tiap ada acara di rumah. Gak pernah ngecewain! Dari rasa, porsi, sampai pelayanan semuanya oke punya. Harganya juga sebanding sama kualitasnya. Sukses terus buat Nasi Kebuli Ajibarang, semoga makin banyak variannya!",
    image: "testi3.jpg", // DIUBAH (Asumsi): Sumber gambar testimoni ketiga, sesuaikan jika perlu
    imageAlt: "Testimoni Nasi Kebuli Ajibarang dari keluarga Bapak Agus",
  },
];

export default function TestimonialsSection() {
  return (
    // DIUBAH: Latar belakang menjadi putih
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-600">
            Apa Kata Mereka?
          </h2>
          {/* DIUBAH: Warna teks menjadi hitam (abu-abu tua) */}
          <p className="mt-3 text-lg sm:text-xl text-gray-800 font-semibold">
            Pelanggan Puas, Kami Senang! ✨
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-orange-200/50"
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse" // Mengatur urutan gambar dan teks bergantian
                }`}
              >
                {/* Bagian Gambar */}
                <div className="w-full md:w-5/12 lg:w-4/12 xl:w-1/3 flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.imageAlt}
                    className="object-cover w-full h-64 sm:h-72 md:h-full" // Tinggi gambar responsif
                  />
                </div>

                {/* Bagian Teks Testimoni */}
                <div className="w-full md:w-7/12 lg:w-8/12 xl:w-2/3 p-6 py-8 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <FaQuoteLeft className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 mb-4 sm:mb-6" />
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5 sm:mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-red-600 text-right">
                    - {testimonial.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}