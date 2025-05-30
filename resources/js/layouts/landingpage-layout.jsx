import { Link, usePage } from "@inertiajs/react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
    const menuItems = [
        { label: "Home", href: "/Home" },
        { label: "Produk", href: "/Produk" },
        { label: "Faq", href: "/FrequentlyAskedQuestions" },
        { label: "About", href: "/About" },
    ];

    const { url } = usePage();

    return (
        <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <img
                    src="/logo-kebuliajb.svg"
                    alt="Logo"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-semibold text-lg hidden sm:inline">
                    Nasi Kebuli Ajibarang
                </span>
            </div>

            {/* Menu */}
            <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
                {menuItems.map((item) => (
                    <li key={item.label}>
                        <Link
                            href={item.href}
                            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                                url === item.href
                                    ? "bg-orange-500 text-white"
                                    : "hover:text-orange-500"
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Icons */}
            <div className="flex items-center space-x-4">
                <IconButton icon={<FiSearch size={20} />} />
                <IconButton icon={<FiShoppingCart size={20} />} badgeCount={23} />
            </div>
        </nav>
    );
}

function IconButton({ icon, badgeCount }) {
    return (
        <div className="relative bg-white rounded-full p-2 shadow hover:shadow-md cursor-pointer">
            {icon}
            {badgeCount && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {badgeCount}
                </span>
            )}
        </div>
    );
}
