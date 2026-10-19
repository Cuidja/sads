import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SADS — Cuidado e Desenvolvimento',
  description:
    'A Secretaria de Ação e Desenvolvimento Social de Saúde/BA orienta caminhos de cuidado, cidadania, participação e acesso a direitos.',
  keywords: [
    'SADS Saúde Bahia',
    'assistência social',
    'CadÚnico',
    'CRAS',
    'Bolsa Família',
    'NUCA',
  ],
  applicationName: 'SADS — Cuidado e Desenvolvimento',
  authors: [{ name: 'Secretaria de Ação e Desenvolvimento Social' }],
  creator: 'Secretaria de Ação e Desenvolvimento Social',
  openGraph: {
    type: 'website',
    siteName: 'SADS — Cuidado e Desenvolvimento',
    title: 'SADS — Cuidado e Desenvolvimento',
    description:
      'Uma rede de acolhimento, orientação e participação para Saúde/BA.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SADS — Cuidado e Desenvolvimento',
    description:
      'Uma rede de acolhimento, orientação e participação para Saúde/BA.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
