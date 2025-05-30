import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import '../../css/app.css'; // Pastikan Tailwind CSS di-import

export default function Order() {
    // useForm untuk mengelola state form dan submit via Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        customer_name: '',
        customer_contact: '',
        product_details: [{ name: '', qty: 1 }], // Default 1 item, bisa ditambah
        notes: '',
    });

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...data.product_details];
        newItems[index] = { ...newItems[index], [name]: value };
        setData('product_details', newItems);
    };

    const addItem = () => {
        setData('product_details', [...data.product_details, { name: '', qty: 1 }]);
    };

    const removeItem = (index) => {
        const newItems = data.product_details.filter((_, i) => i !== index);
        setData('product_details', newItems);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('order.store'), {
            onSuccess: () => reset(), // Reset form on success
        });
    };


    // // Fungsi untuk memuat Google Maps API script
    // const loadGoogleMapsScript = (apiKey, callback) => {
    //     if (window.google && window.google.maps) {
    //         callback();
    //         return;
    //     }
    //     const script = document.createElement('script');
    //     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    //     script.async = true;
    //     script.defer = true;
    //     script.onload = callback;
    //     document.head.appendChild(script);
    // };

    // export default function Order({ products, googleMapsApiKey, errors: inertiaErrors }) { // Terima products dan googleMapsApiKey
    //     const { data, setData, post, processing, errors } = useForm({
    //         customer_name: '',
    //         customer_contact: '',
    //         product_details: [{ product_id: '', quantity: 1, name: '', price: 0 }], // Sesuaikan dengan structure baru
    //         notes: '',
    //         delivery_address: '',
    //         delivery_latitude: null,
    //         delivery_longitude: null,
    //     });

    //     const mapRef = useRef(null);
    //     const autocompleteRef = useRef(null);
    //     const mapInstance = useRef(null);
    //     const markerInstance = useRef(null);

    //     const [mapLoaded, setMapLoaded] = useState(false);
    //     const [currentLocation, setCurrentLocation] = useState(null); // Untuk menampilkan lokasi saat ini

    //     useEffect(() => {
    //         if (googleMapsApiKey) {
    //             loadGoogleMapsScript(googleMapsApiKey, () => {
    //                 setMapLoaded(true);
    //                 initMapAndAutocomplete();
    //             });
    //         }
    //     }, [googleMapsApiKey]);

    //     const initMapAndAutocomplete = () => {
    //         if (!mapRef.current) return;

    //         // Inisialisasi Map
    //         mapInstance.current = new window.google.maps.Map(mapRef.current, {
    //             center: { lat: -6.2088, lng: 106.8456 }, // Contoh: Jakarta
    //             zoom: 12,
    //         });

    //         // Inisialisasi Autocomplete
    //         const inputElement = document.getElementById('delivery_address_input');
    //         if (inputElement) {
    //             autocompleteRef.current = new window.google.maps.places.Autocomplete(inputElement);
    //             autocompleteRef.current.bindTo('bounds', mapInstance.current);

    //             autocompleteRef.current.addListener('place_changed', () => {
    //                 const place = autocompleteRef.current.getPlace();
    //                 if (!place.geometry) {
    //                     console.error("Autocomplete returned place with no geometry");
    //                     return;
    //                 }

    //                 // Set map center to the selected place
    //                 if (place.geometry.viewport) {
    //                     mapInstance.current.fitBounds(place.geometry.viewport);
    //                 } else {
    //                     mapInstance.current.setCenter(place.geometry.location);
    //                     mapInstance.current.setZoom(17);
    //                 }

    //                 // Update marker
    //                 if (markerInstance.current) {
    //                     markerInstance.current.setMap(null); // Hapus marker lama
    //                 }
    //                 markerInstance.current = new window.google.maps.Marker({
    //                     map: mapInstance.current,
    //                     position: place.geometry.location,
    //                 });

    //                 // Update form data
    //                 setData(prevData => ({
    //                     ...prevData,
    //                     delivery_address: place.formatted_address || place.name,
    //                     delivery_latitude: place.geometry.location.lat(),
    //                     delivery_longitude: place.geometry.location.lng(),
    //                 }));
    //             });
    //         }

    //         // Klik pada peta untuk memilih lokasi
    //         mapInstance.current.addListener('click', (e) => {
    //             if (markerInstance.current) {
    //                 markerInstance.current.setMap(null);
    //             }
    //             markerInstance.current = new window.google.maps.Marker({
    //                 position: e.latLng,
    //                 map: mapInstance.current,
    //             });

    //             // Reverse Geocoding untuk mendapatkan alamat dari koordinat
    //             const geocoder = new window.google.maps.Geocoder();
    //             geocoder.geocode({ 'location': e.latLng }, (results, status) => {
    //                 if (status === 'OK' && results[0]) {
    //                     setData(prevData => ({
    //                         ...prevData,
    //                         delivery_address: results[0].formatted_address,
    //                         delivery_latitude: e.latLng.lat(),
    //                         delivery_longitude: e.latLng.lng(),
    //                     }));
    //                 } else {
    //                     console.error('Geocoder failed due to: ' + status);
    //                     setData(prevData => ({
    //                         ...prevData,
    //                         delivery_address: `Lat: ${e.latLng.lat()}, Lng: ${e.latLng.lng()}`, // Tampilkan koordinat jika geocoding gagal
    //                         delivery_latitude: e.latLng.lat(),
    //                         delivery_longitude: e.latLng.lng(),
    //                     }));
    //                 }
    //             });
    //         });

    //         // Get user's current location on map load
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition((position) => {
    //                 const pos = {
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude,
    //                 };
    //                 mapInstance.current.setCenter(pos);
    //                 mapInstance.current.setZoom(15); // Zoom closer to current location
    //                 setCurrentLocation(pos); // Simpan lokasi saat ini
    //             }, () => {
    //                 console.log("Geolocation failed or denied.");
    //             });
    //         }
    //     };


    //     const handleProductChange = (index, e) => {
    //         const { name, value } = e.target;
    //         const newItems = [...data.product_details];

    //         if (name === 'product_id') {
    //             const selectedProduct = products.find(p => p.id == value); // Find product by ID
    //             if (selectedProduct) {
    //                 newItems[index] = {
    //                     ...newItems[index],
    //                     product_id: selectedProduct.id,
    //                     name: selectedProduct.name, // Simpan nama produk juga
    //                     price: selectedProduct.price, // Simpan harga produk juga
    //                 };
    //             } else {
    //                 // Reset jika tidak ada produk terpilih
    //                 newItems[index] = { ...newItems[index], product_id: '', name: '', price: 0 };
    //             }
    //         } else {
    //             // Untuk 'quantity'
    //             newItems[index] = { ...newItems[index], [name]: value };
    //         }
    //         setData('product_details', newItems);
    //     };

    //     const addItem = () => {
    //         setData('product_details', [...data.product_details, { product_id: '', quantity: 1, name: '', price: 0 }]);
    //     };

    //     const removeItem = (index) => {
    //         const newItems = data.product_details.filter((_, i) => i !== index);
    //         setData('product_details', newItems);
    //     };

    //     const submit = (e) => {
    //         e.preventDefault();
    //         // Validasi tambahan di frontend jika perlu (misal: setidaknya ada 1 produk)
    //         if (data.product_details.length === 0 || data.product_details.some(item => !item.product_id || item.quantity < 1)) {
    //             alert('Mohon lengkapi detail produk dengan benar.');
    //             return;
    //         }

    //         post(route('order.store'), {
    //             onSuccess: () => reset(), // Reset form on success
    //             onError: (err) => {
    //                 console.error("Form errors:", err);
    //                 // Errors dari Laravel akan otomatis diisi ke objek `errors` dari useForm
    //                 // Anda bisa menampilkan ini di UI menggunakan {errors.field_name}
    //             }
    //         });
    //     };

    //     const calculateSubtotal = (item) => {
    //         const product = products.find(p => p.id === item.product_id);
    //         return product ? product.price * item.quantity : 0;
    //     };

    //     const calculateTotal = () => {
    //         return data.product_details.reduce((sum, item) => sum + calculateSubtotal(item), 0);
    //     };

    //     return (
    //         <>
    //             <Head title="Pemesanan" />
    //             <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
    //                 <div className="max-w-3xl mx-auto w-full">
    //                     <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Formulir Pemesanan</h2>
    //                     <form onSubmit={submit} className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-md">
    //                         {/* Nama & Kontak */}
    //                         <div>
    //                             <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Nama Anda</label>
    //                             <input
    //                                 type="text"
    //                                 id="customer_name"
    //                                 value={data.customer_name}
    //                                 onChange={(e) => setData('customer_name', e.target.value)}
    //                                 required
    //                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //                             />
    //                             {errors.customer_name && <div className="text-red-500 text-sm mt-1">{errors.customer_name}</div>}
    //                         </div>
    //                         <div>
    //                             <label htmlFor="customer_contact" className="block text-sm font-medium text-gray-700">Nomor Telepon/WhatsApp</label>
    //                             <input
    //                                 type="text"
    //                                 id="customer_contact"
    //                                 value={data.customer_contact}
    //                                 onChange={(e) => setData('customer_contact', e.target.value)}
    //                                 required
    //                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //                             />
    //                             {errors.customer_contact && <div className="text-red-500 text-sm mt-1">{errors.customer_contact}</div>}
    //                         </div>

    //                         {/* Bagian Lokasi Pengantaran */}
    //                         <h3 className="text-xl font-semibold mt-6 mb-4">Lokasi Pengantaran</h3>
    //                         <div>
    //                             <label htmlFor="delivery_address_input" className="block text-sm font-medium text-gray-700">Alamat Pengantaran</label>
    //                             <input
    //                                 type="text"
    //                                 id="delivery_address_input" // ID ini digunakan oleh Google Autocomplete
    //                                 value={data.delivery_address}
    //                                 onChange={(e) => setData('delivery_address', e.target.value)} // Memungkinkan input manual
    //                                 required
    //                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //                                 placeholder="Cari atau pilih di peta..."
    //                             />
    //                             {errors.delivery_address && <div className="text-red-500 text-sm mt-1">{errors.delivery_address}</div>}
    //                             {(errors.delivery_latitude || errors.delivery_longitude) && (
    //                                 <div className="text-red-500 text-sm mt-1">Koordinat lokasi tidak valid.</div>
    //                             )}
    //                         </div>

    //                         {mapLoaded && (
    //                             <div className="h-64 w-full border border-gray-300 rounded-md overflow-hidden">
    //                                 <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
    //                             </div>
    //                         )}
    //                          {!mapLoaded && googleMapsApiKey && (
    //                             <p className="text-gray-600 text-center">Memuat peta...</p>
    //                         )}
    //                         {!googleMapsApiKey && (
    //                             <p className="text-red-600 text-center">Google Maps API Key tidak ditemukan. Peta tidak dapat dimuat.</p>
    //                         )}
    //                          {currentLocation && (
    //                             <p className="text-gray-600 text-sm mt-2 text-center">Lokasi Anda saat ini mungkin di sekitar Latitude: {currentLocation.lat.toFixed(4)}, Longitude: {currentLocation.lng.toFixed(4)}</p>
    //                         )}


    //                         {/* Hidden fields for coordinates */}
    //                         <input type="hidden" name="delivery_latitude" value={data.delivery_latitude || ''} />
    //                         <input type="hidden" name="delivery_longitude" value={data.delivery_longitude || ''} />

    //                         {/* Bagian Detail Produk */}
    //                         <h3 className="text-xl font-semibold mt-6 mb-4">Detail Produk</h3>
    //                         {data.product_details.map((item, index) => (
    //                             <div key={index} className="flex flex-col md:flex-row gap-4 items-end mb-4 bg-gray-100 p-4 rounded-md">
    //                                 <div className="flex-grow">
    //                                     <label htmlFor={`product_id_${index}`} className="block text-sm font-medium text-gray-700">Pilih Produk</label>
    //                                     <select
    //                                         id={`product_id_${index}`}
    //                                         name="product_id"
    //                                         value={item.product_id}
    //                                         onChange={(e) => handleProductChange(index, e)}
    //                                         required
    //                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //                                     >
    //                                         <option value="">-- Pilih Produk --</option>
    //                                         {products.map(product => (
    //                                             <option key={product.id} value={product.id}>
    //                                                 {product.name} (Stok: {product.stock}, Rp{product.price.toLocaleString('id-ID')})
    //                                             </option>
    //                                         ))}
    //                                     </select>
    //                                     {errors[`product_details.${index}.product_id`] && (
    //                                         <div className="text-red-500 text-sm mt-1">{errors[`product_details.${index}.product_id`]}</div>
    //                                     )}
    //                                 </div>
    //                                 <div className="w-24">
    //                                     <label htmlFor={`quantity_${index}`} className="block text-sm font-medium text-gray-700">Jumlah</label>
    //                                     <input
    //                                         type="number"
    //                                         id={`quantity_${index}`}
    //                                         name="quantity"
    //                                         value={item.quantity}
    //                                         onChange={(e) => handleProductChange(index, e)}
    //                                         required
    //                                         min="1"
    //                                         max={products.find(p => p.id === item.product_id)?.stock || 1} // Max quantity based on selected product's stock
    //                                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
    //                                     />
    //                                     {errors[`product_details.${index}.quantity`] && (
    //                                         <div className="text-red-500 text-sm mt-1">{errors[`product_details.${index}.quantity`]}</div>
    //                                     )}
    //                                 </div>
    //                                 <div className="w-32">
    //                                     <label className="block text-sm font-medium text-gray-700">Subtotal</label>
    //                                     <p className="mt-1 text-gray-900 font-semibold py-2 px-3">
    //                                         Rp{calculateSubtotal(item).toLocaleString('id-ID')}
    //                                     </p>
    //                                 </div>
    //                                 {data.product_details.length > 1 && (
    //                                     <button
    //                                         type="button"
    //                                         onClick={() => removeItem(index)}
    //                                         className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 self-center"
    //                                     >
    //                                         X
    //                                     </button>
    //                                 )}
    //                             </div>
    //                         ))}
    //                         <button
    //                             type="button"
    //                             onClick={addItem}
    //                             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
    //                         >
    //                             Tambah Produk Lain
    //                         </button>

    //                         <div className="text-right text-lg font-bold text-gray-900 mt-4">
    //                             Total: Rp{calculateTotal().toLocaleString('id-ID')}
    //                         </div>

    //                         <div>
    //                             <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Catatan Tambahan (Opsional)</label>
    //                             <textarea
    //                                 id="notes"
    //                                 rows="2"
    //                                 value={data.notes}
    //                                 onChange={(e) => setData('notes', e.target.value)}
    //                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //                             ></textarea>
    //                             {errors.notes && <div className="text-red-500 text-sm mt-1">{errors.notes}</div>}
    //                         </div>

    //                         <div>
    //                             <button
    //                                 type="submit"
    //                                 disabled={processing}
    //                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    //                             >
    //                                 {processing ? 'Mengirim Pesanan...' : 'Kirim Pesanan'}
    //                             </button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </section>
    //         </>
    //     );
    // }
    // }
}