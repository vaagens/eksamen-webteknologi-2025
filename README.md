# Bookdragons Bokhandel Webapp

En e-handel nettside for salg av bøker, bygget med Next.js 15, Payload CMS og Zustand for state management.

##  Prosjektoversikt

Dette prosjektet er en fullstack webapplikasjon for en bokhandel. Brukere kan bla gjennom bøker, filtrere etter sjanger, og legge produkter i en handlekurv. Applikasjonen har fokus på moderne teknologier, god arkitektur og brukeropplevelse.

### Hovedfunksjoner

- **Produktvisning**: Grid-layout med bokdetaljer, cover image, pris og lagerstatus
- **Sjanger-filtrering**: Dynamisk dropdown for å filtrere bøker etter sjanger
- **Handlekurv**: Full shopping cart funksjonalitet med Zustand state management
- **CMS-integrasjon**: Payload CMS for enkel administrasjon av bøker, forfattere og sjangre
- **Responsiv design**: Tailwind CSS for moderne, responsivt design

## Teknologier

### Frontend
- **Next.js 15** - React framework med App Router
- **Tailwind CSS 4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **TypeScript** - Type safety

### Backend/CMS
- **Payload CMS 3** - Headless CMS
- **SQLite** - Database (via @payloadcms/db-sqlite)

### Dev Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Kom i gang

### Forutsetninger

- Node.js (v18.20.2 eller >=20.9.0)
- pnpm (v9 eller v10)

### Installasjon

1. Klon repositoriet
```bash
git clone https://github.com/vaagens/eksamen-webteknologi-2025.git
cd eksamen-webteknologi-2025
```

2. Installer dependencies
```bash
npm install
```

3. Kjør development server
```bash
npm run dev
```

4. Åpne [http://localhost:3000](http://localhost:3000) i nettleseren

### Tilgang til Admin Panel

Payload CMS admin panel er tilgjengelig på knappen i venstre hjørne evt. på`/admin` . Her kan du administrere:
- Bøker
- Forfattere
- Sjangre
- Aldersgrupper
- Media (cover images)

## Prosjektstruktur

```
src/
├── app/
│   ├── (frontend)/          # Frontend routes
│   │   ├── books/           # Books listing side
│   │   ├── authors/         # Author listing side
│   │   ├── checkout         # Checkout side
│   │   ├── page.tsx         # Landings side
│   │   ├── layout.tsx       # Main layout
│   │   └── globals.css      # Global styles
│   └── (payload)/           # Payload admin routes
├── collections/             # Payload collections
│   ├── Authors.ts
│   ├── Books.ts
│   ├── Genres.ts
│   ├── AgeGroups.ts
│   ├── Orders.ts
│   ├── Media.ts
│   └── Users.ts
├── components/              # React components
│   ├── AddToCartButton.tsx
│   ├── BackButton.tsx
│   ├── BookCard.tsx
│   ├── Cart.tsx
│   └── GenreFilter.tsx
├── store/                   # Zustand stores
│   └── cartStore.ts
└── payload-types.ts         # Auto-generated TypeScript types
```

## Nøkkelkomponenter

### BookCard
Viser et enkelt bok-kort med:
- Cover image med fallback
- Tittel (begrenset til 2 linjer) med clickable links
- Forfatter(e) med clickable links
- Sjanger, aldersgruppe, pris og lagerstatus
- "Legg i handlekurv" knapp

### GenreFilter
Client component for sjanger-filtrering:
- Dropdown med alle tilgjengelige sjangre
- Viser description for valgt sjanger
- Dynamisk filtrering av bøker
- Server/Client component separasjon for optimal ytelse

### Cart
Shopping cart modal med:
- Oversikt over valgte bøker
- Quantity controls (+/-)
- Fjern item funksjonalitet
- Totalpris beregning
- Tøm kurv og checkout (placeholder)

### cartStore (Zustand)
State management for handlekurv:
- `items`: Array med cart items
- `addItem`: Legg til bok (eller øk quantity)
- `removeItem`: Fjern bok fra kurv
- `updateQuantity`: Endre antall
- `clearCart`: Tøm hele kurven
- `getTotalPrice`: Beregn totalpris

## Arkitektur og designvalg

### Server vs Client Components

Jeg har brukt Next.js App Router sin hybride tilnærming:

**Server Components** (default):
- `books/page.tsx` - Henter data direkte fra Payload
- Raskere initial load
- Bedre for SEO
- Mindre JavaScript til klienten

**Client Components** (`'use client'`):
- `GenreFilter` - Trenger useState for filter state
- `Cart` - Modal med interaktivitet
- `AddToCartButton` - onClick handler for cart

Dette gir optimal ytelse ved å kun sende JavaScript når det faktisk trengs.

### State Management

Valgte Zustand:
- Greit å sette opp
- Innebygget persistence
- Det jeg har mest erfaring med

### Styling

Tailwind CSS for:
- Utility-first approach (rask utvikling)
- Ingen CSS name collisions
- Konsistent design system
- Responsivt design out-of-the-box


## Kjente utfordringer og løsninger

### Author slug-field
Opprinnelig issue med slug generation for forfattere. Løst ved å bruke Payload's `formatSlug` utility i en beforeValidate hook.

Referanse: [Payload commit](https://github.com/payloadcms/payload/commit/b09ae6772f4b82dcf56b7e5253481d8fd7a2ceda)

### Nested Links (React Hydration Error)
Problem: Kunne ikke ha `<Link>` inne i `<Link>` (forfatter-links inne i book card link).

Løsning: Refaktorert BookCard til å kun ha Link rundt bilde og tittel, forfatter-links og cart-button er nå separate.

### TypeScript null-safety
`book.price` kan være null/undefined i TypeScript.

Løsning: Bruker nullish coalescing operator (`?? 0`) i price calculations.

## Fremtidige forbedringer

- [ ] Checkout flow
- [ ] Brukerautentisering
- [ ] Ordrehistorikk
- [ ] Søkefunksjonalitet
- [ ] Mer avansert filtrering (pris, aldersgruppe, forfatter)
- [ ] Produktanmeldelser
- [ ] Wishlist funksjonalitet

## Læringsutbytte

Dette prosjektet har gitt erfaring med:
- Modern Next.js med App Router og Server Components
- Headless CMS integrasjon
- State management med Zustand
- TypeScript i et fullstack-prosjekt
- Component composition og reusability
- Server/Client component separasjon for optimal ytelse
- Semantic HTML og accessibility


*Utviklet som eksamensprosjekt i Webteknologi 2025*
