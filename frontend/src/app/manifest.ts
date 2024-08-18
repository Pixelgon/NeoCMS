import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Pixelgon - Your vision, our code',
        short_name: "Pixelgon",
        description: "",
        start_url: '/',
        display: 'standalone',
        background_color: '#222629',
        theme_color: '#222629',
        icons: [
            {
                "src": "/images/icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/images/icon-512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
        ],
    }
}
