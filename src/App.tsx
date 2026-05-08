import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Baby, 
  Utensils, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Apple,
  MapPin,
  MessageCircleHeart
} from 'lucide-react';
import { quizData } from './data/quizData';

type QuizState = 'landing' | 'quiz' | 'result';

export default function App() {
  const [gameState, setGameState] = useState<QuizState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  useEffect(() => {
    // Track ViewContent on load
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'ViewContent');
    }
  }, []);

  const handleWaClick = () => {
    if (typeof (window as any).fbq === 'function') {
      // Track standard Lead event and Custom Conversion event
      (window as any).fbq('track', 'Lead');
      (window as any).fbq('trackCustom', 'Lead WA');
    }
  };

  const startQuiz = () => {
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(index);
    setIsAnswerRevealed(true);
    // Score doesn't really matter in this diagnostic version, 
    // but we can increment it to track completion if we want.
    setScore(score + 1);
  };

  const nextQuestion = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      setGameState('result');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-10 animate-bounce pointer-events-none">
        <Heart size={80} fill="currentColor" className="text-brand-peach" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 animate-pulse pointer-events-none">
        <Baby size={100} className="text-brand-apricot" />
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-card max-w-2xl w-full p-8 md:p-12 text-center"
          >
            <div className="inline-flex items-center justify-center p-4 bg-brand-rose/30 rounded-full mb-6">
              <MessageCircleHeart className="text-brand-peach w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Bunda Cerdas MPASI
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Hai Bun! Si Kecil lagi GTM (Gerakan Tutup Mulut)? Jangan panik ya! <br className="hidden md:block" />
              Ceritakan kegelisahan Bunda melalui kuis singkat ini dan dapatkan solusinya!
            </p>
            <div className="flex flex-col gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startQuiz} 
                className="primary-btn !bg-[#E67E5D] text-xl inline-flex items-center justify-center gap-3 cursor-pointer py-6 group relative overflow-hidden"
              >
                <span className="relative z-10">Mulai Curhat & Cari Solusi</span>
                <ChevronRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white"
                />
              </motion.button>
              <p className="text-sm text-slate-400 mt-4 flex items-center justify-center gap-2">
                <Heart size={16} fill="currentColor" className="text-brand-rose" /> 
                Dibuat khusus untuk Bunda tangguh!
              </p>
            </div>
          </motion.div>
        )}

        {gameState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-brand-peach font-bold text-lg">
                  Tahap {currentQuestionIndex + 1} <span className="font-normal text-slate-400">/ {quizData.length}</span>
                </span>
                <span className="text-slate-400 font-medium">{Math.round(progress)}% Selesai</span>
              </div>
              <div className="h-3 w-full bg-brand-rose/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-brand-peach rounded-full"
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="glass-card p-6 md:p-10 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 leading-snug">
                {currentQuestion.question}
              </h2>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  let statusClass = "";
                  if (isAnswerRevealed) {
                    if (index === selectedOption) statusClass = "option-btn-selected shadow-inner bg-brand-rose/10";
                  } else if (selectedOption === index) {
                    statusClass = "option-btn-selected";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswerRevealed}
                      className={`option-btn ${statusClass} cursor-pointer`}
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-mint border-2 border-brand-rose flex items-center justify-center font-bold text-brand-peach">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-lg font-medium">{option}</span>
                      {isAnswerRevealed && index === selectedOption && (
                        <CheckCircle2 className="ml-auto text-brand-peach flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation & Next */}
            <AnimatePresence>
              {isAnswerRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="glass-card p-6 border-brand-mint border-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-brand-mint rounded-2xl">
                        <MessageCircleHeart className="text-brand-peach" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1 text-lg italic">"Pesan Cinta untuk Bunda:"</h4>
                        <p className="text-slate-600 leading-relaxed italic">
                          {selectedOption !== null && currentQuestion.explanations[selectedOption]}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button onClick={nextQuestion} className="primary-btn w-full text-xl py-5 shadow-xl cursor-pointer">
                    {currentQuestionIndex === quizData.length - 1 ? 'Lihat Hasil & Solusi' : 'Lanjut ke Tahap Berikutnya'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {gameState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card max-w-3xl w-full p-8 md:p-12 text-center"
          >
            <div className="relative inline-block mb-6">
               <div className="absolute -inset-4 bg-brand-rose/30 blur-2xl rounded-full" />
               <div className="relative bg-white rounded-full p-6 shadow-xl border-4 border-brand-apricot">
                  <Heart className="w-16 h-16 text-brand-peach animate-pulse fill-brand-peach" />
               </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 px-4">
              Bunda... Tarik Napas Dulu... <br/> Kamu Ibu yang Hebat! ❤️
            </h2>
            
            <div className="text-left space-y-6 mb-10 text-slate-700 leading-relaxed">
              <p className="bg-brand-mint/30 p-6 rounded-3xl border-2 border-brand-mint italic">
                "Dari jawaban Bunda, kami tahu betul bahwa menghadapi anak GTM itu sangat menguras fisik dan emosi. 
                Perasaan sedih, khawatir BB anak seret, hingga takut nutrisinya tidak tercukupi adalah hal yang sangat wajar. 
                Bunda tidak sendirian, dan Bunda berhak mendapatkan bantuan yang tepat."
              </p>

              <p>
                GTM sering kali terjadi karena anak bosan, tumbuh gigi, atau butuh eksplorasi rasa baru yang enak namun tetap padat gizi. 
                Jangan biarkan stres ini berlarut-larut ya, Bun!
              </p>

              <div className="glass-card p-6 border-brand-apricot border-2 bg-brand-cream/50 overflow-hidden">
                <h3 className="text-xl font-bold text-brand-peach flex items-center gap-2 mb-4">
                  <Sparkles size={24} /> Kami Punya Solusi Tepat:
                </h3>
                
                <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <img 
                    src="https://alunna.id/wp-content/uploads/2026/04/selai-kurma-variant.webp" 
                    alt="Selai Kurma Alunna Variant" 
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <p className="mb-4">
                  Kenalkan, <strong>Selai Kurma MPASI dari Alunna!</strong> Terbuat dari bahan alami yang manisnya pas, lezat, dan bernutrisi tinggi untuk bantu boost nafsu makan dan lengkapi gizi si Kecil.
                </p>
                
                <div className="bg-white p-6 rounded-2xl border-l-4 border-brand-peach shadow-sm">
                  <h4 className="font-bold text-brand-peach mb-2 uppercase text-sm tracking-wide">🎁 SPESIAL UNTUK BUNDA HARI INI:</h4>
                  <p className="mb-4 text-sm md:text-base">
                    Berhenti tebak-tebakan sendiri! Dapatkan <strong>KONSULTASI GRATIS</strong> bersama Spesialis Gizi Kami sekarang juga. 
                  </p>
                  <motion.a 
                    onClick={handleWaClick}
                    animate={{ rotate: [-1.5, 1.5, -1.5], scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    href="https://wa.me/6282323360606?text=Halo%20Alunna,%20saya%20mau%20konsultasi%20gratis%20soal%20GTM%20si%20kecil" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold p-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 no-underline leading-tight"
                  >
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    <span className="text-left text-sm md:text-base">
                      CHAT WA <br/> KLAIM KONSULTASI GRATIS
                    </span>
                  </motion.a>
                </div>
              </div>

              <div className="bg-brand-rose/20 p-6 rounded-3xl border-2 border-brand-rose/30">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <Utensils size={20} className="text-brand-peach" /> Mampir ke Booth Kami, Bun!
                </h3>
                <div className="space-y-4">
                  <div className="text-sm md:text-base space-y-1">
                    <p>📍 <strong>IKEA Garden City, Jakarta Timur</strong></p>
                    <p>📅 <strong>Hanya Sampai 28 Mei</strong></p>
                  </div>
                  
                  <motion.a 
                    animate={{ rotate: [1.5, -1.5, 1.5], scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    href="https://www.google.com/maps/place/IKEA+Jakarta+Garden+City/@-6.1710064,106.9532439,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698b4589e3470f:0x1b65d1f70f636ba3!8m2!3d-6.1710064!4d106.9532439!16s%2Fg%2F11mvlq08tz?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 bg-emerald-800 hover:bg-emerald-900 hover:scale-[1.02] text-white font-bold py-4 rounded-2xl no-underline transition-all shadow-md active:scale-95 group"
                  >
                    <MapPin size={22} className="group-hover:animate-bounce transition-all" /> 
                    <span>Lihat Rute di Google Maps</span>
                  </motion.a>

                  <p className="text-xs text-slate-500 italic">
                    Yuk Bun, cobain rasa Selai Kurma Alunna yang kid-approved!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 text-slate-400 text-sm font-medium text-center pb-8">
        &copy; 2026 Alunna MPASI • Mitra Bunda Menghadapi GTM <br/>
        Dibuat dengan Cinta untuk Bunda Indonesia
      </footer>
    </div>
  );
}
