// resources/js/Pages/Welcome.jsx

import React from 'react'; // Hapus useState dan useEffect dari import jika tidak dipakai
import { Head, usePage, useForm } from '@inertiajs/react';
import '../../css/app.css';
import Navbar from '../Layouts/landingpage-layout';
import Footer from '../Components/Footer';
import Produkebul from '../Components/Produkebul';




export default function Produk({ }) {
    return (
        
       <div>
            <Navbar />
            <Produkebul />
            <Footer />
       </div>
    );
}