import React from 'react';
import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'block w-full py-2 ps-3 pe-4 border-l-4 text-base font-medium transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 '
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}