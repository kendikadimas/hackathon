<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"> {{-- Penting untuk POST request --}}

    <title>Admin Cashflow UMKM</title>

    @vite('resources/css/app.css')
</head>
<body class="bg-gray-100">
    <div id="cashflow-admin-root"></div>

    @vite('resources/js/app.jsx') {{-- Atau buat file JS terpisah untuk admin --}}
    <script type="text/javascript">
        import { createRoot } from 'react-dom/client';
        import CashflowManager from '../js/components/admin/CashflowManager'; // Sesuaikan path

        document.addEventListener('DOMContentLoaded', function () {
            const container = document.getElementById('cashflow-admin-root');
            if (container) {
                const root = createRoot(container);
                root.render(<CashflowManager />);
            }
        });
    </script>
</body>
</html>