export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanations: string[];
}

export const quizData: Question[] = [
  {
    id: 1,
    question: "Saat si Kecil mulai tutup mulut rapat-rapat (GTM) dan menyemburkan makanannya, apa yang paling sering Bunda rasakan?",
    options: [
      "Pusing, sedih, dan rasanya pengen nangis bareng saking frustrasinya.",
      "Coba tarik napas panjang, walau jujur dada rasanya deg-degan takut nutrisinya kurang.",
      "Langsung putar otak mikirin menu baru lagi supaya anak mau mangap."
    ],
    correctAnswer: -1,
    explanations: [
      "Peluk jauh untuk Bunda! Wajar banget kalau Bunda pengen nangis. Menghadapi GTM itu emang ujian kesabaran yang luar biasa. Bunda nggak sendirian kok.",
      "Keren banget Bunda bisa tetap tenang! Walau dalam hati khawatir, ketenangan Bunda bakal bikin si Kecil nggak makin stres saat jam makan.",
      "Salut sama semangat Bunda yang nggak gampang menyerah! Kreativitas Bunda adalah bukti cinta yang luar biasa buat si Kecil."
    ]
  },
  {
    id: 2,
    question: "Jujur Bun, seberapa banyak waktu dan energi yang terkuras hanya untuk membujuk si Kecil makan setiap harinya?",
    options: [
      "Lebih dari 1 jam per sesi makan! Berasa kayak lagi 'perang batin' setiap hari.",
      "Sekitar 30 menitan, tapi cukup bikin mood berantakan seharian.",
      "Nggak nentu, kadang cepat, tapi kalau lagi kumat GTM-nya bisa bikin kehabisan akal."
    ],
    correctAnswer: -1,
    explanations: [
      "MasyaAllah, perjuangan Bunda luar biasa! 1 jam itu waktu yang sangat panjang untuk sebuah 'pertempuran'. Bunda butuh cara yang lebih praktis nih.",
      "Waktu 30 menit kalau penuh 'drama' emang rasanya bisa bikin lelah lahir batin ya, Bun. Tetap semangat, kita cari solusinya bareng-bareng.",
      "Dinamika GTM emang kayak roller coaster ya, Bun. Kadang mulus, kadang bikin pusing. Bunda hebat sudah bisa bertahan sejauh ini!"
    ]
  },
  {
    id: 3,
    question: "Apa kekhawatiran terbesar Bunda kalau fase GTM si Kecil ini nggak kunjung selesai?",
    options: [
      "Berat Badannya (BB) jadi seret, makin kurus, dan takut stunting.",
      "Imun tubuhnya turun, anak jadi gampang sakit karena kurang gizi.",
      "Stres dengerin komentar orang sekitar (atau mertua) yang bilang anak kurang diurus."
    ],
    correctAnswer: -1,
    explanations: [
      "BB seret emang momok setiap Bunda. Fokus kita sekarang adalah gimana caranya nutrisi yang masuk sedikit tapi bisa 'nendang' dan berkualitas.",
      "Menjaga daya tahan tubuh si Kecil emang krusial banget di masa pertumbuhannya. Nutrisi yang tepat adalah kunci benteng pertahanannya.",
      "Abaikan suara sumbang di luar sana ya, Bun. Bunda yang paling tahu kondisi si Kecil. Kita fokus yuk ke solusi yang benar-benar membantu."
    ]
  },
  {
    id: 4,
    question: "Selama ini, apa yang sudah Bunda coba untuk mengatasi GTM dan bantu boost nutrisi si Kecil?",
    options: [
      "Udah beli banyak vitamin/penambah nafsu makan, tapi banyak yang zonk and anak nggak suka rasanya.",
      "Belum berani sembarangan kasih suplemen, takut kandungannya nggak alami and bahaya buat anak.",
      "Cuma bisa masak menu double protein walau ujung-ujungnya sering dilepeh juga."
    ],
    correctAnswer: -1,
    explanations: [
      "Capek juga ya Bun udah keluar biaya tapi hasilnya nihil. Mungkin si Kecil butuh rasa yang benar-benar alami dan dia suka.",
      "Prinsip Bunda jempolan! Memilih yang alami adalah investasi jangka panjang untuk kesehatan si Kecil. Bunda teliti banget.",
      "Memasak menu spesial itu butuh waktu dan tenaga extra. Sedih rasanya kalau dilepeh, tapi perjuangan Bunda nggak akan sia-sia."
    ]
  },
  {
    id: 5,
    question: "Kalau ada solusi booster nutrisi alami yang rasanya disukai anak, PLUS Bunda bisa curhat langsung ke Ahli Gizi secara GRATIS, apa reaksi Bunda?",
    options: [
      "MAU BANGET! Butuh pencerahan dari ahlinya sekarang juga biar nggak stres sendirian.",
      "Boleh banget, apalagi kalau bisa sekalian cobain langsung produknya sebelum beli.",
      "Penasaran banget, pengen tau kandungannya se-aman dan se-enak apa buat si Kecil."
    ],
    correctAnswer: -1,
    explanations: [
      "Pilihan tepat! Curhat ke ahlinya bakal kasih Bunda strategi yang terukur buat hadapi GTM. Bunda siap buat perubahan!",
      "Setuju Bun! Mencoba langsung itu paling afdol biar Bunda yakin si Kecil doyan atau nggak sebelum memutuskan.",
      "Sikap kritis Bunda itu bagus banget. Mengetahui setiap detail kandungan adalah hak Bunda sebagai pelindung si Kecil."
    ]
  }
];
