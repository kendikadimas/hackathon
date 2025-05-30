// resources/js/Components/TestimonialsSection.jsx

import React from 'react';

// --- Definisi Tipe Data (Jika menggunakan TypeScript) ---
// interface Testimonial {
//     id: number;
//     content: string;
//     author: string;
// }
// interface TestimonialsSectionProps {
//     testimonials: Testimonial[];
// }
// --- Akhir Definisi Tipe Data ---

// Komponen Testimonial
// const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => { // Untuk TypeScript
const TestimonialsSection = ({ testimonials }) => { // Untuk JavaScript/JSX
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Apa Kata Pelanggan Kami?</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-700 text-lg italic mb-4">"{testimonial.content}"</p>
                            <p className="text-gray-900 font-semibold">- {testimonial.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection; // PASTIKAN DI-EXPORT DEFAULT