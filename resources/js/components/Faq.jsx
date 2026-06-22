import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
    {
        question: "Apa itu Merchain",
        answer: "Merchain adalah platform digital untuk mempermudah pengelolaan bisnis UMKM secara online."
    },
    {
        question: "Apakah merchian berbayar?",
        answer: "Merchain menyediakan versi gratis dengan fitur terbatas dan versi berbayar untuk fitur penuh."
    },
    {
        question: "Apakah merchian perlu tenaga teknis",
        answer: "Tidak, Merchain dirancang agar mudah digunakan bahkan tanpa latar belakang teknis."
    },
    {
        question: "Bagaimana saya mengatur produk dan orderan?",
        answer: "Anda dapat mengatur produk dan orderan melalui dashboard Merchain secara langsung."
    }
];

export default function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
                Frequently Asked Questions <span role="img" aria-label="thinking">🤔</span>
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border rounded-xl px-6 py-4 bg-white shadow-sm cursor-pointer transition-all duration-200"
                        onClick={() => toggleFaq(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">{faq.question}</h3>
                            <span className="text-xl">
                                {activeIndex === index ? <FiMinus /> : <FiPlus />}
                            </span>
                        </div>
                        {activeIndex === index && (
                            <p className="mt-4 text-gray-700 text-sm">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
