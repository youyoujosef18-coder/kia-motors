/* Catalogue transcribed verbatim from CPC-kai - 0901.pdf (uploads/price_list-1789162288940-jw8v.pdf).
   FOB Price ($) is authoritative. MSRP (¥) kept for reference. Duplicate and ambiguous rows are
   PRESERVED, not corrected. Where the sheet gives no value the field is null and renders
   "Not specified" / "Contact dealer" — never invented.
   Row: [model+version, colourText, msrpYuan, fobUsd, note]                                        */

(function () {
  var SUSPENDED = 'SUSPENDED';

  var RAW = {
    'Volkswagen': [
      ['2026 T-Roc Black + Black Package', 'Black', 158700, 19000],
      ['2026 T-Roc Grey + Black Package', 'White', 158700, 18900],
      ['2026 T-Roc Grey + Black Package', 'Grey', 158700, 19000],
      ['Golf 8.5-RLINE+2025 · 18-inch wheels + black finish', 'Grey', 158700, 18500],
      ['Golf 8.5-RLINE-2026 · Summer package + heated seats + ADAS + HUD + Harman Kardon + black wheels', 'Grey', null, 22800, { moq: 4 }],
      ['2026 Jetta VS5 280TSI Manual Pioneer + Leather Seats + Reverse Camera', 'White/Black', 88100, 10300],
      ['2026 Jetta VS5 280TSI Auto Enjoyment Highlight Edition', 'Grey/White/Black', 109100, 11800],
      ['2026 Jetta VS5 Auto Flagship Highlight Edition', 'Grey/White/Black', 122100, 13200],
      ['Jetta VS7 Auto Glory', 'Grey/White/Black', 129100, 14000],
      ['2026 Jetta VS8 Auto Supreme Edition', 'Grey/White/Black', 135100, 14500],
      ['2026 Tharu XR 1.5L Premium Edition', 'Grey', 143900, 13700],
      ['2026 Tharu XR 300TSI Premium Edition', 'Grey', 154900, 14500],
      ['2026 Passat Pro Starry Sky Dragon Edition', 'Black', 179900, 20400],
      ['2026 Passat Pro Classic Dragon Edition', 'Black', 179900, 20400],
      ['2026 Tiguan Pro 300TSI 2WD Smart Edition', 'Black/White', 213800, 21800],
      ['2025 Outstanding Model Tiguan 300TSI 2WD Dragon Edition (2026)', 'Black/White', 186800, 19600],
      ['2026 Tiguan L Pro 380TSI 4WD R-Liner Supreme Edition', 'Black/White', 266800, 30300],
      ['2026 Tiguan L Pro 380TSI 4WD R-Liner Supreme Edition (25 years old)', 'Black/White', 266800, 28800],
      ['Bora 200TS Custom Edition', 'White', 130100, 10800]
    ],
    'Audi': [
      ['2026 A3 35TFSI Prestige Premium + Luxury Package + Black Package', 'Sprint Grey/Red Interior', 205900, 22600],
      ['Q3 quattro 45th Anniversary Edition 35TFSI Fashion Dynamic 1.5T', 'Sky Grey/Quantum Grey', 266800, 23700],
      ['2026 Q5L Flagship Edition', 'Grey/White/Black', 383800, 53100]
    ],
    'Livan': [
      ['Livan X3pro Auto', 'Grey/White', 59900, 7500],
      ['Livan X3pro Auto', 'Black/Silver', 59900, 7500],
      ['Livan X3pro Manual + Sunroof', 'Grey/White', 48900, 7200],
      ['Livan X3pro Manual + Sunroof', 'Black/Silver', 48900, 7250],
      ['Livan X3pro Manual + Sunroof', 'White + Black Roof', 48900, 7650]
    ],
    'Geely': [
      ['Coolray L Star Edition + Package', 'White', 101800, 13000],
      ['Coolray L Full-option version (International Edition)', 'Grey', null, 11000, { moq: 4, note: 'Minimum order of 4 units' }],
      ['Coolray L Battle Edition', 'Grey', null, 11100, { moq: 4, note: '4 units per container' }],
      ['Coolray L Battle Edition', 'Silver', null, 11500, { moq: 4, note: '4 units per container' }],
      ['Coolray L Battle Edition', 'White', null, 11300, { moq: 4, note: '4 units per container' }],
      ['Coolray Super Manual', 'Silver', null, 8100, { moq: 4 }],
      ['Coolray Super Manual', 'Grey/White', 66800, 7900],
      ['Coolray Super Auto + Sunroof', 'Grey', 75800, 9300],
      ['Coolray Super Auto MAX', 'White', 78800, 9600],
      ['New Boyue Beloved Edition', 'Grey, White, Silver, Blue', 106900, 14000, { interior: 'Grey, Orange' }],
      ['Boyue L Splendid Edition', 'Black, White, Silver, Cyan, Blue', 126900, 16600, { interior: 'Grey, Gold' }],
      ['Cowboy Boundless Edition 1.5T+7DCT', 'Grey', 90900, 12300],
      ['Cowboy Boundless Edition + Wilderness Package 1.5T+7DCT', 'Grey', 93900, 12400],
      ['Boyue REV 220km Platinum Range Extended Long Range Supreme Edition', 'Water Wave Blue', 123900, 17000],
      ['Geely Galaxy Starship 7 2026 130KM Launch Edition + Tech Package', 'Black/White/Silver', 101800, null, { status: SUSPENDED }],
      ['Galaxy M7 2026 Voyager 225km Explorer+ Edition', 'Two-tone exterior', 137800, 18800, { interior: 'Suede interior' }],
      ['Galaxy M7 2026 Voyager 225km Starship Edition', 'Two-tone exterior', 147800, 21400, { interior: 'Suede interior' }]
    ],
    'Lynk & Co': [
      ['Lynk & Co 06 PLUS Africa Edition', 'White/Grey/Beige', null, 13200],
      ['Lynk & Co 900 2026 Model 1.5T Ultra 6-Seater', '', null, 42500],
      ['Lynk & Co 900 2026 Model 2.0T Ultra 6-Seater', '', null, 46500]
    ],
    'Kaiyi': [
      ['Kaiyi Xuanjie Pro 1.5 Automatic', 'White', 79900, 8500],
      ['Kaiyi Xuanjie Pro 1.5 Manual', 'White/Grey', 69900, 7700]
    ],
    'Hyundai': [
      ['Hyundai Elantra', 'White', 112800, 11700]
    ],
    'Kia': [
      ['K3', 'White', 114400, 11200],
      ['K3', 'White', 124900, 12900],
      ['Seltos', 'White', 131400, 13600],
      ['KX1', 'White', 83800, 9400],
      ['2026 Sportage 1.5T 2WD Premium', '', 169900, 22200],
      ['2026 Sportage 1.5T 2WD Luxury Edition', '', 159900, 20700]
    ],
    'MG / SAIC': [
      ['MG5 Manual Mexico Edition', 'White/Silver', 67900, 7100],
      ['MG5 Manual Domestic', 'White', 67900, 7300],
      ['MG5 Luxury Auto', 'White', 85900, 8700],
      ['Roewe i5 Manual 1.5L', 'White/Grey', 68900, 6400],
      ['Roewe i5 Luxury Edition 1.5L', 'White', 80900, 7500],
      ['New SWM Big Tiger — Manual Transmission, Sunroof, and Roof Rails', 'Black-Red/White-Red', 59900, 7600]
    ],
    'GAC Trumpchi': [
      ['Trumpchi GS3 R Edition International', 'Mexico Grey/Moon Grey', null, 11600, { note: 'Mexico Grey +$200 · sheet lists code TW8-06 in the MSRP column' }],
      ['Trumpchi GS3 R Edition International (Big Wheels + Big Screen)', 'Mexico Grey/Moon Grey', null, 12500, { note: 'Sheet lists code HT2B-TW9-B0 in the MSRP column' }],
      ['Trumpchi GS4 International Edition', 'Black/Silver/Grey/White', null, 13100],
      ['Trumpchi GS8 International Edition', 'Grey/White', null, 21500],
      ['Trumpchi GS3 Domestic Entry Edition', 'White', 79800, 8600],
      ['Trumpchi GS3 Domestic Enjoyment Edition', 'Moon Grey', 89800, 9500],
      ['Trumpchi GS3 Domestic Enjoyment Edition', 'Silver', 89800, 9500],
      ['Trumpchi GS3 Domestic Smart Edition (Big Screen)', 'Moon Grey/Silver/White', 99800, 11200],
      ['Trumpchi M8 GT International Edition', 'White', null, 28000],
      ['Trumpchi M8 GX International Edition', 'Black/White', null, 30500]
    ],
    'Aion': [
      ['Aion I06 Range Extended', 'White', 115800, 15800],
      ['Aion YP Pure Electric', 'White', 115800, 12700],
      ['Aion SP Pure Electric', 'White', 115800, 12700]
    ],
    'Changan': [
      ['2026 Changan X5 1.5L Luxury Manual', 'Grey/Black/White', 69900, 8600],
      ['2026 Changan X5 PLUS High Energy', 'Grey/Black/White', 91900, 9200],
      ['2026 Changan X5 PLUS Pioneer', 'Grey/Black/White', 95900, 9900],
      ['2026 Changan X5 PLUS Beyond PRO', 'Grey/Black/White', 98900, 10300],
      ['2026 Changan X5 PLUS Excellent PRO', 'Grey/Black/White', 103900, 11500],
      ['4th Gen CS55PLUS 1.5T Elite Edition', 'Grey/Black/White', 92900, 11000],
      ['4th Gen CS55PLUS 1.5T Leading Edition', 'Grey/Black/White', 98900, 11700],
      ['4th Gen CS55PLUS 1.5T Luxury Edition', 'Grey/Black/White', 106900, 12800],
      ['4th Gen CS55PLUS 1.5T Premium Edition', 'Grey/Black/White', 109900, 13500],
      ['2026 CS75 PRO 7-Seat Enjoyment Edition', 'Grey/Black/White', 97900, 10300],
      ['2026 CS75 PRO 5-Seat Comfort Edition', 'Grey/Black/White', 104900, 11200],
      ['2026 CS75 PRO 7-Seat Comfort Edition', 'Grey/Black/White', 107900, 11600],
      ['2026 CS75 PRO 5-Seat Enjoyment Edition', 'Grey/Black/White', 110900, 11900],
      ['2026 CS75 PRO 7-Seat Enjoyment Edition', 'Grey/Black/White', 113900, 12100],
      ['2026 CS75 PRO 5-Seat Premium Edition', 'Grey/Black/White', 118900, 12900],
      ['3rd Gen UNI-V Premium Sport Edition', 'Grey/White', 108900, 14300]
    ],
    'Changan Qiyuan': [
      ['Qiyuan Q05 405 Air', '', 79900, 10100],
      ['Qiyuan Q05 405 Max', '', 89900, 11400],
      ['Qiyuan Q05 506 Pro', '', 95900, 12500],
      ['Qiyuan Q05 506 Max', '', 99900, 13000]
    ],
    'Jetour': [
      ['X50 · Black interior', 'X50 GROUP', null, 10500],
      ['X50 · Black/Red', 'X50 GROUP', null, 12200],
      ['X70FL · Black interior', 'X70FL GROUP', null, 12800],
      ['X70FL · Black/Grey', 'X70FL GROUP', null, 12800],
      ['X70FL · Black interior', 'X70FL GROUP', null, 13500],
      ['X70FL · Black interior', 'X70FL GROUP', null, 13500],
      ['X70 PLUS · Black/Red', 'X70PLUS GROUP', null, 14800],
      ['X70 PLUS · Black/Red', 'X70PLUS GROUP', null, 17200],
      ['X-1 dashing · Black/Red', 'X1 GROUP', null, 15200],
      ['X-1 dashing · Grey/White', 'X1 GROUP', null, 15200],
      ['X-1 dashing · Black/Grey', 'X1 GROUP', null, 17200],
      ['T1 · Black/Orange', 'T1 GROUP', null, 18400],
      ['T1 · Black/Green', 'T1 GROUP', null, 18400],
      ['T1 · Black/Orange', 'T1 GROUP', null, 20600],
      ['T1 · Black/Green', 'T1 GROUP', null, 20600],
      ['T2 PHEV · Green/Orange', 'T2 GROUP', null, 28500],
      ['T2 PHEV · Blue/White', 'T2 GROUP', null, 28500],
      ['T2-1.5T · Black/Red', 'T2 GROUP', null, 20100],
      ['T2-1.5T · Green/Orange', 'T2 GROUP', null, 20100],
      ['T2-2.0 · Green/Orange', 'T2 GROUP', null, 23600],
      ['T2-2.0 · Brown', 'T2 GROUP', null, 23600],
      ['X70L 7-Seater Comfort Edition · Black', '', null, 16400],
      ['X70L 7-Seater Comfort Edition · Black', '', null, 17000],
      ['G700 · Black/Beige', 'G700 GROUP', null, 41800],
      ['G700 · Black/Orange', 'G700 GROUP', null, 41800],
      ['G700 · Black/Beige', 'G700 GROUP', null, 46000],
      ['G700 · Black/Orange', 'G700 GROUP', null, 46000]
    ],
    'XPeng Motors': [
      ['Super Extended-Range 1585KM AWD Max', '', 289800, 42500],
      ['Super Extended-Range 1585 AWD Ultra SE', '', 309800, 45000],
      ['Super Extended-Range 1585 AWD Ultra SE', '', 329800, 48500],
      ['Super extended range 1588 four-wheel drive ultar flagship version', '', 359800, 52500],
      ['Pure Electric 665 Max', '', 279800, 41500],
      ['Pure Electric 665 Ultra SE', '', 299800, 44500],
      ['Pure Electric 665 Ultra', '', 319800, 47500],
      ['Pure Electric 750 AWD Ultra Flagship Edition', '', 359800, 52500]
    ],
    'Leopard': [
      ['Titan 3 (2025 Model) 501km AWD Ultra Edition', 'White, Black, Green', 163800, 25300],
      ['Titanium 7 190KM AWD Ultra Edition', 'Black-Orange, Black-Blue, Green-Orange, Green-Blue, Silver-Orange, Silver-Blue', null, 32800, { note: 'International version' }],
      ['Titanium 7 190KM AWD Ultra Edition', 'Black-Orange, Black-Blue, Green-Orange, Gray-Blue, Gray-Orange', 219800, 32000],
      ['Leopard 5 Long-Range Version 210km Tianshen Ultra Edition', 'Black, Green, Silver', 269800, 39000],
      ['Leopard 5 Long-Range Edition 210km Yunnian-P (DiSus-P) Ultra Edition', 'Black, Green, Silver', 279800, 40500],
      ['Leopard 8 Smart-Courage Luxury Edition (7-Seater)', 'Black, Silver-Black', 379800, 54800],
      ['Leopard 8 Smart & Valiant Flagship Edition (7-Seater)', 'Silver-Grey, Gold-Black, Black-Black', 399800, 57000, { note: 'All finishes with 21-inch wheels + red calipers' }]
    ],
    'ZEEKR': [
      ['8X MAX', '', 356800, 60700],
      ['8X ULTRA', '', 376800, 64600],
      ['8X ULTRA+', '', 426800, 71100],
      ['8X 曜影', '', 475800, 81800],
      ['9X MAX', '', 465000, 71150],
      ['9X ULTRA', '', 485900, 76200],
      ['9X HYPER', '', 559900, 89200],
      ['9X 曜黑', '', 599900, 95000]
    ],
    'Toyota': [
      ['Corolla Elite Edition 1.2', 'White', 124800, 12900],
      ['Corolla Pioneer Edition 1.2', 'White', 118800, 12400],
      ['Corolla Cross 2.0 Elite Edition', 'White', 136800, 14600],
      ['Corolla 1.8 Hybrid Elite Edition', 'White', 136800, 14700],
      ['Corolla Cross 2.0 Luxury Edition', 'White', 149800, 16300],
      ['RAV4 Hybrid 2.5L AWD Luxury Edition', 'White', 212800, 28500],
      ['RAV4 Hybrid 2.0L AWD Flagship Edition', 'White', 228800, 30700]
    ]
  };

  /* Jetour lists its exterior palette in Chinese, per model family, separately from the
     interior combination in the colour column. Both are kept. */
  var JETOUR_GROUPS = {
    'X50 GROUP': [['新碳晶黑', 'New Carbon Crystal Black'], ['新卡其白', 'New Khaki White'], ['幻影灰', 'Phantom Grey'], ['航空银', 'Aviation Silver'], ['上黑下白', 'Black over White', '+250 USD']],
    'X70FL GROUP': [['星空黑', 'Starry Black'], ['新卡其白', 'New Khaki White'], ['科技灰', 'Tech Grey'], ['未来蓝', 'Future Blue']],
    'X70PLUS GROUP': [['星空黑', 'Starry Black'], ['新卡其白', 'New Khaki White'], ['幻影灰', 'Phantom Grey'], ['深海蓝', 'Deep Sea Blue'], ['未来蓝', 'Future Blue']],
    'X1 GROUP': [['新碳晶黑', 'New Carbon Crystal Black'], ['新卡其白', 'New Khaki White'], ['幻影灰', 'Phantom Grey'], ['科技灰', 'Tech Grey'], ['极光绿', 'Aurora Green'], ['血石红', 'Bloodstone Red']],
    'T1 GROUP': [['新碳晶黑', 'New Carbon Crystal Black'], ['新卡其白', 'New Khaki White'], ['航空银', 'Aviation Silver'], ['沙金', 'Sand Gold'], ['哑光雪银', 'Matte Snow Silver', '+600 USD']],
    'T2 GROUP': [['新碳晶黑', 'New Carbon Crystal Black'], ['新卡其白', 'New Khaki White'], ['航空银', 'Aviation Silver'], ['哑光雪银', 'Matte Snow Silver', '+600 USD'], ['电镀绿', 'Electroplated Green', '+600 USD']],
    'G700 GROUP': [['新碳晶黑', 'New Carbon Crystal Black'], ['新卡其白', 'New Khaki White'], ['极野仙棕', 'Wild Brown'], ['卡布里蓝', 'Capri Blue'], ['哑光雪银', 'Matte Snow Silver', '+600 USD'], ['朝霞橙', 'Dawn Orange', '+600 USD']]
  };

  var HEX = [
    ['carbon crystal black', '#17181a'], ['starry black', '#16171a'], ['black over white', '#8a8a86'],
    ['silver-black', '#6e7276'], ['gold-black', '#8b7a4e'], ['black-black', '#1b1c1e'],
    ['khaki white', '#ded4bd'], ['phantom grey', '#7b7f84'], ['aviation silver', '#b9bcbe'],
    ['tech grey', '#6d7176'], ['future blue', '#3d5f9e'], ['deep sea blue', '#24406b'],
    ['aurora green', '#4d7a5c'], ['bloodstone red', '#8c2a27'], ['sand gold', '#c2a878'],
    ['matte snow silver', '#c8cbcd'], ['electroplated green', '#2f6b52'], ['wild brown', '#6b4f3a'],
    ['capri blue', '#3f7ba6'], ['dawn orange', '#d4762f'], ['water wave blue', '#3a6ea5'],
    ['mexico grey', '#6f7377'], ['moon grey', '#8d9196'], ['sky grey', '#9aa0a6'],
    ['quantum grey', '#5c6166'], ['sprint grey', '#7c8085'], ['silver-grey', '#a4a8ab'],
    ['two-tone', '#9a938a'], ['beige', '#d7c9ae'], ['cyan', '#4fa3a8'], ['orange', '#d4762f'],
    ['gold', '#c1a24a'], ['brown', '#6b4f3a'], ['green', '#33503c'], ['blue', '#2f5aa8'],
    ['red', '#a52f28'], ['silver', '#b9bcbe'], ['white', '#f2f2ef'], ['black', '#1b1c1e'],
    ['grey', '#74787d'], ['gray', '#74787d']
  ];

  function hexFor(name) {
    var n = String(name || '').toLowerCase();
    for (var i = 0; i < HEX.length; i++) if (n.indexOf(HEX[i][0]) > -1) return HEX[i][1];
    return '#a19786';
  }

  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  var cars = [];
  Object.keys(RAW).forEach(function (brand) {
    RAW[brand].forEach(function (row, idx) {
      var x = row[4] || {};
      var colorText = row[1] || '';
      var colors = [], interiorCombo = null;

      if (JETOUR_GROUPS[colorText]) {
        colors = JETOUR_GROUPS[colorText].map(function (c) {
          return { name: c[1], zh: c[0], hex: hexFor(c[1]), surcharge: c[2] || null };
        });
        var m = row[0].split('·');
        interiorCombo = m.length > 1 ? m[1].trim() : null;
      } else if (colorText) {
        colors = colorText.split(/[\/,]/).map(function (c) { return c.trim(); }).filter(Boolean)
          .map(function (c) { return { name: c, zh: null, hex: hexFor(c), surcharge: null }; });
      }

      cars.push({
        id: slug(brand) + '-' + slug(row[0]).slice(0, 46) + '-' + idx,
        brand: brand,
        model: row[0].split('·')[0].trim(),
        version: row[0],
        detail: row[0].indexOf('·') > -1 ? row[0].split('·').slice(1).join('·').trim() : '',
        colorSource: colorText && !JETOUR_GROUPS[colorText] ? colorText : (JETOUR_GROUPS[colorText] ? 'Exterior palette per Jetour model family' : null),
        colors: colors,
        interior: x.interior || interiorCombo || null,
        msrp: row[2],
        fob: row[3],
        moq: x.moq || null,
        note: x.note || null,
        status: x.status || 'AVAILABLE',
        published: x.status !== SUSPENDED,
        stock: x.status === SUSPENDED ? 'Suspended' : 'Available',
        views: 0, requests: 0
      });
    });
  });

  var T = {
    en: {
      showroom: 'Showroom', contact: 'Contact', dashboard: 'Dashboard', inventory: 'Inventory', desk: 'Sales desk',
      quotes: 'Quotes', garage: 'My Garage', mobile: 'Mobile',
      heroKicker: 'Export catalogue · FOB pricing', heroTitle: 'Every configuration on the sheet. Priced, coloured, ready to order.',
      heroSub: 'One hundred and fifty-two factory configurations across eighteen brand blocks, at the FOB price we ship them for. Pick the trim, pick the colour, and your file opens with a salesperson.',
      search: 'Search brand, model or version', configurations: 'Published', brands: 'Brand blocks', from: 'From',
      mostRequested: 'Most requested', priceUp: 'Price ↑', priceDown: 'Price ↓',
      allPowertrains: 'All brands', published: 'published configurations',
      fob: 'FOB price', moq: 'MOQ', msrp: 'China MSRP', notSpecified: 'Not specified', contactDealer: 'Contact dealer',
      colours: 'Exterior colours from the price list', gallery: 'Gallery', specs: 'Key specifications',
      equipment: 'Equipment & interior', finance: 'Finance estimate', related: 'Related configurations',
      quote: 'Request quotation', testDrive: 'Book a test drive', reserve: 'Reserve this vehicle',
      tradeIn: 'Value my trade-in', whatsapp: 'WhatsApp the sales desk', monthly: 'Monthly',
      down: 'Down payment', term: 'Term', rate: 'Annual rate %', back: '← Back to catalogue',
      noPhoto: 'Drop a verified photograph here', suspended: 'Suspended sales'
    },
    fr: {
      showroom: 'Showroom', contact: 'Contact', dashboard: 'Tableau de bord', inventory: 'Stock', desk: 'Bureau des ventes',
      quotes: 'Devis', garage: 'Mon Garage', mobile: 'Mobile',
      heroKicker: 'Catalogue export · prix FOB', heroTitle: 'Chaque configuration du tarif. Chiffrée, coloriée, prête à commander.',
      heroSub: 'Cent cinquante-deux configurations usine réparties sur dix-huit blocs de marques, au prix FOB auquel nous les expédions. Choisissez la finition, choisissez la couleur, et votre dossier s\u2019ouvre avec un commercial.',
      search: 'Rechercher marque, modèle ou version', configurations: 'Publiées', brands: 'Blocs de marques', from: 'À partir de',
      mostRequested: 'Plus demandés', priceUp: 'Prix ↑', priceDown: 'Prix ↓',
      allPowertrains: 'Toutes les marques', published: 'configurations publiées',
      fob: 'Prix FOB', moq: 'Qté min.', msrp: 'Prix Chine', notSpecified: 'Non spécifié', contactDealer: 'Contacter le concessionnaire',
      colours: 'Couleurs extérieures du tarif', gallery: 'Galerie', specs: 'Caractéristiques',
      equipment: 'Équipement & intérieur', finance: 'Estimation financement', related: 'Configurations liées',
      quote: 'Demander un devis', testDrive: 'Réserver un essai', reserve: 'Réserver ce véhicule',
      tradeIn: 'Estimer ma reprise', whatsapp: 'WhatsApp au bureau des ventes', monthly: 'Mensualité',
      down: 'Apport', term: 'Durée', rate: 'Taux annuel %', back: '← Retour au catalogue',
      noPhoto: 'Déposez une photographie vérifiée ici', suspended: 'Ventes suspendues'
    },
    zh: {
      showroom: '展厅', contact: '联系我们', dashboard: '仪表板', inventory: '库存', desk: '销售台',
      quotes: '报价', garage: '我的车库', mobile: '移动端',
      heroKicker: '出口目录 · FOB 报价', heroTitle: '价格表上的每一款配置。已定价、已配色、可下单。',
      heroSub: '十八个品牌区块、一百五十二款工厂配置，均按我们的实际出运 FOB 价格列示。选择配置与颜色，销售顾问即刻为您建档。',
      search: '搜索品牌、车型或版本', configurations: '已发布', brands: '品牌区块', from: '起价',
      mostRequested: '热门咨询', priceUp: '价格 ↑', priceDown: '价格 ↓',
      allPowertrains: '全部品牌', published: '个已发布配置',
      fob: 'FOB 价格', moq: '起订量', msrp: '中国指导价', notSpecified: '未注明', contactDealer: '请联系经销商',
      colours: '价格表所列外观颜色', gallery: '图库', specs: '主要参数',
      equipment: '配置与内饰', finance: '融资估算', related: '相关配置',
      quote: '索取报价', testDrive: '预约试驾', reserve: '预订此车',
      tradeIn: '评估置换', whatsapp: 'WhatsApp 联系销售', monthly: '月供',
      down: '首付', term: '期限', rate: '年利率 %', back: '← 返回目录',
      noPhoto: '在此放入已核验的照片', suspended: '暂停销售'
    }
  };

  window.CATALOG = { cars: cars, t: T, hexFor: hexFor, source: 'CPC-kai - 0901.pdf' };
})();
