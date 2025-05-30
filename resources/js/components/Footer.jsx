import { FaWhatsapp, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi'; // Untuk ikon email jika diperlukan

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Kolom Kiri: Logo & Info Singkat */}
          <div className="md:col-span-4 lg:col-span-3">
            <img
              src="/logo-kebuliajb.svg" // Path ke logo Anda di folder public
              alt="Logo Nasi Kebuli Ajibarang"
              className="h-16 mb-4" // Sesuaikan ukuran logo jika perlu
            />
            <p className="text-sm mb-4">
              Nikmati kelezatan Nasi Kebuli khas Ajibarang dengan rempah pilihan dan kualitas terbaik. Pesan sekarang untuk acara spesial atau santap harian Anda!
            </p>
            <a
              href="https://wa.me/NOMOR_WHATSAPP_ANDA" // Ganti dengan link WhatsApp Anda
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="mr-2" /> Pesan via WhatsApp
            </a>
            <p className="text-xs mt-4 text-gray-500">
              Nasi Kebuli Ajibarang - Usaha Kuliner Terpercaya.
            </p>
          </div>

          {/* Kolom Tengah: Newsletter & Social Media */}
          <div className="md:col-span-8 lg:col-span-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Dapatkan Info & Promo Spesial
            </h3>
            <form className="flex flex-col sm:flex-row mb-3">
              <input
                type="email"
                placeholder="alamatemail@Anda.com"
                className="w-full sm:w-auto flex-grow px-4 py-2 mb-2 sm:mb-0 sm:mr-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                aria-label="Alamat Email"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mb-4">
              Kami tidak akan mengirim spam. Baca <a href="/kebijakan-privasi" className="underline hover:text-orange-500">kebijakan privasi</a> kami.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/NOMOR_WHATSAPP_ANDA" // Ganti dengan link WhatsApp Anda
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Nasi Kebuli Ajibarang"
                className="text-gray-500 hover:text-green-500 transition-colors"
              >
                <FaWhatsapp size={28} />
              </a>
              <a
                href="https://www.instagram.com/nasikebuliajb/" // DIUBAH: Link Instagram diperbarui
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Nasi Kebuli Ajibarang"
                className="text-gray-500 hover:text-pink-500 transition-colors"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="https://facebook.com/USERNAME_FACEBOOK_ANDA" // Ganti dengan link Facebook Anda jika ada
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Nasi Kebuli Ajibarang"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaFacebookF size={28} />
              </a>
              <a
                href="https://www.tiktok.com/@kebuliajb" // DIUBAH: Link TikTok diperbarui dan diaktifkan
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Nasi Kebuli Ajibarang"
                className="text-gray-500 hover:text-black transition-colors"
              >
                <FaTiktok size={28} />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Navigasi & Bantuan */}
          <div className="md:col-span-12 lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Navigasi</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/menu" className="hover:text-orange-500 transition-colors">Menu Kami</a></li>
                <li><a href="/testimoni" className="hover:text-orange-500 transition-colors">Testimoni</a></li>
                <li><a href="/galeri" className="hover:text-orange-500 transition-colors">Galeri</a></li>
                <li><a href="/tentang-kami" className="hover:text-orange-500 transition-colors">Tentang Kami</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Bantuan & Info</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/cara-pesan" className="hover:text-orange-500 transition-colors">Cara Pesan</a></li>
                <li><a href="/faq" className="hover:text-orange-500 transition-colors">FAQ</a></li>
                <li><a href="/hubungi-kami" className="hover:text-orange-500 transition-colors">Hubungi Kami</a></li>
                <li><a href="/kebijakan-privasi" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</a></li>
                <li><a href="/syarat-ketentuan" className="hover:text-orange-500 transition-colors">Syarat & Ketentuan</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar Copyright */}
      <div className="bg-slate-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="mb-2 sm:mb-0">
            &copy; {currentYear} Nasi Kebuli Ajibarang. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-4">
            {/* Anda bisa menambahkan link tambahan di sini jika perlu */}
            {/* <a href="/syarat-ketentuan" className="hover:text-orange-400 transition-colors">Syarat & Ketentuan</a> */}
            <p>Dibuat dengan ❤️ di Ajibarang</p>
          </div>
        </div>
      </div>
    </footer>
  );
}