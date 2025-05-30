// resources/js/Pages/Welcome.jsx

import React from 'react'; // Hapus useState dan useEffect dari import jika tidak dipakai
import { Head, usePage, useForm } from '@inertiajs/react';
import '../../css/app.css';
import TestimonialsSection from '../Components/TestimonialsSection';
import Navbar from '../Layouts/landingpage-layout';
import HeroSection from '../Components/HeroSection';
import Unggulan from '../Components/Unggulan';
import Testimoni from '../Components/Testimoni';
import Footer from '../Components/Footer';
import Kontak from '../Components/Kontak';

export default function Home({ }) {
    return (
        
        <div>
            <Navbar />
            <HeroSection />
            <Unggulan />
            <Testimoni />
            <Kontak />
            <Footer />
        </div>
        
    );
}