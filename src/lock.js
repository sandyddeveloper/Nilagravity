(function () {
  // Target unlock date: September 16, 2026, 12:00:00 AM (local time)
  const targetDate = new Date('2026-09-16T00:00:00');

  // Parse query parameters for developer preview
  const urlParams = new URLSearchParams(window.location.search);
  const mockTimeSec = parseInt(urlParams.get('mock-time'), 10);

  let finalTarget = targetDate;
  let isMocked = false;

  if (!isNaN(mockTimeSec)) {
    finalTarget = new Date(Date.now() + mockTimeSec * 1000);
    isMocked = true;
  }

  // Check lock state (bypassed if unlocked in local or session storage)
  function getLockState() {
    if (localStorage.getItem('nilagravity-unlocked') === 'true' || sessionStorage.getItem('nilagravity-unlocked') === 'true') {
      return false;
    }
    return new Date() < finalTarget;
  }

  if (!getLockState()) {
    return; // Already unlocked, do nothing
  }

  // --- 116 MULTILINGUAL BIRTHDAY WISHES DATABASE ---
  const wishes = [
    { lang: "English", wish: "Happy Birthday, Nila!", phonetic: "Happy Birthday, Nila!" },
    { lang: "Spanish", wish: "¡Feliz cumpleaños, Nila!", phonetic: "Feh-lees koom-pleh-ahn-yohs, Nila" },
    { lang: "French", wish: "Joyeux anniversaire, Nila !", phonetic: "Jwah-yuh zahn-nee-vehr-sehr, Nila" },
    { lang: "German", wish: "Alles Gute zum Geburtstag, Nila!", phonetic: "Ah-les goo-teh tsoom geh-boorts-tahg, Nila" },
    { lang: "Italian", wish: "Buon compleanno, Nila!", phonetic: "Bwon kom-pleh-ahn-no, Nila" },
    { lang: "Portuguese", wish: "Feliz aniversário, Nila!", phonetic: "Feh-leez ah-nee-vehr-sah-ree-o, Nila" },
    { lang: "Dutch", wish: "Gefeliciteerd met je verjaardag, Nila!", phonetic: "Heh-feh-lee-see-tehrt met ye ver-yar-dahg, Nila" },
    { lang: "Russian", wish: "С днём рождения, Нила!", phonetic: "S dnyom rozh-den-iya, Nila" },
    { lang: "Japanese", wish: "お誕生日おめでとう、ニラ！", phonetic: "Ot-an-joh-bee o-meh-deh-toh, Nila" },
    { lang: "Korean", wish: "생일 축하해, 니라!", phonetic: "Saeng-il chook-ha-hae, Nila" },
    { lang: "Hindi", wish: "जन्मदिन की शुभकामनाएं, नीला!", phonetic: "Jan-ma-din kee shubh-kaam-na-yein, Nila" },
    { lang: "Tamil", wish: "பிறந்தநாள் வாழ்த்துகள், நிலா!", phonetic: "Pi-ran-dha-naal vaazh-thu-gal, Nila" },
    { lang: "Telugu", wish: "పుట్టినరోజు శుభాకాంక్షలు, నిలా!", phonetic: "Put-ti-na-ro-ju shu-bha-kaank-sha-lu, Nila" },
    { lang: "Kannada", wish: "ಹುട്ടുহಬ್ಬದ ಶುಭಾಶಯಗಳು, ನಿಲಾ!", phonetic: "Hut-tu-hab-ba-da shu-bhaa-sha-ya-ga-lu, Nila" },
    { lang: "Malayalam", wish: "ජന്മദിനാശംസകൾ, നിലാ!", phonetic: "Jan-ma-di-naa-sham-sa-kal, Nila" },
    { lang: "Bengali", wish: "শুভ জন্মদিন, নীলা!", phonetic: "Shu-bho jon-mo-din, Nila" },
    { lang: "Marathi", wish: "वाढदिवसाच्या हार्दिक शुभेच्छा, निला!", phonetic: "Vaadh-div-saa-chya haar-dik shu-bhech-chha, Nila" },
    { lang: "Gujarati", wish: "જન્મદિવસની શુભેચ્છा, નીલા!", phonetic: "Jan-ma-di-vas-nee shu-bhech-chha, Nila" },
    { lang: "Punjabi", wish: "ਜਨਮਦਿਨ ਮੁਬਾਰਕ, ਨੀਲਾ!", phonetic: "Ja-nam-din mu-baa-rak, Nila" },
    { lang: "Arabic", wish: "عيد ميلاد سعيد يا نيلا!", phonetic: "Eed mee-laad sah-eed ya Nila" },
    { lang: "Turkish", wish: "Doğum günün kutlu olsun, Nila!", phonetic: "Doh-um gu-nun kut-lu ol-sun, Nila" },
    { lang: "Vietnamese", wish: "Chúc mừng sinh nhật, Nila!", phonetic: "Chook mung sin nyut, Nila" },
    { lang: "Thai", wish: "สุขสันต์วันเกิดนะ นีลา!", phonetic: "Sook-san wan-gert na, Nila" },
    { lang: "Indonesian", wish: "Selamat ulang tahun, Nila!", phonetic: "Se-lah-mat oo-lang tah-hoon, Nila" },
    { lang: "Tagalog", wish: "Maligayang kaarawan, Nila!", phonetic: "Mah-lee-gah-yang kah-ah-rah-wan, Nila" },
    { lang: "Swahili", wish: "Heri ya siku ya kuzaliwa, Nila!", phonetic: "Heh-ree ya see-koo ya koo-zah-lee-wah, Nila" },
    { lang: "Hebrew", wish: "יום הולדת שמح, ניله!", phonetic: "Yom hoo-leh-det sah-meh-ach, Nila" },
    { lang: "Greek", wish: "Χρόνια πολλά, Νίλα!", phonetic: "Chro-nya pol-lah, Nila" },
    { lang: "Swedish", wish: "Grattis på födelsedagen, Nila!", phonetic: "Grah-tis poh fur-del-seh-dah-gen, Nila" },
    { lang: "Norwegian", wish: "Gratulerer med dagen, Nila!", phonetic: "Grah-too-leh-rer meh dah-gen, Nila" },
    { lang: "Danish", wish: "Tillykke med fødselsdagen, Nila!", phonetic: "Til-luk-keh meh fud-sels-dah-gen, Nila" },
    { lang: "Finnish", wish: "Hyvää syntymäpäivää, Nila!", phonetic: "Hoo-vah-ah soon-tu-mah-pie-vah-ah, Nila" },
    { lang: "Polish", wish: "Wszystkiego najlepszego z okazji urodzin, Nila!", phonetic: "Vshist-kyeh-go nie-pleps-sheh-go z o-kah-zyee oo-rod-zeen, Nila" },
    { lang: "Czech", wish: "Všechno nejlepší k narozeninám, Nila!", phonetic: "Vshekh-no ney-lep-shee k nah-ro-zeh-nee-nahm, Nila" },
    { lang: "Hungarian", wish: "Boldog születésnapot, Nila!", phonetic: "Bol-dog soo-leh-teesh-nah-pot, Nila" },
    { lang: "Romanian", wish: "La mulți ani, Nila!", phonetic: "Lah moolts ahny, Nila" },
    { lang: "Ukrainian", wish: "З днем народження, Ніла!", phonetic: "Z dnem nah-rod-zhen-nya, Nila" },
    { lang: "Malay", wish: "Selamat hari lahir, Nila!", phonetic: "Se-lah-mat ha-ree lah-heer, Nila" },
    { lang: "Persian", wish: "تولدت مبارک، نیلا!", phonetic: "Tav-al-o-det mo-baa-rak, Nila" },
    { lang: "Irish", wish: "Lá breithe shona dhuit, Nila!", phonetic: "Law breh-huh hun-ah gwitch, Nila" },
    { lang: "Welsh", wish: "Penblwydd hapus, Nila!", phonetic: "Pen-blooydh hah-pis, Nila" },
    { lang: "Latin", wish: "Felix sit natalis dies, Nila!", phonetic: "Feh-leeks sit nah-tah-lees dee-ehs, Nila" },
    { lang: "Hawaiian", wish: "Hauʻoli lā hānau, Nila!", phonetic: "How-oh-lee lah hah-now, Nila" },
    { lang: "Maori", wish: "Rā whānau koa, Nila!", phonetic: "Rah faa-now ko-ah, Nila" },
    { lang: "Zulu", wish: "Usuku lokuzalwa oluhle, Nila!", phonetic: "Oo-soo-koo lo-koo-zahl-wah o-loo-hleh, Nila" },
    { lang: "Xhosa", wish: "Minentle mizele, Nila!", phonetic: "Mee-nen-tleh mee-zeh-leh, Nila" },
    { lang: "Amharic", wish: "መልካም ልደት, ኒላ!", phonetic: "Mel-kam lee-det, Nila" },
    { lang: "Somali", wish: "Dhalasho wacan, Nila!", phonetic: "Dhah-lah-sho wah-jan, Nila" },
    { lang: "Yoruba", wish: "Oriire ọjọ ibi, Nila!", phonetic: "Oh-ree-reh oh-joh ee-bee, Nila" },
    { lang: "Igbo", wish: "Ezi ncheta ọmụmụ, Nila!", phonetic: "Eh-zee n-cheh-tah oh-moo-moo, Nila" },
    { lang: "Afrikaans", wish: "Veels geluk met jou verjaarsdag, Nila!", phonetic: "Feels heh-luk met yo fer-yahr-sdag, Nila" },
    { lang: "Esperanto", wish: "Feliĉan naskiĝtagon, Nila!", phonetic: "Feh-lee-chan nas-keeg-tah-gon, Nila" },
    { lang: "Icelandic", wish: "Til hamingju með afmælið, Nila!", phonetic: "Til hah-min-gyoo meth af-my-lith, Nila" },
    { lang: "Nepali", wish: "जन्मदिनको शुभकामना, नीला!", phonetic: "Jan-ma-din-ko shoo-bha-kaa-ma-naa, Nila" },
    { lang: "Sinhala", wish: "සුභ උපන්දිනයක් වේවා, නිලා!", phonetic: "Su-bha oo-pan-di-na-yak wey-wah, Nila" },
    { lang: "Burmese", wish: "မွေးနေ့မှာ ပျော်ရွှင်ပါစေ, နီလာ!", phonetic: "Mway nay hmar pyaw shwin par say, Nila" },
    { lang: "Mongolian", wish: "Төрсөн өдрийн баяр хүргэе, Нила!", phonetic: "Tur-sun ud-riin bah-yar khur-geye, Nila" },
    { lang: "Tibetan", wish: "སྐྱེས་སྐར་ལ་བကྲ་ཤིས་བདེ་ལེགས།, ནི་ལ།", phonetic: "Kye-kar la ta-shi de-lek, Nila" },
    { lang: "Khmer", wish: "រីករាយថ្ងៃកំណើត, នីឡា!", phonetic: "Reek-reay thngay kom-nerd, Nila" },
    { lang: "Lao", wish: "ສຸກສັນວັນເກີດ, ນີລາ!", phonetic: "Sook-san van-geud, Nila" },
    { lang: "Galician", wish: "Feliz aniversario, Nila!", phonetic: "Feh-leez ah-nee-vehr-sah-ryo, Nila" },
    { lang: "Scottish Gaelic", wish: "Co-là-breith math dhut, Nila!", phonetic: "Co-lah-bray mah goot, Nila" },
    { lang: "Basque", wish: "Zorionak zuri, Nila!", phonetic: "Zoh-ryoh-nahk zoo-ree, Nila" },
    { lang: "Catalan", wish: "Per molts anys, Nila!", phonetic: "Per molts ahns, Nila" },
    { lang: "Albanian", wish: "Gëzuar ditëlindjen, Nila!", phonetic: "Geh-zoo-ahr dee-tuh-leen-dyen, Nila" },
    { lang: "Macedonian", wish: "Среќен роденден, Нила!", phonetic: "Sreh-kyen ro-den-den, Nila" },
    { lang: "Bulgarian", wish: "Честит рожден ден, Нила!", phonetic: "Cheh-steet rozh-den den, Nila" },
    { lang: "Serbian", wish: "Срећан рођендан, Нила!", phonetic: "Sreh-tyan ro-jen-dan, Nila" },
    { lang: "Croatian", wish: "Sretan rođendan, Nila!", phonetic: "Sreh-tahn ro-jen-dahn, Nila" },
    { lang: "Bosnian", wish: "Sretan rođendan, Nila!", phonetic: "Sreh-tahn ro-jen-dahn, Nila" },
    { lang: "Slovenian", wish: "Vse najboljše za rojstni dan, Nila!", phonetic: "Vseh nie-bol-sheh zah royst-nee dahn, Nila" },
    { lang: "Slovak", wish: "Všetko najlepšie k narodeninám, Nila!", phonetic: "Vshet-ko nie-lep-sheh k nah-ro-zeh-nee-nahm, Nila" },
    { lang: "Estonian", wish: "Palju õnne sünnipäevaks, Nila!", phonetic: "Pal-yoo oon-neh soon-nee-peh-vaks, Nila" },
    { lang: "Latvian", wish: "Daudz laimes dzimšanas dienā, Nila!", phonetic: "Dowdz lie-mehs dzim-shah-nas dye-nah, Nila" },
    { lang: "Lithuanian", wish: "Su gimtadieniu, Nila!", phonetic: "Soo gim-tah-dye-nyoo, Nila" },
    { lang: "Belarusian", wish: "З днём нараджэння, Ніла!", phonetic: "Z dnyom nah-rad-zhen-nya, Nila" },
    { lang: "Georgian", wish: "გილოცავ დაბადების დღეს, ნილა!", phonetic: "Gee-lot-sav dah-bah-deh-bees dgehs, Nila" },
    { lang: "Armenian", wish: "Ծնունդդ շնորհավոր, Նիլա!", phonetic: "Tsen-oondt shnor-hah-vor, Nila" },
    { lang: "Azerbaijani", wish: "Ad günün mübarək, Nila!", phonetic: "Ahd goo-noon moo-bah-rak, Nila" },
    { lang: "Kazakh", wish: "Туған күніңізбен, Нила!", phonetic: "Too-ghan koo-nee-neez-ben, Nila" },
    { lang: "Kyrgyz", wish: "Туулган күнүңүз менен, Нила!", phonetic: "Too-ool-ghan koo-noong-ooz meh-neh-neh, Nila" },
    { lang: "Tajik", wish: "Зодрӯз муборак, Нила!", phonetic: "Zod-rooz moo-bo-rak, Nila" },
    { lang: "Uzbek", wish: "Tug'ilgan kuningiz bilan, Nila!", phonetic: "Too-ool-gee-lan koo-nee-ngeez bee-lan, Nila" },
    { lang: "Turkmen", wish: "Doglan günüň gutly bolsun, Nila!", phonetic: "Dohg-lahn goo-noon goot-lee bol-soon, Nila" },
    { lang: "Yiddish", wish: "אַ גליקלעכן געבורטסטאָג, נילאַ!", phonetic: "Ah glik-lekh-en geh-boort-stahg, Nila" },
    { lang: "Maltese", wish: "Għeluq sninek it-tajjeb, Nila!", phonetic: "Eh-look-snee-nek eet-tie-yeb, Nila" },
    { lang: "Luxembourgish", wish: "Alles Guddes fir däi Gebuertsdag, Nila!", phonetic: "Ah-les goo-des feer dy geh-boorts-tahg, Nila" },
    { lang: "Frisian", wish: "Lokkige jierdei, Nila!", phonetic: "Lok-ki-geh yer-die, Nila" },
    { lang: "Corsican", wish: "Bon compleannu, Nila!", phonetic: "Bon com-pleh-ahn-no, Nila" },
    { lang: "Breton", wish: "Deiz-ha-bloaz laouen dit, Nila!", phonetic: "Days-hah-bloh-ahz lah-wen deet, Nila" },
    { lang: "Occitan", wish: "Bon aniversari, Nila!", phonetic: "Bon ah-nee-vehr-sah-ree, Nila" },
    { lang: "Sardinian", wish: "Bonu anniversariu, Nila!", phonetic: "Boh-noo ahn-nee-vehr-sah-ryoo, Nila" },
    { lang: "Romansh", wish: "Bel anniversari, Nila!", phonetic: "Bel ah-nee-vehr-sah-ree, Nila" },
    { lang: "Faroese", wish: "Vælganga á føðingardegnum, Nila!", phonetic: "Vail-gan-gah aw fuh-ing-ar-day-noon, Nila" },
    { lang: "Greenlandic", wish: "Inuuissiorluarit, Nila!", phonetic: "Ee-noo-ees-see-or-loo-ah-reet, Nila" },
    { lang: "Samoan", wish: "Manuia lou aso fanau, Nila!", phonetic: "Mah-nwee-ah lo-oo ah-so fah-now, Nila" },
    { lang: "Tongan", wish: "Ma'u ha 'aho fa'ele'i fiefia, Nila!", phonetic: "Mah-oo hah ah-ho fah-eh-leh-ee fee-eh-fee-ah, Nila" },
    { lang: "Fijian", wish: "Marau na nomu siga ni sucu, Nila!", phonetic: "Mah-row nah noh-moo see-gah nee soo-joo, Nila" },
    { lang: "Tahitian", wish: "Ia ora na i to oe mahana fanauraa, Nila!", phonetic: "Yah oh-rah nah ee toh oy mah-hah-nah fah-now-rah-ah, Nila" },
    { lang: "Malagasy", wish: "Tratry ny tsingerin-taona nahaterahana, Nila!", phonetic: "Trah-tree nee tseen-gehr-een tah-oo-nah nah-ha-teh-rah-ha-nah, Nila" },
    { lang: "Sundanese", wish: "Wilujeng tepang taun, Nila!", phonetic: "Wee-loo-jeng teh-pang tah-oon, Nila" },
    { lang: "Javanese", wish: "Sugeng tanggap warsa, Nila!", phonetic: "Soo-geng tang-gap wahr-sah, Nila" },
    { lang: "Balinese", wish: "Rahajeng wanti warsa, Nila!", phonetic: "Rah-hah-jeng wan-tee wahr-sah, Nila" },
    { lang: "Tatar", wish: "Туган көнең белән, Нила!", phonetic: "Too-ghahn ku-ning beh-lan, Nila" },
    { lang: "Bashkir", wish: "Тыуған көнөң менән, Нила!", phonetic: "Too-ghahn ku-noon meh-nan, Nila" },
    { lang: "Chuvash", wish: "Çурална кун ячĕпе, Нила!", phonetic: "Soo-ral-nah koon yah-chuh-peh, Nila" },
    { lang: "Yakut", wish: "Төрөөбүт күҥҥүнэн, Нила!", phonetic: "Tuh-ruh-oobut kung-nu-nen, Nila" },
    { lang: "Kurdish", wish: "Rojbûna te pîroz be, Nila!", phonetic: "Rozh-boo-nah teh pee-roz beh, Nila" },
    { lang: "Pashto", wish: "د زېږېدو ورځ دې مبارک شه، نيلا!", phonetic: "De zay-gay-do wraz day moo-baa-rak sha, Nila" },
    { lang: "Sindhi", wish: "ڄمڻ ڏينهن مبارڪ، نيلا!", phonetic: "Jah-man dhyan moo-baa-rak, Nila" },
    { lang: "Urdu", wish: "سالگرہ مبارک ہو، نیلا!", phonetic: "Saal-gi-rah moo-baa-rak ho, Nila" },
    { lang: "Sanskrit", wish: "जन्मदिवसस्य शुभकामनाः, नीला!", phonetic: "Jan-ma-dee-va-sas-ya shoo-bha-kaa-ma-naah, Nila" },
    { lang: "Latin (Alternate)", wish: "Fortunatam diem natalem, Nila!", phonetic: "For-too-nah-tahm dee-em nah-tah-lem, Nila" },
    { lang: "Hawaiian (Alternate)", wish: "Hau'oli Lā Hānau e Nila!", phonetic: "How-oh-lee lah hah-now eh Nila" },
    { lang: "Hmong", wish: "Zoo siab hnub yug, Nila!", phonetic: "Zong shee-ah hnoo yoog, Nila" },
    { lang: "Samoan (Alternate)", wish: "Ia manuia lou aso fanau, Nila!", phonetic: "Eeah mah-nwee-ah lo-oo ah-so fah-now, Nila" }
  ];

  // --- CALCULATION LOGIC ---
  // Calculates day index (1 to 116) relative to May 22, 2026.
  function getDaysElapsed() {
    const dayParam = urlParams.get('unlocked-days');
    if (dayParam) {
      const parsed = parseInt(dayParam, 10);
      if (!isNaN(parsed) && parsed >= 1) {
        return Math.min(parsed, 116);
      }
    }

    const start = new Date('2026-05-22T00:00:00');
    const now = new Date();

    // Reset to local midnight to calculate difference in calendar days
    const startLocal = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const nowLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = nowLocal - startLocal;
    if (diffTime < 0) {
      return 1; // Default to Day 1 if local clock is before start date
    }

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(diffDays, 116);
  }

  // --- PHASE 1: BLOCK RENDER ---
  // Inject style immediately to prevent FOUC (Flash of Unlocked Content)
  const style = document.createElement('style');
  style.id = 'lock-screen-style';
  style.innerHTML = `
    body {
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #04060c !important;
    }
    .page-shell {
      display: none !important;
    }
    #lock-screen-container {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 50%, #0d1226 0%, #04060c 100%);
      font-family: 'Outfit', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #ffffff;
      z-index: 2147483647;
      overflow: hidden;
      box-sizing: border-box;
      padding: 2rem;
      text-align: center;
      transition: opacity 1.2s cubic-bezier(0.2, 1, 0.2, 1), transform 1.2s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .lock-glow-orb {
      position: absolute;
      width: 45vw;
      height: 45vw;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.12;
      z-index: 1;
      pointer-events: none;
    }
    .orb-1 {
      background: radial-gradient(circle, #7a55ff 0%, transparent 70%);
      top: -10%;
      left: -10%;
      animation: floatOrb1 15s ease-in-out infinite alternate;
    }
    .orb-2 {
      background: radial-gradient(circle, #ff6f6c 0%, transparent 70%);
      bottom: -10%;
      right: -10%;
      animation: floatOrb2 18s ease-in-out infinite alternate;
    }
    @keyframes floatOrb1 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(5vw, 5vh) scale(1.15); }
    }
    @keyframes floatOrb2 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(-5vw, -5vh) scale(1.1); }
    }
    .lock-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.8rem;
      max-width: 540px;
      width: 100%;
    }
    .lock-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 1.6rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      opacity: 0.95;
      color: #ffffff;
      user-select: none;
    }
    .lock-icon-container {
      position: relative;
      width: 90px;
      height: 90px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .lock-icon-container:hover {
      transform: scale(1.05);
      border-color: rgba(122, 85, 255, 0.4);
      box-shadow: 0 20px 60px rgba(122, 85, 255, 0.25), inset 0 2px 0 rgba(255, 255, 255, 0.05);
    }
    .lock-icon-pulse {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px dashed rgba(122, 85, 255, 0.35);
      animation: rotateDashed 25s linear infinite;
    }
    .lock-icon-glow {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(122, 85, 255, 0.3) 0%, transparent 70%);
      filter: blur(5px);
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .lock-icon-container:hover .lock-icon-glow {
      opacity: 1;
    }
    @keyframes rotateDashed {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    #lock-svg {
      width: 34px;
      height: 34px;
      color: #ff6f6c;
      transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
      filter: drop-shadow(0 0 10px rgba(255, 111, 108, 0.4));
    }
    .lock-icon-container:hover #lock-svg {
      color: #ff8885;
      filter: drop-shadow(0 0 15px rgba(255, 111, 108, 0.6));
    }
    .lock-text-block {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .lock-title {
      font-size: clamp(1.6rem, 5vw, 2.2rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      background: linear-gradient(135deg, #ffffff 0%, #cbd8ff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.15;
    }
    .lock-message {
      font-size: clamp(0.95rem, 2.5vw, 1.1rem);
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
      line-height: 1.5;
      max-width: 440px;
      margin: 0 auto;
    }
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: clamp(0.75rem, 2.5vw, 1.25rem);
      width: 100%;
      max-width: 480px;
      margin-top: 0.2rem;
    }
    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: clamp(0.85rem, 3vw, 1.4rem) 0.25rem;
      border-radius: 1.25rem;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03);
      transition: all 0.4s ease;
    }
    .countdown-item:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
    .countdown-val {
      font-size: clamp(1.8rem, 5.5vw, 2.8rem);
      font-weight: 800;
      background: linear-gradient(135deg, #ffffff 0%, #cbd8ff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 4px 20px rgba(203, 216, 255, 0.15);
      line-height: 1;
      margin-bottom: 0.35rem;
    }
    .countdown-label {
      font-size: clamp(0.6rem, 1.8vw, 0.7rem);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: rgba(255, 255, 255, 0.35);
      font-weight: 600;
    }
    .lock-unlocked #lock-svg {
      color: #f3b248 !important;
      filter: drop-shadow(0 0 20px rgba(243, 178, 72, 0.8)) !important;
    }
    .lock-unlocked .lock-icon-pulse {
      border-color: rgba(243, 178, 72, 0.6) !important;
      animation: rotateDashed 4s linear infinite;
    }
    .lock-fading {
      opacity: 0 !important;
      transform: scale(1.06) !important;
    }
    #lock-particles-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    /* iOS-Style Notification Banner */
    .ios-notification {
      position: absolute;
      top: 1.5rem;
      left: 50%;
      transform: translateX(-50%) translateY(-25px);
      width: 90%;
      max-width: 420px;
      background: rgba(20, 24, 45, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 1.25rem;
      padding: 0.75rem 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.9rem;
      z-index: 2147483646;
      cursor: pointer;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .ios-notification.visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    .ios-notification:hover {
      background: rgba(25, 30, 55, 0.75);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateX(-50%) translateY(-2px);
    }
    .noti-icon {
      position: relative;
      background: linear-gradient(135deg, #7a55ff 0%, #ff6f6c 100%);
      border-radius: 0.5rem;
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .noti-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 10px;
      height: 10px;
      background: #ff4a4a;
      border-radius: 50%;
      border: 2px solid #0d1226;
      box-shadow: 0 0 6px #ff4a4a;
      animation: pulseBadge 1.5s infinite alternate;
    }
    @keyframes pulseBadge {
      0% { transform: scale(1); box-shadow: 0 0 4px #ff4a4a; }
      100% { transform: scale(1.3); box-shadow: 0 0 10px #ff4a4a; }
    }
    .noti-content {
      flex: 1;
      text-align: left;
    }
    .noti-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.45);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.15rem;
    }
    .noti-message {
      font-size: 0.9rem;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.3;
    }
    .noti-chevron {
      color: rgba(255, 255, 255, 0.3);
      transition: transform 0.3s;
    }
    .ios-notification:hover .noti-chevron {
      color: #ffffff;
      transform: translateX(2px);
    }
    
    /* Modals Overlay (Common) */
    .lock-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(3, 5, 10, 0.82);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s cubic-bezier(0.2, 1, 0.2, 1);
      padding: 1.5rem;
    }
    .lock-modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .lock-modal-card {
      background: radial-gradient(circle at 50% 0%, #171d37 0%, #060912 100%);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 2rem;
      box-shadow: 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03);
      width: 100%;
      max-width: 480px;
      display: flex;
      flex-direction: column;
      transform: scale(0.92) translateY(20px);
      transition: transform 0.4s cubic-bezier(0.2, 1, 0.2, 1);
      overflow: hidden;
      position: relative;
    }
    .lock-modal-overlay.open .lock-modal-card {
      transform: scale(1) translateY(0);
    }
    .lock-modal-header {
      padding: 1.75rem 2rem 1rem;
      text-align: center;
      position: relative;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .lock-modal-close-btn {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.6);
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: all 0.3s;
    }
    .lock-modal-close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
    .lock-modal-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
    }
    .lock-modal-subtitle {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 0.3rem;
      line-height: 1.4;
    }
    
    /* Login Modal Specifics */
    .login-modal-body {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
    }
    .passkey-input {
      width: 100%;
      letter-spacing: 0.3em;
      text-align: center;
      font-size: 2.2rem;
      font-weight: 800;
      font-family: 'Outfit', monospace;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.8rem;
      border-radius: 1.25rem;
      color: #ffffff;
      outline: none;
      box-sizing: border-box;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
      transition: all 0.3s;
    }
    .passkey-input:focus {
      border-color: rgba(122, 85, 255, 0.5);
      box-shadow: 0 0 20px rgba(122, 85, 255, 0.2), inset 0 2px 8px rgba(0,0,0,0.5);
    }
    .passkey-input::placeholder {
      font-size: 1.4rem;
      letter-spacing: 0;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.2);
    }
    .login-btn {
      width: 100%;
      background: linear-gradient(135deg, #7a55ff 0%, #ff6f6c 100%);
      color: #ffffff;
      border: none;
      font-size: 1.05rem;
      font-weight: 700;
      border-radius: 1.25rem;
      padding: 1rem;
      cursor: pointer;
      box-shadow: 0 12px 32px rgba(122, 85, 255, 0.3);
      transition: all 0.3s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .login-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 40px rgba(122, 85, 255, 0.45);
    }
    .login-btn:active {
      transform: translateY(0);
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      15%, 45%, 75% { transform: translateX(-10px); }
      30%, 60%, 90% { transform: translateX(10px); }
    }
    .input-error {
      border-color: #ff4a4a !important;
      box-shadow: 0 0 25px rgba(255, 74, 74, 0.35) !important;
      animation: shake 0.5s ease-in-out;
    }
    .input-success {
      border-color: #4aff4a !important;
      box-shadow: 0 0 25px rgba(74, 255, 74, 0.4) !important;
    }
    
    /* Wishes List Drawer Specifics */
    .wishes-modal-body {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 55vh;
      -webkit-overflow-scrolling: touch;
    }
    
    /* Custom scrollbar */
    .wishes-modal-body::-webkit-scrollbar {
      width: 6px;
    }
    .wishes-modal-body::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.01);
    }
    .wishes-modal-body::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
    }
    .wishes-modal-body::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .wish-card {
      background: rgba(255, 255, 255, 0.015);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 1.25rem;
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      text-align: left;
      transition: all 0.3s;
    }
    .wish-card:hover {
      background: rgba(255, 255, 255, 0.035);
      border-color: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }
    .wish-card.latest {
      background: linear-gradient(135deg, rgba(122, 85, 255, 0.15) 0%, rgba(255, 111, 108, 0.15) 100%);
      border: 1px solid rgba(255, 111, 108, 0.35);
      box-shadow: 0 8px 24px rgba(255, 111, 108, 0.12);
    }
    .wish-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .wish-day-badge {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 800;
      color: #ff6f6c;
      background: rgba(255, 111, 108, 0.12);
      padding: 0.25rem 0.6rem;
      border-radius: 50px;
    }
    .wish-card.latest .wish-day-badge {
      background: #ff6f6c;
      color: #0d1226;
      box-shadow: 0 2px 10px rgba(255, 111, 108, 0.4);
    }
    .wish-lang-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.4);
    }
    .wish-text-val {
      font-size: 1.45rem;
      font-weight: 700;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      margin: 0.4rem 0 0.1rem;
      line-height: 1.35;
    }
    .wish-phonetic-val {
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.55);
      font-style: italic;
      line-height: 1.3;
    }
    
    /* Footer elements for passcode */
    .lock-passcode-trigger {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.45);
      padding: 0.55rem 1.25rem;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.3s;
      margin-top: 0.5rem;
      z-index: 10;
    }
    .lock-passcode-trigger:hover {
      border-color: rgba(255, 255, 255, 0.35);
      color: #ffffff;
      background: rgba(255, 255, 255, 0.04);
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);

  // --- PHASE 2: INJECT DOM & CONTROLLER ON LOAD ---
  document.addEventListener('DOMContentLoaded', () => {
    // Re-verify in case state changed
    if (!getLockState()) {
      removeLockImmediately();
      return;
    }

    const daysUnlockedCount = getDaysElapsed();

    // Create Main Lock Overlay
    const container = document.createElement('div');
    container.id = 'lock-screen-container';
    container.innerHTML = `
      <canvas id="lock-particles-canvas"></canvas>
      <div class="lock-glow-orb orb-1"></div>
      <div class="lock-glow-orb orb-2"></div>
      
      <!-- iOS style Daily wish notification pill -->
      <div class="ios-notification" id="wish-notification">
        <div class="noti-icon">
          <div class="noti-badge"></div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div class="noti-content">
          <div class="noti-title">Sandy sent a message</div>
          <div class="noti-message" id="notification-text">Day ${daysUnlockedCount}/116 wishes unlocked! Tap to read.</div>
        </div>
        <svg class="noti-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

      <div class="lock-content">
        <div class="lock-logo">
          <svg viewBox="0 0 42 28" aria-hidden="true" style="width: 32px; height: auto;">
            <defs>
              <linearGradient id="lockBrandGrad" x1="3.5" y1="23.5" x2="36.5" y2="4.5" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#2f6fff" />
                <stop offset="0.38" stop-color="#49a1ff" />
                <stop offset="0.62" stop-color="#7a55ff" />
                <stop offset="0.82" stop-color="#ff6f6c" />
                <stop offset="1" stop-color="#f3b248" />
              </linearGradient>
            </defs>
            <path d="M3.31 22.41c1.98-5.55 5.32-10.38 10.02-14.49 1.58-1.36 3.12-2.04 4.62-2.04 1.87 0 3.53 1.05 4.98 3.16 1.11 1.63 2.4 4.46 3.86 8.48l4.53-11.37c.78-1.98 1.98-2.97 3.58-2.97 1.77 0 3.27 1.04 4.5 3.11 1.22 2.07 1.83 4.47 1.83 7.2 0 3.32-.75 6.13-2.24 8.42-.86 1.34-1.91 2.01-3.16 2.01-1.03 0-1.83-.38-2.42-1.14-.58-.76-1.2-2.14-1.86-4.13l-2.1-6.26-4.75 11.88c-.81 1.96-2.02 2.94-3.63 2.94-1.68 0-3.08-.97-4.18-2.91-1.11-1.94-2.29-4.86-3.53-8.75-.92-2.83-1.73-4.83-2.43-5.99-.69-1.16-1.42-1.74-2.18-1.74-1.42 0-3.05 1.15-4.88 3.46-1.82 2.31-3.3 5.03-4.43 8.15-.53 1.4-1.54 2.1-3.05 2.1-.8 0-1.5-.27-2.1-.81-.61-.54-.91-1.27-.91-2.18 0-.53.1-1.07.3-1.61Z" fill="url(#lockBrandGrad)" />
          </svg>
          <span>Nilagravity</span>
        </div>
        
        <div class="lock-icon-container" id="lock-emblem">
          <div class="lock-icon-pulse"></div>
          <div class="lock-icon-glow"></div>
          <svg id="lock-svg" viewBox="0 0 24 24" fill="currentColor">
            <!-- Locked Padlock Path -->
            <path id="lock-path" d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V7zm3 7a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 12 14z" />
          </svg>
        </div>
        
        <div class="lock-text-block">
          <div class="lock-title" id="lock-title">Preparing Surprise...</div>
          <div class="lock-message" id="lock-message">Something is locked. It will open on September 16, 2026.</div>
        </div>
        
        <div class="countdown-grid" id="countdown-grid">
          <div class="countdown-item">
            <div class="countdown-val" id="cd-days">00</div>
            <div class="countdown-label">Days</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-val" id="cd-hours">00</div>
            <div class="countdown-label">Hours</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-val" id="cd-mins">00</div>
            <div class="countdown-label">Mins</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-val" id="cd-secs">00</div>
            <div class="countdown-label">Secs</div>
          </div>
        </div>

        <!-- Enter Passkey Trigger Button -->
        <button class="lock-passcode-trigger" id="passkey-trigger">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Enter Passkey</span>
        </button>
      </div>
    `;

    document.body.insertBefore(container, document.body.firstChild);

    // Create Passkey Login Modal DOM
    const loginModal = document.createElement('div');
    loginModal.id = 'lock-login-modal';
    loginModal.className = 'lock-modal-overlay';
    loginModal.innerHTML = `
      <div class="lock-modal-card">
        <div class="lock-modal-header">
          <button class="lock-modal-close-btn" id="login-modal-close">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <h3 class="lock-modal-title">Enter Vault Passkey</h3>
          <p class="lock-modal-subtitle">Enter the secret passkey to access the website.</p>
        </div>
        <div class="login-modal-body">
          <input type="password" class="passkey-input" id="passkey-input" placeholder="••••••" maxlength="8" />
          <button class="login-btn" id="login-submit-btn">Unlock Vault</button>
        </div>
      </div>
    `;
    document.body.appendChild(loginModal);

    // Create Daily Wishes Modal DOM
    const wishesModal = document.createElement('div');
    wishesModal.id = 'lock-wishes-modal';
    wishesModal.className = 'lock-modal-overlay';
    wishesModal.innerHTML = `
      <div class="lock-modal-card">
        <div class="lock-modal-header">
          <button class="lock-modal-close-btn" id="wishes-modal-close">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <h3 class="lock-modal-title">Daily Wishes</h3>
          <p class="lock-modal-subtitle" id="wishes-modal-subtitle">A new language wish unlocks daily (Day ${daysUnlockedCount}/116)</p>
        </div>
        <div class="wishes-modal-body" id="wishes-modal-body">
          <!-- Scrollable list injected dynamically -->
        </div>
      </div>
    `;
    document.body.appendChild(wishesModal);

    // Setup high-performance canvas background particles
    initStars();

    // Element References
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    const emblem = document.getElementById('lock-emblem');
    const lockSvg = document.getElementById('lock-svg');
    const lockTitle = document.getElementById('lock-title');
    const lockMessage = document.getElementById('lock-message');
    const notificationPill = document.getElementById('wish-notification');
    const passkeyTrigger = document.getElementById('passkey-trigger');
    
    const loginClose = document.getElementById('login-modal-close');
    const loginSubmit = document.getElementById('login-submit-btn');
    const passkeyInput = document.getElementById('passkey-input');
    
    const wishesClose = document.getElementById('wishes-modal-close');
    const wishesBody = document.getElementById('wishes-modal-body');

    let isUnlocking = false;

    // --- SLIDE-IN NOTIFICATION EFFECT ---
    setTimeout(() => {
      if (notificationPill) {
        notificationPill.classList.add('visible');
      }
    }, 850);

    // --- COUNTDOWN TIMING ENGINE ---
    function updateCountdown() {
      const now = new Date().getTime();
      const difference = finalTarget.getTime() - now;

      if (difference <= 0) {
        clearInterval(countdownInterval);
        if (!isUnlocking) {
          triggerUnlock();
        }
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Click padlock emblem to test mock unlock
    emblem.addEventListener('click', () => {
      if (isMocked && !isUnlocking) {
        clearInterval(countdownInterval);
        triggerUnlock();
      }
    });

    // --- UNLOCK TRANSITION PIPELINE ---
    function triggerUnlock() {
      isUnlocking = true;
      localStorage.setItem('nilagravity-unlocked', 'true');
      sessionStorage.setItem('nilagravity-unlocked', 'true');

      // Zero out timer
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';

      // Visual success indicators
      emblem.classList.add('lock-unlocked');
      lockSvg.innerHTML = `<path d="M12 2a5 5 0 0 0-5 5v3H9V7a3 3 0 0 1 6 0v3h3V7a5 5 0 0 0-5-5zm-6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm6 4a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 14z" />`;

      lockTitle.style.background = 'linear-gradient(135deg, #ff6f6c 0%, #f3b248 100%)';
      lockTitle.style.webkitBackgroundClip = 'text';
      lockTitle.textContent = 'Happy Birthday Nila! 🌟';
      lockMessage.textContent = 'Opening your personal birthday universe...';

      // Slide notification pill away
      if (notificationPill) {
        notificationPill.classList.remove('visible');
      }

      // Smooth fade-out of lock interface
      setTimeout(() => {
        container.classList.add('lock-fading');
        setTimeout(() => {
          removeLockElements();
        }, 1200);
      }, 1600);
    }

    function removeLockElements() {
      container.remove();
      loginModal.remove();
      wishesModal.remove();
      const styleTag = document.getElementById('lock-screen-style');
      if (styleTag) styleTag.remove();
      window.dispatchEvent(new Event('site-unlocked'));
    }

    function removeLockImmediately() {
      const lockDiv = document.getElementById('lock-screen-container');
      if (lockDiv) lockDiv.remove();
      const styleTag = document.getElementById('lock-screen-style');
      if (styleTag) styleTag.remove();
      if (loginModal) loginModal.remove();
      if (wishesModal) wishesModal.remove();
    }

    // --- PASSKEY LOGIN PANEL CONTROLLER ---
    passkeyTrigger.addEventListener('click', () => {
      loginModal.classList.add('open');
      passkeyInput.focus();
    });

    loginClose.addEventListener('click', () => {
      loginModal.classList.remove('open');
      passkeyInput.value = '';
    });

    // Close modals on clicking overlay background
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('open');
        passkeyInput.value = '';
      }
    });

    wishesModal.addEventListener('click', (e) => {
      if (e.target === wishesModal) {
        wishesModal.classList.remove('open');
      }
    });

    function validateAndSubmitPasskey() {
      const key = passkeyInput.value.trim();
      if (key === '160903') {
        passkeyInput.classList.remove('input-error');
        passkeyInput.classList.add('input-success');
        passkeyInput.disabled = true;
        loginSubmit.disabled = true;
        loginSubmit.textContent = 'Vault Decrypted!';
        
        setTimeout(() => {
          loginModal.classList.remove('open');
          triggerUnlock();
        }, 650);
      } else {
        passkeyInput.classList.add('input-error');
        passkeyInput.value = '';
        passkeyInput.focus();
        
        setTimeout(() => {
          passkeyInput.classList.remove('input-error');
        }, 500);
      }
    }

    loginSubmit.addEventListener('click', validateAndSubmitPasskey);
    
    passkeyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        validateAndSubmitPasskey();
      }
    });

    // --- DAILY WISHES LIST BUILDER ---
    notificationPill.addEventListener('click', () => {
      // Build scrollable list of wishes unlocked up to today
      let scrollHtml = '';
      for (let i = daysUnlockedCount - 1; i >= 0; i--) {
        const w = wishes[i];
        if (!w) continue;
        const isLatest = (i === daysUnlockedCount - 1);
        scrollHtml += `
          <div class="wish-card ${isLatest ? 'latest' : ''}">
            <div class="wish-meta">
              <span class="wish-day-badge">Day ${i + 1}</span>
              <span class="wish-lang-label">${w.lang}</span>
            </div>
            <div class="wish-text-val">${w.wish}</div>
            <div class="wish-phonetic-val">Translation / Pronunciation: ${w.phonetic}</div>
          </div>
        `;
      }
      
      wishesBody.innerHTML = scrollHtml;
      wishesModal.classList.add('open');
    });

    wishesClose.addEventListener('click', () => {
      wishesModal.classList.remove('open');
    });

    // --- BACKGROUND STAR ENGINE ---
    function initStars() {
      const canvas = document.getElementById('lock-particles-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let stars = [];
      let width = window.innerWidth;
      let height = window.innerHeight;

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        buildStars();
      }

      function buildStars() {
        stars = [];
        const starCount = Math.max(60, Math.min(180, Math.floor((width * height) / 9500)));
        for (let i = 0; i < starCount; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.3 + 0.4,
            speed: Math.random() * 0.04 + 0.015,
            angle: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.015 + 0.005,
            glow: Math.random() > 0.8
          });
        }
      }

      window.addEventListener('resize', resize);
      resize();

      let animFrame;
      function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.phase += s.twinkleSpeed;
          const alpha = 0.25 + Math.sin(s.phase) * 0.45;

          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;

          if (s.x < -10) s.x = width + 10;
          if (s.x > width + 10) s.x = -10;
          if (s.y < -10) s.y = height + 10;
          if (s.y > height + 10) s.y = -10;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, alpha)})`;
          ctx.fill();

          if (s.glow) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(122, 85, 255, ${Math.max(0.01, alpha * 0.15)})`;
            ctx.fill();
          }
        }

        animFrame = requestAnimationFrame(animate);
      }

      animate();

      // Clean up star loops when lock screen collapses
      const observer = new MutationObserver(() => {
        if (!document.getElementById('lock-screen-container')) {
          cancelAnimationFrame(animFrame);
          window.removeEventListener('resize', resize);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true });
    }
  });
})();
