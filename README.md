# 🌐 HTALE.ONLINE — Oficjalna Wiki na GitHub Pages

Nowoczesna, w pełni responsywna i animowana encyklopedia serwera **HTALE.ONLINE** (Minecraft 1.21+), gotowa do natychmiastowego wdrożenia na **GitHub Pages**.

---

## 🚀 Jak uruchomić na GitHub Pages w 2 minuty?

### Opcja A: Wrzucenie jako osobne repozytorium wiki (Zalecane)
1. Utwórz nowe repozytorium na GitHubie (np. `htale-wiki`).
2. Skopiuj zawartość folderu `wiki/` do głównego katalogu nowego repozytorium (`index.html`, `styles.css`, `app.js`, `assets/`).
3. W repozytorium na GitHub wejdź w:
   **Settings** ➔ **Pages** ➔ **Build and deployment** ➔ **Source**: wybierz `Deploy from a branch` ➔ Branch: `main` / `root` ➔ Kliknij **Save**.
4. Po około 60 sekundach Twoja wiki będzie dostępna pod adresem:
   `https://<twoj-login>.github.io/<twoje-repozytorium>/` (lub pod własną domeną np. `wiki.htale.online`).

---

### Opcja B: Wrzucenie w tym samym repozytorium (folder `/wiki` lub `/docs`)
Jeśli przechowujesz całe repozytorium serwera na GitHubie:
1. Możesz zmienić nazwę folderu `wiki` na `docs`.
2. W ustawieniach **Settings** ➔ **Pages** wybierz `Deploy from a branch` ➔ Branch: `main` / `/docs` ➔ Kliknij **Save**.

---

## 🎨 Co zawiera ta Wiki?

- **Animowane tło cząsteczkowe (Canvas Embers & Stars)** — dynamiczny gwiezdno-iskrowy efekt w tle.
- **Wyszukiwarka na żywo (Instant Search)** — filtruje artykuły, moby, bossów, przedmioty i komendy w czasie rzeczywistym.
- **Dźwięki interfejsu (Web Audio API Synthesizer)** — autorski syntezator dźwięków przy klikaniu i kopiowaniu z możliwością wyłączenia.
- **System Wojen & PvP**:
  - Harmonogram walki PvP (18:00 – 22:00 CET).
  - Przejmowanie wrogich działek (`/t takeoverclaim`) z pełnymi zasadami.
  - System jeńców wojennych (POW) i więzienia miejskiego z kaucjami.
  - Anty-Logout (CombatLogX) z natychmiastową śmiercią za ucieczkę.
  - Automatyczna regeneracja zniszczeń (RegenTNT - 5 minut).
- **Arsenał Wojenny (5 rodzajów TNT)**:
  - Sejsmiczne (burzenie fortyfikacji, knockback, siła 6.0).
  - Napalmowe (rozlewanie ognia, oparzenia na 10s, siła 4.0).
  - Kriogeniczne (arktyczny mróz, ścinanie lodu, nie niszczy bloków).
  - Impulsowe EMP (blokada tarcz i pereł na 10s, zmywanie mikstur).
  - Próżniowe Osobliwość (czarna dziura, zassanie, wtórna implozja).
- **Miasta (Towny) & Limity**:
  - Koszty claimowania, unclaimu, brak podatku dziennego ($0 upkeep).
  - Pełna tabela 7 poziomów miast (Ruiny ➔ Osada ➔ Wioska ➔ Miasteczko ➔ Miasto ➔ Wielkie Miasto ➔ Metropolia).
  - **Interaktywny Kalkulator Poziomu Miasta**.
- **Państwa / Nacje**:
  - Zakładanie nacji, pakiety darmowych bonusowych działek (+16, +32, +64, +128 chunków).
  - Deklaracja wrogów wojennych i sojusze, integracja z BlueMap.
- **Dungeony & Bossowie**:
  - **Kryształowa Jaskinia Ołtarza Reissów (AoT)**: Boss Królewski Tytan Przysięgi (340 HP), Kryształowy Szermierz, Strzelec Korpusu 3D, Strażnik Ołtarza, Zaklinacz, Czysty Tytan (165 HP).
  - **Zatopiona Atlantyda**: Boss Władca Otchłani Posejdon (Warden 380 HP, BossBar 12), Harpunnik Głębin, Koralowy Truciciel, Żywiołak Sztormu, Pradawny Konstrukt, Głębinowy Kolos Kuźni.
  - **Bastion Umarłych (Zamek)**: Martwy Szermierz, Gwardzista Skarbca, Królewski Kat, Nadworny Nekromanta, Kusznik Bastionu.
  - **Rycerz Oblężenia (600 HP)**: Najazdy na miasta, Saperzy, szablon Netherite Upgrade, nagroda do $4000.
  - **Elitarne potwory Dark Fantasy**: 10 unikalnych mobów z rzadkimi składnikami.
- **Custom Przedmioty & Magiczny Arsenał**:
  - Różdżka Mignięcia (Blink Wand), Różdżka Legionu, Różdżka Szkieletów, Buty Cienia, Totem Tarczy, Zegar Cofnięcia, Klątwa Pojedynku, Hak Łowcy, Talizman Górnika, Kocioł Uzdrowienia, Płytka Lewitacji, Amulet Dusz (Soulbound), Klinga Oblężenia, Banknot Pieniężny.
  - Prawdziwe pikselowe tekstury z gry z autentycznymi tooltipami Minecraft.
- **Ekonomia i Mechaniki Świata**:
  - Wynagrodzenie za czas gry (50$ / 15 min do 200$ dziennie).
  - Kara za śmierć (DeathPenalty - utrata 50% ekwipunku i 50% gotówki).
  - Ulepszalne spawnery (stacking do 16x).
  - Domy i teleportacje z warmupem 5s.
- **Katalog Komend**:
  - Klikalne przyciski „Kopiuj” z animowanym powiadomieniem Toast.
- **🏛️ Kronika Dziejów & Historia Serwera**:
  - Historyczne archiwum kluczowych wydarzeń, buntów i manifestacji na serwerze.
  - Epizod I: **Greenpeace (06.11.2026)** — epicka kronika rewolty o Święty Dirt pod Spawnem, wzniesienie żywej ściółki leśnej, mistyczny znak pokoju ze śniegu bałwana, uwięzienie demonstrantów w deszczu oraz monumentalny pomnik „PDW” z diamentów i złota przeciwko Admin Abuse.
  - Interaktywna galeria dowodów z powiększeniem Lightbox.
- **⚖️ Kodeks Prawny i Regulamin Serwera (21 Artykułów w 5 Rozdziałach)**:
  - Dwuinstancyjny wymiar sprawiedliwości: **Sąd Serwerowy** (sprawy cywilne, gospodarcze, kary prac społecznych/finansowe) oraz **Sąd Wojenny** (zbrodnie militarne, zdrada stanu, Wieczne Wygnanie).
  - Ochrona integralności gry (zakaz X-Ray, KillAura, Baritone, exploitów, maszyn lagujących) oraz zakaz multikont.
  - Urbanistyka i architektura (ochrona dziczy, zakaz kloców/schronów PvP, zakaz materiałów przeciwwybuchowych typu bedrock, zakaz lava-castów i fos lagujących FPS).
  - Strefa neutralna Eurazji (obszar spawnu pod pieczą administracji, ochrona nowicjuszy przed spawn-campingiem).
  - Kodeks wojenny (uzgadnianie terminów, zakaz ingerencji osób trzecich, zdrada sojuszu, zakaz Crystal PvP, zakaz fake surrender, zakaz fikcyjnych oblężeń Fake Sieges i ucieczki terytorialnej).
  - Porządek społeczny i więziennictwo (oszustwa handlowe, zakaz pułapek TPA/spawn, zakaz insidingu, zakaz korupcji i transferu funduszy, standardy więzienne i zakaz spawnkillu w celi).
