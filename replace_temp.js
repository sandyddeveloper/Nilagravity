const fs = require('fs');
const path = require('path');

const replacements = {
  "Nila": "Indhu",
  "Нила": "Индху",
  "ニラ": "インドゥ",
  "니라": "인두",
  "नीला": "इन्धु",
  "निला": "इन्धु",
  "நிலா": "இந்து",
  "నిలా": "ఇందు",
  "ನಿಲಾ": "ಇಂಧು",
  "നിലാ": "ഇന്ദു",
  "নীলা": "ইন্দু",
  "નીલા": "ઈન્દુ",
  "ਨੀਲਾ": "ਇੰਧੂ",
  "نيلا": "إندهو",
  "נילה": "אינדהו",
  "Νίλα": "Ίντχου",
  "ནི་ལ།": "ཨིན་དྷུ།",
  "នីឡា": "អ៊ិនធូ",
  "ນີລາ": "ອິນທູ",
  "නිලා": "ඉන්දු",
  "Sandy sent a message": "Santhosh Raj sent a message"
};

// Files to update
const files = [
  'src/lock.js',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Apply all replacements
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, value);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated: ${file}`);
  } else {
    console.log(`No changes made to: ${file}`);
  }
});
