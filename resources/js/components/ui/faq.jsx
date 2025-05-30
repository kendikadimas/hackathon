import React, { useState } from 'react';

const faqData = [
  {
    question: "Apa itu Merchain",
    answer:
      "Merchain adalah sebuah online store builder, dengan merchain pelaku usaha di Indonesia bisa membuat online storenya sendiri dengan mudah dan cepat.",
  },
  {
    question: "Apakah merchain berbayar?",
    answer: "Untuk saat ini, Merchain tersedia dalam versi gratis dan berbayar dengan fitur tambahan.",
  },
  {
    question: "Apakah merchain perlu tenaga teknis",
    answer: "Tidak perlu. Merchain dirancang untuk pengguna non-teknis agar mudah digunakan.",
  },
  {
    question: "Bagaimana saya mengatur produk dan orderan?",
    answer: "Anda dapat mengatur produk dan orderan melalui dashboard yang disediakan oleh Merchain.",
  },
  {
    question: "Apakah saya bisa mengkostumisasi toko saya",
    answer: "Ya, Anda dapat mengkostumisasi tampilan dan fitur toko sesuai kebutuhan.",
  },
  {
    question: "Kenapa saya tidak mendapatkan email verifikasi",
    answer: "Periksa folder spam Anda atau pastikan email yang Anda masukkan benar.",
  },
  {
    question: "Kemana saya bisa menghubungi apabila mengalami kesulitan",
    answer: "Anda dapat menghubungi tim support Merchain melalui email support@merchain.id.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions<span role="img" aria-label="thinking">🤔</span>
      </h2>
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`border rounded-md mb-2 transition-all duration-300 ${
            openIndex === index ? "bg-purple-50" : "bg-white"
          }`}
        >
          <button
            className={`w-full text-left px-4 py-4 flex justify-between items-center font-semibold ${
              openIndex === index ? "text-purple-600" : "text-black"
            }`}
            onClick={() => toggleFaq(index)}
          >
            {faq.question}
            <span className="text-xl">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
