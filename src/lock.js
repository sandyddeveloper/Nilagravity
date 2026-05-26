(function () {
  // Target unlock date: September 15, 2026, 11:59:00 PM (local time)
  const targetDate = new Date('2026-09-15T23:59:00');

  // Parse query parameters for developer preview
  const urlParams = new URLSearchParams(window.location.search);
  const mockTimeSec = parseInt(urlParams.get('mock-time'), 10);
  const sessionExpirySec = parseInt(urlParams.get('session-expiry-sec'), 10);
  const sessionExpiryMs = !isNaN(sessionExpirySec) ? sessionExpirySec * 1000 : 30 * 60 * 1000;

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
    { lang: "English", wish: "Advanced Happy Birthday, Indhu!" },
    { lang: "Spanish", wish: "¡Feliz cumpleaños de antemano, Indhu!" },
    { lang: "French", wish: "Joyeux anniversaire par avance, Indhu !" },
    { lang: "German", wish: "Alles Gute zum Geburtstag im Voraus, Indhu!" },
    { lang: "Italian", wish: "Buon compleanno in anticipo, Indhu!" },
    { lang: "Portuguese", wish: "Feliz Aniversário antecipadamente, Indhu!" },
    { lang: "Dutch", wish: "Alvast een gelukkige verjaardag, Indhu!" },
    { lang: "Russian", wish: "Заранее с Днем Рождения, Инду!" },
    { lang: "Japanese", wish: "少し早いですが、お誕生日おめでとう、インドゥ！" },
    { lang: "Korean", wish: "미리 생일 축하해, 인두!" },
    { lang: "Hindi", wish: "जन्मदिन की अग्रिम शुभकामनाएँ, इंदु!" },
    { lang: "Tamil", wish: "முன்கூட்டியே பிறந்தநாள் வாழ்த்துக்கள், இந்து!" },
    { lang: "Telugu", wish: "முందుగా పుట్టినరోజు శుభాకాంక్షలు, ఇందు!" },
    { lang: "Kannada", wish: "ಮುಂಚಿತವಾಗಿ ಜನ್ಮದಿನದ ಶುಭಾಶಯಗಳು, ಇಂಧು!" },
    { lang: "Malayalam", wish: "മുൻകൂട്ടി ജന്മദിനാശംസകൾ, ഇന്ദു!" },
    { lang: "Bengali", wish: "আগাম শুভ জন্মদিন, ইন্দু!" },
    { lang: "Marathi", wish: "इंधू, वाढदिवसाच्या आगाऊ शुभेच्छा!" },
    { lang: "Gujarati", wish: "અગાઉથી જન્મદિવસની શુભેચ્છાઓ, ઇન્ધુ!" },
    { lang: "Punjabi", wish: "ਅਗਾਊਂ ਜਨਮਦਿਨ ਮੁਬਾਰਕ, ਇੰਧੂ!" },
    { lang: "Arabic", wish: "عيد ميلاد سعيد مقدمًا، إندو!" },
    { lang: "Turkish", wish: "Şimdiden doğum günün kutlu olsun, Indhu!" },
    { lang: "Vietnamese", wish: "Chúc mừng sinh nhật trước, Indhu!" },
    { lang: "Thai", wish: "สุขสันต์วันเกิดล่วงหน้านะอินธุ!" },
    { lang: "Indonesian", wish: "Selamat Ulang Tahun sebelumnya, Indhu!" },
    { lang: "Tagalog", wish: "Maligayang Kaarawan nang maaga, Indhu!" },
    { lang: "Swahili", wish: "Heri ya Siku ya Kuzaliwa mapema, Indhu!" },
    { lang: "Hebrew", wish: "יום הولדת שמח מראש, אינדהו!" },
    { lang: "Greek", wish: "Χρόνια πολλά εκ των προτέρων, Ίντχου!" },
    { lang: "Swedish", wish: "Grattis på födelsedagen i förväg, Indhu!" },
    { lang: "Norwegian", wish: "Gratulerer med dagen på forhånd, Indhu!" },
    { lang: "Danish", wish: "Tillykke med fødselsdagen på forhånd, Indhu!" },
    { lang: "Finnish", wish: "Hyvää syntymäpäivää jo etukäteen, Indhu!" },
    { lang: "Polish", wish: "Wszystkiego najlepszego z okazji urodzin z góry, Indhu!" },
    { lang: "Czech", wish: "Všechno nejlepší k narozeninám przedem, Indhu!" },
    { lang: "Hungarian", wish: "Boldog születésnapot előre is, Indhu!" },
    { lang: "Romanian", wish: "La mulți ani în avans, Indhu!" },
    { lang: "Ukrainian", wish: "Заздалегідь з днем народження, Індху!" },
    { lang: "Malay", wish: "Selamat Hari Lahir terlebih dahulu, Indhu!" },
    { lang: "Persian", wish: "پیشاپیش تولدت مبارک، ایندو!" },
    { lang: "Irish", wish: "Lá breithe shona duit roimh ré, Indhu!" },
    { lang: "Welsh", wish: "Penblwydd Hapus o flaen llaw, Indhu!" },
    { lang: "Latin", wish: "Felix dies natalis in antecessum, Indhu!" },
    { lang: "Hawaiian", wish: "Hauʻoli lā hānau ma mua, Indhu!" },
    { lang: "Maori", wish: "Rā whānau koa i mua, Indhu!" },
    { lang: "Zulu", wish: "Sikufisela usuku oluhle lokuzalwa kusenesikhathi, Indhu!" },
    { lang: "Xhosa", wish: "Usuku lokuzalwa olumnandi ngaphambili, Indhu!" },
    { lang: "Amharic", wish: "በቅድሚያ መልካም ልደት፣ ኢንዱ!" },
    { lang: "Somali", wish: "Dhalasho Farxad leh ka hor, Indu!" },
    { lang: "Yoruba", wish: "Ku ojo ibi ilosiwaju, Indu!" },
    { lang: "Igbo", wish: "Ezi ụbọchị ọmụmụ n'ihu, Indu!" },
    { lang: "Afrikaans", wish: "Baie geluk met jou verjaarsdag by voorbaat, Indhu!" },
    { lang: "Esperanto", wish: "Feliĉan naskiĝtagon anticipe, Indhu!" },
    { lang: "Icelandic", wish: "Til hamingju með afmælið fyrirfram, Indhu!" },
    { lang: "Nepali", wish: "अग्रिम जन्मदिनको शुभकामना, इन्धु!" },
    { lang: "Sinhala", wish: "කල්තියා සුභ උපන්දිනයක්, ඉන්දු!" },
    { lang: "Burmese", wish: "မွေးနေ့မှာ ကြိုတင်ပျော်ရွှင်ပါစေ, အင်ဒူ!" },
    { lang: "Mongolian", wish: "Төрсөн өдрийн мэнд хүргэе, Индху!" },
    { lang: "Tibetan", wish: "ཨིན་དྷུ་ལགས། སྔོན་ནས་སྐྱེས་སྐར་ལ་བཀྲ་ཤིས་བདེ་ལེགས་ཞུ།" },
    { lang: "Khmer", wish: "រីករាយថ្ងៃកំណើតជាមុន, អ៊ិនធូ!" },
    { lang: "Lao", wish: "ສุกສັນວັນເກີດລ່ວງໜ้า, ອິນທູ!" },
    { lang: "Galician", wish: "Feliz aniversario por adiantado, Indhu!" },
    { lang: "Scottish Gaelic", wish: "Co-là breith sona dhut ro làimh, Indhu!" },
    { lang: "Basque", wish: "Urtebetetze on aldez aurretik, Indhu!" },
    { lang: "Catalan", wish: "Per molts anys per endavant, Indhu!" },
    { lang: "Albanian", wish: "Gëzuar ditëlindjen paraprakisht, Indhu!" },
    { lang: "Macedonian", wish: "Среќен роденден однапред, Инду!" },
    { lang: "Bulgarian", wish: "Честит рожден ден предварително, Индху!" },
    { lang: "Serbian", wish: "Срећан рођендан унапред, Индху!" },
    { lang: "Croatian", wish: "Sretan rođendan unaprijed, Indhu!" },
    { lang: "Bosnian", wish: "Sretan rođendan unaprijed, Indhu!" },
    { lang: "Slovenian", wish: "Vse najboljše za rojstni dan vnaprej, Indhu!" },
    { lang: "Slovak", wish: "Všetko najlepšie k narodeninám vopred, Indhu!" },
    { lang: "Estonian", wish: "Palju õnne juba ette, Indhu!" },
    { lang: "Latvian", wish: "Daudz laimes dzimšanas dienā jau iepriekš, Indhu!" },
    { lang: "Lithuanian", wish: "Su gimtadieniu iš anksto, Indhu!" },
    { lang: "Belarusian", wish: "Загадзя з Днём нараджэння, Інду!" },
    { lang: "Georgian", wish: "წინასწარ გილოცავ დაბადების დღეს, ინდუ!" },
    { lang: "Armenian", wish: "Նախապես շნორհավոր ծնունդդ, Ինդու!" },
    { lang: "Azerbaijani", wish: "Əvvəlcədən ad günün mübarək, İndhu!" },
    { lang: "Kazakh", wish: "Алдын ала туған күнің құтты болсын, Индху!" },
    { lang: "Kyrgyz", wish: "Алдын ала туулган күнүң менен, Индху!" },
    { lang: "Tajik", wish: "Пешакӣ зодрӯз муборак, Инду!" },
    { lang: "Uzbek", wish: "Oldindan tug'ilgan kuningiz bilan, Indhu!" },
    { lang: "Turkmen", wish: "Doglan günüň gutly bolsun, Indhu!" },
    { lang: "Yiddish", wish: "מזل דיין געבורסטאָג אין שטייַגן, ינדהו!" },
    { lang: "Maltese", wish: "Happy Birthday bil-quddiem, Indhu!" },
    { lang: "Luxembourgish", wish: "Alles Guddes fir de Gebuertsdag am Viraus, Indhu!" },
    { lang: "Frisian", wish: "Lokkige jierdei fan tefoaren, Indhu!" },
    { lang: "Corsican", wish: "Bon compleannu in anticipu, Indhu!" },
    { lang: "Breton", wish: "Deiz-ha-bloaz laouen dit a-raok, Indhu!" },
    { lang: "Occitan", wish: "Bon anniversari per avança, Indhu!" },
    { lang: "Sardinian", wish: "Bonu anniversariu in anticipu, Indhu!" },
    { lang: "Romansh", wish: "Bel anniversari ordavant, Indhu!" },
    { lang: "Faroese", wish: "Tillukku við føðingardegnum frammanundan, Indhu!" },
    { lang: "Greenlandic", wish: "Siusinnerusukkut inuuinni pilluarit, Indhu!" },
    { lang: "Samoan", wish: "Manuia lou aso fanau i luma, Indhu!" },
    { lang: "Tongan", wish: "Fakafiefia'i 'a e 'aho fanau'i 'i he tomu'a, Indhu!" },
    { lang: "Fijian", wish: "Siganisucu vinaka e liu, Indhu!" },
    { lang: "Tahitian", wish: "Ia ora na i to oe mahana fanauraa i mua, Indhu!" },
    { lang: "Malagasy", wish: "Tratry ny tsingerin-taona nahaterahana mialoha, Indhu!" },
    { lang: "Sundanese", wish: "Wilujeng tepang taun sateuacanna, Indhu!" },
    { lang: "Javanese", wish: "Sugeng tanggap warsa saderengipun, Indhu!" },
    { lang: "Balinese", wish: "Rahajeng Wanti Warsa sadurungnyane, Indhu!" },
    { lang: "Tatar", wish: "Алдан туган көнең белән, Индху!" },
    { lang: "Bashkir", wish: "Тыуған көнөң менән алдан ҡотлайым, Индху!" },
    { lang: "Chuvash", wish: "Çурална кун ячĕপে малтанах, Индху!" },
    { lang: "Yakut", wish: "Эрдэттэн төрөөбүт күҥҥүнэн, Индху!" },
    { lang: "Kurdish", wish: "Rojbûna te ya pêşwext pîroz be, Indhu!" },
    { lang: "Pashto", wish: "مخکې له مخکې د کلیزې مبارکي، اندو!" },
    { lang: "Sindhi", wish: "ڄمڻ ڏينهن مبارڪ اڳواٽ، إندهو!" },
    { lang: "Urdu", wish: "پیشگی سالگرہ مبارک ہو، اندھو!" },
    { lang: "Sanskrit", wish: "जन्मदिवसस्य अग्रिमे शुभकामनाः, इन्धु!" },
    { lang: "Latin (Alternate)", wish: "Felix dies natalis in antecessum, Indhu!" },
    { lang: "Hawaiian (Alternate)", wish: "Hauʻoli lā hānau ma mua, Indhu!" },
    { lang: "Hmong", wish: "Zoo siab hnub yug ua ntej, Indhu!" },
  ];

  // --- GOD MESSAGES DATABASE ---
  const godMessages = [
    "My dear Indhu, today I want you to know that you are never alone. I am always guiding your steps and watching over you with infinite love. Have a beautiful day!",
    "Dearest Indhu, your heart is a vessel of pure light. Do not let any small shadows dim your brightness today. I have blessed you with courage.",
    "Indhu, remember that you are stronger than any challenge that comes your way. Rest your worries in my hands; I am shielding your heart.",
    "My child Indhu, take a deep breath. Today, I bless you with deep inner peace and stillness. You are exactly where you need to be.",
    "Indhu, your smile brings so much warmth to the world. Today, I bless you with simple joys, sweet laughter, and gentle moments.",
    "Dear Indhu, you are capable of achieving wonderful things. Walk forward with confidence, for my grace is paving your path.",
    "Indhu, when you feel overwhelmed, remember that I am holding you close. I bless you with comfort and a peaceful, quiet heart today.",
    "Dearest Indhu, I have painted the sky with hope for you today. Let your spirit soar. You are cherished beyond measure.",
    "My dear Indhu, I bless you with a mind of clarity and a heart of compassion. Shine your light on the world today; you are ready.",
    "Indhu, look at how far you have come. I am so proud of your resilient spirit. Today, I bless you with extra energy and vitality.",
    "Indhu, every step you take with kindness is a step closer to my heart. I bless you with sweet relationships and harmony today.",
    "My precious Indhu, do not worry about tomorrow. Focus on the beauty of today. I am taking care of your future.",
    "Dear Indhu, let the warmth of my love melt away all your doubts. You are a masterpiece in the making.",
    "Indhu, I bless your hands to create beauty, your mind to cultivate wisdom, and your heart to radiate peace.",
    "Dearest Indhu, today I send you a gentle reminder: you are worthy of all the good things life has to offer.",
    "My child Indhu, let your faith be bigger than your fears today. I am your shield and your guide.",
    "Indhu, I bless your day with pleasant surprises, warm encounters, and a feeling of pure contentment.",
    "Dear Indhu, when you speak, let it be with kindness. Your gentle words have the power to heal. I bless you with grace.",
    "Indhu, may you find comfort in knowing that your tears are seen and your prayers are always heard. Rest in my love.",
    "Dearest Indhu, today I bless you with the patience of a flowing river. Trust the journey and the timing of your life.",
    "My dear Indhu, you are a rare gem. Never compare your path to others. Walk in your own light, blessed and protected.",
    "Indhu, let your heart be filled with gratitude today, and watch how the universe responds with more reasons to be thankful.",
    "Dear Indhu, I bless your home with peace, your heart with understanding, and your path with success.",
    "Indhu, be gentle with yourself. You are growing, and growth takes time. I bless you with self-compassion today.",
    "Dearest Indhu, today I stand beside you, cheering you on. Take courage and step into your power.",
    "My child Indhu, let the noise of the world fade. Listen to the quiet whisper of my love inside your soul.",
    "Indhu, I bless you with the strength to forgive, the wisdom to let go, and the freedom to move forward.",
    "Dear Indhu, may your day be brightened by sweet moments that make you smile. You deserve all the happiness.",
    "Indhu, I wrap you in a blanket of divine protection. No negativity can touch you today.",
    "Dearest Indhu, I bless your mind with creativity and inspiration today. Let your thoughts flow beautifully.",
    "My dear Indhu, you are a beacon of hope for many. Keep shining. I bless you with endless support.",
    "Indhu, today I give you the gift of a calm mind. Let go of what you cannot control.",
    "Dear Indhu, I bless you with a spirit that never gives up. You have the resilience to climb any mountain.",
    "Indhu, your heart is a garden. Plant only seeds of love, joy, and peace today. I am watering them with my grace.",
    "Dearest Indhu, today, know that you are deeply loved, protected, and cherished. Walk with a happy heart.",
    "My child Indhu, I bless you with the wisdom to see the hidden lessons in every challenge.",
    "Indhu, may your day be filled with warm laughter and the company of those who appreciate your beautiful soul.",
    "Dear Indhu, trust the quiet voice inside you. That is my guidance leading you. Walk in faith.",
    "Indhu, today I bless your body with health, your mind with tranquility, and your spirit with joy.",
    "Dearest Indhu, you are a beautiful blessing to this world. Never forget your value. I am always with you.",
    "My dear Indhu, I bless you with the courage to follow your dreams. Do not hold back; your potential is infinite.",
    "Indhu, look at the beauty around you. I created it to remind you of my love. Have a peaceful day.",
    "Dear Indhu, today I bless you with a heart that overflows with kindness. Your gentleness is your power.",
    "Indhu, when you feel tired, come to me for rest. I will renew your strength and clear your path.",
    "Dearest Indhu, I bless you with the ability to see the good in everyone and everything today.",
    "My child Indhu, let my light guide you through any dark corners today. You are safe in my arms.",
    "Indhu, I bless your day with smooth workflows, successful completions, and a feeling of achievement.",
    "Dear Indhu, keep your eyes on the stars and your feet on the ground. I am backing your journey.",
    "Indhu, may your heart be a sanctuary of peace today. No external storm can shake your inner calm.",
    "Dearest Indhu, I bless you with deep contentment. May you find joy in the smallest of things today.",
    "My dear Indhu, your path is unique and beautiful. Walk it with pride and a smile. I am with you.",
    "Indhu, let your words be sweet and your actions be noble today. I am blessing every seed of kindness you sow.",
    "Dear Indhu, today I send you the strength to stand tall. You are a warrior of light.",
    "Indhu, may your mind be free from doubt and filled with positive expectations today. Good things are coming.",
    "Dearest Indhu, I bless you with deep, restorative sleep tonight and an energetic, bright day tomorrow.",
    "My child Indhu, you do not have to carry your burdens alone. Give them to me. I will carry them for you.",
    "Indhu, I bless your relationships with trust, deep affection, and mutual understanding.",
    "Dear Indhu, may you experience a miracle of peace in your heart today. All is well.",
    "Indhu, let your enthusiasm shine today. I bless your efforts with fruitful results.",
    "Dearest Indhu, you are my beloved child. My blessings are showered upon you constantly.",
    "My dear Indhu, I bless you with the wisdom of discernment. Choose paths that bring peace to your soul.",
    "Indhu, today I invite you to rest in my presence. Let my love reassure you of your worth.",
    "Dear Indhu, walk with grace, speak with truth, and love with all your heart. I am always guiding you.",
    "Indhu, I bless your day with clarity of purpose and the determination to achieve your goals.",
    "Dearest Indhu, do not let temporary setbacks steal your joy. Your destiny is grand and protected.",
    "My child Indhu, I bless you with a thankful heart. Gratitude is the key to my infinite abundance.",
    "Indhu, may your mind be filled with serene thoughts, like a calm lake mirroring the sky.",
    "Dear Indhu, I bless your journey with safety, your decisions with wisdom, and your life with love.",
    "Indhu, you are a vessel of love. Share it freely today. I am constantly replenishing your heart.",
    "Dearest Indhu, today I bless you with a spark of divine inspiration. Let your imagination soar.",
    "My dear Indhu, remember that you are loved for exactly who you are. You do not need to prove anything to the world.",
    "Indhu, let the light of hope shine bright in your eyes. I am clearing away all blockages from your path.",
    "Dear Indhu, I bless you with a day filled with harmony, cooperation, and gentle success.",
    "Indhu, you are shielded by my angels today. Walk with the confidence of a queen.",
    "Dearest Indhu, today I bless your heart to feel light and free. Let go of past heavy thoughts.",
    "My child Indhu, your life is a beautiful story that I am writing with love. Trust the author.",
    "Indhu, may you find beauty in the unexpected and joy in the ordinary today. You are blessed.",
    "Dear Indhu, I bless you with a sharp mind and a calm heart. You can handle anything today.",
    "Indhu, my love for you is as deep as the ocean and as vast as the sky. Rest in this truth.",
    "Dearest Indhu, today I bless you with sweet connections and laughter that heals the soul.",
    "My dear Indhu, I bless your path with golden opportunities. Keep your heart open to receive.",
    "Indhu, let your spirit be resilient and your mind be positive today. My grace is your constant shield.",
    "Dear Indhu, I bless you with the courage to stand up for yourself and the kindness to support others.",
    "Indhu, today I send you a gentle wind of peace. Let it wash over you and carry away all tension.",
    "Dearest Indhu, you are my reflection of beauty and love in this world. Keep shining bright.",
    "My child Indhu, I bless you with clarity to make the right choices and strength to act on them.",
    "Indhu, may your day be as beautiful and glowing as a morning sunrise. You are blessed.",
    "Dear Indhu, today I bless you with the gift of focus. May you complete all your tasks with ease.",
    "Indhu, when you feel uncertain, look up. My stars are guiding you, and my hand is holding yours.",
    "Dearest Indhu, I bless your heart with absolute trust. Everything is working out for your highest good.",
    "My dear Indhu, I bless you with the strength to stand tall in your truth and shine your unique light.",
    "Indhu, may your day be filled with warm sunshine, friendly faces, and a calm, peaceful heart.",
    "Dear Indhu, I bless you with a spirit of adventure. Explore life with curiosity and joy.",
    "Indhu, you are a precious soul. I watch over you day and night. Sleep in peace, wake in joy.",
    "Dearest Indhu, today I bless your mind to think positive thoughts and your tongue to speak kind words.",
    "My child Indhu, I bless you with the capacity to love deeply and be loved in return. Your heart is safe.",
    "Indhu, I bless your day with fruitful conversations, happy memories, and absolute peace.",
    "Dear Indhu, trust that I am alignment of your dreams. Keep believing in the magic of life.",
    "Indhu, may your heart be a repository of love, joy, and kindness today. You are a blessing.",
    "Dearest Indhu, today I bless you with a quiet confidence that needs no approval from others.",
    "My dear Indhu, I bless your path with peaceful rivers, green pastures, and clear, blue skies.",
    "Indhu, you are surrounded by my grace at all times. Walk with a light step and a happy spirit.",
    "Dear Indhu, today I bless you with the strength to overcome any doubt and step into your full potential.",
    "Indhu, may your mind be a sanctuary of clean, positive, and beautiful thoughts. I am guarding you.",
    "Dearest Indhu, I bless your day with gentle breezes of joy and a persistent feeling of comfort.",
    "My child Indhu, know that every prayer you whisper is heard and answered in the perfect way.",
    "Indhu, I bless you with a heart that knows no fear and a spirit that knows no limits. Rise high.",
    "Dear Indhu, I bless your home with warm laughter, your cupboard with plenty, and your heart with peace.",
    "Indhu, today I send you extra strength to be patient and understanding. Your growth is beautiful.",
    "Dearest Indhu, you are my cherished treasure. Walk through today knowing you have my ultimate blessing.",
    "My dear Indhu, I bless your mind with clarity, your body with energy, and your path with success today.",
    "Indhu, let your heart be filled with hope. The best days of your life are ahead of you. I am preparing them.",
    "My dearest child Indhu, today on this final step of your countdown, I bless you with infinite love, eternal protection, and a future brighter than the stars. Walk into your birthday tomorrow with a glowing soul. I am with you always."
  ];

  // --- AUDIO SYNTHESIS ENGINE ---
  function playTempleBell() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      const root = 392; // G4 pitch
      // Ratios for bell harmonics
      const partials = [0.5, 1, 1.2, 1.5, 2, 2.5, 3, 4.2];
      const gains = [0.25, 0.3, 0.2, 0.15, 0.1, 0.08, 0.05, 0.03];
      const decays = [3.0, 2.5, 1.8, 1.5, 1.2, 0.8, 0.6, 0.3];
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(MasterVolumeScale(), now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);
      masterGain.connect(ctx.destination);
      
      partials.forEach((ratio, i) => {
        const osc = ctx.createOscillator();
        const pGain = ctx.createGain();
        
        const freq = root * ratio + (i > 2 ? Math.random() * 5 - 2.5 : 0);
        osc.frequency.value = freq;
        
        if (i === 0) {
          osc.type = 'sine'; // deep hum
        } else if (i < 4) {
          osc.type = 'triangle';
        } else {
          osc.type = 'sine';
        }
        
        pGain.gain.setValueAtTime(gains[i], now);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);
        
        osc.connect(pGain);
        pGain.connect(masterGain);
        
        osc.start(now);
        osc.stop(now + decays[i] + 0.1);
      });
    } catch (e) {
      console.error('Audio synthesis failed:', e);
    }
  }

  // Helper helper to scale master volume
  function MasterVolumeScale() {
    return 0.35;
  }

  // --- FLOATING SPARKLES ---
  function createGoldParticles(container) {
    if (!container) return;
    const count = 35;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'gold-sparkle';
      
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = Math.random() * 2 + 2.5;
      
      particle.style.cssText = `
        position: absolute;
        bottom: -10px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #ffe9a6 0%, #f3b248 80%, transparent 100%);
        border-radius: 50%;
        opacity: ${Math.random() * 0.7 + 0.3};
        pointer-events: none;
        box-shadow: 0 0 ${size * 2}px #f3b248;
        animation: floatSparkle ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
      `;
      container.appendChild(particle);
    }
  }

  // --- DISPLAY BLESSING MODAL ---
  function showGodBlessing(dayIndex) {
    playTempleBell();

    const msgIndex = (dayIndex - 1) % godMessages.length;
    const messageText = godMessages[msgIndex];

    const blessingModal = document.createElement('div');
    blessingModal.id = 'god-blessing-modal';
    blessingModal.className = 'lock-modal-overlay';
    blessingModal.innerHTML = `
      <div class="god-blessing-card">
        <div class="god-particles-container" id="god-particles-container"></div>
        <div class="god-halo"></div>
        
        <button class="lock-modal-close-btn god-close-btn" id="god-blessing-close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div class="god-card-content">
          <div class="god-aura-symbol">
            <svg viewBox="0 0 100 100" class="divine-light-svg">
              <defs>
                <radialGradient id="divineGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#fff5d6" stop-opacity="1" />
                  <stop offset="30%" stop-color="#f3b248" stop-opacity="0.8" />
                  <stop offset="70%" stop-color="#7a55ff" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="transparent" stop-opacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50%" cy="50%" r="48" fill="url(#divineGlow)" />
              <path d="M 50 5 L 50 95 M 5 50 L 95 50 M 18 18 L 82 82 M 18 82 L 82 18" stroke="#ffe39e" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
              <circle cx="50%" cy="50%" r="15" fill="none" stroke="#f3b248" stroke-width="2" />
              <path d="M 50 15 L 50 25 M 50 75 L 50 85 M 15 50 L 25 50 M 75 50 L 85 50" stroke="#f3b248" stroke-width="2" stroke-linecap="round" />
              <polygon points="50,38 53,45 61,45 55,50 57,58 50,53 43,58 45,50 39,45 47,45" fill="#ffffff" />
            </svg>
          </div>
          
          <h4 class="god-card-title">God's Blessing</h4>
          <p class="god-card-day">Day ${dayIndex} of Countdown</p>
          
          <div class="god-message-body">
            <p class="god-message-text">“${messageText}”</p>
            <div class="god-signature">With infinite love and blessings ✨</div>
          </div>
          
          <button class="god-btn" id="god-receive-btn">Receive Blessing</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(blessingModal);
    createGoldParticles(blessingModal.querySelector('#god-particles-container'));
    
    setTimeout(() => {
      blessingModal.classList.add('open');
    }, 50);
    
    const closeBtn = blessingModal.querySelector('#god-blessing-close');
    const receiveBtn = blessingModal.querySelector('#god-receive-btn');
    
    function closeModal() {
      blessingModal.classList.remove('open');
      setTimeout(() => {
        blessingModal.remove();
      }, 400);
    }
    
    closeBtn.addEventListener('click', closeModal);
    receiveBtn.addEventListener('click', closeModal);
    blessingModal.addEventListener('click', (e) => {
      if (e.target === blessingModal) {
        closeModal();
      }
    });
  }

  // --- CALCULATION LOGIC ---
  // Calculates day index (1 to 113) relative to May 26, 2026.
  function getDaysElapsed() {
    const dayParam = urlParams.get('unlocked-days');
    if (dayParam) {
      const parsed = parseInt(dayParam, 10);
      if (!isNaN(parsed) && parsed >= 1) {
        return Math.min(parsed, 113);
      }
    }

    const start = new Date('2026-05-26T00:00:00');
    const now = new Date();

    // Reset to local midnight to calculate difference in calendar days
    const startLocal = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const nowLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = nowLocal - startLocal;
    if (diffTime < 0) {
      return 1; // Default to Day 1 if local clock is before start date
    }

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(diffDays, 113);
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
      background: #f7f6f2 !important;
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
      background:
        radial-gradient(circle at 12% 14%, rgba(255, 141, 182, 0.11), transparent 30%),
        radial-gradient(circle at 82% 10%, rgba(117, 145, 255, 0.09), transparent 28%),
        radial-gradient(circle at 62% 80%, rgba(255, 184, 103, 0.1), transparent 24%),
        linear-gradient(180deg, #fcfbf8 0%, #f7f6f2 100%);
      font-family: 'Outfit', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #11131a;
      z-index: 2147483647;
      overflow: hidden;
      box-sizing: border-box;
      padding: 2rem;
      text-align: center;
      transition: opacity 1.2s cubic-bezier(0.2, 1, 0.2, 1), transform 1.2s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .lock-page-noise {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.46;
      background-image: radial-gradient(circle, rgba(17, 19, 26, 0.18) 0.0425rem, transparent 0.04875rem);
      background-size: 2.625rem 2.625rem;
      z-index: 1;
    }
    .lock-glow-orb {
      position: absolute;
      width: 45vw;
      height: 45vw;
      border-radius: 50%;
      filter: blur(5rem);
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
      max-width: 33.75rem;
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
      color: #11131a;
      user-select: none;
    }
    .lock-icon-container {
      position: relative;
      width: 5.625rem;
      height: 5.625rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.65);
      border: 0.0625rem solid rgba(17, 19, 26, 0.08);
      box-shadow: 0 1rem 3rem rgba(17, 19, 26, 0.06), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(0.75rem);
      -webkit-backdrop-filter: blur(0.75rem);
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .lock-icon-container:hover {
      transform: scale(1.05);
      border-color: rgba(122, 85, 255, 0.4);
      box-shadow: 0 1.25rem 3.75rem rgba(122, 85, 255, 0.15), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.95);
    }
    .lock-icon-pulse {
      position: absolute;
      inset: -0.375rem;
      border-radius: 50%;
      border: 0.0625rem dashed rgba(122, 85, 255, 0.35);
      animation: rotateDashed 25s linear infinite;
    }
    .lock-icon-glow {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(122, 85, 255, 0.15) 0%, transparent 70%);
      filter: blur(0.3125rem);
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
      width: 2.125rem;
      height: 2.125rem;
      color: #ff6f6c;
      transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
      filter: drop-shadow(0 0 0.5rem rgba(255, 111, 108, 0.25));
    }
    .lock-icon-container:hover #lock-svg {
      color: #ff8885;
      filter: drop-shadow(0 0 0.75rem rgba(255, 111, 108, 0.4));
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
      background: linear-gradient(135deg, #11131a 0%, #3e485a 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.15;
    }
    .lock-message {
      font-size: clamp(0.95rem, 2.5vw, 1.1rem);
      color: rgba(17, 19, 26, 0.65);
      font-weight: 400;
      line-height: 1.5;
      max-width: 27.5rem;
      margin: 0 auto;
    }
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: clamp(0.75rem, 2.5vw, 1.25rem);
      width: 100%;
      max-width: 30rem;
      margin-top: 0.2rem;
    }
    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.65);
      border: 0.0625rem solid rgba(17, 19, 26, 0.07);
      padding: clamp(0.85rem, 3vw, 1.4rem) 0.25rem;
      border-radius: 1.25rem;
      backdrop-filter: blur(1rem);
      -webkit-backdrop-filter: blur(1rem);
      box-shadow: 0 0.5rem 2rem rgba(17, 19, 26, 0.03), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.9);
      transition: all 0.4s ease;
    }
    .countdown-item:hover {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(17, 19, 26, 0.12);
      transform: translateY(-0.125rem);
    }
    .countdown-val {
      font-size: clamp(1.8rem, 5.5vw, 2.8rem);
      font-weight: 800;
      background: linear-gradient(135deg, #11131a 0%, #454f63 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0.25rem 1.25rem rgba(17, 19, 26, 0.05);
      line-height: 1;
      margin-bottom: 0.35rem;
    }
    .countdown-label {
      font-size: clamp(0.6rem, 1.8vw, 0.7rem);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: rgba(17, 19, 26, 0.45);
      font-weight: 600;
    }
    .lock-unlocked #lock-svg {
      color: #f3b248 !important;
      filter: drop-shadow(0 0 1.25rem rgba(243, 178, 72, 0.8)) !important;
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
      transform: translateX(-50%) translateY(-1.5625rem);
      width: 90%;
      max-width: 26.25rem;
      background: rgba(255, 255, 255, 0.8);
      border: 0.0625rem solid rgba(17, 19, 26, 0.08);
      backdrop-filter: blur(1.25rem);
      -webkit-backdrop-filter: blur(1.25rem);
      border-radius: 1.25rem;
      padding: 0.75rem 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.9rem;
      z-index: 2147483646;
      cursor: pointer;
      box-shadow: 0 1rem 2.5rem rgba(17, 19, 26, 0.06), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.95);
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .ios-notification.visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    .ios-notification:hover {
      background: rgba(255, 255, 255, 0.92);
      border-color: rgba(17, 19, 26, 0.15);
      transform: translateX(-50%) translateY(-0.125rem);
    }
    .noti-icon {
      position: relative;
      background: linear-gradient(135deg, #7a55ff 0%, #ff6f6c 100%);
      border-radius: 0.5rem;
      width: 2.375rem;
      height: 2.375rem;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .noti-svg {
      width: 1.25rem;
      height: 1.25rem;
      color: white;
    }
    .noti-badge {
      position: absolute;
      top: -0.25rem;
      right: -0.25rem;
      width: 0.625rem;
      height: 0.625rem;
      background: #ff4a4a;
      border-radius: 50%;
      border: 0.125rem solid #ffffff;
      box-shadow: 0 0 0.375rem #ff4a4a;
      animation: pulseBadge 1.5s infinite alternate;
    }
    @keyframes pulseBadge {
      0% { transform: scale(1); box-shadow: 0 0 0.25rem #ff4a4a; }
      100% { transform: scale(1.3); box-shadow: 0 0 0.625rem #ff4a4a; }
    }
    .noti-content {
      flex: 1;
      text-align: left;
    }
    .noti-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: rgba(17, 19, 26, 0.45);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.15rem;
    }
    .noti-message {
      font-size: 0.9rem;
      font-weight: 600;
      color: #11131a;
      line-height: 1.3;
    }
    .noti-chevron {
      width: 1.125rem;
      height: 1.125rem;
      color: rgba(17, 19, 26, 0.35);
      transition: transform 0.3s;
    }
    .ios-notification:hover .noti-chevron {
      color: #11131a;
      transform: translateX(0.125rem);
    }
    
    /* Modals Overlay (Common) */
    .lock-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(248, 246, 241, 0.8);
      backdrop-filter: blur(0.75rem);
      -webkit-backdrop-filter: blur(0.75rem);
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
      background: linear-gradient(180deg, #fcfbf8 0%, #f7f6f2 100%);
      border: 0.0625rem solid rgba(17, 19, 26, 0.08);
      border-radius: 2rem;
      box-shadow: 0 2rem 5rem rgba(17, 19, 26, 0.12), inset 0 0.0625rem 0 rgba(255, 255, 255, 0.9);
      width: 100%;
      max-width: 30rem;
      display: flex;
      flex-direction: column;
      transform: scale(0.92) translateY(1.25rem);
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
      border-bottom: 0.0625rem solid rgba(17, 19, 26, 0.04);
    }
    .lock-modal-close-btn {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: rgba(17, 19, 26, 0.04);
      border: 0.0625rem solid rgba(17, 19, 26, 0.06);
      color: rgba(17, 19, 26, 0.6);
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: all 0.3s;
    }
    .lock-modal-close-btn:hover {
      background: rgba(17, 19, 26, 0.08);
      color: #11131a;
    }
    .lock-modal-close-btn svg {
      width: 1.125rem;
      height: 1.125rem;
    }
    .lock-modal-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #11131a;
      font-family: 'Outfit', sans-serif;
    }
    .lock-modal-subtitle {
      font-size: 0.9rem;
      color: rgba(17, 19, 26, 0.55);
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
      background: rgba(255, 255, 255, 0.8);
      border: 0.0625rem solid rgba(17, 19, 26, 0.1);
      padding: 0.8rem;
      border-radius: 1.25rem;
      color: #11131a;
      outline: none;
      box-sizing: border-box;
      box-shadow: inset 0 0.125rem 0.5rem rgba(17, 19, 26, 0.05);
      transition: all 0.3s;
    }
    .passkey-input:focus {
      border-color: rgba(122, 85, 255, 0.5);
      box-shadow: 0 0 1.25rem rgba(122, 85, 255, 0.1), inset 0 0.125rem 0.5rem rgba(17, 19, 26, 0.05);
    }
    .passkey-input::placeholder {
      font-size: 1.4rem;
      letter-spacing: 0;
      font-weight: 500;
      color: rgba(17, 19, 26, 0.2);
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
      box-shadow: 0 0.75rem 2rem rgba(122, 85, 255, 0.25);
      transition: all 0.3s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .login-btn:hover {
      transform: translateY(-0.125rem);
      box-shadow: 0 1rem 2.5rem rgba(122, 85, 255, 0.4);
    }
    .login-btn:active {
      transform: translateY(0);
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      15%, 45%, 75% { transform: translateX(-0.625rem); }
      30%, 60%, 90% { transform: translateX(0.625rem); }
    }
    .input-error {
      border-color: #ff4a4a !important;
      box-shadow: 0 0 1.5625rem rgba(255, 74, 74, 0.35) !important;
      animation: shake 0.5s ease-in-out;
    }
    .input-success {
      border-color: #4aff4a !important;
      box-shadow: 0 0 1.5625rem rgba(74, 255, 74, 0.4) !important;
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
      width: 0.375rem;
    }
    .wishes-modal-body::-webkit-scrollbar-track {
      background: rgba(17, 19, 26, 0.01);
    }
    .wishes-modal-body::-webkit-scrollbar-thumb {
      background: rgba(17, 19, 26, 0.12);
      border-radius: 0.625rem;
    }
    .wishes-modal-body::-webkit-scrollbar-thumb:hover {
      background: rgba(17, 19, 26, 0.24);
    }
    
    .wish-card {
      background: rgba(255, 255, 255, 0.5);
      border: 0.0625rem solid rgba(17, 19, 26, 0.05);
      border-radius: 1.25rem;
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      text-align: left;
      transition: all 0.3s;
    }
    .wish-card:hover {
      background: rgba(255, 255, 255, 0.8);
      border-color: rgba(17, 19, 26, 0.1);
      transform: translateY(-0.125rem);
    }
    .wish-card.latest {
      background: linear-gradient(135deg, rgba(122, 85, 255, 0.06) 0%, rgba(255, 111, 108, 0.06) 100%);
      border: 0.0625rem solid rgba(255, 111, 108, 0.35);
      box-shadow: 0 0.5rem 1.5rem rgba(255, 111, 108, 0.08);
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
      border-radius: 3.125rem;
    }
    .wish-card.latest .wish-day-badge {
      background: #ff6f6c;
      color: #ffffff;
      box-shadow: 0 0.125rem 0.625rem rgba(255, 111, 108, 0.4);
    }
    .wish-lang-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: rgba(17, 19, 26, 0.45);
    }
    .wish-text-val {
      font-size: 1.45rem;
      font-weight: 700;
      color: #11131a;
      font-family: 'Outfit', sans-serif;
      margin: 0.4rem 0 0.1rem;
      line-height: 1.35;
    }
    
    /* Footer elements for passcode */
    .lock-passcode-trigger {
      background: rgba(255, 255, 255, 0.5);
      border: 0.0625rem solid rgba(17, 19, 26, 0.12);
      color: rgba(17, 19, 26, 0.6);
      padding: 0.55rem 1.25rem;
      border-radius: 3.125rem;
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
      border-color: rgba(17, 19, 26, 0.25);
      color: #11131a;
      background: rgba(255, 255, 255, 0.85);
      transform: translateY(-0.0625rem);
    }
    .lock-passcode-trigger svg {
      width: 0.9375rem;
      height: 0.9375rem;
    }

    /* God Blessing Modal Styling */
    .god-blessing-card {
      background: radial-gradient(circle at 50% 30%, #1e113a 0%, #090314 100%);
      border: 0.0625rem solid rgba(243, 178, 72, 0.45);
      border-radius: 2.25rem;
      box-shadow: 
        0 2.5rem 6.25rem rgba(0, 0, 0, 0.85), 
        inset 0 0.0625rem 0 rgba(255, 255, 255, 0.15),
        0 0 30px rgba(243, 178, 72, 0.15);
      width: 100%;
      max-width: 28rem;
      display: flex;
      flex-direction: column;
      transform: scale(0.9) translateY(1.875rem);
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      overflow: hidden;
      position: relative;
      padding: 2.5rem 2rem;
      box-sizing: border-box;
      text-align: center;
    }
    .lock-modal-overlay.open .god-blessing-card {
      transform: scale(1) translateY(0);
    }
    .god-particles-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    }
    .god-halo {
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      width: 13.75rem;
      height: 13.75rem;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(243, 178, 72, 0.22) 0%, transparent 70%);
      filter: blur(1.5625rem);
      z-index: 2;
      pointer-events: none;
      animation: pulseHalo 5s ease-in-out infinite alternate;
    }
    @keyframes pulseHalo {
      0% { transform: translateX(-50%) scale(0.9); opacity: 0.7; }
      100% { transform: translateX(-50%) scale(1.15); opacity: 1; }
    }
    .god-close-btn {
      background: rgba(255, 255, 255, 0.06) !important;
      border: 0.0625rem solid rgba(255, 255, 255, 0.1) !important;
      color: rgba(255, 255, 255, 0.6) !important;
      z-index: 10;
    }
    .god-close-btn:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      color: #ffffff !important;
    }
    .god-card-content {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .god-aura-symbol {
      width: 7.5rem;
      height: 7.5rem;
      margin-bottom: 1.2rem;
      display: grid;
      place-items: center;
      filter: drop-shadow(0 0 1.25rem rgba(243, 178, 72, 0.5));
    }
    .divine-light-svg {
      width: 100%;
      height: 100%;
      animation: slowRotate 30s linear infinite;
    }
    @keyframes slowRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .god-card-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #ffe39e;
      font-family: 'Outfit', sans-serif;
      margin: 0;
      letter-spacing: -0.02em;
      text-shadow: 0 0 10px rgba(243, 178, 72, 0.3);
    }
    .god-card-day {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.55);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin: 0.3rem 0 1.8rem;
      font-weight: 600;
    }
    .god-message-body {
      background: rgba(255, 255, 255, 0.04);
      border: 0.0625rem solid rgba(255, 255, 255, 0.05);
      padding: 1.6rem 1.4rem;
      border-radius: 1.5rem;
      margin-bottom: 2rem;
      position: relative;
      box-shadow: inset 0 0.125rem 0.625rem rgba(0, 0, 0, 0.2);
    }
    .god-message-text {
      font-size: 1.15rem;
      line-height: 1.65;
      color: #f7f6f2;
      font-family: 'Outfit', Georgia, serif;
      font-style: italic;
      margin: 0 0 1rem;
    }
    .god-signature {
      font-size: 0.85rem;
      color: #ffd685;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
    }
    .god-btn {
      width: 100%;
      background: linear-gradient(135deg, #f3b248 0%, #e09927 100%);
      color: #0c051a;
      border: none;
      font-size: 1.05rem;
      font-weight: 800;
      border-radius: 1.25rem;
      padding: 1rem;
      cursor: pointer;
      box-shadow: 0 0.75rem 2rem rgba(243, 178, 72, 0.25);
      transition: all 0.3s cubic-bezier(0.2, 1, 0.2, 1);
      letter-spacing: 0.02em;
    }
    .god-btn:hover {
      transform: translateY(-0.125rem);
      box-shadow: 0 1rem 2.5rem rgba(243, 178, 72, 0.4);
      background: linear-gradient(135deg, #ffe9c4 0%, #f3b248 100%);
    }
    .god-btn:active {
      transform: translateY(0);
    }
    .gold-sparkle {
      position: absolute;
      bottom: -10px;
      background: radial-gradient(circle, #ffe9a6 0%, #f3b248 80%, transparent 100%);
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 8px #f3b248;
      animation: floatSparkle 3s ease-in-out infinite;
    }
    @keyframes floatSparkle {
      0% {
        transform: translateY(0) scale(1) rotate(0deg);
        opacity: 0;
      }
      20% {
        opacity: 0.8;
      }
      80% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-280px) scale(0) rotate(360deg);
        opacity: 0;
      }
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
      <div class="lock-page-noise"></div>
      <div class="lock-glow-orb orb-1"></div>
      <div class="lock-glow-orb orb-2"></div>
      
      <!-- iOS style Daily wish notification pill -->
      <div class="ios-notification" id="wish-notification">
        <div class="noti-icon">
          <div class="noti-badge"></div>
          <svg class="noti-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div class="noti-content">
          <div class="noti-title">Santhosh Raj sent a message</div>
          <div class="noti-message" id="notification-text">Day ${daysUnlockedCount}/113 wishes unlocked! Tap to read.</div>
        </div>
        <svg class="noti-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

      <div class="lock-content">
        <div class="lock-logo">
          <svg viewBox="0 0 42 28" aria-hidden="true" style="width: 2rem; height: auto;">
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <h3 class="lock-modal-title">Enter Wishes Passkey</h3>
          <p class="lock-modal-subtitle" id="login-modal-subtitle">Enter the secret passkey to access daily wishes.</p>
        </div>
        <div class="login-modal-body">
          <input type="password" class="passkey-input" id="passkey-input" placeholder="••••••" maxlength="8" />
          <button class="login-btn" id="login-submit-btn">Unlock Wishes</button>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <h3 class="lock-modal-title">Daily Wishes</h3>
          <p class="lock-modal-subtitle" id="wishes-modal-subtitle">A new language wish unlocks daily (Day ${daysUnlockedCount}/113)</p>
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

    // Helper to check if wishes session is still valid (not expired after 30 mins)
    function checkWishesAuthorization() {
      if (sessionStorage.getItem('nilagravity-wishes-authorized') !== 'true') {
        return false;
      }
      const loginTime = sessionStorage.getItem('nilagravity-wishes-login-time');
      if (!loginTime) {
        return false;
      }
      const elapsed = Date.now() - parseInt(loginTime, 10);
      if (elapsed >= sessionExpiryMs) {
        sessionStorage.removeItem('nilagravity-wishes-authorized');
        sessionStorage.removeItem('nilagravity-wishes-login-time');
        return false;
      }
      return true;
    }

    // Periodically checks if the session has expired and auto-logs out
    function checkSessionExpiry() {
      if (sessionStorage.getItem('nilagravity-wishes-authorized') === 'true') {
        const loginTime = sessionStorage.getItem('nilagravity-wishes-login-time');
        if (loginTime) {
          const elapsed = Date.now() - parseInt(loginTime, 10);
          if (elapsed >= sessionExpiryMs) {
            sessionStorage.removeItem('nilagravity-wishes-authorized');
            sessionStorage.removeItem('nilagravity-wishes-login-time');

            // Force close the wishes modal if it was open
            if (wishesModal && wishesModal.classList.contains('open')) {
              wishesModal.classList.remove('open');
            }

            // Update login modal subtitle to inform the user
            const loginSubtitle = document.getElementById('login-modal-subtitle');
            if (loginSubtitle) {
              loginSubtitle.textContent = 'Session expired. Please enter passkey again.';
              loginSubtitle.style.color = '#ff6f6c';
            }
            loginModal.classList.add('open');
            passkeyInput.focus();
          }
        }
      }
    }

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

      // Auto-expire wishes session if active
      checkSessionExpiry();
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
      lockTitle.textContent = 'Advanced Happy Birthday Indhu! 🌟';
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
      if (checkWishesAuthorization()) {
        openWishesModal();
      } else {
        const loginSubtitle = document.getElementById('login-modal-subtitle');
        if (loginSubtitle) {
          loginSubtitle.textContent = 'Enter the secret passkey to access daily wishes.';
          loginSubtitle.style.color = '';
        }
        loginModal.classList.add('open');
        passkeyInput.focus();
      }
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
        loginSubmit.textContent = 'Access Granted!';

        // Trigger email notification
        try {
          const currentTime = new Date().toString();
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
          fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              time: currentTime,
              timezone: tz
            })
          }).catch(err => console.error('Failed to notify login:', err));
        } catch (e) {
          console.error('Error constructing notification payload:', e);
        }

        setTimeout(() => {
          loginModal.classList.remove('open');

          // Reset form state for next potential trigger
          passkeyInput.disabled = false;
          loginSubmit.disabled = false;
          loginSubmit.textContent = 'Unlock Wishes';
          passkeyInput.value = '';
          passkeyInput.classList.remove('input-success');

          // Authorize session to read wishes and store login time
          sessionStorage.setItem('nilagravity-wishes-authorized', 'true');
          sessionStorage.setItem('nilagravity-wishes-login-time', Date.now().toString());

          // Open the wishes modal directly
          openWishesModal();
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
    function openWishesModal() {
      // Build scrollable list of wishes unlocked up to today
      let scrollHtml = '';
      for (let i = daysUnlockedCount - 1; i >= 0; i--) {
        const w = wishes[i];
        if (!w) continue;
        const isLatest = (i === daysUnlockedCount - 1);
        scrollHtml += `
          <div class="wish-card ${isLatest ? 'latest' : ''}" data-day-index="${i + 1}" style="cursor: pointer;">
            <div class="wish-meta">
              <span class="wish-day-badge">Day ${i + 1}</span>
              <span class="wish-lang-label">${w.lang}</span>
            </div>
            <div class="wish-text-val">${w.wish}</div>
          </div>
        `;
      }

      wishesBody.innerHTML = scrollHtml;
      wishesModal.classList.add('open');
    }

    // Event delegation on wishes list clicks to show God's blessing
    wishesBody.addEventListener('click', (e) => {
      const card = e.target.closest('.wish-card');
      if (card) {
        const dayIdx = parseInt(card.getAttribute('data-day-index'), 10);
        if (!isNaN(dayIdx)) {
          showGodBlessing(dayIdx);
        }
      }
    });

    notificationPill.addEventListener('click', () => {
      if (checkWishesAuthorization()) {
        openWishesModal();
      } else {
        const loginSubtitle = document.getElementById('login-modal-subtitle');
        if (loginSubtitle) {
          loginSubtitle.textContent = 'Enter the secret passkey to access daily wishes.';
          loginSubtitle.style.color = '';
        }
        loginModal.classList.add('open');
        passkeyInput.focus();
      }
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

      const palette = [
        [47, 111, 255],   // blue
        [91, 121, 255],   // medium blue
        [115, 92, 255],   // violet
        [255, 97, 109],   // red
        [243, 178, 72],   // gold
        [117, 132, 165]   // slate
      ];

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
        const scaleFactor = width >= 1720 ? (width / 1720) : 1;
        const starCount = Math.max(60, Math.min(180, Math.floor((width * height) / 9500)));
        for (let i = 0; i < starCount; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: (Math.random() * 1.5 + 0.5) * scaleFactor,
            speed: (Math.random() * 0.04 + 0.015) * scaleFactor,
            angle: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.015 + 0.005,
            glow: Math.random() > 0.8,
            color: palette[Math.floor(Math.random() * palette.length)]
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
          ctx.fillStyle = `rgba(${s.color[0]}, ${s.color[1]}, ${s.color[2]}, ${Math.max(0.08, alpha * 0.65)})`;
          ctx.fill();

          if (s.glow) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.color[0]}, ${s.color[1]}, ${s.color[2]}, ${Math.max(0.01, alpha * 0.12)})`;
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
