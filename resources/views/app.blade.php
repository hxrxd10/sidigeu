<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(0.981 0.005 247.9);
            }

            html.dark {
                background-color: oklch(0.2 0.037 250);
            }
        </style>

        {{--
            Metadatos para compartir (Open Graph y Twitter). Se escriben aquí,
            en el servidor, porque WhatsApp, Facebook y los buscadores no
            ejecutan JavaScript: lo que no esté en este HTML no lo ven.
            Cada página los manda en la propiedad `meta`.
        --}}
        @php($meta = $page['props']['meta'] ?? [])
        @php($descripcion = $meta['descripcion'] ?? 'Actividades artísticas, deportivas y de formación de la Dirección General de Extensión Universitaria de la Universidad de San Carlos de Guatemala.')
        @php($titulo = $meta['titulo'] ?? config('app.name'))

        <meta name="description" content="{{ $descripcion }}">
        <meta property="og:site_name" content="{{ config('app.name') }}">
        <meta property="og:type" content="{{ $meta['tipo'] ?? 'website' }}">
        <meta property="og:locale" content="es_GT">
        <meta property="og:title" content="{{ $titulo }}">
        <meta property="og:description" content="{{ $descripcion }}">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ url($meta['imagen'] ?? '/images/og-sigeu.png') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $titulo }}">
        <meta name="twitter:description" content="{{ $descripcion }}">
        <meta name="twitter:image" content="{{ url($meta['imagen'] ?? '/images/og-sigeu.png') }}">

        @isset($meta['estructurado'])
            {{-- Datos estructurados schema.org: permiten que el buscador
                 muestre la actividad como un evento con su fecha y lugar. --}}
            <script type="application/ld+json">@json($meta['estructurado'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)</script>
        @endisset

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.png" type="image/png" sizes="128x128">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $titulo }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
