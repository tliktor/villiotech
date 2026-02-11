const fs = require('fs');
const path = require('path');

// Extract hardcoded Hungarian text from all pages
const extractedTexts = {
  // Lakossagnak page
  lakossagnak: {
    bullets: [
      'Eladja az ingatlanát – a vevő vagy a közjegyző kéri a villamos biztonsági felülvizsgálatot',
      'Bérbe adja a lakását – a bérlő és a biztosító is elvárja az érvényes jegyzőkönyvet',
      'Felújítás után van – az új villamos hálózatot dokumentálni kell',
      'Villanyszerelőt keres – kapcsoló, konnektor, biztosíték, elosztó, világítás',
      'WiFi vagy hálózat kell – otthoni iroda, home office, stabil internetkapcsolat',
      'Külföldi és angolul beszél – teljes körű szolgáltatás angol nyelven is'
    ],
    whyMe: [
      'Kalibrált, hitelesített műszerekkel dolgozom – a mérések joghatályosak',
      'Joghatályos jegyzőkönyvet kap, amit a hatóság, közjegyző, biztosító elfogad',
      'Tételes árajánlatot adok a munka megkezdése előtt',
      'Garanciát vállalok minden elvégzett munkára',
      'Magam után takarítok – a munkaterületet tisztán hagyom',
      'Kártyás fizetés a helyszínen',
      'Magánszemélyeknek ÁFA-mentes számla'
    ],
    services: [
      {
        title: 'Villamos biztonsági felülvizsgálat',
        desc: 'Ingatlan eladás vagy bérbeadás előtt kötelező. Kalibrált műszerekkel végzem, joghatályos jegyzőkönyvet kap kézhez.'
      },
      {
        title: 'Villanyszerelés, javítás, kivitelezés',
        desc: 'Kapcsolócsere, konnektor, biztosítéktábla, világítás, teljes lakás villanyszerelés. Tételes árajánlat, garancia.'
      },
      {
        title: 'IT hálózat – WiFi / UTP',
        desc: 'Otthoni iroda, home office, stabil WiFi lefedettség. Különösen ajánlom külföldi ügyfeleknek.'
      }
    ],
    steps: [
      { title: 'Ajánlatkérés', description: 'Írja le röviden, mire van szüksége – az űrlapon vagy telefonon.' },
      { title: 'Egyeztetés', description: 'Visszajelzek, egyeztetjük az időpontot és a részleteket.' },
      { title: 'Helyszíni munka', description: 'Megérkezem pontosan, elvégzem a méréseket vagy a szerelési munkát.' },
      { title: 'Dokumentáció', description: 'Joghatályos jegyzőkönyvet vagy tételes elszámolást és garanciajegyet kap.' },
      { title: 'Fizetés', description: 'Készpénzzel vagy bankkártyával, a helyszínen. Számlát azonnal kiállítom.' }
    ],
    faq: [
      {
        question: 'Mikor kell villamos biztonsági felülvizsgálat?',
        answer: 'Ingatlan eladás vagy bérbeadás előtt, felújítás/javítás után, illetve ha a biztosító vagy hatóság kéri. Lakóingatlanoknál nincs kötelező periódus, de ajánlott 6 évente elvégeztetni.'
      },
      {
        question: 'Mennyi ideig tart egy felülvizsgálat?',
        answer: 'Egy átlagos lakásnál 1-2 óra, a hálózat méretétől és állapotától függően.'
      },
      {
        question: 'A jegyzőkönyvet elfogadja a közjegyző / ügyvéd / biztosító?',
        answer: 'Igen. Joghatályos, kalibrált műszerekkel végzett méréseken alapuló jegyzőkönyvet állítok ki, amit minden hatóság és intézmény elfogad.'
      }
    ],
    titles: {
      hero_subtitle: 'Eladás, bérbeadás vagy felújítás előtt áll? Villamos biztonsági felülvizsgálat joghatályos jegyzőkönyvvel, villanyszerelés garanciával, IT hálózat kiépítés – egy megbízható mérnöktől.',
      target_section: 'Önnek szól, ha…',
      why_me_section: 'Miért engem válasszon?',
      services_section: 'Szolgáltatásaim lakosságnak',
      process_section: 'Így dolgozunk együtt',
      pricing_section: 'Átlátható árazás',
      deliverables_section: 'Mit kap kézhez?',
      faq_section: 'Gyakori kérdések',
      cta_title: 'Kérjen ajánlatot',
      cta_subtitle: 'Válaszolok 1 munkanapon belül. Budán dolgozom, kalibrált műszerekkel, garanciával.'
    }
  },
  
  // Tarsashazaknak page
  tarsashazaknak: {
    bullets: [
      'Közös képviselő és a társasház villamos felülvizsgálása esedékes',
      'Társasházi döntéshozó és a közgyűlés elé kell vinni az árajánlatot',
      'Hatósági felszólítást kapott a társasház villamos hálózatának ellenőrzésére',
      'Közös területek villanyszerelése szükséges (lépcsőház, pince, garázs)',
      'Biztosítási esemény miatt kell dokumentáció',
      'Felújítás előtt áll a társasház és felmérés kell'
    ],
    whyMe: [
      'Vizsgázott villamos biztonsági felülvizsgáló – villamosmérnöki végzettséggel',
      'Kalibrált műszerek – joghatályos mérési eredmények',
      'Tételes árajánlat – bemutatható a közgyűlésen',
      'Joghatályos jegyzőkönyv – hatóság előtt elfogadott',
      'ÁFA-mentes számlázás társasházaknak',
      '20 év multinacionális tapasztalat – pontosság, korrekt kommunikáció',
      'Garancia a munkára, magam után takarítok'
    ],
    steps: [
      { title: 'Ajánlatkérés', description: 'Írja le a társasház adatait – lakásszám, hálózat kora, ismert problémák.' },
      { title: 'Tételes árajánlat', description: 'Árajánlatot küldök, amit bemutathat a közgyűlésen.' },
      { title: 'Időpont-egyeztetés', description: 'A közgyűlési döntés után egyeztetjük a helyszíni munka időpontját.' },
      { title: 'Helyszíni felülvizsgálat', description: 'Elvégzem a méréseket a közös területeken, kalibrált műszerekkel.' },
      { title: 'Jegyzőkönyv és javaslat', description: 'Joghatályos jegyzőkönyv az eredményekkel és javítási javaslatokkal.' },
      { title: 'Javítás (opcionális)', description: 'Ha javítás szükséges, külön árajánlatot adok és elvégzem a munkát.' }
    ],
    titles: {
      hero_subtitle: 'Közös képviselőként Ön felel a lakók biztonságáért. Elvégzem a kötelező villamos biztonsági felülvizsgálatot, joghatályos jegyzőkönyvvel, tételes árajánlattal a közgyűléshez.',
      target_section: 'Önnek szól, ha…',
      why_me_section: 'Miért engem válasszon?',
      process_section: 'Így dolgozunk együtt',
      pricing_section: 'Átlátható árazás',
      deliverables_section: 'Mit kap kézhez?',
      faq_section: 'Gyakori kérdések',
      cta_title: 'Kérjen árajánlatot a közgyűléshez',
      cta_subtitle: 'Tételes árajánlatot küldök, amit bemutathat a lakóközösségnek.'
    }
  },
  
  // Munkahelyeknek page
  munkahelyeknek: {
    bullets: [
      'Irodát üzemeltet és esedékes a 3 évenkénti villamos felülvizsgálat',
      'Üzletet vagy boltot vezet és szüksége van az érvényes jegyzőkönyvre',
      'Vendéglátóhelye van és a hatóság kéri a dokumentációt',
      'Fodrászatot, szépségszalont működtet és az eszközök éves felülvizsgálata esedékes',
      'Rendelőt, orvosi praxist vezet és a villamos biztonság dokumentálása szükséges',
      'Kéziszerszámokat használ és az éves felülvizsgálat esedékes'
    ],
    whyMe: [
      'Vizsgázott villamos biztonsági felülvizsgáló – villamosmérnöki végzettséggel',
      'Kalibrált műszerek – joghatályos mérési eredmények',
      'Kéziszerszám felülvizsgálat helyszínen – nem kell sehová vinni az eszközöket',
      'Joghatályos jegyzőkönyv – hatósági ellenőrzésnél azonnal bemutatható',
      'Tételes árajánlat – tervezhető költség',
      'ÁFÁ-s számla vállalkozásoknak',
      'Kártyás fizetés a helyszínen',
      '20 év multinacionális tapasztalat – pontosság, határidő-tartás'
    ],
    services: [
      {
        title: 'Villamos biztonsági felülvizsgálat',
        desc: 'Munkahelyeken 3 évente kötelező. Joghatályos jegyzőkönyv, amit hatósági ellenőrzésnél azonnal bemutathat.'
      },
      {
        title: 'Kéziszerszámok éves felülvizsgálata',
        desc: 'Helyszínen végzem, kalibrált műszerrel. Nem kell sehová szállítani az eszközöket.'
      },
      {
        title: 'Villanyszerelés, bővítés, javítás',
        desc: 'Új konnektorok, világítás, biztosítéktábla csere, hálózat korszerűsítés.'
      },
      {
        title: 'IT hálózat – WiFi / UTP',
        desc: 'Irodai hálózat kiépítés, WiFi lefedettség optimalizálás.'
      }
    ],
    titles: {
      hero_subtitle: 'Irodája, üzlete vagy vendéglátóhelye van? A villamos biztonsági felülvizsgálat 3 évente kötelező. Az elektromos kéziszerszámok éves ellenőrzését helyszínen végzem.',
      target_section: 'Önnek szól, ha…',
      why_me_section: 'Miért engem válasszon?',
      services_section: 'Szolgáltatásaim munkahelyeknek',
      process_section: 'Így dolgozunk együtt',
      pricing_section: 'Átlátható árazás',
      deliverables_section: 'Mit kap kézhez?',
      faq_section: 'Gyakori kérdések',
      cta_title: 'Ne várja meg a hatósági ellenőrzést',
      cta_subtitle: 'A kötelező felülvizsgálat elmulasztása bírságot vonhat maga után. Kérjen ajánlatot, és legyen naprakész.'
    }
  },
  
  // Rolam page
  rolam: {
    qualifications: [
      'Villamosmérnöki diploma',
      'Vizsgázott villamos biztonsági felülvizsgáló',
      'Tűzvédelmi vizsgák',
      'Villámvédelmi felülvizsgáló (hamarosan)',
      '20 év multinacionális szakmai tapasztalat'
    ],
    values: [
      {
        title: 'Pontosság',
        desc: 'Ha 9-re mondom, 9-kor ott vagyok. Ha 50 000 Ft-ot mondok, annyi lesz. Nem szeretek meglepetéseket okozni – sem időben, sem árban.'
      },
      {
        title: 'Átláthatóság',
        desc: 'Tételes árajánlatot adok, mielőtt bármit csinálnék. Elmagyarázom, mit fogok csinálni és miért. Ha valami nem az én szakterületem, megmondom.'
      },
      {
        title: 'Minőség',
        desc: 'Kalibrált műszerekkel dolgozom, mert a „szerintem jó" nem elég. A mérési eredmények joghatályosak, a munkámra garanciát vállalok.'
      },
      {
        title: 'Tisztelet',
        desc: 'Magam után takarítok. Cipővédőt húzok. Az Ön otthonát vagy munkahelyét ugyanúgy kezelem, mint a sajátomat.'
      }
    ],
    content: [
      'Villamosmérnök vagyok, vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. Hamarosan villámvédelmi felülvizsgálóként is rendelkezésre állok.',
      '20 évet dolgoztam multinacionális környezetben, ahol megtanultam, hogy a pontosság, a felelősség és a korrekt kommunikáció nem választható extra – hanem alapelvárás. Ezt a szemléletet hoztam magammal a magánszektorba is.',
      'Budán élek és dolgozom. Fő területem a II. kerület és egész Buda, de kivételesen Pesten is vállalok munkát.',
      'Magyarul és angolul egyaránt dolgozom – külföldi ügyfeleimet ugyanazzal a precizitással szolgálom ki.'
    ],
    titles: {
      hero_title: 'Villamosmérnök, 20 év tapasztalattal – most Önnek dolgozom.',
      hero_subtitle: 'Vizsgázott villamos biztonsági felülvizsgáló, tűzvédelmi képesítésekkel. Két évtizednyi multinacionális tapasztalat után a budai otthonok, társasházak és munkahelyek villamos biztonságáért dolgozom.',
      intro_section: 'Ki áll a Villiotech mögött?',
      qualifications_section: 'Képesítéseim',
      values_section: 'Amiben hiszek',
      english_title: 'About me – for English-speaking clients',
      cta_title: 'Dolgozzunk együtt',
      cta_subtitle: 'Ha precíz, megbízható villamos szakembert keres Budán – keressen bizalommal.'
    }
  },
  
  // Adatvedelem page
  adatvedelem: {
    title: 'Adatvédelmi tájékoztató',
    sections: [
      { title: '1. Adatkezelő', content: 'Név: [Adatkezelő neve]\nSzékhely: Budapest, [cím]\nE-mail: info@villiotech.hu\nTelefon: [telefonszám]' },
      { title: '2. Kezelt személyes adatok', content: 'Az ajánlatkérő űrlap kitöltésekor az alábbi adatokat kezeljük:' },
      { title: '3. Adatkezelés célja és jogalapja', content: 'Az adatkezelés célja az ajánlatkérés feldolgozása és a kapcsolatfelvétel. Jogalap: az érintett hozzájárulása (GDPR 6. cikk (1) a) pont).' },
      { title: '4. Adatkezelés időtartama', content: 'A személyes adatokat az ajánlatkérés feldolgozásáig, de legfeljebb 1 évig tároljuk. Az érintett bármikor kérheti adatai törlését.' },
      { title: '5. Adattovábbítás', content: 'Személyes adatait harmadik félnek nem adjuk tovább. Az adatok az Amazon Web Services (AWS) EU-s szerverein kerülnek tárolásra és feldolgozásra.' },
      { title: '6. Sütik (cookie-k)', content: 'A weboldal technikai sütiket használ a működéshez (témaválasztás). Analitikai sütiket (Google Analytics) csak az Ön hozzájárulásával használunk.' },
      { title: '7. Az érintett jogai', content: 'Hozzáférés joga – tájékoztatást kérhet a kezelt adatairól' },
      { title: '8. Kapcsolat', content: 'Adatvédelmi kérdéseivel forduljon hozzánk: info@villiotech.hu' }
    ]
  },
  
  // ASZF page
  aszf: {
    title: 'Általános Szerződési Feltételek',
    sections: [
      { title: '1. Szolgáltató adatai', content: 'Név: [Szolgáltató neve]\nSzékhely: Budapest, [cím]\nAdószám: [adószám]\nE-mail: info@villiotech.hu' },
      { title: '2. Szolgáltatások', content: 'A Szolgáltató az alábbi szolgáltatásokat nyújtja: villamos biztonsági felülvizsgálat, villanyszerelés, IT hálózat kiépítés, elektromos kéziszerszámok felülvizsgálata. A szolgáltatások részletes leírása a weboldalon található.' },
      { title: '3. Árazás és fizetés', content: 'Kiszállási díj Buda: 10 000 Ft' },
      { title: '4. Megrendelés és időpont', content: 'A megrendelés az ajánlatkérő űrlap kitöltésével vagy telefonos egyeztetéssel indul. A Szolgáltató 1 munkanapon belül visszajelez. Az időpont közös egyeztetés alapján kerül meghatározásra.' },
      { title: '5. Garancia', content: 'A Szolgáltató garanciát vállal minden elvégzett munkára. A garancia feltételeit és időtartamát a tételes árajánlat tartalmazza.' },
      { title: '6. Felelősség', content: 'A Szolgáltató felelősséget vállal a szakszerűen elvégzett munkáért. Bontás szükségessége esetén a Szolgáltató előzetesen tájékoztatja a Megrendelőt. Festési munkákat a Szolgáltató nem vállal, de ajánl szakembert.' },
      { title: '7. Lemondás', content: 'Az egyeztetett időpont lemondása legalább 24 órával előtte szükséges. Későbbi lemondás esetén a kiszállási díj felszámításra kerülhet.' },
      { title: '8. Jogviták', content: 'A felek a vitás kérdéseket elsősorban egyeztetés útján rendezik. Ennek sikertelensége esetén a magyar bíróságok illetékesek.' }
    ]
  },
  
  // Szolgaltatasok pages
  villamosFelulvizsgalat: {
    whenNeeded: [
      'Ingatlan eladás vagy bérbeadás előtt',
      'Felújítás, villanyszerelési munka után',
      'Munkahelyeken 3 évente (kötelező)',
      'Társasházak közös hálózatánál (rendszeres)',
      'Biztosítási esemény dokumentálásához',
      'Hatósági felszólításra'
    ],
    whatWeCheck: [
      'Érintésvédelmi mérés',
      'Szigetelési ellenállás mérés',
      'Rövidzárlati hurokimpedancia mérés',
      'Védővezetők folytonosságának ellenőrzése',
      'Túláramvédelmi eszközök működésének vizsgálata',
      'Szemrevételezéses ellenőrzés (vezetékek, csatlakozások, elosztók)'
    ],
    results: [
      'Joghatályos mérési jegyzőkönyv – hatóság, közjegyző, biztosító előtt elfogadott',
      'Részletes mérési eredmények – minden mérési pont dokumentálva',
      'Minősítés – a hálózat megfelel vagy nem felel meg',
      'Hibajegyzék – ha van, a feltárt hibák listája',
      'Javítási javaslat – mit kell kijavítani a megfelelőséghez'
    ],
    titles: {
      hero_subtitle: 'Kalibrált műszerekkel végzett mérések, hatóság előtt elfogadott dokumentáció. Lakásoknak, társasházaknak és munkahelyeknek egyaránt.',
      when_needed: 'Mikor van szükség villamos biztonsági felülvizsgálatra?',
      what_check: 'Mit tartalmaz a felülvizsgálat?',
      results_section: 'A felülvizsgálat eredménye',
      pricing_section: 'Árazás',
      cta_title: 'Kérjen ajánlatot villamos felülvizsgálatra'
    }
  },
  
  villanyszereles: {
    services: [
      'Kapcsolók, konnektorok cseréje, bővítése',
      'Világítás szerelés, csillárok felszerelése',
      'Biztosítéktábla csere, korszerűsítés',
      'Teljes lakás vagy iroda villanyszerelés',
      'Villamos hálózat bővítés, átalakítás',
      'Hibaelhárítás, zárlat keresés',
      'Kültéri világítás, kerti elektromos hálózat',
      'Társasházi közös területek villanyszerelése'
    ],
    promises: [
      { title: 'Tételes árajánlat', desc: 'A munka megkezdése előtt, írásban.' },
      { title: 'Pontos érkezés', desc: 'A megbeszélt időpontban.' },
      { title: 'Szakszerű kivitelezés', desc: 'Villamosmérnöki tudással.' },
      { title: 'Tiszta munkavégzés', desc: 'Magam után takarítok.' },
      { title: 'Garancia', desc: 'Minden elvégzett munkára.' },
      { title: 'Kártyás fizetés', desc: 'A helyszínen.' }
    ],
    titles: {
      hero_subtitle: 'Kapcsolócsere, biztosítéktábla, teljes lakás villanyszerelés. Tételes árajánlat, tiszta munkavégzés, garancia minden munkára.',
      services_section: 'Villanyszerelési szolgáltatásaim',
      promises_section: 'Amire számíthat',
      pricing_section: 'Árazás',
      cta_title: 'Kérjen ajánlatot villanyszerelésre'
    }
  },
  
  itHalozat: {
    services: [
      'UTP kábelezés – Cat5e / Cat6 hálózati kábel fektetés, csatlakozók szerelése',
      'WiFi lefedettség – access point-ok telepítése, optimális elhelyezés',
      'Otthoni iroda (home office) – stabil, megbízható hálózat a távmunkához',
      'Irodai hálózat – több munkaállomás bekötése, hálózati infrastruktúra',
      'Hálózati szekrény – patch panel, switch elhelyezés, rendezett kábelezés'
    ],
    forWhom: [
      'Külföldi rezidensek Budán – akik angolul szeretnék intézni a hálózat kiépítést',
      'Home office dolgozók – akiknek stabil, gyors internet kell a munkához',
      'Kis irodák – ahol több gép megbízható hálózati kapcsolata szükséges',
      'Új lakás / felújítás – ahol az alapoktól kell kiépíteni a hálózatot'
    ],
    titles: {
      hero_subtitle: 'UTP kábelezés, WiFi lefedettség optimalizálás, otthoni iroda hálózat kiépítés. Teljes szolgáltatás angol nyelven is.',
      services_section: 'IT hálózati szolgáltatásaim',
      for_whom_section: 'Kinek ajánlom?',
      english_title: 'IT Network Services in English',
      pricing_section: 'Árazás',
      cta_title: 'Kérjen ajánlatot hálózat kiépítésre'
    }
  },
  
  keziszerszamFelulvizsgalat: {
    industries: [
      'Fodrászatok, szépségszalonok – hajszárító, hajvasaló, hajgöndörítő',
      'Vendéglátóhelyek – kávégép, mixer, kenyérpirító, szeletelő',
      'Műhelyek – fúrógép, flex, csiszológép, hegesztő',
      'Irodák – nyomtató, lamináló, iratmegsemmisítő',
      'Rendelők – sterilizáló, elektromos berendezések',
      'Takarítócégek – porszívó, gőztisztító'
    ],
    steps: [
      { title: 'Eszközlista', description: 'Ön megadja, hány és milyen eszközt kell ellenőrizni.' },
      { title: 'Időpont', description: 'Egyeztetünk egy időpontot, ami Önnek megfelel.' },
      { title: 'Helyszíni mérés', description: 'Kalibrált hordozható műszerrel ellenőrzöm az eszközöket a helyszínen.' },
      { title: 'Jegyzőkönyv', description: 'Minden eszközről külön jegyzőkönyvet kap, „megfelelt" vagy „nem felelt meg" minősítéssel.' }
    ],
    whatWeCheck: [
      'Védővezetők folytonossága',
      'Szigetelési ellenállás',
      'Érintésvédelmi vizsgálat',
      'Szemrevételezés (kábel, csatlakozó, ház állapota)'
    ],
    titles: {
      hero_subtitle: 'Az elektromos kéziszerszámok éves felülvizsgálata kötelező. Helyszínen végzem, nem kell sehová szállítani az eszközöket.',
      who_needs: 'Kinek kötelező?',
      how_works: 'Hogyan zajlik a felülvizsgálat?',
      what_check: 'Mit mér a felülvizsgálat?',
      pricing_section: 'Árazás',
      cta_title: 'Kérjen ajánlatot kéziszerszám felülvizsgálatra',
      cta_subtitle: 'Helyszínen végzem, nem kell sehová vinni az eszközöket.'
    }
  }
};

console.log('Extracted all texts from all pages');
console.log(JSON.stringify(extractedTexts, null, 2));