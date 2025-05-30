// resources/js/app.jsx (PASTIKAN INI .jsx, BUKAN .tsx)

import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance'; // Pastikan path ini benar

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Karena app.jsx, maka kita harusnya hanya mencari .jsx
        const pages = import.meta.glob('./Pages/**/*.jsx'); // <<< PASTIKAN INI .jsx
        const pagePath = `./Pages/${name}.jsx`;             // <<< PASTIKAN INI .jsx

        // Tambahkan console log untuk debugging yang lebih spesifik
        console.log(`[Inertia Resolve] Trying to resolve page: '${name}'`);
        console.log('[Inertia Resolve] Globbed pages:', Object.keys(pages));
        console.log(`[Inertia Resolve] Expected page path: '${pagePath}'`);


        if (!pages[pagePath]) {
            console.error(`[Inertia Resolve ERROR] Page not found: '${pagePath}'.`);
            console.error('[Inertia Resolve ERROR] Check component name, extension, and case-sensitivity.');
            throw new Error(`Page not found: ${pagePath}. Check component name and extension.`);
        }

        return pages[pagePath]();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();