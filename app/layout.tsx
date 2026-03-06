import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Klemac Licença',
  description: 'Sistema de Controlo de Licenças de Software',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
