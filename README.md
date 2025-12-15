# Bookdragons Bokhandel Webapp

En e-handel nettside for salg av bøker, bygget med Next.js 15, Payload CMS og Zustand for state management.

##  Prosjektoversikt

Dette prosjektet er en fullstack webapplikasjon for en bokhandel. Brukere kan bla gjennom forfattere og bøker, filtrere etter sjanger, og legge produkter i en handlekurv. Applikasjonen har fokus på moderne teknologier, god arkitektur og brukeropplevelse.

### Hovedfunksjoner

- **Produktvisning**: Grid-layout med bokdetaljer, cover image, pris og lagerstatus
- **Sjanger-filtrering**: Dynamisk dropdown for å filtrere bøker etter sjanger
- **Handlekurv**: Full shopping cart funksjonalitet med Zustand state management
- **Checkout-side**: Send inn bestillingsskjema
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
Payload CMS admin panel er tilgjengelig på knappen i venstre hjørne evt. på`/admin` .
- Brukernavn: `admin@bookdragons.no`
- Password: `123`

 Her kan du administrere:
- Bøker
- Forfattere
- Sjangre
- Aldersgrupper
- Media (book/author images)
- Orders

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
- Tøm kurv og checkout

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

**Server Components** (default):
- Eks `books/page.tsx` - Henter data direkte fra Payload
- Raskere initial load
- Bedre for SEO
- Mindre JavaScript til klienten

**Client Components** (`'use client'`):
- `GenreFilter` - Trenger useState for filter state
- `Cart` - Modal med interaktivitet
- `AddToCartButton` - onClick handler for cart
- `Backbutton` - onClick handler


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


## Utfordringer og løsninger

### Stock og handlekurv
Det var mulig å legge til flere varer enn det var på lager. Løst ved å legge til en 0 check i cartStore.
PS. Det var en liten fiks, men dette ble lagt til etter at film var spilt inn så ta det i betraktning.

### Author og Book slug-field
Opprinnelig issue med slug generation da jeg ønsket å bruke slug i steden for Id for dynamisk routing. Først måtte man legge det manuelt i admin panel. Løst ved å bruke Payload's `formatSlug`.

Referanse GitHub: [Payload commit](https://github.com/payloadcms/payload/commit/b09ae6772f4b82dcf56b7e5253481d8fd7a2ceda)

### Nested Links (React Hydration Error)
Problem: Kunne ikke ha `<Link>` inne i `<Link>` (forfatter-links inne i book card link).

Løsning: Refaktorert BookCard til å kun ha Link rundt bilde og tittel, forfatter-links og cart-button er nå separate.


## Fremtidige forbedringer

- Icon som viser antall varer i handlevogn
- Animasjon som viser når man legger noe i handlekurv.
- Forbedre Admin layout
- Stockindikator
- Brukerautentisering
- Ordrehistorikk
- Søkefunksjonalitet
- Mer avansert filtrering (pris, aldersgruppe, forfatter)
- Produktanmeldelser
- Wishlist funksjonalitet

## Kilder

### Dokumentasjon
- Min GA, Webteknologi modul
- [Next.js docs](https://nextjs.org/docs)
- [Payload docs](https://payloadcms.com/docs)
- [Tailwind docs](https://v2.tailwindcss.com/docs)
- [Zustand docs](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [GitHub Payload Commit](https://github.com/payloadcms/payload/commit/b09ae6772f4b82dcf56b7e5253481d8fd7a2ceda) - slugField

### Media
- [Unsplash](https://unsplash.com/) - Images
- [SvgRepo](https://www.svgrepo.com/) - Logo
- Lucide-react library - Icons

### AI-assistanse
- Claude.ai ble brukt som sparringspartner for debugging,
  forklaring av konsepter, og kvalitetssikring av kode.
  All kode er skrevet og forstått av meg selv.
- Chat GPT for genereing av forfatter og bok titler/description