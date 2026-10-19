# SADS — Cuidado e Desenvolvimento

Landing page institucional da Secretaria de Ação e Desenvolvimento Social de Saúde/BA.

## Direção

A página usa uma narrativa editorial/documental em capítulos: acolhida, acesso, protagonismo e próximos passos. As fotografias e vídeos entregues pelo cliente são usados como material principal, com recortes que preservam contexto e evitam transformar pessoas em elementos decorativos.

## LGPD e publicação

Esta versão não tem formulário, login, cookies não essenciais ou rastreadores. O aviso de privacidade informa que a publicação final deve confirmar as autorizações de uso de imagem e os dados oficiais do controlador. Contatos, horários, endereço e regras de benefícios não são inventados: permanecem sinalizados para validação.

Antes do go-live, valide:

- autorização institucional e autorização de imagem para pessoas identificáveis, com atenção especial a menores;
- endereço, telefone, horários, links e canais oficiais;
- critérios e disponibilidade de benefícios eventuais;
- texto jurídico final de privacidade, canal do controlador e eventual encarregado;
- domínio público para canonical, sitemap e Open Graph.

## Desenvolvimento

```bash
pnpm install
pnpm dev
pnpm build
```

Os assets fornecidos e aprovados para esta primeira composição ficam versionados em `public/assets` para que a experiência seja estável no preview e no deploy estático. O armazenamento Webdev também recebeu uma cópia dos arquivos enviados para uso futuro em integrações do projeto. A rota pública está declarada em `public/manus-routes.json`.

Enquanto autorizações de imagem, canais oficiais, texto jurídico e domínio final não forem confirmados, a aplicação mantém `noindex`. Depois da aprovação, configure canonical, Open Graph, sitemap e robots com o domínio real.
