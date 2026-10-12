/*!
 * project-extras.js — giacomoricciuxui.com
 * Va caricato DOPO main.js e i18n.js. Non modifica main.js: lo estende a runtime.
 * 1) Aggiunge le immagini e la nota "Le slide sono in italiano" nei pannelli dei case study.
 * 2) Traduce in italiano card, pannelli case study e domande della chat quando la lingua è IT.
 */
(function () {
  'use strict';
  if (typeof P === 'undefined' || typeof Q === 'undefined' || !document.getElementById('grid')) return;

  var IMGS = {"homizy": {"0": [{"s": "homizy-mission", "w": 2400, "h": 2547, "c": ["UX mission: put compatibility at the center of the experience. We look for homes, not people.", "UX mission: mettere la compatibilità al centro dell'esperienza. Cerchiamo case, non persone."]}, {"s": "homizy-ux-problem", "w": 2400, "h": 1900, "c": ["The roommate shouldn't be a gamble, but a tangible enrichment.", "Il proprio coinquilino non dovrebbe essere una scommessa, ma un fattore di arricchimento tangibile."]}], "1": [{"s": "homizy-insight-hd", "w": 2400, "h": 1900, "c": ["Practical vs social compatibility, and what it means for the experience.", "Compatibilità pratica e sociale, e cosa significa per l'esperienza."]}], "2": [{"s": "homizy-solution-hd", "w": 2400, "h": 1900, "c": ["ZyMatch & ZyMate: two flows to boost compatibility.", "ZyMatch & ZyMate: due flussi per potenziare la compatibilità."]}, {"s": "homizy-onboarding", "w": 2400, "h": 2154, "c": ["Onboarding questionnaire: the user's habits profile their ideal roommate.", "Questionario di onboarding: le abitudini dell'utente profilano il coinquilino ideale."]}, {"s": "homizy-archetypes-hd", "w": 2400, "h": 2750, "c": ["The four archetypes and their welcome screens.", "I quattro archetipi e le loro schermate di benvenuto."]}]}, "perii": {"1": [{"s": "perii-research-hd", "w": 2400, "h": 1942, "c": ["Four research methods: interviews, desk, field and benchmark.", "Quattro metodi di ricerca: interviste, desk, field e benchmark."]}], "2": [{"s": "perii-onboarding-hd", "w": 2400, "h": 1655, "c": ["Onboarding: a daily tip and guidance to ease bracelet acceptance.", "Onboarding: un consiglio del giorno e indicazioni per facilitare l'accettazione del braccialetto."]}, {"s": "perii-applied", "w": 2400, "h": 2409, "c": ["Applied solutions for caregivers aged 62 on average.", "Soluzioni applicate per caregiver con 62 anni di età media."]}, {"s": "perii-bracelet", "w": 2400, "h": 1655, "c": ["The bracelet: an easy-to-change battery and an elastic yet resistant material.", "Il braccialetto: batteria facile da cambiare e materiale elastico ma resistente."]}, {"s": "perii-safezone", "w": 2400, "h": 4656, "c": ["The Safe Zone and the emergency phase: reach, call or share the position with a relative.", "La Zona Sicura e la fase di emergenza: raggiungere, chiamare o condividere la posizione con un parente."]}]}, "antianti": {"0": [{"s": "antianti-overview", "w": 2400, "h": 3513, "c": ["Problem overview: for 89% of Gen Z (16-23), an object's value lies in its place within a personal narrative.", "Overview del problema: per l'89% della Gen Z (16-23 anni) il valore di un oggetto sta nella narrazione personale."]}], "1": [{"s": "antianti-problem", "w": 2400, "h": 1655, "c": ["The value drop: Gen Z cares about sustainability, yet only knows the opportunity tied to consumption.", "Il drop di valore: la Gen Z è sensibile alla sostenibilità, ma conosce solo l'opportunità legata al consumo."]}], "2": [{"s": "antianti-solution", "w": 2400, "h": 1655, "c": ["ANTIANTI's goal: counter fast fashion by being fashion, starting from identifying the defect.", "L'obiettivo di ANTIANTI: contrastare il fast fashion essendo fashion, partendo dall'identificazione del difetto."]}, {"s": "antianti-concept", "w": 2400, "h": 1655, "c": ["Ideas, Challenges, Sales: the three pillars of the app.", "Ideas, Sfide, Vendita: i tre pilastri dell'app."]}, {"s": "antianti-features", "w": 2400, "h": 1655, "c": ["Main features: Inspiration, Personal and Sales sections, with Vinted as the marketplace.", "Funzionalità principali: sezioni Ispirazione, Personale e Vendita, con Vinted come marketplace."]}, {"s": "antianti-features-2", "w": 2400, "h": 2439, "c": ["Built to scale: it starts with accessible paths for heavily worn items like T-shirts.", "Pensata per scalare: parte da percorsi accessibili per capi molto consumati come le t-shirt."]}]}};
  var IT = {"homizy": {"p": "Piattaforma di coliving", "tag": "Coliving", "d": "Mettere la compatibilità, non i metri quadri, al centro del co-living.", "sec": [{"h": "Il problema", "t": "Homizy nasce da una scelta radicale: credere nella compatibilità, non nei metri quadri. Le persone cercano ancora casa per dimensioni, quartiere e prezzo, ma il co-living non fallisce per mancanza di spazio. Fallisce per mancanza di allineamento.", "sc": 1, "st": [["65%", "delle persone indica gli orari abituali"], ["47%", "indica le abitudini"], ["43%", "indica la comunicazione delle esigenze"]], "pts": [["Dove si rompe davvero", "Il problema non sono mai i metri quadri. È l'allineamento tra le persone.", ["Comunicazione", "Ritmi", "Orari", "Abitudini"]]], "q": "La convivenza non fallisce a causa degli spazi."}, {"h": "Gli insight", "t": "Profilazione utente e room matching nascono da strumenti qualitativi (benchmark e interviste) e quantitativi (sondaggi). Un bisogno è emerso con chiarezza: un sistema capace di trasformare il coinquilino da rischio in un arricchimento concreto.", "sc": 1, "st": [["67%", "compatibilità pratica"], ["33%", "compatibilità sociale"]]}, {"h": "La soluzione", "t": "Homizy mette le persone al centro e trasforma l'abitare in un'esperienza condivisa costruita sull'affinità. La soluzione ha una doppia anima e potenzia la compatibilità attraverso due flussi distinti: ZyMatch & ZyMate.", "pts": [["1 · Flusso pratico", "Durante l'onboarding l'utente compila un questionario che profila le sue abitudini e gli permette di definire il tipo di coinquilino che cerca. I criteri di matching sono pesati per importanza e il sistema genera tre proposte abitative personalizzate con percentuali di compatibilità complessive e di dettaglio.", ["Orari &amp; pulizia 25%", "Lingua 20%", "Socialità &amp; età 10%", "Cultura, hobby &amp; interessi 5%"]], ["2 · Flusso sociale", "Quattro archetipi definiscono identità e appartenenza, creando ecosistemi sociali che vanno oltre la semplice convivenza.", ["Metodici", "Sognatori", "Fidati", "Passionali"]]], "q": "Mettere la compatibilità al centro dell'esperienza."}]}, "lumen": {"p": "Agente AI", "tag": "Agente AI", "d": "Un agente AI che trasforma le informazioni sparse del team in chiarezza.", "sec": [{"h": "Il problema", "t": "È lunedì mattina. Un progetto corre già veloce, ma nessuno ha un quadro chiaro. Quante ore di budget restano? Quale task viene prima? Dov'è l'ultimo feedback del cliente? Non è un problema di persone, è un problema di informazioni: il tempo va in ricerca, allineamento e recupero invece che nel creare valore.", "st": [["67%", "del team non sa quanto budget resta su un progetto"], ["73%", "dice che le stime iniziali vengono superate del 30–50%"], ["56%", "vive cambi di priorità almeno tre volte a settimana"], ["40%", "dei documenti di lavoro non raggiunge l'intero team"]]}, {"h": "La soluzione", "t": "Un agente AI integrato direttamente nel flusso di lavoro del team. Non un altro strumento da imparare, ma un collega, come un senior gentile: collega le informazioni, monitora lo stato dei progetti, fa emergere i rischi e dà risposte prima che qualcuno debba chiedere.", "pts": [["L'agente si fa sentire", "Meno ricerche, meno incertezza, decisioni migliori:", ["«Restano 18 ore.»", "«Questa mattina la priorità è cambiata.»", "«Rilevato rischio di sforamento del budget.»", "«L'ultimo feedback del cliente è disponibile qui.»"]]], "q": "Non per lavorare di più, ma per lavorare con chiarezza, in modo più fluido."}]}, "antianti": {"p": "App mobile", "tag": "App · Fashion", "d": "Un servizio in abbonamento che trasforma i vestiti rovinati in valore.", "sec": [{"h": "Il problema", "t": "In un panorama dominato da fast fashion e acquisti d'impulso, la Generazione Z non ama buttare i vestiti a cui è affezionata, ma è abituata a sostituirli nel momento in cui si rovinano.", "pts": [["Il momento critico", "L'istante in cui un capo smette di rientrare nella storia di chi lo indossa.", ["Macchiato", "Strappato", "Perde la «postabilità»"]]], "q": "Nel XXI secolo nulla è indispensabile."}, {"h": "Gli insight", "t": "Il problema non è la mancanza di consapevolezza. È il calo di valore che si verifica quando un capo si rovina: in quel momento non sostiene più l'identità di chi lo indossa e comprare qualcosa di nuovo diventa la soluzione più facile.", "pts": [["Il drop di valore", "Un capo rovinato smette di esprimere chi è l'utente."], ["Il paradosso", "La Gen Z è molto sensibile alla sostenibilità, ma conosce solo l'opportunità legata al consumo."]], "q": "Non una mancanza di consapevolezza: un drop di valore."}, {"h": "La soluzione", "t": "Un servizio digitale in abbonamento che intercetta questo momento critico e lo trasforma in un'opportunità. Non un tutorial di cucito, ma un'esperienza guidata che aiuta a reinterpretare e riparare i capi rovinati per renderli di nuovo desiderabili, e rivendibili.", "pts": [["Sbloccare il potenziale", "Il valore non sta nella perfezione. Ispirato alla filosofia giapponese del Kintsugi, il progetto considera i difetti elementi distintivi, non imperfezioni da nascondere."], ["Sfide graduali", "Le sezioni Ideas, Personale e Vendita permettono di accettare sfide graduali, accumulare punti e sbloccare sfide più complesse ma ad alta vendibilità. Si parte da percorsi accessibili per capi molto consumati come le t-shirt."], ["Un cambio di mentalità", "Dall'acquisto compulsivo a un atteggiamento più consapevole, creativo e potenzialmente redditizio.", ["Consapevole", "Creativo", "Potenzialmente redditizio"]]], "q": "Non insegna solo a riparare i vestiti. Cambia il modo in cui si percepisce il valore."}]}, "perii": {"p": "Wearable · App mobile", "tag": "Salute", "d": "Un ecosistema digitale di sicurezza che aiuta i malati di Alzheimer e i loro caregiver ad affrontare il wandering.", "sec": [{"h": "Il problema", "t": "In Italia non esistono attualmente soluzioni digitali pensate specificamente per i malati di Alzheimer, e ancora meno per uno dei sintomi più critici e pericolosi: il wandering.", "st": [["3M", "caregiver di malati di Alzheimer in Italia, per lo più familiari del paziente"]], "pts": [["Non è solo disorientamento", "Il wandering è un comportamento imprevedibile che espone le persone con Alzheimer a rischi seri, lasciando i caregiver in uno stato costante di ansia e ipervigilanza.", ["Imprevedibile", "Rischi seri", "Ipervigilanza"]], ["La paura che resta", "La paura del «e se si allontana?» spesso impedisce alle famiglie di lasciare i propri cari soli, anche per brevi periodi."]]}, {"h": "Gli insight", "t": "Per capire le persone dietro questo vuoto, la ricerca ha unito interviste, desk research, lavoro sul campo e benchmark. I caregiver hanno in media 62 anni e vivono il wandering come un pensiero frequente: la risposta doveva essere semplice e accessibile.", "sc": 1, "st": [["8", "caregiver intervistati"], ["2", "neuropsicologi"], ["1", "OSS in una struttura specializzata in Alzheimer"], ["62", "età media dei caregiver"]], "pts": [["Come abbiamo ascoltato", "Due script di intervista, uno per i caregiver e uno per i professionisti, più una giornata intera sul campo con un caregiver. Senza progetti digitali italiani da cui imparare, il benchmark ha guardato all'estero e alle app di tracking per animali come Tractive.", ["Interviste", "Desk research", "Field research", "Benchmark"]]]}, {"h": "La soluzione", "t": "PERII nasce per colmare direttamente questo vuoto: un ecosistema digitale di sicurezza che riduce i rischi del wandering e sostiene pazienti e caregiver. Al centro c'è un braccialetto indossabile con GPS collegato a una semplice app mobile accessibile.", "pts": [["Posizione in tempo reale", "I caregiver possono monitorare la posizione del paziente in qualsiasi momento."], ["Zone sicure", "I caregiver impostano confini predefiniti attorno ai luoghi in cui il paziente può muoversi liberamente."], ["Avvisi immediati", "Un avviso arriva non appena un confine viene superato, con tre scelte: raggiungere la persona, chiamare o condividere la sua posizione con un parente."], ["Un braccialetto pensato per il paziente", "Una batteria facile da cambiare, in un sistema simile ad AirTag, evita lo stress della ricarica quotidiana. Un materiale elastico ma resistente ne impedisce la facile rimozione."], ["Un'app pensata per il caregiver", "Testi e interlinea più grandi, concetti semplici, attenzione alla thumb zone, una palette simile a WhatsApp e un lettore vocale per chi ha problemi alla vista."]], "q": "PERII, dove ritrovarti."}]}};
  var QIT = {"sum": ["Riassumi il suo profilo in 2 righe", "Giacomo è un UX/UI designer junior con background in Product Design e un Master in UX/UI e Digital Skills a Talent Garden Milano (2025-2026). Gli stanno a cuore la chiarezza delle interazioni, l'usabilità e i design system scalabili, e come i piccoli dettagli rendano le interazioni più fluide."], "skills": ["Quali sono le sue competenze UX/UI più forti?", "User flow mapping, architettura dell'informazione e prototipazione in Figma, supportati da test di usabilità e ragionamento da design system. Si occupa anche di UX writing per sistemi AI."], "results": ["Quali risultati ha ottenuto?", "In Sketchin (2026) ha fatto benchmark dei competitor, mappato le frizioni nella scoperta prodotto e nel checkout, riprogettato la navigazione e ridotto il checkout da 6 a 3 passaggi."], "teams": ["Con che tipo di team lavora meglio?", "I suoi stage sono stati in contesti orientati al prodotto: flussi di checkout e discovery in Sketchin, una piattaforma di coliving in Homizy, progetti di prodotto e spazio in Biagetti Design Group. Si trova bene nei team che valorizzano chiarezza, decisioni centrate sull'utente e cura del dettaglio."], "best": ["Quale progetto lo rappresenta meglio?", "Homizy è la panoramica migliore: flussi end-to-end per prenotazione e spazi condivisi, più prototipi Figma ad alta fedeltà focalizzati su chiarezza e minor carico cognitivo. Lumen, AntiAnti e PERII aggiungono ampiezza. Vuoi approfondire Homizy?"], "h_role": ["Che ruolo ha avuto in Homizy?", "Ha lavorato come UX/UI Designer in stage nel 2026 sulla piattaforma di coliving, occupandosi di user flow, prototipi e iterazioni dell'interfaccia."], "h_flows": ["Come ha ristrutturato la prenotazione in Homizy?", "Ha progettato user flow end-to-end per la piattaforma, ristrutturando il funzionamento di prenotazione e interazioni negli spazi condivisi."], "h_proto": ["Cosa ha prototipato in Figma?", "Prototipi ad alta fedeltà costruiti a partire dai flussi, per migliorare la chiarezza della navigazione e ridurre il carico cognitivo."], "h_iter": ["Come ha iterato sull'interfaccia?", "Ha affinato le soluzioni di interfaccia sulla base del ragionamento sull'usabilità e della coerenza delle interazioni su più punti di contatto."], "others": ["Quali altri progetti sono presenti?", "Il portfolio include anche Lumen, AntiAnti e PERII, ognuno con un case study scorrevole."], "tools": ["Che strumenti usa?", "Figma e Miro per design e collaborazione, Rhinoceros e Blender per il 3D, e la Adobe Suite per il lavoro visivo."], "contact": ["Come posso contattarlo?", "Il modo più semplice è l'email a riccigiacomo300@gmail.com, oppure LinkedIn."]};
  var KWIT = {"sum": "riassunto riassumi profilo presentazione", "skills": "competenze skill punti forza", "results": "risultati obiettivi impatto checkout", "teams": "team squadra cultura collaborare", "best": "progetto progetti portfolio rappresenta", "tools": "strumenti tool software figma", "contact": "contatto contatti email contattare linkedin assumere", "h_role": "ruolo homizy", "h_flows": "prenotazione flusso flussi", "h_proto": "prototipo prototipi figma", "h_iter": "iterare interfaccia", "others": "altri progetti lumen antianti perii"};
  var ENO = {"homizy": {"sec": [{"h": "The problem", "t": "Homizy was born from a radical choice: believing in compatibility, not in square meters. People still search for homes by size, neighborhood and price, but co-living doesn't fail for lack of space. It fails for lack of alignment.", "sc": 1, "st": [["65%", "of people name usual schedules"], ["47%", "name habits"], ["43%", "name how needs are communicated"]], "pts": [["Where it really breaks", "The gap is never the square meters. It is the alignment between people.", ["Communication", "Rhythms", "Schedules", "Habits"]]], "q": "Co-living doesn't fail because of the spaces."}, {"h": "The insights", "t": "User profiling and room matching were built on two kinds of evidence: qualitative tools (benchmarks and interviews) and quantitative ones (surveys). One need came out clearly: a system capable of turning the roommate from a risk into a tangible enrichment.", "sc": 1, "st": [["67%", "practical compatibility"], ["33%", "social compatibility"]]}, {"h": "The solution", "t": "Homizy puts people at the center and turns housing into a shared experience built on affinity. The solution has a dual nature, enhancing compatibility through two distinct flows: ZyMatch & ZyMate.", "pts": [["1 · Practical flow", "During onboarding, users complete a questionnaire that profiles their habits and lets them define the type of roommate they are looking for. Matching criteria are weighted by importance, and the system generates three personalized housing proposals showing overall and detailed compatibility percentages.", ["Schedules &amp; cleanliness 25%", "Language 20%", "Sociality &amp; age 10%", "Culture, hobbies &amp; interests 5%"]], ["2 · Social flow", "Four archetypes define identity and belonging, creating social ecosystems that go beyond simple cohabitation.", ["Methodical", "Dreamers", "Trustworthy", "Passionate"]]], "q": "Putting compatibility at the center of the experience."}]}, "antianti": {"sec": [{"h": "The problem", "t": "In a landscape dominated by fast fashion and impulse buying, Generation Z doesn't like throwing away clothes they feel attached to, yet is used to replacing them the moment they get damaged.", "pts": [["The critical moment", "The instant a piece stops fitting the user's story.", ["Stained", "Torn", "Loses its postability"]]], "q": "In the 21st century, nothing is indispensable."}, {"h": "The insights", "t": "The issue is not lack of awareness. It's the value drop that happens when a garment gets damaged: in that moment the piece no longer supports the user's identity, and the easiest solution becomes buying something new.", "pts": [["The value drop", "A damaged garment stops expressing who the user is."], ["The paradox", "Gen Z is very sensitive to sustainability, yet only sees the opportunity tied to consumption."]], "q": "Not a lack of awareness: a value drop."}, {"h": "The solution", "t": "A subscription-based digital service that intercepts this critical moment and turns it into an opportunity. Not a sewing tutorial, but a guided experience that helps users reinterpret and repair damaged clothes to make them desirable, and resellable, again.", "pts": [["Unlocking potential", "The value is not in perfection. Inspired by the Japanese philosophy of Kintsugi, flaws become distinctive elements rather than defects to hide."], ["Gradual challenges", "Ideas, Personal and Sales sections let users take on gradual challenges, earn points and unlock more complex ones with high resale potential. It starts with accessible paths for heavily worn items like T-shirts."], ["A mindset shift", "From compulsive purchasing to a more conscious, creative and potentially profitable mindset.", ["Conscious", "Creative", "Potentially profitable"]]], "q": "It doesn't just teach how to fix clothes. It changes how value is perceived."}]}, "perii": {"sec": [{"h": "The problem", "t": "In Italy there are currently no dedicated digital solutions designed specifically for Alzheimer's patients, and even fewer addressing one of the most critical and dangerous symptoms: wandering.", "st": [["3M", "Alzheimer's caregivers in Italy, most of them related to the patient"]], "pts": [["Not just disorientation", "Wandering is an unpredictable behavior that exposes people with Alzheimer's to serious risks, while leaving caregivers in a constant state of anxiety and hypervigilance.", ["Unpredictable", "Serious risks", "Hypervigilance"]], ["The fear that stays", "The fear of “what if they walk away?” often prevents families from leaving their loved ones alone, even for short periods of time."]]}, {"h": "The insights", "t": "To understand the people behind the gap, the research combined interviews, desk research, field work and a benchmark. Caregivers are 62 years old on average and live wandering as a frequent thought, so the answer had to be simple and accessible.", "sc": 1, "st": [["8", "caregivers interviewed"], ["2", "neuropsychologists"], ["1", "care worker (OSS) in an Alzheimer's facility"], ["62", "average age of caregivers"]], "pts": [["How we listened", "Two interview scripts, one for caregivers and one for professionals, plus a full day in the field with a caregiver. With no Italian digital project to learn from, the benchmark looked abroad and at pet-tracking apps like Tractive.", ["Interviews", "Desk research", "Field research", "Benchmark"]]]}, {"h": "The solution", "t": "PERII was designed to address this gap directly: a digital safety ecosystem that reduces the risks of wandering while supporting both patients and caregivers. At its core is a GPS-enabled wearable bracelet connected to a simple, accessible mobile app.", "pts": [["Real-time location", "Caregivers can monitor the patient's location at any moment."], ["Safe zones", "Caregivers set predefined boundaries around places where the patient can move freely."], ["Instant alerts", "An alert arrives as soon as a boundary is crossed, with three choices: reach the person, call, or share their position with a relative."], ["A bracelet built around the patient", "An easy-to-change battery, in an AirTag-like system, avoids the stress of daily recharging. An elastic yet resistant material prevents easy removal."], ["An app built around the caregiver", "Larger text and line spacing, simple concepts, attention to the thumb zone, a WhatsApp-like palette and a voice reader for those with vision problems."]], "q": "PERII, where to find you again."}]}};
  var NOTE = ['Slides are in Italian, the original project language.', 'Le slide sono in italiano, la lingua originale del progetto.'];
  var CHAT = {
    hi: ["Hi! I'm Giacomo's AI assistant. Pick a question below, or type your own, for a quick overview of his profile and work.", "Ciao! Sono l'assistente AI di Giacomo. Scegli una domanda qui sotto, o scrivine una tua, per una rapida panoramica del suo profilo e del suo lavoro."],
    nf: ["I can answer questions about Giacomo's profile, skills, tools and projects. Try one of these:", "Posso rispondere a domande sul profilo, le competenze, gli strumenti e i progetti di Giacomo. Prova una di queste:"]
  };

  function isIt() { return document.documentElement.lang === 'it'; }
  function L(en, it) { return isIt() ? it : en; }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  var el = function (id) { return document.getElementById(id); };

  // Testi inglesi aggiornati (prima di salvare le copie originali)
  Object.keys(ENO).forEach(function (k) { P[k].sec = clone(ENO[k].sec); });

  // Copie originali (inglese)
  var EN = {}, ENQ = {}, ENKW = {}, lastKey = null;
  Object.keys(IT).forEach(function (k) { var o = P[k]; EN[k] = { p: o.p, tag: o.tag, d: o.d, sec: clone(o.sec) }; });
  Object.keys(Q).forEach(function (k) {
    ENQ[k] = { q: Q[k].q, a: Q[k].a, b: Q[k].b ? clone(Q[k].b) : null };
    ENKW[k] = KW[k] || '';
  });

  // Stile
  var st = document.createElement('style');
  st.textContent = '.shot{margin:28px 0 0}.shot img{display:block;width:100%;height:auto;border-radius:16px}' +
    '.shot figcaption{font-size:13px;opacity:.65;margin-top:8px}.slides-note{font-size:13px;opacity:.65;font-style:italic}' +
    '#pv{transition:opacity .38s cubic-bezier(.65,0,.35,1),transform .38s cubic-bezier(.65,0,.35,1)}' +
    '#pv:not([hidden]){animation:pv-in .5s cubic-bezier(.2,.7,.2,1) both}' +
    '@keyframes pv-in{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}' +
    '#pv.is-closing{opacity:0;transform:translateY(28px);pointer-events:none}' +
    '@media(prefers-reduced-motion:reduce){#pv,#pv:not([hidden]){animation:none;transition:none}}' +
    'html{scrollbar-gutter:stable}' +
    '#pv .chips.data{margin:20px 0 28px}#pv .chips.data b{margin-right:6px}#pv .sc>.chips.data+.pts{margin-top:8px}' +
    ['homizy', 'antianti', 'perii'].map(function (p) { var b = '#pv[data-proj="' + p + '"] .sc[data-i="'; return b + '0"] .stat,' + b + '1"] .stat,' + b + '0"] .pt,' + b + '1"] .pt'; }).join(',') +
    '{background:none!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:0!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;transform:none!important}' +
    '@keyframes pv-in{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}' +
    '#pv.pv-in{animation:pv-in .5s cubic-bezier(.2,.7,.2,1) both}' +
    '#pv.pv-out{opacity:0;transform:translateY(28px);transition:opacity .38s cubic-bezier(.65,0,.35,1),transform .38s cubic-bezier(.65,0,.35,1);pointer-events:none}' +
    '@media(prefers-reduced-motion:reduce){#pv.pv-in{animation:none}#pv.pv-out{transition:none}}' +
    ':root[data-theme=dark] .shot figcaption,:root[data-theme=dark] .slides-note{color:#fff;opacity:1}' +
    '@media(prefers-color-scheme:dark){:root:not([data-theme=light]) .shot figcaption,:root:not([data-theme=light]) .slides-note{color:#fff;opacity:1}}';
  document.head.appendChild(st);

  function figs(key, i) {
    var list = (IMGS[key] || {})[String(i)] || [];
    return list.map(function (m) {
      return '<figure class="shot"><img src="assets/images/' + m.s + '.webp" width="' + m.w + '" height="' + m.h +
        '" alt="' + m.c[0].replace(/"/g, '&quot;') + '" loading="lazy" decoding="async"><figcaption>' + m.c[isIt() ? 1 : 0] + '</figcaption></figure>';
    }).join('');
  }

  // Versione estesa di secHTML (stessa struttura dell'originale + immagini + nota)
  window.secHTML = function (o) {
    var key = Object.keys(P).filter(function (k) { return P[k] === o; })[0];
    var html = (o.sec || []).map(function (x, i) {
      var h = '<h2>' + x.h + '</h2><p class="d">' + x.t + '</p>';
      if (x.st && x.sc) h += '<div class="chips data">' + x.st.map(function (a) { return '<span><b>' + a[0] + '</b> ' + a[1] + '</span>'; }).join('') + '</div>'; else if (x.st) h += '<div class="stats">' + x.st.map(function (a) { return '<div class="stat"><b>' + a[0] + '</b><span>' + a[1] + '</span></div>'; }).join('') + '</div>';
      if (x.pts) h += '<div class="pts">' + x.pts.map(function (a) { return '<div class="pt"><h3>' + a[0] + '</h3><p>' + a[1] + '</p>' + (a[2] ? '<div class="chips">' + a[2].map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>' : '') + '</div>'; }).join('') + '</div>';
      h += figs(key, i);
      if (x.q) h += '<blockquote>' + x.q + '</blockquote>';
      return '<div class="sc" data-i="' + i + '">' + h + '</div>';
    }).join('');
    if (IMGS[key]) html += '<div class="sc"><p class="slides-note">' + NOTE[isIt() ? 1 : 0] + '</p></div>';
    return html;
  };

  function metaLine(o) { return o.p + ' · ' + L('UX/UI & Experience Design', 'UX/UI ed Experience Design') + (o.y ? ' · ' + o.y : ''); }

  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var closing = false;

  var openP0 = window.openP;
  window.openP = function (k) {
    var pv = el('pv');
    var wasHidden = !pv || pv.hidden;
    lastKey = k;
    openP0(k);
    el('pm').textContent = metaLine(P[k]);
    if (pv) pv.setAttribute('data-proj', k);
    // Entrata morbida solo all'apertura (non quando cambia la lingua a pannello aperto)
    if (wasHidden && pv && !reduceMotion) {
      pv.classList.remove('pv-in', 'pv-out');
      void pv.offsetWidth;
      pv.classList.add('pv-in');
    }
  };

  // Chiusura morbida: dissolvenza + leggero scorrimento verso il basso, poi chiusura vera
  var closeP0 = window.closeP;
  window.closeP = function () {
    var pv = el('pv');
    if (!pv || pv.hidden || closing) return;
    if (reduceMotion) { closeP0(); return; }
    closing = true;
    pv.classList.remove('pv-in');
    pv.classList.add('pv-out');
    setTimeout(function () {
      closeP0();
      pv.classList.remove('pv-out');
      closing = false;
    }, 380);
  };
  var backBtn = el('pc');
  if (backBtn) backBtn.onclick = window.closeP;

  function renderGrid() {
    el('grid').innerHTML = Object.keys(P).map(function (k) {
      var o = P[k];
      return '<div class="card" data-p="' + k + '" role="button" tabindex="0"><img src="' + o.img + '" alt="' + o.t + ' cover" width="' + o.w + '" height="' + o.h + '" loading="lazy" decoding="async"><div class="t"><div class="row"><h3>' + o.t + '</h3>' + (o.y ? '<span class="y">' + o.y + '</span>' : '') + '</div><div class="m">' + o.p + ' · ' + L('UX/UI &amp; Experience Design', 'UX/UI ed Experience Design') + '</div><div class="lk"><span class="tag">' + o.tag + '</span><a class="pill" href="' + o.u + '" target="_blank" rel="noopener">Behance ↗</a></div></div></div>';
    }).join('');
  }

  function statics() {
    var it = isIt(), pc = el('pc'), ci = el('ci'), pv = el('pv'), cx = el('cx');
    if (pc) pc.textContent = it ? '\u2190 Indietro' : '\u2190 Back';
    if (ci) { var ph = it ? 'Chiedimi qualsiasi cosa su Giacomo' : 'Ask me anything about Giacomo'; ci.placeholder = ph; ci.setAttribute('aria-label', ph); }
    if (pv) pv.setAttribute('aria-label', it ? 'Dettagli del progetto' : 'Project details');
    if (cx) cx.setAttribute('aria-label', it ? 'Chiudi chat' : 'Close chat');
  }

  function apply() {
    var it = isIt();
    Object.keys(IT).forEach(function (k) {
      var src = it ? IT[k] : EN[k];
      P[k].p = src.p; P[k].tag = src.tag; P[k].d = src.d; P[k].sec = clone(src.sec);
    });
    Object.keys(Q).forEach(function (k) {
      var e = ENQ[k];
      Q[k].q = it && QIT[k] ? QIT[k][0] : e.q;
      Q[k].a = it && QIT[k] ? QIT[k][1] : e.a;
      KW[k] = ENKW[k] + (it && KWIT[k] ? ' ' + KWIT[k] : '');
      if (e.b) {
        Q[k].b = clone(e.b);
        if (it) Q[k].b.forEach(function (b) {
          if (b.l === 'View Homizy') b.l = 'Vedi Homizy';
          if (b.l === 'Write an email') b.l = "Scrivi un'email";
          if (b.s === 'Connect on LinkedIn') b.s = 'Collegati su LinkedIn';
        });
      }
    });
    renderGrid();
    var pc = el('pc'); if (pc) pc.textContent = L('\u2190 Back', '\u2190 Indietro');
    var ci = el('ci');
    if (ci) { var ph = L('Ask me anything about Giacomo', 'Chiedimi qualcosa su Giacomo'); ci.placeholder = ph; ci.setAttribute('aria-label', ph); }
    var cx = el('cx'); if (cx) cx.setAttribute('aria-label', L('Close chat', 'Chiudi chat'));
    var pv0 = el('pv'); if (pv0) pv0.setAttribute('aria-label', L('Project details', 'Dettagli del progetto'));
    statics();
    var pv = el('pv');
    if (pv && !pv.hidden && lastKey) { var y = pv.scrollTop; window.openP(lastKey); pv.scrollTop = y; }
    if (el('chips') && el('chips').children.length) chips(ROOT);
  }

  // Parole vuote italiane per la ricerca nella chat
  ['che', 'con', 'come', 'sono', 'del', 'della', 'per', 'una', 'uno', 'gli', 'suo', 'sua', 'quali', 'quale', 'cosa', 'puoi', 'posso', 'dove'].forEach(function (w) { STOP.push(w); });

  // Messaggi fissi della chat (saluto e risposta di riserva)
  var msgs = el('msgs');
  if (msgs && 'MutationObserver' in window) {
    new MutationObserver(function (muts) {
      if (!isIt()) return;
      muts.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, function (n) {
          if (n.nodeType !== 1) return;
          var ps = n.tagName === 'P' ? [n] : Array.prototype.slice.call(n.querySelectorAll('p'));
          ps.forEach(function (p) {
            var t = p.textContent;
            if (t === CHAT.hi[0]) p.textContent = CHAT.hi[1];
            else if (t === CHAT.nf[0]) p.textContent = CHAT.nf[1];
          });
        });
      });
    }).observe(msgs, { childList: true });
  }

  var last = null;
  function onLang() { var l = document.documentElement.lang; if (l !== last) { last = l; apply(); } }
  document.addEventListener('langchange', onLang);
  onLang();
})();
