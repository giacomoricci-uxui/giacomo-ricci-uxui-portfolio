/*!
 * project-extras.js — giacomoricciuxui.com
 * Va caricato DOPO main.js e i18n.js. Non modifica main.js: lo estende a runtime.
 * 1) Aggiunge le immagini e la nota "Le slide sono in italiano" nei pannelli dei case study.
 * 2) Traduce in italiano card, pannelli case study e domande della chat quando la lingua è IT.
 */
(function () {
  'use strict';
  if (typeof P === 'undefined' || typeof Q === 'undefined' || !document.getElementById('grid')) return;

  var IMGS = {"homizy": {"0": [{"s": "homizy-ux-problem", "w": 2400, "h": 1900, "c": ["The roommate shouldn't be a gamble, but a tangible enrichment.", "Il proprio coinquilino non dovrebbe essere una scommessa, ma un fattore di arricchimento tangibile."]}, {"s": "homizy-insight-hd", "w": 2400, "h": 1900, "c": ["Practical vs social compatibility, and what it means for the experience.", "Compatibilità pratica e sociale, e cosa significa per l'esperienza."]}], "1": [{"s": "homizy-onboarding", "w": 2400, "h": 2154, "c": ["Onboarding questionnaire: the user's habits profile their ideal roommate.", "Questionario di onboarding: le abitudini dell'utente profilano il coinquilino ideale."]}, {"s": "homizy-solution-hd", "w": 2400, "h": 1900, "c": ["ZyMatch & ZyMate: two flows to boost compatibility.", "ZyMatch & ZyMate: due flussi per potenziare la compatibilità."]}]}, "perii": {"0": [{"s": "perii-research-hd", "w": 2400, "h": 1942, "c": ["Four research methods: interviews, desk, field and benchmark.", "Quattro metodi di ricerca: interviste, desk, field e benchmark."]}], "1": [{"s": "perii-bracelet", "w": 2400, "h": 1655, "c": ["The bracelet: an easy-to-change battery and an elastic yet resistant material.", "Il braccialetto: batteria facile da cambiare e materiale elastico ma resistente."]}, {"s": "perii-applied", "w": 2400, "h": 2409, "c": ["Applied solutions for caregivers aged 62 on average.", "Soluzioni applicate per caregiver con 62 anni di età media."]}, {"s": "perii-onboarding-hd", "w": 2400, "h": 1655, "c": ["Onboarding: a daily tip and guidance to ease bracelet acceptance.", "Onboarding: un consiglio del giorno e indicazioni per facilitare l'accettazione del braccialetto."]}]}, "antianti": {"0": [{"s": "antianti-problem", "w": 2400, "h": 1655, "c": ["The value drop: Gen Z cares about sustainability, yet only knows the opportunity tied to consumption.", "Il drop di valore: la Gen Z è sensibile alla sostenibilità, ma conosce solo l'opportunità legata al consumo."]}], "1": [{"s": "antianti-solution", "w": 2400, "h": 1655, "c": ["ANTIANTI's goal: counter fast fashion by being fashion, starting from identifying the defect.", "L'obiettivo di ANTIANTI: contrastare il fast fashion essendo fashion, partendo dall'identificazione del difetto."]}, {"s": "antianti-concept", "w": 2400, "h": 1655, "c": ["Ideas, Challenges, Sales: the three pillars of the app.", "Ideas, Sfide, Vendita: i tre pilastri dell'app."]}, {"s": "antianti-features", "w": 2400, "h": 1655, "c": ["Main features: Inspiration, Personal and Sales sections, with Vinted as the marketplace.", "Funzionalità principali: sezioni Ispirazione, Personale e Vendita, con Vinted come marketplace."]}]}};
  var IT = {"homizy": {"p": "Piattaforma di coliving", "tag": "Coliving", "d": "Mettere la compatibilità, non i metri quadri, al centro del co-living.", "sec": [{"h": "Il problema", "t": "Homizy nasce da una scelta radicale: credere nella compatibilità, non nei metri quadri. Le persone cercano ancora casa per dimensioni, quartiere e prezzo, ma il co-living non fallisce per mancanza di spazio. Fallisce per mancanza di allineamento su comunicazione, ritmi, orari e abitudini. Benchmark, interviste e sondaggi hanno chiarito un bisogno: un sistema che trasformi il coinquilino da rischio in un arricchimento concreto."}, {"h": "La soluzione", "t": "Homizy mette le persone al centro e trasforma l'abitare in un'esperienza condivisa basata sull'affinità, attraverso due flussi distinti.", "pts": [["1 · Flusso pratico", "Durante l'onboarding gli utenti compilano un questionario che profila le loro abitudini e definisce il coinquilino che cercano. I criteri di matching sono pesati per importanza e il sistema genera tre proposte abitative personalizzate con percentuali di compatibilità complessive e di dettaglio.", ["Orari &amp; pulizia 25%", "Lingua 20%", "Socialità &amp; età 10%", "Cultura, hobby &amp; interessi 5%"]], ["2 · Flusso sociale", "Quattro archetipi definiscono identità e appartenenza, creando ecosistemi sociali che vanno oltre la semplice convivenza.", ["Metodici", "Sognatori", "Fidati", "Passionali"]]], "q": "Mettere la compatibilità al centro dell'esperienza."}]}, "lumen": {"p": "Agente AI", "tag": "Agente AI", "d": "Un agente AI che trasforma le informazioni sparse del team in chiarezza.", "sec": [{"h": "Il problema", "t": "È lunedì mattina. Un progetto corre già veloce, ma nessuno ha un quadro chiaro. Quante ore di budget restano? Quale task viene prima? Dov'è l'ultimo feedback del cliente? Non è un problema di persone, è un problema di informazioni: il tempo va in ricerca, allineamento e recupero invece che nel creare valore.", "st": [["67%", "del team non sa quanto budget resta su un progetto"], ["73%", "dice che le stime iniziali vengono superate del 30–50%"], ["56%", "vive cambi di priorità almeno tre volte a settimana"], ["40%", "dei documenti di lavoro non raggiunge l'intero team"]]}, {"h": "La soluzione", "t": "Un agente AI integrato direttamente nel flusso di lavoro del team. Non un altro strumento da imparare, ma un collega, come un senior gentile: collega le informazioni, monitora lo stato dei progetti, fa emergere i rischi e dà risposte prima che qualcuno debba chiedere.", "pts": [["L'agente si fa sentire", "Meno ricerche, meno incertezza, decisioni migliori:", ["«Restano 18 ore.»", "«Questa mattina la priorità è cambiata.»", "«Rilevato rischio di sforamento del budget.»", "«L'ultimo feedback del cliente è disponibile qui.»"]]], "q": "Non per lavorare di più, ma per lavorare con chiarezza, in modo più fluido."}]}, "antianti": {"p": "App mobile", "tag": "App · Fashion", "d": "Un servizio in abbonamento che trasforma i vestiti rovinati in valore.", "sec": [{"h": "Il problema", "t": "In un panorama dominato da fast fashion e acquisti d'impulso, la Gen Z non ama buttare i vestiti a cui è affezionata, eppure li sostituisce nel momento in cui si rovinano. Il problema non è la mancanza di consapevolezza. È il calo di valore quando un capo si macchia, si strappa o perde la sua «postabilità»: non sostiene più l'identità di chi lo indossa e comprare qualcosa di nuovo diventa la soluzione più facile."}, {"h": "La soluzione", "t": "Un servizio digitale in abbonamento che intercetta questo momento critico e lo trasforma in un'opportunità. Non un tutorial di cucito, ma un'esperienza guidata che aiuta a reinterpretare e riparare i capi rovinati per renderli di nuovo desiderabili, e rivendibili. Ispirato alla filosofia giapponese del Kintsugi, considera i difetti elementi distintivi anziché imperfezioni da nascondere, spostando l'acquisto compulsivo verso un atteggiamento più consapevole, creativo e potenzialmente redditizio.", "pts": [["Se non lo vendi", "Lo hai comunque riparato."], ["Se lo vendi", "Hai trasformato uno scarto in valore."]], "q": "Non insegna solo a riparare i vestiti. Cambia il modo in cui si percepisce il valore."}]}, "perii": {"p": "Wearable · App mobile", "tag": "Salute", "d": "Un ecosistema digitale di sicurezza che aiuta i malati di Alzheimer e i loro caregiver ad affrontare il wandering.", "sec": [{"h": "Il problema", "t": "In Italia non esistono attualmente soluzioni digitali pensate specificamente per i malati di Alzheimer, e ancora meno per uno dei sintomi più critici e pericolosi: il wandering. Il wandering non è solo disorientamento. È un comportamento imprevedibile che espone le persone con Alzheimer a rischi seri, lasciando i caregiver in uno stato costante di ansia e ipervigilanza. La paura del «e se si allontana?» spesso impedisce alle famiglie di lasciare i propri cari soli, anche per brevi periodi.", "st": [["3M", "caregiver di malati di Alzheimer in Italia, per lo più familiari del paziente"]]}, {"h": "La soluzione", "t": "PERII nasce per colmare direttamente questo vuoto. È un ecosistema digitale di sicurezza pensato per ridurre i rischi legati al wandering e sostenere pazienti e caregiver. Al centro c'è un braccialetto indossabile con GPS collegato a una semplice app mobile accessibile.", "pts": [["Posizione in tempo reale", "I caregiver possono monitorare la posizione del paziente in qualsiasi momento."], ["Zone sicure", "I caregiver impostano confini predefiniti attorno ai luoghi in cui il paziente può muoversi liberamente."], ["Avvisi immediati", "Un avviso arriva non appena un confine viene superato."]], "q": "PERII, dove ritrovarti."}]}};
  var QIT = {"sum": ["Riassumi il suo profilo in 2 righe", "Giacomo è un UX/UI designer junior con background in Product Design e un Master in UX/UI e Digital Skills a Talent Garden Milano (2025-2026). Gli stanno a cuore la chiarezza delle interazioni, l'usabilità e i design system scalabili, e come i piccoli dettagli rendano le interazioni più fluide."], "skills": ["Quali sono le sue competenze UX/UI più forti?", "User flow mapping, architettura dell'informazione e prototipazione in Figma, supportati da test di usabilità e ragionamento da design system. Si occupa anche di UX writing per sistemi AI."], "results": ["Quali risultati ha ottenuto?", "In Sketchin (2026) ha fatto benchmark dei competitor, mappato le frizioni nella scoperta prodotto e nel checkout, riprogettato la navigazione e ridotto il checkout da 6 a 3 passaggi."], "teams": ["Con che tipo di team lavora meglio?", "I suoi stage sono stati in contesti orientati al prodotto: flussi di checkout e discovery in Sketchin, una piattaforma di coliving in Homizy, progetti di prodotto e spazio in Biagetti Design Group. Si trova bene nei team che valorizzano chiarezza, decisioni centrate sull'utente e cura del dettaglio."], "best": ["Quale progetto lo rappresenta meglio?", "Homizy è la panoramica migliore: flussi end-to-end per prenotazione e spazi condivisi, più prototipi Figma ad alta fedeltà focalizzati su chiarezza e minor carico cognitivo. Lumen, AntiAnti e PERII aggiungono ampiezza. Vuoi approfondire Homizy?"], "h_role": ["Che ruolo ha avuto in Homizy?", "Ha lavorato come UX/UI Designer in stage nel 2026 sulla piattaforma di coliving, occupandosi di user flow, prototipi e iterazioni dell'interfaccia."], "h_flows": ["Come ha ristrutturato la prenotazione in Homizy?", "Ha progettato user flow end-to-end per la piattaforma, ristrutturando il funzionamento di prenotazione e interazioni negli spazi condivisi."], "h_proto": ["Cosa ha prototipato in Figma?", "Prototipi ad alta fedeltà costruiti a partire dai flussi, per migliorare la chiarezza della navigazione e ridurre il carico cognitivo."], "h_iter": ["Come ha iterato sull'interfaccia?", "Ha affinato le soluzioni di interfaccia sulla base del ragionamento sull'usabilità e della coerenza delle interazioni su più punti di contatto."], "others": ["Quali altri progetti sono presenti?", "Il portfolio include anche Lumen, AntiAnti e PERII, ognuno con un case study scorrevole."], "tools": ["Che strumenti usa?", "Figma e Miro per design e collaborazione, Rhinoceros e Blender per il 3D, e la Adobe Suite per il lavoro visivo."], "contact": ["Come posso contattarlo?", "Il modo più semplice è l'email a riccigiacomo300@gmail.com, oppure LinkedIn."]};
  var KWIT = {"sum": "riassunto riassumi profilo presentazione", "skills": "competenze skill punti forza", "results": "risultati obiettivi impatto checkout", "teams": "team squadra cultura collaborare", "best": "progetto progetti portfolio rappresenta", "tools": "strumenti tool software figma", "contact": "contatto contatti email contattare linkedin assumere", "h_role": "ruolo homizy", "h_flows": "prenotazione flusso flussi", "h_proto": "prototipo prototipi figma", "h_iter": "iterare interfaccia", "others": "altri progetti lumen antianti perii"};
  var NOTE = ['Slides are in Italian, the original project language.', 'Le slide sono in italiano, la lingua originale del progetto.'];
  var CHAT = {
    hi: ["Hi! I'm Giacomo's AI assistant. Pick a question below, or type your own, for a quick overview of his profile and work.", "Ciao! Sono l'assistente AI di Giacomo. Scegli una domanda qui sotto, o scrivine una tua, per una rapida panoramica del suo profilo e del suo lavoro."],
    nf: ["I can answer questions about Giacomo's profile, skills, tools and projects. Try one of these:", "Posso rispondere a domande sul profilo, le competenze, gli strumenti e i progetti di Giacomo. Prova una di queste:"]
  };

  function isIt() { return document.documentElement.lang === 'it'; }
  function L(en, it) { return isIt() ? it : en; }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  var el = function (id) { return document.getElementById(id); };

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
      if (x.st) h += '<div class="stats">' + x.st.map(function (a) { return '<div class="stat"><b>' + a[0] + '</b><span>' + a[1] + '</span></div>'; }).join('') + '</div>';
      if (x.pts) h += '<div class="pts">' + x.pts.map(function (a) { return '<div class="pt"><h3>' + a[0] + '</h3><p>' + a[1] + '</p>' + (a[2] ? '<div class="chips">' + a[2].map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>' : '') + '</div>'; }).join('') + '</div>';
      h += figs(key, i);
      if (x.q) h += '<blockquote>' + x.q + '</blockquote>';
      return '<div class="sc">' + h + '</div>';
    }).join('');
    if (IMGS[key]) html += '<div class="sc"><p class="slides-note">' + NOTE[isIt() ? 1 : 0] + '</p></div>';
    return html;
  };

  function metaLine(o) { return o.p + ' · ' + L('UX/UI & Experience Design', 'UX/UI ed Experience Design') + (o.y ? ' · ' + o.y : ''); }

  var openP0 = window.openP;
  window.openP = function (k) { lastKey = k; openP0(k); el('pm').textContent = metaLine(P[k]); };

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
