'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Compass,
  Eye,
  Instagram,
  Layers,
  Maximize2,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ASSET = {
  hero: '/assets/0ae966a0-550e-41d1-a62e-51b271ae9a7a.jpeg',
  sewing: '/assets/0b7af783-b6b4-4267-8530-592eef330c39.jpeg',
  nuca: '/assets/0cedd039-cf24-4107-ae1b-d4c055fc1544.jpeg',
  elder: '/assets/228b63a8-1342-431e-84f6-42e2b50aa1f3.jpeg',
  family: '/assets/2aba3377-7b0c-48c1-b51e-5b86356c833e.jpeg',
  team: '/assets/4653e007-3f33-4541-b362-6a74eae3d547.jpeg',
  room: '/assets/485ddfc7-e539-4976-a041-bd761139d871.jpeg',
  seniors: '/assets/486238f1-a139-46bd-9e60-cc8e31507564.jpeg',
  eca: '/assets/4f70c3ca-ff91-4928-9753-2337f869cd9d.jpeg',
  youth: '/assets/618b8352-e8dc-4104-95e2-9f6e90a81e1c.jpeg',
  crochet: '/assets/61d25170-08ac-4ba7-af4f-7061bbf92bf8.jpeg',
  logo: '/assets/6d09dac7-015e-40a6-8109-b5a3588519e6.jpeg',
  activity: '/assets/6dd72aee-4dec-4b1a-82f8-137360a35d6a.jpeg',
  street: '/assets/75e81aaa-44dd-4590-8cc4-10df2708673f.jpeg',
  workshop: '/assets/7f45a616-82b4-42eb-ae21-7e38c50479bd.jpeg',
  walk: '/assets/ab627dd3-bc4b-44b2-9182-6b4ae565e6fa.jpeg',
  crafts: '/assets/b8f7638f-5f17-4e59-8ffd-b06744c87107.jpeg',
  group: '/assets/c735da23-38b7-4e0f-b172-ad454d784b82.jpeg',
  portrait: '/assets/c81c09de-008e-43f6-85d9-ec3c584e6db5.jpeg',
  public: '/assets/f2e4c5af-e168-4c20-806d-fb305008da40.jpeg',
  videoOne: '/assets/WhatsApp Video 2026-10-19 at 19.05.08.mp4',
  videoTwo: '/assets/WhatsApp Video 2026-10-19 at 19.05.10.mp4',
} as const;

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: 'todos' | 'oficios' | 'nuca' | 'convivencia' | 'territorio';
  categoryLabel: string;
  note: string;
  details: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    image: ASSET.team,
    title: 'Equipe Multidisciplinar',
    category: 'convivencia',
    categoryLabel: 'Convivência',
    note: 'acolhimento profissional e humanizado',
    details: 'Equipe de assistentes sociais, psicólogos e técnicos unidos no atendimento às famílias de Saúde/BA.',
  },
  {
    id: '2',
    image: ASSET.hero,
    title: 'Juventude Comunitária',
    category: 'nuca',
    categoryLabel: 'Juventude / NUCA',
    note: 'encontro e fortalecimento da cidadania',
    details: 'Espaço de escuta ativa e acolhimento juvenil para novos caminhos e oportunidades.',
  },
  {
    id: '3',
    image: ASSET.sewing,
    title: 'Oficina de Costura e Confecção',
    category: 'oficios',
    categoryLabel: 'Ofícios & Renda',
    note: 'saberes manuais que viram autonomia',
    details: 'Capacitação prática em corte, costura e produção artesanal gerando oportunidades de emancipação.',
  },
  {
    id: '4',
    image: ASSET.nuca,
    title: 'Voz Ativa no NUCA',
    category: 'nuca',
    categoryLabel: 'Juventude / NUCA',
    note: 'protagonismo jovem em construção',
    details: 'Adolescentes articulando ideias, defendendo direitos e transformando a realidade local.',
  },
  {
    id: '5',
    image: ASSET.crochet,
    title: 'Trançados & Crochê Tradicional',
    category: 'oficios',
    categoryLabel: 'Ofícios & Renda',
    note: 'valorização da arte e cultura regional',
    details: 'Produção têxtil comunitária fomentando a economia solidária e o bem-estar coletivo.',
  },
  {
    id: '6',
    image: ASSET.family,
    title: 'Acolhimento Familiar & CadÚnico',
    category: 'convivencia',
    categoryLabel: 'Convivência',
    note: 'acesso a direitos para famílias',
    details: 'Inclusão e atualização cadastral permanente para garantir o acesso a programas de transferência de renda.',
  },
  {
    id: '7',
    image: ASSET.elder,
    title: 'Proteção e Convivência da Pessoa Idosa',
    category: 'convivencia',
    categoryLabel: 'Convivência',
    note: 'respeito, dignidade e apoio ao BPC',
    details: 'Orientação especializada para o Benefício de Prestação Continuada e garantia de dignidade aos idosos.',
  },
  {
    id: '8',
    image: ASSET.seniors,
    title: 'Roda de Memória e Vivências',
    category: 'convivencia',
    categoryLabel: 'Convivência',
    note: 'vínculos que fortalecem gerações',
    details: 'Momentos de partilha, lazer e integração comunitária que previnem o isolamento social.',
  },
  {
    id: '9',
    image: ASSET.eca,
    title: 'Mobilização pelos Direitos da Criança',
    category: 'nuca',
    categoryLabel: 'Juventude / NUCA',
    note: 'defesa integral e conscientização',
    details: 'Campanhas educativas sobre o Estatuto da Criança e do Adolescente em escolas e espaços públicos.',
  },
  {
    id: '10',
    image: ASSET.youth,
    title: 'Diálogos de Juventude',
    category: 'nuca',
    categoryLabel: 'Juventude / NUCA',
    note: 'a juventude como força do presente',
    details: 'Rodas de debate, planejamento de projetos sociais e liderança participativa jovem.',
  },
  {
    id: '11',
    image: ASSET.room,
    title: 'Espaço de Atendimento CRAS',
    category: 'territorio',
    categoryLabel: 'Território',
    note: 'a porta de entrada da assistência',
    details: 'Salas preparadas para atendimento privativo, acolhimento sigiloso e orientação técnica cuidadosa.',
  },
  {
    id: '12',
    image: ASSET.street,
    title: 'Presença no Território',
    category: 'territorio',
    categoryLabel: 'Território',
    note: 'assistência onde as pessoas vivem',
    details: 'Busca ativa e visitas domiciliares alcançando comunidades urbanas e rurais de Saúde/BA.',
  },
  {
    id: '13',
    image: ASSET.activity,
    title: 'Dinâmicas e Convivência Coletiva',
    category: 'convivencia',
    categoryLabel: 'Convivência',
    note: 'movimento, afeto e integração',
    details: 'Oficinas dinâmicas que incentivam a expressão corporal, a cooperação e a vida comunitária ativa.',
  },
  {
    id: '14',
    image: ASSET.workshop,
    title: 'Oficina Prática de Produção',
    category: 'oficios',
    categoryLabel: 'Ofícios & Renda',
    note: 'aprender fazendo, construir juntos',
    details: 'Espaço colaborativo de aprendizado e desenvolvimento de produtos utilitários sustentáveis.',
  },
  {
    id: '15',
    image: ASSET.walk,
    title: 'Caminhada Cidadã',
    category: 'territorio',
    categoryLabel: 'Território',
    note: 'a rede em marcha pelas ruas',
    details: 'Mobilização popular e comunitária celebrando conquistas sociais e reforçando os canais de apoio.',
  },
  {
    id: '16',
    image: ASSET.crafts,
    title: 'Exposição de Trabalhos Manuais',
    category: 'oficios',
    categoryLabel: 'Ofícios & Renda',
    note: 'criatividade que gera autoestima',
    details: 'Feiras e mostras públicas dos produtos desenvolvidos pelos participantes das oficinas da SADS.',
  },
  {
    id: '17',
    image: ASSET.group,
    title: 'Rede de Apoio Comunitária',
    category: 'convivencia',
    categoryLabel: 'Convivência',
    note: 'ninguém caminha sozinho',
    details: 'Fortalecimento de redes informais e comunitárias que amparam indivíduos e famílias em vulnerabilidade.',
  },
  {
    id: '18',
    image: ASSET.portrait,
    title: 'Escuta Humanizada e Singular',
    category: 'territorio',
    categoryLabel: 'Território',
    note: 'cada história merece respeito',
    details: 'Olhar dedicado a cada cidadão, garantindo que o atendimento considere o contexto de vida individual.',
  },
  {
    id: '19',
    image: ASSET.public,
    title: 'Orientação de Direitos Sociais',
    category: 'territorio',
    categoryLabel: 'Território',
    note: 'informação clara e acessível',
    details: 'Esclarecimento transparente sobre critérios de benefícios, documentos necessários e prazos legais.',
  },
];

const services = [
  {
    number: '01',
    title: 'CadÚnico',
    copy: 'Cadastre ou atualize os dados da sua família para abrir caminhos de acesso aos programas sociais municipais, estaduais e federais.',
    image: ASSET.family,
    tag: 'Base Cidadã',
  },
  {
    number: '02',
    title: 'Bolsa Família',
    copy: 'Encontre orientação clara para entender as condicionalidades, atualização do benefício e os próximos passos para a sua família.',
    image: ASSET.public,
    tag: 'Renda & Dignidade',
  },
  {
    number: '03',
    title: 'CRAS',
    copy: 'Centro de Referência de Assistência Social: um ponto de acolhimento, escuta profissionalizada e fortalecimento de vínculos.',
    image: ASSET.room,
    tag: 'Porta de Entrada',
  },
  {
    number: '04',
    title: 'BPC / LOAS',
    copy: 'Receba informação completa sobre o Benefício de Prestação Continuada para idosos e pessoas com deficiência e como solicitar.',
    image: ASSET.elder,
    tag: 'Proteção Contínua',
  },
  {
    number: '05',
    title: 'Benefícios Eventuais',
    copy: 'Conheça os auxílios e caminhos de apoio para situações de vulnerabilidade temporária, calamidade ou emergência familiar.',
    image: ASSET.seniors,
    tag: 'Apoio Emergencial',
  },
];

function SectionTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`section-tag${light ? ' section-tag-light' : ''}`}>
      <span className="section-tag-dot" />
      {children}
    </span>
  );
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CursorAura() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-50);
  const y = useMotionValue(-50);
  const springX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.25 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const finePointer = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(finePointer.matches);
    update();
    finePointer.addEventListener('change', update);
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 13);
      y.set(event.clientY - 13);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      finePointer.removeEventListener('change', update);
      window.removeEventListener('pointermove', move);
    };
  }, [reduce, x, y]);

  if (!enabled || reduce) return null;
  return <motion.div aria-hidden="true" className="cursor-aura" style={{ x: springX, y: springY }} />;
}

export default function HomePage() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(true);
  const [activeVideo, setActiveVideo] = useState<'one' | 'two'>('one');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const progressScale = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.2 });

  const heroY = useTransform(heroProgress, [0, 1], ['0%', '16%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.65, 1], [1, 1, 0]);
  const stageY = useTransform(heroProgress, [0, 1], ['0%', '-15%']);
  const stageRotate = useTransform(heroProgress, [0, 1], [0, 7]);
  const heroCardRotateMain = useTransform(heroProgress, [0, 1], [2, -2]);
  const heroCardRotateSmall = useTransform(heroProgress, [0, 1], [-7, 2]);

  const closeMenu = () => setMenuOpen(false);

  const filteredGallery =
    selectedCategory === 'todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredGallery.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (event.key === 'Escape') {
          setLightboxIndex(null);
        } else if (event.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredGallery.length : null));
        } else if (event.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null
          );
        }
      } else if (menuOpen && event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, menuOpen, filteredGallery.length]);

  return (
    <main id="conteudo" tabIndex={-1} className="main-wrapper">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <motion.div
        className="progress-line"
        style={reduce ? { scaleX: 0 } : { scaleX: progressScale }}
        aria-hidden="true"
      />
      <CursorAura />

      {/* AMBIENT LIGHT GLOWS */}
      <div className="ambient-glow ambient-glow-top-left" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-center" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-bottom-right" aria-hidden="true" />

      {/* FLOATING GLASS NAVIGATION */}
      <header className="site-nav glass-nav" aria-label="Navegação principal">
        <a href="#inicio" className="brand-lockup" aria-label="SADS — início" onClick={closeMenu}>
          <Image
            className="brand-logo"
            src={ASSET.logo}
            alt="Saúde — Secretaria de Ação e Desenvolvimento Social"
            width={1055}
            height={266}
            priority
          />
        </a>
        <nav
          id="mobile-navigation"
          className={`nav-links${menuOpen ? ' is-open' : ''}`}
          aria-label="Seções da página"
        >
          <a href="#inicio" onClick={closeMenu}>
            Início
          </a>
          <a href="#acervo" onClick={closeMenu}>
            Acervo Vivo
          </a>
          <a href="#servicos" onClick={closeMenu}>
            Serviços
          </a>
          <a href="#nuca" onClick={closeMenu}>
            NUCA
          </a>
          <a href="#videos" onClick={closeMenu}>
            Registros
          </a>
          <a href="#apoio" onClick={closeMenu}>
            Apoio
          </a>
        </nav>
        <a className="nav-cta glass-cta" href="#contato" onClick={closeMenu}>
          Canais oficiais <ArrowUpRight size={15} />
        </a>
        <button
          ref={menuButtonRef}
          className="menu-toggle glass-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* HERO SECTION WITH 3D GLASS STACK & AMBIENCE */}
      <section id="inicio" ref={heroRef} className="hero" aria-labelledby="hero-title">
        <motion.div className="hero-media" style={reduce ? undefined : { y: heroY }}>
          <Image
            src={ASSET.hero}
            alt="Ação comunitária da juventude e equipe SADS"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="hero-grid-overlay" aria-hidden="true" />

        <div className="hero-inner">
          <motion.div className="hero-copy" style={reduce ? undefined : { opacity: heroOpacity }}>
            <div className="glass-pill-badge">
              <span className="live-status-dot" />
              <span>SADS · SAÚDE / BA · REDE ATIVA</span>
            </div>
            <h1 id="hero-title">
              Cuidado que <em>transforma</em>.<br />Desenvolvimento que inclui.
            </h1>
            <p className="hero-intro">
              Uma rede viva que acolhe pessoas, assegura direitos fundamentais e constrói, junto com a comunidade de
              Saúde/BA, caminhos reais de autonomia e cidadania.
            </p>
            <div className="hero-actions">
              <a className="button button-primary glass-glow-button" href="#acervo">
                Explorar Acervo de Ações <ArrowDown size={16} />
              </a>
              <a className="button button-ghost glass-ghost-button" href="#servicos">
                Serviços & Direitos <ArrowUpRight size={16} />
              </a>
            </div>

            {/* QUICK STATS HUD */}
            <div className="hero-hud-stats">
              <div className="hud-stat-item">
                <span className="hud-num">19+</span>
                <span className="hud-label">Ações Documentadas</span>
              </div>
              <div className="hud-divider" />
              <div className="hud-stat-item">
                <span className="hud-num">5</span>
                <span className="hud-label">Serviços Essenciais</span>
              </div>
              <div className="hud-divider" />
              <div className="hud-stat-item">
                <span className="hud-num">NUCA</span>
                <span className="hud-label">Juventude em Ação</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D FLOATING GLASS STAGE */}
        <motion.div
          className="hero-stage"
          style={reduce ? undefined : { y: stageY, rotate: stageRotate }}
          aria-hidden="true"
        >
          <div className="hero-stage-grid" />
          <div className="hero-glass-panel glass-hud-box">
            <div className="glass-hud-top">
              <span className="glass-tag">ARQUIVO TERRITORIAL</span>
              <span className="pulse-dot" />
            </div>
            <strong>
              presença viva<br />no território
            </strong>
            <small>Saúde · Bahia · 2026</small>
            <div className="glass-hud-meter">
              <span style={{ width: '88%' }} />
            </div>
          </div>

          <motion.div
            className="hero-photo-card hero-photo-main glass-frame-card"
            style={reduce ? undefined : { rotate: heroCardRotateMain }}
          >
            <Image src={ASSET.team} alt="" fill sizes="(max-width: 700px) 42vw, 23vw" />
            <span className="glass-badge-photo">Equipe & Território</span>
          </motion.div>

          <motion.div
            className="hero-photo-card hero-photo-small glass-frame-card"
            style={reduce ? undefined : { rotate: heroCardRotateSmall }}
          >
            <Image src={ASSET.crafts} alt="" fill sizes="(max-width: 700px) 30vw, 15vw" />
            <span className="glass-badge-photo">Oficinas / Criação</span>
          </motion.div>

          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
        </motion.div>

        <div className="hero-note glass-card">
          <div className="glass-note-icon">
            <Compass size={16} />
          </div>
          <div>
            <strong>Presença no Território</strong>
            <p>Escuta atenta e mobilização contínua para que cada história encontre uma porta de entrada digna.</p>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span /> 01 / 05 · ACOLHIDA
        </div>
      </section>

      {/* INFINITE GLASS MARQUEE */}
      <div className="glass-marquee-wrap" aria-hidden="true">
        <div className="glass-marquee-track">
          <span>ACOLHIMENTO INTEGRAL</span>
          <span className="marquee-dot">◆</span>
          <span>PROTAGONISMO JUVENIL</span>
          <span className="marquee-dot">◆</span>
          <span>FORTALECIMENTO DE VÍNCULOS</span>
          <span className="marquee-dot">◆</span>
          <span>AUTONOMIA & OFÍCIOS</span>
          <span className="marquee-dot">◆</span>
          <span>ACESSO A DIREITOS</span>
          <span className="marquee-dot">◆</span>
          <span>SAÚDE · BAHIA</span>
          <span className="marquee-dot">◆</span>
          <span>ACOLHIMENTO INTEGRAL</span>
          <span className="marquee-dot">◆</span>
          <span>PROTAGONISMO JUVENIL</span>
          <span className="marquee-dot">◆</span>
          <span>FORTALECIMENTO DE VÍNCULOS</span>
          <span className="marquee-dot">◆</span>
          <span>AUTONOMIA & OFÍCIOS</span>
          <span className="marquee-dot">◆</span>
        </div>
      </div>

      {/* STORY & HISTORIA SECTION WITH GLASS STATEMENT */}
      <section id="historia" className="section section-paper" aria-labelledby="historia-title">
        <div className="section-grid">
          <Reveal className="section-header">
            <SectionTag>01 / Acolhida e Presença</SectionTag>
            <h2 id="historia-title">
              A política pública começa quando alguém <em>escuta.</em>
            </h2>
            <p>
              Na SADS de Saúde/BA, a assistência social não é burocracia: é presença humana. Uma conversa individualizada,
              uma orientação clara de direitos, uma oficina que devolve a confiança e uma rede atuante para que ninguém
              fique desamparado.
            </p>
            <p>
              Organizamos as portas de entrada de forma transparente para que você identifique rapidamente o serviço que
              atende à sua necessidade.
            </p>

            <div className="statement-glass-box glass-card">
              <Sparkles size={20} className="sparkle-icon" />
              <p>
                <strong>Compromisso SADS:</strong> Garantir que cada cidadão e família de Saúde/BA tenha acesso
                simplificado aos seus direitos com dignidade e respeito.
              </p>
            </div>
          </Reveal>

          <Reveal className="story-visual" delay={0.12}>
            <div className="image-frame glass-image-frame">
              <Image
                src={ASSET.team}
                alt="Equipe SADS reunida em frente à sede"
                fill
                sizes="(max-width: 980px) 92vw, 54vw"
              />
            </div>
            <div className="image-frame glass-image-frame">
              <Image
                src={ASSET.sewing}
                alt="Oficina de costura com máquina e peças coloridas"
                fill
                sizes="(max-width: 980px) 60vw, 30vw"
              />
            </div>
            <div className="story-stamp glass-stamp">
              Cuidado
              <br />
              em rede
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPANDED 3D WORK STACK & ACERVO VIVO GALLERY (TODAS AS FOTOS) */}
      <section id="acervo" className="section archive-section" aria-labelledby="acervo-title">
        <div className="archive-head">
          <Reveal className="section-header">
            <SectionTag light>Acervo Vivo · 19 Registros</SectionTag>
            <h2 id="acervo-title" className="display">
              O trabalho real que acontece no <em>cotidiano.</em>
            </h2>
          </Reveal>
          <Reveal className="archive-intro" delay={0.1}>
            <span className="archive-index">MEMÓRIA VISUAL · SAÚDE/BA</span>
            <p>
              Não usamos banco de imagens genérico. Cada fotografia documenta pessoas, encontros, oficinas e ações
              reais construídas junto com a comunidade.
            </p>
          </Reveal>
        </div>

        {/* CATEGORY FILTER TABS IN GLASS */}
        <div className="gallery-filter-bar glass-filter-bar" role="tablist" aria-label="Filtrar acervo por categoria">
          {[
            { key: 'todos', label: 'Todas as Ações (19)' },
            { key: 'oficios', label: 'Oficinas & Renda (4)' },
            { key: 'nuca', label: 'Juventude & NUCA (4)' },
            { key: 'convivencia', label: 'Convivência & Vínculos (6)' },
            { key: 'territorio', label: 'Território & Presença (5)' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`filter-btn ${selectedCategory === cat.key ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
              role="tab"
              aria-selected={selectedCategory === cat.key}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D WORK STACK GRID */}
        <motion.div layout className="work-stack-grid">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                className="work-card-wrapper"
              >
                <div
                  className="work-card glass-work-card"
                  onClick={() => openLightbox(index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver detalhes de ${item.title}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                >
                  <div className="work-card-media">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="card-glass-sheen" />
                    <span className="work-card-zoom-pill">
                      <Maximize2 size={13} /> Inspecionar
                    </span>
                  </div>

                  <div className="work-card-content glass-card-dock">
                    <div className="work-card-top-row">
                      <span className="work-category-badge">{item.categoryLabel}</span>
                      <span className="work-index-num">#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="work-card-title">{item.title}</h3>
                    <p className="work-card-note">{item.note}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* LIGHTBOX MODAL DE VIDRO DE ALTA IMERSÃO */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <motion.div
            className="lightbox-overlay glass-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="lightbox-content glass-modal-box"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close glass-circle-btn"
                onClick={closeLightbox}
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>

              <div className="lightbox-media-wrap">
                <Image
                  src={filteredGallery[lightboxIndex].image}
                  alt={filteredGallery[lightboxIndex].title}
                  fill
                  className="lightbox-image"
                  sizes="(max-width: 1024px) 95vw, 75vw"
                />
              </div>

              <div className="lightbox-footer glass-footer-bar">
                <div className="lightbox-info">
                  <span className="lightbox-tag">{filteredGallery[lightboxIndex].categoryLabel}</span>
                  <h2>{filteredGallery[lightboxIndex].title}</h2>
                  <p>{filteredGallery[lightboxIndex].details}</p>
                </div>

                <div className="lightbox-controls">
                  <button
                    type="button"
                    className="lightbox-nav-btn glass-circle-btn"
                    onClick={prevLightbox}
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="lightbox-counter">
                    {lightboxIndex + 1} / {filteredGallery.length}
                  </span>
                  <button
                    type="button"
                    className="lightbox-nav-btn glass-circle-btn"
                    onClick={nextLightbox}
                    aria-label="Próxima foto"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SERVICES SECTION WITH 3D GLASS CARDS */}
      <section id="servicos" className="section section-blue" aria-labelledby="servicos-title">
        <div className="service-wrap">
          <Reveal className="service-head">
            <div className="section-header">
              <SectionTag>02 / Acesso & Direitos</SectionTag>
              <h2 id="servicos-title" className="display">
                Cada necessidade tem um <em>caminho.</em>
              </h2>
            </div>
            <p className="lead">
              Comece pelo que você precisa. A equipe da SADS orienta passo a passo o acesso e confirma a documentação
              necessária para cada caso.
            </p>
          </Reveal>

          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.06} className="service-card glass-service-card">
                <div className="service-card-image">
                  <Image src={service.image} alt="" fill sizes="(max-width: 640px) 92vw, 30vw" />
                </div>
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <span className="service-tag-chip">{service.tag}</span>
                  <span className="service-icon glass-icon">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
                <div className="service-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <span className="service-card-link">
                  <CircleHelp size={14} /> Detalhes em validação oficial
                </span>
              </Reveal>
            ))}
          </div>

          <div className="service-footnote glass-footnote">
            <CircleHelp size={18} />
            <span>
              Canais, horários e requisitos documentais de cada benefício devem ser confirmados com a unidade da SADS
              antes da publicação definitiva.
            </span>
          </div>
        </div>
      </section>

      {/* NUCA / JUVENTUDE SECTION WITH DYNAMIC GLASS COLLAGE */}
      <section id="nuca" className="section section-dark" aria-labelledby="nuca-title">
        <div className="nuca-layout">
          <Reveal className="nuca-collage">
            <div className="image-frame nuca-photo-main glass-frame">
              <Image
                src={ASSET.nuca}
                alt="Jovens do NUCA em atividade de participação"
                fill
                sizes="(max-width: 980px) 70vw, 46vw"
              />
            </div>
            <div className="image-frame nuca-photo-small glass-frame">
              <Image
                src={ASSET.youth}
                alt="Juventude reunida em atividade coletiva"
                fill
                sizes="(max-width: 980px) 55vw, 30vw"
              />
            </div>
            <div className="image-frame nuca-photo-detail glass-frame">
              <Image
                src={ASSET.eca}
                alt="Campanha pelos direitos de crianças e adolescentes"
                fill
                sizes="(max-width: 980px) 38vw, 20vw"
              />
            </div>
            <div className="nuca-floating-badge glass-badge">
              <Sparkles size={14} /> voz · protagonismo · futuro
            </div>
          </Reveal>

          <Reveal className="nuca-copy" delay={0.12}>
            <SectionTag light>03 / Protagonismo</SectionTag>
            <h2 id="nuca-title" className="display">
              A juventude não é só futuro. É <em>agora.</em>
            </h2>
            <span className="highlight">Voz • Participação • Cidadania</span>
            <p className="lead">
              O Núcleo de Cidadania de Adolescentes (NUCA) abre espaço para que os jovens participem ativamente,
              proponham ações para o município e se formem líderes conscientes de seus direitos.
            </p>
            <p className="lead">
              Acompanhe as reuniões e descubra como fazer parte. Canal informado pelo cliente:{' '}
              <strong>@nuca.saude</strong>.
            </p>
            <a
              className="social-link glass-social-link"
              href="https://www.instagram.com/nuca.saude/"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir o Instagram do NUCA em nova aba"
            >
              <span>
                <Instagram size={17} />
              </span>{' '}
              Conhecer o NUCA no Instagram <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* CINEMA GLASS VIDEO SECTION (AMBOS OS VÍDEOS) */}
      <section id="videos" className="section section-paper" aria-labelledby="registro-title">
        <div className="media-band">
          <Reveal className="section-header">
            <SectionTag>04 / Registros em Campo</SectionTag>
            <h2 id="registro-title">
              O cuidado também se constrói em <em>movimento.</em>
            </h2>
            <p>
              Veja os registros em vídeo das oficinas, encontros e dinâmicas que aproximam pessoas e dão vida à rede no
              território de Saúde/BA.
            </p>

            <div className="video-selector-card glass-card">
              <span className="selector-title">Selecione o registro para reproduzir:</span>
              <div className="video-btn-group" role="tablist">
                <button
                  type="button"
                  className={`video-select-btn ${activeVideo === 'one' ? 'is-active' : ''}`}
                  onClick={() => setActiveVideo('one')}
                  role="tab"
                  aria-selected={activeVideo === 'one'}
                >
                  <span className="btn-indicator" />
                  <div>
                    <strong>Registro 01</strong>
                    <small>Oficinas Comunitárias & Convivência</small>
                  </div>
                </button>

                <button
                  type="button"
                  className={`video-select-btn ${activeVideo === 'two' ? 'is-active' : ''}`}
                  onClick={() => setActiveVideo('two')}
                  role="tab"
                  aria-selected={activeVideo === 'two'}
                >
                  <span className="btn-indicator" />
                  <div>
                    <strong>Registro 02</strong>
                    <small>Ações Coletivas no Território</small>
                  </div>
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal className="video-card glass-cinema-card" delay={0.1}>
            <div className="video-header-bar glass-dock-bar">
              <span className="video-caption">
                <span className="rec-indicator" /> Território de Saúde/BA · {activeVideo === 'one' ? 'Vídeo 01' : 'Vídeo 02'}
              </span>
              <span className="video-format-pill">1080p MP4</span>
            </div>

            <video
              key={activeVideo}
              controls
              muted
              playsInline
              preload="metadata"
              poster={activeVideo === 'one' ? ASSET.workshop : ASSET.youth}
              aria-label={`Registro em vídeo ${activeVideo === 'one' ? '01' : '02'} da SADS`}
              className="cinema-video-element"
            >
              <source src={activeVideo === 'one' ? ASSET.videoOne : ASSET.videoTwo} type="video/mp4" />
              Seu navegador não suporta reprodução de vídeo.
            </video>
          </Reveal>
        </div>
      </section>

      {/* APOIO & PRÓXIMOS PASSOS SECTION */}
      <section id="apoio" className="section section-paper" aria-labelledby="apoio-title">
        <div className="benefits-layout">
          <Reveal className="section-header">
            <SectionTag>05 / Orientação & Apoio</SectionTag>
            <h2 id="apoio-title">
              Quando você precisa, a rede está <em>presente.</em>
            </h2>
            <p>
              Para acessar um serviço ou benefício, não é necessário saber todas as regras de uma só vez. O primeiro
              passo é buscar a orientação correta.
            </p>
            <div className="validation-card glass-card">
              <ShieldCheck size={20} className="validation-icon" />
              <div>
                <strong>Informações em validação técnica</strong>
                <p>
                  Critérios específicos para benefícios eventuais (como auxílio natalidade, aluguel social ou
                  emergencial) devem ser consultados diretamente com o CRAS.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="steps" delay={0.1}>
            <div className="step glass-step-card">
              <span className="step-num">1</span>
              <div>
                <h3>Identifique sua necessidade</h3>
                <p>CadÚnico, Bolsa Família, BPC, orientações do CRAS, oficinas de geração de renda ou apoio ao jovem.</p>
              </div>
            </div>
            <div className="step glass-step-card">
              <span className="step-num">2</span>
              <div>
                <h3>Procure a unidade da SADS</h3>
                <p>Confirme com a equipe local qual o ponto de atendimento ou profissional responsável pelo seu caso.</p>
              </div>
            </div>
            <div className="step glass-step-card">
              <span className="step-num">3</span>
              <div>
                <h3>Receba orientação completa</h3>
                <p>Apresente seus documentos e receba o encaminhamento adequado com clareza sobre datas e prazos.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section id="contato" className="section contact-section" aria-labelledby="contato-title">
        <div className="contact-inner glass-contact-box">
          <Reveal>
            <SectionTag light>Contato & Atendimento</SectionTag>
            <h2 id="contato-title" className="display">
              Vamos encontrar o próximo <em>passo.</em>
            </h2>
          </Reveal>
          <Reveal className="contact-note" delay={0.1}>
            <strong>Canais Oficiais</strong>
            <p>
              Endereço físico, linhas telefônicas e horários de funcionamento do município de Saúde/BA serão atualizados
              conforme confirmação oficial.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <strong>SADS</strong>
            <p>
              Secretaria de Ação e Desenvolvimento Social
              <br />
              Município de Saúde · Bahia
            </p>
          </div>
          <nav className="footer-links" aria-label="Links do rodapé">
            <a href="#acervo">Acervo Vivo</a>
            <a href="#servicos">Serviços</a>
            <a href="#nuca">NUCA</a>
            <a href="#videos">Registros</a>
            <a href="#apoio">Apoio</a>
            <Link href="/privacidade">Privacidade</Link>
          </nav>
        </div>

        <details id="privacidade" className="footer-privacy glass-card">
          <summary>Privacidade, Proteção de Dados e Uso de Imagem</summary>
          <p>
            Esta plataforma institucional não emprega rastreadores, scripts de publicidade ou cookies não essenciais por
            padrão. Os registros em imagem e vídeo são utilizados com propósito estritamente institucional e educativo,
            respeitando a privacidade e dignidade de todos os cidadãos atendidos.
          </p>
        </details>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SADS · Secretaria de Ação e Desenvolvimento Social · Saúde/BA</span>
          <span>Desenvolvimento institucional inclusivo e acessível.</span>
        </div>
      </footer>

      {/* PRIVACY COOKIELESS BANNER */}
      <AnimatePresence>
        {privacyOpen && (
          <motion.aside
            className="privacy-banner glass-banner"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            aria-label="Aviso de privacidade"
          >
            <h2>Privacidade & Cuidado</h2>
            <p>
              Esta versão não coleta seus dados pessoais nem instala rastreadores. Sua navegação é 100% segura e
              respeitosa.
            </p>
            <div className="privacy-actions">
              <Link href="/privacidade" onClick={() => setPrivacyOpen(false)}>
                Ver diretrizes
              </Link>
              <button type="button" onClick={() => setPrivacyOpen(false)}>
                Entendi <Check size={13} />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
