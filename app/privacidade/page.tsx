import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacidade — SADS',
  description: 'Nota de privacidade e uso responsável de imagens da experiência SADS.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-page-inner">
        <Link href="/" className="privacy-back"><ArrowLeft size={16} /> Voltar para a SADS</Link>
        <span className="privacy-symbol"><ShieldCheck size={27} /></span>
        <span className="section-kicker">SADS · nota de privacidade</span>
        <h1>Privacidade também é uma forma de cuidado.</h1>
        <p className="privacy-lead">Esta é uma nota de transparência da versão inicial da experiência digital da Secretaria de Ação e Desenvolvimento Social de Saúde/BA.</p>
        <div className="privacy-copy">
          <h2>O que esta versão faz</h2>
          <p>A página é informativa e, nesta etapa, não possui formulário, cadastro, login, área restrita, cookies não essenciais ou ferramentas de rastreamento. Não solicitamos nome, telefone, documento ou qualquer outro dado pessoal para navegar pelo conteúdo.</p>
          <h2>Imagens e vídeos</h2>
          <p>As imagens e vídeos devem ser utilizados apenas como material institucional autorizado. A publicação final depende da confirmação das autorizações de uso de imagem, com cuidado redobrado para pessoas identificáveis e menores de idade.</p>
          <h2>Antes do lançamento</h2>
          <p>O texto jurídico definitivo deve informar a identificação do controlador, a finalidade e a base legal de qualquer tratamento, o canal de contato, os direitos dos titulares e o contato do encarregado quando aplicável. Se um formulário for adicionado, ele deverá explicar sua finalidade e coletar consentimento quando necessário.</p>
          <h2>Informações institucionais</h2>
          <p>Endereço, telefone, horários, links oficiais e critérios de benefícios não são preenchidos com dados fictícios nesta versão. Esses campos devem ser confirmados pela SADS antes da publicação.</p>
        </div>
      </div>
    </main>
  );
}
