'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, CircleHelp, Instagram, Menu, X } from 'lucide-react';
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

const services = [
  { number: '01', title: 'CadÚnico', copy: 'Cadastre ou atualize os dados da sua família para abrir caminhos de acesso a programas sociais.', image: ASSET.family },
  { number: '02', title: 'Bolsa Família', copy: 'Encontre orientação para entender o programa e os próximos passos da sua família.', image: ASSET.public },
  { number: '03', title: 'CRAS', copy: 'Um ponto de acolhimento, escuta e orientação para você e sua comunidade.', image: ASSET.room },
  { number: '04', title: 'BPC', copy: 'Receba informação sobre o Benefício de Prestação Continuada e como buscar orientação.', image: ASSET.elder },
  { number: '05', title: 'Benefícios eventuais', copy: 'Conheça os caminhos de apoio para situações que pedem uma resposta da rede.', image: ASSET.seniors },
];

const archiveItems = [
  { image: ASSET.family, label: 'Acolhimento', note: 'cuidado que chega junto' },
  { image: ASSET.activity, label: 'Convivência', note: 'vínculos que permanecem' },
  { image: ASSET.street, label: 'Território', note: 'presença onde a vida acontece' },
  { image: ASSET.crochet, label: 'Autonomia', note: 'saberes que viram possibilidade' },
  { image: ASSET.walk, label: 'Participação', note: 'a rede em movimento' },
  { image: ASSET.crafts, label: 'Ofício', note: 'fazer também é cuidar' },
  { image: ASSET.group, label: 'Rede', note: 'ninguém constrói sozinho' },
  { image: ASSET.portrait, label: 'Escuta', note: 'cada história importa' },
];

function SectionTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`section-tag${light ? ' section-tag-light' : ''}`}>{children}</span>;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const progressScale = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.2 });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '16%']);
  const heroOpacity = useTransform(heroProgress, [0, .65, 1], [1, 1, 0]);
  const stageY = useTransform(heroProgress, [0, 1], ['0%', '-15%']);
  const stageRotate = useTransform(heroProgress, [0, 1], [0, 7]);
  const heroCardRotateMain = useTransform(heroProgress, [0, 1], [2, -2]);
  const heroCardRotateSmall = useTransform(heroProgress, [0, 1], [-7, 2]);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  return (
    <main id="conteudo" tabIndex={-1}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <motion.div className="progress-line" style={reduce ? { scaleX: 0 } : { scaleX: progressScale }} aria-hidden="true" />
      <CursorAura />

      <header className="site-nav" aria-label="Navegação principal">
        <a href="#inicio" className="brand-lockup" aria-label="SADS — início" onClick={closeMenu}>
          <Image className="brand-logo" src={ASSET.logo} alt="Saúde — Secretaria de Ação e Desenvolvimento Social" width={1055} height={266} priority />
        </a>
        <nav id="mobile-navigation" className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Seções da página">
          <a href="#inicio" onClick={closeMenu}>Início</a>
          <a href="#acoes" onClick={closeMenu}>Ações</a>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#nuca" onClick={closeMenu}>NUCA</a>
          <a href="#apoio" onClick={closeMenu}>Apoio</a>
        </nav>
        <a className="nav-cta" href="#contato" onClick={closeMenu}>Canais oficiais <ArrowUpRight size={15} /></a>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((current) => !current)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <section id="inicio" ref={heroRef} className="hero" aria-labelledby="hero-title">
        <motion.div className="hero-media" style={reduce ? undefined : { y: heroY }}>
          <Image src={ASSET.hero} alt="Jovens reunidos em frente a uma porta amarela, em uma ação comunitária" fill priority sizes="100vw" />
        </motion.div>
        <div className="hero-inner">
          <motion.div className="hero-copy" style={reduce ? undefined : { opacity: heroOpacity }}>
            <span className="kicker">SADS · Saúde / BA</span>
            <h1 id="hero-title">Cuidado que <em>transforma</em>. Desenvolvimento que inclui.</h1>
            <p className="hero-intro">Uma rede pública que acolhe pessoas, aproxima direitos e constrói, junto com a comunidade, o próximo passo.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#servicos">Encontrar um serviço <ArrowDown size={16} /></a>
              <a className="button button-ghost" href="#historia">Conhecer a SADS <ArrowUpRight size={16} /></a>
            </div>
          </motion.div>
        </div>
        <motion.div className="hero-stage" style={reduce ? undefined : { y: stageY, rotate: stageRotate }} aria-hidden="true">
          <div className="hero-stage-grid" />
          <div className="hero-glass-panel"><span>ARQUIVO SADS</span><strong>presença<br />no território</strong><small>01 — 04</small></div>
          <motion.div className="hero-photo-card hero-photo-main" style={reduce ? undefined : { rotate: heroCardRotateMain }}>
            <Image src={ASSET.team} alt="" fill sizes="(max-width: 700px) 42vw, 23vw" />
            <span>rede / 2026</span>
          </motion.div>
          <motion.div className="hero-photo-card hero-photo-small" style={reduce ? undefined : { rotate: heroCardRotateSmall }}>
            <Image src={ASSET.crafts} alt="" fill sizes="(max-width: 700px) 30vw, 15vw" />
            <span>feito à mão</span>
          </motion.div>
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
        </motion.div>
        <div className="hero-note"><strong>Presença no território</strong>Escuta, orientação e participação para que cada pessoa encontre um caminho possível.</div>
        <div className="hero-index" aria-hidden="true"><span /> 01 / 04</div>
      </section>

      <section id="historia" className="section section-paper" aria-labelledby="historia-title">
        <div className="section-grid">
          <Reveal className="section-header">
            <SectionTag>01 / Acolhida</SectionTag>
            <h2 id="historia-title">A política pública começa quando alguém <em>escuta.</em></h2>
            <p>Na SADS, o cuidado é feito de presença: uma conversa, uma orientação, uma oficina, uma rede que se move para não deixar ninguém para trás.</p>
            <p>Esta é uma página de caminhos. Você pode começar pela sua necessidade e encontrar a porta de entrada mais próxima da sua realidade.</p>
          </Reveal>
          <Reveal className="story-visual" delay={.12}>
            <div className="image-frame"><Image src={ASSET.team} alt="Equipe reunida em frente a um espaço de atendimento" fill sizes="(max-width: 980px) 92vw, 54vw" /></div>
            <div className="image-frame"><Image src={ASSET.sewing} alt="Oficina com máquina de costura e peças coloridas" fill sizes="(max-width: 980px) 60vw, 30vw" /></div>
            <div className="story-stamp">Cuidado<br />em movimento</div>
          </Reveal>
        </div>
      </section>

      <section id="acoes" className="section archive-section" aria-labelledby="acoes-title">
        <div className="archive-head">
          <Reveal className="section-header">
            <SectionTag light>Arquivo / Ações</SectionTag>
            <h2 id="acoes-title" className="display">O trabalho aparece nos <em>detalhes.</em></h2>
          </Reveal>
          <Reveal className="archive-intro" delay={.1}>
            <span className="archive-index">SADS / 01—08</span>
            <p>Uma coleção de gestos, encontros e oficinas. Não é banco de imagens: é a memória visual de uma rede que acontece no dia a dia.</p>
          </Reveal>
        </div>
        <div className="archive-grid">
          {archiveItems.map((item, index) => (
            <Reveal key={`${item.label}-${index}`} className={`archive-card archive-card-${index + 1}`} delay={index * .035}>
              <Image src={item.image} alt={`${item.label}: ${item.note}`} fill sizes="(max-width: 700px) 86vw, 25vw" />
              <div className="archive-glass"><strong>{item.label}</strong><span>{item.note}</span></div>
              <span className="archive-number">0{index + 1}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="servicos" className="section section-blue" aria-labelledby="servicos-title">
        <div className="service-wrap">
          <Reveal className="service-head">
            <div className="section-header">
              <SectionTag>02 / Acesso</SectionTag>
              <h2 id="servicos-title" className="display">Cada necessidade tem um <em>caminho.</em></h2>
            </div>
            <p className="lead">Comece pelo que você precisa. A equipe da SADS orienta o acesso e confirma os detalhes do atendimento para cada caso.</p>
          </Reveal>
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * .06} className="service-card">
                <div className="service-card-image"><Image src={service.image} alt="" fill sizes="(max-width: 640px) 92vw, 30vw" /></div>
                <div className="service-card-top"><span className="service-number">{service.number}</span><span className="service-icon"><ArrowUpRight size={15} /></span></div>
                <div className="service-card-body"><h3>{service.title}</h3><p>{service.copy}</p></div>
                <span className="service-card-link"><CircleHelp size={14} /> Detalhes em validação</span>
              </Reveal>
            ))}
          </div>
          <div className="service-footnote"><CircleHelp size={17} /><span>Os canais, documentos necessários, horários e regras de cada atendimento devem ser confirmados com a SADS antes da publicação final.</span></div>
        </div>
      </section>

      <section id="nuca" className="section section-dark" aria-labelledby="nuca-title">
        <div className="nuca-layout">
          <Reveal className="nuca-collage">
            <div className="image-frame nuca-photo-main"><Image src={ASSET.nuca} alt="Duas jovens do NUCA em uma ação de participação" fill sizes="(max-width: 980px) 70vw, 46vw" /></div>
            <div className="image-frame nuca-photo-small"><Image src={ASSET.youth} alt="Jovens reunidos em uma atividade coletiva" fill sizes="(max-width: 980px) 55vw, 30vw" /></div>
            <div className="image-frame nuca-photo-detail"><Image src={ASSET.eca} alt="Material visual de campanha pelos direitos de crianças e adolescentes" fill sizes="(max-width: 980px) 38vw, 20vw" /></div>
            <span className="nuca-label">feito com voz jovem</span>
          </Reveal>
          <Reveal className="nuca-copy" delay={.12}>
            <SectionTag light>03 / Protagonismo</SectionTag>
            <h2 id="nuca-title" className="display">A juventude não é só futuro. É <em>agora.</em></h2>
            <span className="highlight">Voz • Participação • Protagonismo</span>
            <p className="lead">O NUCA cria espaço para que adolescentes e jovens participem, expressem suas ideias e ajudem a construir uma cidade mais atenta aos seus direitos.</p>
            <p className="lead">Acompanhe as ações e descubra como participar. Canal informado pelo cliente: <strong>@nuca.saude</strong>. Confirmar antes do lançamento.</p>
            <a className="social-link" href="https://www.instagram.com/nuca.saude/" target="_blank" rel="noreferrer" aria-label="Abrir o Instagram informado pelo cliente para o NUCA em nova aba"><span><Instagram size={17} /></span> Conhecer o NUCA <ArrowUpRight size={15} /></a>
          </Reveal>
        </div>
      </section>

      <section className="section section-paper" aria-labelledby="registro-title">
        <div className="media-band">
          <Reveal className="section-header">
            <SectionTag>Registro / Território</SectionTag>
            <h2 id="registro-title">O cuidado também se constrói em <em>movimento.</em></h2>
            <p>Registros de oficinas, encontros e atividades que aproximam pessoas, fortalecem vínculos e fazem a rede acontecer no cotidiano.</p>
          </Reveal>
          <Reveal className="video-card" delay={.1}>
            <div className="video-header-bar">
              <span className="video-caption">registro do território · {activeVideo === 'one' ? 'vídeo 01' : 'vídeo 02'}</span>
              <div className="video-toggle-btns" role="tablist" aria-label="Alternar vídeos de registro">
                <button
                  type="button"
                  className={`video-tab-btn ${activeVideo === 'one' ? 'is-active' : ''}`}
                  onClick={() => setActiveVideo('one')}
                  aria-pressed={activeVideo === 'one'}
                >
                  Vídeo 01
                </button>
                <button
                  type="button"
                  className={`video-tab-btn ${activeVideo === 'two' ? 'is-active' : ''}`}
                  onClick={() => setActiveVideo('two')}
                  aria-pressed={activeVideo === 'two'}
                >
                  Vídeo 02
                </button>
              </div>
            </div>
            <video
              key={activeVideo}
              controls
              muted
              playsInline
              preload="metadata"
              poster={activeVideo === 'one' ? ASSET.workshop : ASSET.youth}
              aria-label={`Registro em vídeo ${activeVideo === 'one' ? '01' : '02'} de atividade comunitária da SADS`}
            >
              <source src={activeVideo === 'one' ? ASSET.videoOne : ASSET.videoTwo} type="video/mp4" />
              Seu navegador não consegue reproduzir este vídeo.
            </video>
          </Reveal>
        </div>
      </section>

      <section id="apoio" className="section section-paper" aria-labelledby="apoio-title">
        <div className="benefits-layout">
          <Reveal className="section-header">
            <SectionTag>04 / Apoio</SectionTag>
            <h2 id="apoio-title">Quando você precisa, a rede está <em>presente.</em></h2>
            <p>Para acessar um serviço ou benefício, não precisa saber tudo de uma vez. O primeiro passo é buscar orientação.</p>
            <div className="validation-card"><strong>Informação em validação</strong><p>Benefícios específicos, como aluguel social, auxílio funeral e Pão na Mesa, só devem ser publicados após confirmação da SADS sobre disponibilidade, critérios e canal de solicitação.</p></div>
          </Reveal>
          <Reveal className="steps" delay={.1}>
            <div className="step"><span className="step-num">1</span><div><h3>Escolha a sua necessidade</h3><p>CadÚnico, benefício, orientação no CRAS, participação juvenil ou outra situação de apoio.</p></div></div>
            <div className="step"><span className="step-num">2</span><div><h3>Procure a porta de entrada</h3><p>Confirme com a rede da SADS qual unidade ou equipe pode orientar o seu caso.</p></div></div>
            <div className="step"><span className="step-num">3</span><div><h3>Combine o próximo passo</h3><p>Antes de ir, confirme horário, documentos e as condições atualizadas do atendimento.</p></div></div>
          </Reveal>
        </div>
      </section>

      <section id="contato" className="section contact-section" aria-labelledby="contato-title">
        <div className="contact-inner">
          <Reveal>
            <SectionTag light>Contato</SectionTag>
            <h2 id="contato-title" className="display">Vamos encontrar o próximo <em>passo.</em></h2>
          </Reveal>
          <Reveal className="contact-note" delay={.1}>
            <strong>Canais oficiais em validação</strong>
            <p>Endereço, telefone, horários e links oficiais serão inseridos assim que confirmados pela SADS. Nenhum dado de contato fictício será publicado.</p>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><strong>SADS</strong><p>Secretaria de Ação e Desenvolvimento Social<br />Saúde · Bahia</p></div>
          <nav className="footer-links" aria-label="Links do rodapé"><a href="#servicos">Serviços</a><a href="#nuca">NUCA</a><a href="#apoio">Apoio</a><Link href="/privacidade">Privacidade</Link></nav>
        </div>
        <details id="privacidade" className="footer-privacy"><summary>Privacidade e uso responsável de imagens</summary><p>Esta experiência não usa cookies não essenciais, rastreadores ou formulário de coleta por padrão. As fotos e vídeos devem ser publicados somente com autorização institucional e de imagem adequada, especialmente quando houver pessoas identificáveis ou menores de idade. Caso a página receba formulário, será necessário informar finalidade, base legal, canal do controlador e coletar consentimento quando aplicável.</p></details>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} SADS · Saúde/BA</span><span>Conteúdo institucional sujeito à validação final do cliente.</span></div>
      </footer>

      <AnimatePresence>
        {privacyOpen && (
          <motion.aside className="privacy-banner" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} aria-label="Aviso de privacidade">
            <h2>Privacidade em primeiro lugar</h2>
            <p>Esta versão não coleta dados pessoais, não usa rastreadores e não instala cookies não essenciais. Antes do lançamento, confirme as autorizações de uso das imagens e os canais oficiais.</p>
            <div className="privacy-actions"><Link href="/privacidade" onClick={() => setPrivacyOpen(false)}>Ler nota de privacidade</Link><button type="button" onClick={() => setPrivacyOpen(false)}>Entendi <Check size={13} /></button></div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
