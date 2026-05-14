import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Save, ArrowLeft, Loader2, ShieldCheck, Trophy, Star, Quote, Lock, User as UserIcon, Eye, EyeOff,
  LayoutDashboard, Utensils, Dumbbell, Bell, Settings as SettingsIcon, LogOut, Menu, X, Flame, TrendingUp, Zap, Clock, Calendar, 
  Plus, Search, BookOpen, Pizza, ArrowRight, Home, Sparkles, Brain, Wand2,
  Leaf, AlertCircle, Coins, UserCircle, Globe, ShieldAlert, FileText, Fingerprint
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart, Area, XAxis, CartesianGrid, Tooltip, BarChart, Bar
} from 'recharts';

// --- Types ---
type Gender = 'male' | 'female';
type Goal = 'maintain' | 'bulk' | 'cut';
type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;
type View = 'landing' | 'setup' | 'processing' | 'dashboard' | 'piano_c' | 'workouts' | 'settings' | 'privacy' | 'cookies' | 'terms';
type DietType = 'omnivore' | 'vegan' | 'vegetarian' | 'keto';
type Language = 'it' | 'fr' | 'en';

// --- Translations ---
const T = {
  it: {
    heroTitle: "Nutri il tuo Corpo, Trasforma la tua Vita",
    heroSub: "Scopri un approccio equilibrato e sereno alla salute. SmartEat .Space usa principi scientifici avanzati per creare un piano nutrizionale su misura.",
    startFree: "Inizia Gratis",
    calcPlan: "Calcola il tuo Piano",
    trustedBy: "Scelto dai Professionisti",
    expertSub: "Atleti d'élite e professionisti della salute si affidano a SmartEat .Space.",
    sidebarHome: "Vai alla Home",
    sidebarDash: "Dashboard",
    sidebarMacros: "Macro",
    sidebarWorkouts: "Allenamenti",
    sidebarMagazine: "Magazine",
    sidebarSettings: "Impostazioni",
    sidebarLogout: "Esci",
    setupIdentity: "Identità",
    setupBiometrics: "Biometria",
    setupDiet: "Dieta & Salute",
    setupBudget: "Budget Mensile",
    setupStrategy: "Strategia",
    next: "AVANTI",
    back: "INDIETRO",
    finalize: "FINALIZZA E ENTRA",
    gender: "Genere",
    age: "Età",
    weight: "Peso (KG)",
    height: "Altezza (CM)",
    allergies: "Allergie / Intolleranze",
    sugarFree: "Senza Zucchero",
    budgetSub: "Investimento mensile per i tuoi allenamenti",
    strategySub: "Obiettivo finale",
    dashTitle: "Analisi Bio di Oggi",
    dashSub: "I tuoi dati personalizzati per uno stato metabolico sereno.",
    targetIntake: "Obiettivo Calorie",
    protein: "Proteine",
    carbs: "Carboidrati",
    fats: "Grassi",
    remaining: "RIMANENTI",
    eaten: "Mangiati",
    burned: "Bruciati",
    aiEngine: "Motore Pasti AI",
    mealSug: "Suggerimenti Pasti",
    mealSugSub: "Generazione automatica di una giornata tipo.",
    weeklyPlan: "Piani Settimanali AI",
    weeklyPlanSub: "Generazione di interi menù da 7 giorni.",
    training: "Allenamento",
    coaches: "I tuoi Coach Dedicati",
    volume: "Volume di Allenamento",
    intensity: "Punteggio Intensità",
    preFuel: "Carburante Pre-Workout",
    settingsTitle: "Impostazioni Sistema",
    settingsSub: "Gestisci il tuo profilo biometrico e le preferenze.",
    profileInfo: "Informazioni Profilo",
    dietStrat: "Strategia Alimentare",
    resetData: "Reset Dati Locali",
    lang: "Lingua",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    terms: "Termini e Condizioni",
    cookieMsg: "Usiamo i cookie per migliorare la tua esperienza su SmartEat .Space.",
    accept: "Accetta tutto",
    decline: "Rifiuta",
    legalIntro: "Ultimo aggiornamento: Maggio 2024. La tua privacy è la nostra priorità."
  },
  fr: {
    heroTitle: "Nourrissez votre Corps, Transformez votre Vie",
    heroSub: "Découvrez une approche équilibrée et sereine de la santé. SmartEat .Space utilise des principes scientifiques avancés pour un plan nutritionnel sur mesure.",
    startFree: "Commencer Gratuitement",
    calcPlan: "Calculer votre Plan",
    trustedBy: "Approuvé par les Professionnels",
    expertSub: "Les athlètes d'élite et les professionnels de la santé font confiance à SmartEat .Space.",
    sidebarHome: "Accueil",
    sidebarDash: "Tableau de Bord",
    sidebarMacros: "Macros",
    sidebarWorkouts: "Entraînements",
    sidebarMagazine: "Magazine",
    sidebarSettings: "Paramètres",
    sidebarLogout: "Déconnexion",
    00: "Identité",
    102: "Biométrie",
    103: "Diète & Santé",
    104: "Budget Mensuel",
    105: "Stratégie",
    106: "SUIVANT",
    107: "RETOUR",
    108: "FINALISER ET ENTRER",
    109: "Genre",
    110: "Âge",
    111: "Poids (KG)",
    112: "Taille (CM)",
    113: "Allergies / Intolérances",
    114: "Sans Sucre",
    115: "Budget Mensuel pour vos entraînements",
    116: "Objectif final",
    117: "Analyse Bio d'Aujourd'hui",
    118: "Vos données personnalisées pour un état métabolique serein.",
    119: "Objectif Calories",
    120: "Protéines",
    121: "Glucides",
    122: "Lipides",
    123: "RESTANTS",
    124: "Mangés",
    125: "Brûlés",
    126: "Moteur de Repas IA",
    127: "Suggestions de Repas",
    128: "Génération automatique d'une journée type.",
    129: "Plans Hebdomadaires IA",
    130: "Génération de menus complets de 7 jours.",
    131: "Entraînement",
    132: "Vos Coachs Dédiés",
    133: "Volume d'Entraînement",
    134: "Score d'Intensité",
    135: "Carburant Pré-Entraînement",
    136: "Paramètres Système",
    137: "Gérez votre profil biométrique et vos préférences.",
    138: "Informations Profil",
    139: "Stratégie Alimentaire",
    140: "Réinitialiser les Données",
    141: "Langue",
    142: "Politique de Confidentialité",
    143: "Politique de Cookies",
    144: "Termes et Conditions",
    145: "Nous utilisons des cookies pour améliorer votre expérience sur SmartEat .Space.",
    146: "Tout Accepter",
    147: "Refuser",
    148: "Dernière mise à jour : Mai 2024. Votre vie privée est notre priorité."
  },
  en: {
    heroTitle: "Fuel Your Body, Transform Your Life",
    heroSub: "Discover a balanced, calm approach to health. SmartEat .Space uses advanced scientific principles to tailor a nutrition plan that fits your life.",
    startFree: "Start Free",
    calcPlan: "Calculate Your Plan",
    trustedBy: "Trusted by Professionals",
    expertSub: "Top-tier athletes and health professionals rely on SmartEat .Space.",
    sidebarHome: "Go to Home",
    sidebarDash: "Dashboard",
    sidebarMacros: "Macros",
    sidebarWorkouts: "Workouts",
    sidebarMagazine: "Magazine",
    sidebarSettings: "Settings",
    sidebarLogout: "Logout",
    164: "Identity",
    165: "Biometrics",
    166: "Diet & Health",
    167: "Monthly Budget",
    168: "Strategy",
    169: "NEXT",
    170: "BACK",
    171: "FINALIZE AND ENTER",
    172: "Gender",
    173: "Age",
    174: "Weight (KG)",
    175: "Height (CM)",
    176: "Allergies / Intolerances",
    177: "Sugar-Free",
    178: "Monthly fuel investment for your workouts",
    179: "Ultimate objective",
    180: "Today's Bio-Analysis",
    181: "Your personalized data for a serene metabolic state.",
    182: "Target Intake",
    183: "Proteins",
    184: "Carbohydrates",
    185: "Fats",
    186: "REMAINING",
    187: "Eaten",
    188: "Burned",
    189: "AI Meal Engine",
    190: "Meal Suggestions",
    191: "Automatic generation of a typical day.",
    192: "AI Weekly Plans",
    193: "Generation of entire 7-day menus.",
    194: "Training",
    195: "Your Dedicated Coaches",
    196: "Training Volume",
    197: "Intensity Score",
    198: "Pre-Workout Fuel",
    199: "System Settings",
    200: "Manage your biometric profile and preferences.",
    201: "Profile Information",
    202: "Dietary Strategy",
    203: "Reset Local Data",
    204: "Language",
    205: "Privacy Policy",
    206: "Cookie Policy",
    207: "Terms and Conditions",
    208: "We use cookies to enhance your experience on SmartEat .Space.",
    209: "Accept All",
    210: "Decline",
    211: "Last updated: May 2024. Your privacy is our priority."
  }
};

// --- Constants ---
const EXPERTS = [
  { 
    name: "Coach Ng", 
    role: "Performance Scientist", 
    image: "/coach_ng_v2.png", 
    quotes: { 
      it: "L'integrazione tra bio-metrica e nutrizione è il futuro dell'atleta d'élite.", 
      fr: "L'intégration entre biométrie et nutrition est l'avenir de l'athlète d'élite.", 
      en: "The integration between biometrics and nutrition is the future of the elite athlete." 
    } 
  },
  { 
    name: "Roberto Rubinelli", 
    role: "Elite Nutritionist", 
    image: "/roberto_v2.png", 
    quotes: { 
      it: "Il cibo è l'informazione che diamo al nostro DNA. Ottimizzalo.", 
      fr: "La nourriture est l'information que nous donnons à notre ADN. Optimisez-la.", 
      en: "Food is the information we give to our DNA. Optimize it." 
    } 
  }
];

const WEEKLY_DATA = [
  { day: 'M', val: 65 }, { day: 'T', val: 80 }, { day: 'W', val: 95 },
  { day: 'T', val: 110 }, { day: 'F', val: 125 }, { day: 'S', val: 85 }, { day: 'S', val: 60 }
];

const TRAINING_DATA = [
  { day: 'M', val: 4500 }, { day: 'T', val: 5200 }, { day: 'W', val: 6100 },
  { day: 'T', val: 4800 }, { day: 'F', val: 8500 }, { day: 'S', val: 3200 }, { day: 'S', val: 2100 }
];

// --- Logic ---
const calculateCalories = (gender: Gender, weight: number, height: number, age: number, activity: ActivityLevel, goal: Goal) => {
  const w = weight || 75; const h = height || 180; const a = age || 25;
  const bmr = gender === 'male' ? (10 * w) + (6.25 * h) - (5 * a) + 5 : (10 * w) + (6.25 * h) - (5 * a) - 161;
  const tdee = bmr * activity;
  let target = tdee;
  if (goal === 'bulk') target += 300;
  if (goal === 'cut') target -= 500;
  return { bmr: Math.round(bmr), tdee: Math.round(tdee), total: Math.round(target), protein: Math.round((target * 0.3) / 4), carbs: Math.round((target * 0.4) / 4), fats: Math.round((target * 0.3) / 9) };
};

const App = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('se_lang') as Language) || 'it');
  const [view, setView] = useState<View>(() => (localStorage.getItem('se_view') as View) || 'landing');
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<Gender>(() => (localStorage.getItem('se_gender') as Gender) || 'male');
  const [weight, setWeight] = useState(() => Number(localStorage.getItem('se_weight')) || 75);
  const [height, setHeight] = useState(() => Number(localStorage.getItem('se_height')) || 180);
  const [age, setAge] = useState(() => Number(localStorage.getItem('se_age')) || 25);
  const [activity] = useState<ActivityLevel>(() => Number(localStorage.getItem('se_activity')) as ActivityLevel || 1.2);
  const [goal, setGoal] = useState<Goal>(() => (localStorage.getItem('se_goal') as Goal) || 'maintain');
  const [diet, setDiet] = useState<DietType>(() => (localStorage.getItem('se_diet') as DietType) || 'omnivore');
  const [allergies, setAllergies] = useState(() => localStorage.getItem('se_allergies') || '');
  const [noSugar, setNoSugar] = useState(() => localStorage.getItem('se_nosugar') === 'true');
  const [budget, setBudget] = useState(() => Number(localStorage.getItem('se_budget')) || 300);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(() => localStorage.getItem('se_cookies_accepted') !== 'true');

  const results = useMemo(() => calculateCalories(gender, weight, height, age, activity, goal), [gender, weight, height, age, activity, goal]);

  const t = (key: any) => {
     if (!T[lang]) return T['en'][key] || key;
     return T[lang][key] || T['en'][key] || key;
  };

  useEffect(() => {
    localStorage.setItem('se_lang', lang);
    localStorage.setItem('se_gender', gender);
    localStorage.setItem('se_weight', weight.toString());
    localStorage.setItem('se_height', height.toString());
    localStorage.setItem('se_age', age.toString());
    localStorage.setItem('se_activity', activity.toString());
    localStorage.setItem('se_goal', goal);
    localStorage.setItem('se_diet', diet);
    localStorage.setItem('se_allergies', allergies);
    localStorage.setItem('se_nosugar', noSugar.toString());
    localStorage.setItem('se_budget', budget.toString());
    localStorage.setItem('se_view', view);
  }, [lang, gender, weight, height, age, activity, goal, diet, allergies, noSugar, budget, view]);

  useEffect(() => {
    if (view === 'processing') {
      const timer = setTimeout(() => setView('dashboard'), 1500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const acceptCookies = () => {
    localStorage.setItem('se_cookies_accepted', 'true');
    setShowCookieBanner(false);
  };

  const TopNav = ({ current }: { current: View }) => (
    <motion.nav 
      initial={false}
      animate={{ height: isSidebarOpen ? 'auto' : '80px' }}
      className="fixed top-0 left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 z-50 overflow-hidden shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => setView('landing')} className="bg-red-800 text-white p-2 px-4 rounded-xl font-outfit font-bold text-lg italic tracking-tighter shadow-lg shadow-red-900/20">
          SmartEat .Space
        </button>

        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">System Live</span>
           </div>
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
             className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSidebarOpen ? 'bg-red-800 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
           >
             {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
           </button>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="max-w-7xl mx-auto px-6 pb-12 pt-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <NavItem icon={<Home size={20} />} label={t('sidebarHome')} active={false} onClick={() => { setView('landing'); setIsSidebarOpen(false); }} />
              <NavItem icon={<LayoutDashboard size={20} />} label={t('sidebarDash')} active={current === 'dashboard'} onClick={() => { setView('dashboard'); setIsSidebarOpen(false); }} />
              <NavItem icon={<Utensils size={20} />} label={t('sidebarMacros')} active={current === 'piano_c'} onClick={() => { setView('piano_c'); setIsSidebarOpen(false); }} connected />
              <NavItem icon={<Dumbbell size={20} />} label={t('sidebarWorkouts')} active={current === 'workouts'} onClick={() => { setView('workouts'); setIsSidebarOpen(false); }} connected />
              <NavItem icon={<BookOpen size={20} />} label={t('sidebarMagazine')} active={false} onClick={() => setIsSidebarOpen(false)} connected />
              <NavItem icon={<SettingsIcon size={20} />} label={t('sidebarSettings')} active={current === 'settings'} onClick={() => { setView('settings'); setIsSidebarOpen(false); }} />
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl w-full md:w-64">
                  {['it', 'fr', 'en'].map(l => (
                     <button key={l} onClick={() => setLang(l as Language)} className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-red-800 text-white shadow-lg' : 'hover:bg-white/10 text-white/20'}`}>{l}</button>
                  ))}
               </div>
               <button onClick={() => { setView('landing'); setIsSidebarOpen(false); }} className="flex items-center gap-3 text-white/30 hover:text-red-800 transition-all font-bold text-sm uppercase tracking-widest">
                  <LogOut size={20} /> {t('sidebarLogout')}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  const NavItem = ({ icon, label, active, onClick, connected }: any) => (
    <button 
      onClick={onClick} 
      className={`relative group p-6 rounded-[32px] border transition-all duration-300 flex flex-col items-center gap-4 ${active ? 'bg-red-800 border-red-800 text-white shadow-xl shadow-red-900/20' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
    >
      {connected && <div className="absolute top-2 right-4 bg-blue-600 text-[7px] text-white font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-lg">Connected</div>}
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</div>
      <span className="font-outfit font-bold text-xs uppercase tracking-widest">{label}</span>
    </button>
  );

  const LegalPage = ({ title, icon, content }: any) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 bg-white flex flex-col h-full min-h-screen">
       <div className="p-8 lg:p-12 max-w-4xl mx-auto w-full space-y-12">
          <button onClick={() => setView('landing')} className="flex items-center gap-2 text-[#1a1a1a]/40 font-bold text-xs hover:text-red-800 transition-all uppercase tracking-widest"><ArrowLeft size={16}/> Back to Landing</button>
          <header className="space-y-6">
             <div className="w-16 h-16 bg-red-800 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-900/20">{icon}</div>
             <h1 className="text-5xl font-outfit font-bold text-[#1a1a1a]">{title}</h1>
             <p className="text-[#1a1a1a]/40 font-mono text-xs uppercase tracking-widest">{t('legalIntro')}</p>
          </header>
          <div className="prose prose-lg text-[#4a4a4a] space-y-8 pb-20">
             {content}
          </div>
       </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-inter flex flex-col overflow-x-hidden">
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 bg-white rounded-3xl p-8 shadow-2xl z-[100] border border-gray-100">
             <div className="space-y-6">
                <div className="flex items-center gap-3 text-red-800"><ShieldCheck size={24}/> <span className="font-outfit font-bold text-lg">Cookies & Privacy</span></div>
                <p className="text-sm text-gray-500 leading-relaxed">{t('cookieMsg')}</p>
                <div className="flex gap-4">
                   <button onClick={acceptCookies} className="flex-1 bg-red-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all">{t('accept')}</button>
                   <button onClick={() => setShowCookieBanner(false)} className="flex-1 border-2 border-gray-100 text-gray-400 font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:border-red-800 hover:text-red-800 transition-all">{t('decline')}</button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* LANDING VIEW */}
        {(view === 'landing') && (
           <motion.div key="landing-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col overflow-y-auto bg-white">
             <section className="min-h-[80vh] w-full flex flex-col lg:flex-row items-center px-8 lg:px-24 py-20 gap-16 bg-[#fbf9f5]">
               <div className="flex-1 space-y-10">
                 <h1 className="text-6xl lg:text-8xl font-outfit font-bold text-[#1a1a1a] leading-[1.1] tracking-tight">
                   {t('heroTitle').split(',')[0]} <br /> {t('heroTitle').split(',')[1]}
                 </h1>
                 <p className="text-xl text-[#4a4a4a] leading-relaxed max-w-2xl">
                   {t('heroSub')}
                 </p>
                 <div className="flex flex-wrap gap-6 pt-4">
                   <button onClick={() => { setView('setup'); setStep(1); }} className="bg-[#1a6b33] text-white font-outfit font-bold px-12 py-5 rounded-xl shadow-xl shadow-green-900/20 hover:scale-105 transition-all">
                     {t('startFree')}
                   </button>
                   <div className="relative">
                     <div className="absolute -top-3 left-6 bg-blue-600 text-[10px] text-white font-bold px-2 py-0.5 rounded uppercase tracking-widest z-10">Connected</div>
                     <button onClick={() => { setView('setup'); setStep(1); }} className="bg-white text-[#1a1a1a] font-outfit font-bold px-12 py-5 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-500 transition-all">
                       {t('calcPlan')}
                     </button>
                   </div>
                 </div>
               </div>
               <div className="flex-1 relative">
                 <div className="w-full aspect-square rounded-[60px] overflow-hidden shadow-2xl bg-[#1a6b33]/10">
                   <img src="/healthy_salad_bowl_avocado_1778768490682.png" alt="Healthy Meal" className="w-full h-full object-cover" />
                 </div>
               </div>
             </section>

             <section className="bg-[#0a0a0a] py-32 px-8 lg:px-24">
               <div className="max-w-6xl mx-auto space-y-20">
                 <div className="text-center space-y-4">
                   <p className="text-red-800 font-mono text-xs tracking-[0.3em] uppercase">Expert Endorsement</p>
                   <h2 className="text-4xl lg:text-6xl font-outfit font-bold text-white">{t('trustedBy')}</h2>
                   <p className="text-white/40 max-w-2xl mx-auto text-lg">{t('expertSub')}</p>
                 </div>
                 <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
                   {EXPERTS.map((expert, idx) => (
                     <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white/5 rounded-3xl p-10 space-y-8 border border-white/5 hover:border-white/10 transition-colors">
                       <img src={expert.image} alt={expert.name} className="w-24 h-24 rounded-2xl transition-all duration-500 object-cover" />
                       <p className="text-white/60 italic text-lg leading-relaxed">"{expert.quotes[lang]}"</p>
                       <div>
                         <p className="font-bold text-white text-xl">{expert.name}</p>
                         <p className="text-red-800 text-xs font-mono uppercase tracking-widest mt-1">{expert.role}</p>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               </div>
             </section>

             <footer className="bg-[#fbf9f5] py-20 px-8 lg:px-24 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                   <div className="font-outfit font-bold text-[#1a1a1a] text-2xl italic tracking-tight">SmartEat .Space</div>
                   <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <button onClick={() => setView('privacy')} className="hover:text-red-800 transition-colors">{t('privacy')}</button>
                      <button onClick={() => setView('cookies')} className="hover:text-red-800 transition-colors">{t('cookies')}</button>
                      <button onClick={() => setView('terms')} className="hover:text-red-800 transition-colors">{t('terms')}</button>
                      <a href="#" className="hover:text-red-800 transition-colors">Contact</a>
                   </div>
                   <p className="text-[10px] text-gray-300 font-medium">© 2024 SmartEat .Space. Bio-Metric Sovereignty.</p>
                </div>
             </footer>
           </motion.div>
        )}

        {/* LEGAL VIEWS */}
        {view === 'privacy' && (
           <LegalPage title={t('privacy')} icon={<ShieldCheck size={32}/>} content={
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold">1. Bio-Metric Data Processing</h3>
                 <p>All biometric data (weight, height, age) is stored <strong>exclusively on your local device</strong>. SmartEat .Space does not transmit this information to any external server.</p>
                 <h3 className="text-2xl font-bold">2. Local Storage</h3>
                 <p>We use the browser's Local Storage to maintain your profile settings and ensure a seamless experience across sessions without the need for traditional user accounts.</p>
                 <h3 className="text-2xl font-bold">3. Your Rights</h3>
                 <p>You have full control over your data. You can delete all stored information at any time through the "Reset Local Data" button in the Settings panel.</p>
              </div>
           }/>
        )}

        {view === 'cookies' && (
           <LegalPage title={t('cookies')} icon={<Fingerprint size={32}/>} content={
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold">What are Cookies?</h3>
                 <p>Cookies are small text files stored on your device. We use them solely for essential application functionality.</p>
                 <h3 className="text-2xl font-bold">Local Storage Usage</h3>
                 <p>Technically, we utilize "Local Storage" rather than traditional cookies to provide better performance and security for your bio-metric data.</p>
                 <h3 className="text-2xl font-bold">Managing Cookies</h3>
                 <p>You can manage or clear these files through your browser settings or directly via the application settings.</p>
              </div>
           }/>
        )}

        {view === 'terms' && (
           <LegalPage title={t('terms')} icon={<FileText size={32}/>} content={
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold">1. Educational Purpose</h3>
                 <p>SmartEat .Space provides nutritional information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.</p>
                 <h3 className="text-2xl font-bold">2. User Responsibility</h3>
                 <p>Users are responsible for verifying nutritional data and ensuring it aligns with their personal health requirements and medical conditions.</p>
                 <h3 className="text-2xl font-bold">3. Service Availability</h3>
                 <p>We strive for maximum uptime, but the service is provided "as is" without warranties of any kind.</p>
              </div>
           }/>
        )}

        {/* SETUP / PROCESSING */}
        {(view === 'setup' || view === 'processing') && (
           <motion.div key="main-stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col overflow-y-auto">
             {view === 'setup' && (
               <motion.section key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center p-6">
                 <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16 space-y-12 shadow-2xl backdrop-blur-xl">
                   <div className="flex justify-between items-center text-white">
                     <button onClick={() => setView('landing')} className="text-[10px] font-mono opacity-40 flex items-center gap-2 hover:opacity-100 transition-opacity">
                       <ArrowLeft size={14} /> HOME
                     </button>
                     <div className="flex gap-2">
                       {[1, 2, 3, 4, 5].map(s => <div key={s} className={`h-1 w-6 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-600' : 'bg-white/10'}`} />)}
                     </div>
                   </div>

                   <AnimatePresence mode="wait">
                     {step === 1 && (
                       <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white">
                         <div className="space-y-2">
                            <h2 className="text-4xl font-outfit font-bold italic">{t('setupIdentity')}</h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest">Personal profile synchronization</p>
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{t('gender')}</p>
                           <div className="flex gap-2">
                             {['male', 'female'].map(g => (
                               <button key={g} onClick={() => setGender(g as Gender)} className={`flex-1 py-4 rounded-xl border text-xs font-mono uppercase tracking-widest transition-all ${gender === g ? 'bg-white text-black border-white shadow-lg' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>{g}</button>
                             ))}
                           </div>
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{t('age')}</p>
                           <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-xl outline-none focus:border-blue-500 transition-all" />
                         </div>
                         <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white font-mono font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all">{t('next')}</button>
                       </motion.div>
                     )}

                     {step === 2 && (
                       <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white">
                         <div className="space-y-2">
                            <h2 className="text-4xl font-outfit font-bold italic">{t('setupBiometrics')}</h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest">Core body metrics</p>
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{t('weight')}</p>
                           <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-xl outline-none focus:border-blue-500" />
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{t('height')}</p>
                           <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-xl outline-none focus:border-blue-500" />
                         </div>
                         <div className="flex gap-4">
                           <button onClick={() => setStep(1)} className="flex-1 bg-white/5 border border-white/10 font-mono py-5 rounded-2xl hover:bg-white/10 transition-all">{t('back')}</button>
                           <button onClick={() => setStep(3)} className="flex-[2] bg-blue-600 text-white font-mono font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/40 hover:scale-[1.02] transition-all">{t('next')}</button>
                         </div>
                       </motion.div>
                     )}

                     {step === 3 && (
                       <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white">
                         <div className="space-y-2">
                            <h2 className="text-4xl font-outfit font-bold italic">{t('setupDiet')}</h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest">Nutritional constraints</p>
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Dietary Preference</p>
                           <div className="grid grid-cols-2 gap-2">
                             {['omnivore', 'vegan', 'vegetarian', 'keto'].map(d => (
                               <button key={d} onClick={() => setDiet(d as DietType)} className={`py-3 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${diet === d ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>{d}</button>
                             ))}
                           </div>
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest flex items-center gap-2"><AlertCircle size={12}/> {t('allergies')}</p>
                           <input type="text" placeholder="e.g. Peanuts, Lactose" value={allergies} onChange={e => setAllergies(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-sm outline-none focus:border-blue-500" />
                         </div>
                         <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="flex items-center gap-3">
                               <Leaf size={18} className="text-green-500" />
                               <span className="text-sm font-bold opacity-60">{t('sugarFree')}</span>
                            </div>
                            <button onClick={() => setNoSugar(!noSugar)} className={`w-12 h-6 rounded-full transition-all relative ${noSugar ? 'bg-green-600' : 'bg-white/10'}`}>
                               <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${noSugar ? 'left-7' : 'left-1'}`} />
                            </button>
                         </div>
                         <div className="flex gap-4">
                           <button onClick={() => setStep(2)} className="flex-1 bg-white/5 border border-white/10 font-mono py-5 rounded-2xl hover:bg-white/10 transition-all">{t('back')}</button>
                           <button onClick={() => setStep(4)} className="flex-[2] bg-blue-600 text-white font-mono font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/40 hover:scale-[1.02] transition-all">{t('next')}</button>
                         </div>
                       </motion.div>
                     )}

                     {step === 4 && (
                       <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white">
                         <div className="space-y-2">
                            <h2 className="text-4xl font-outfit font-bold italic text-[#D2691E]">{t('setupBudget')}</h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest text-center">{t('budgetSub')}</p>
                         </div>
                         <div className="flex flex-col items-center gap-8 py-4">
                            <div className="text-center">
                               <p className="text-6xl font-outfit font-bold">{budget}€</p>
                               <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mt-2">EUR / MONTH</p>
                            </div>
                            <input type="range" min="50" max="1500" step="10" value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full accent-orange-600 h-1 bg-white/10 rounded-full appearance-none cursor-pointer" />
                            <div className="flex justify-between w-full text-[10px] font-mono opacity-30">
                               <span>50€</span>
                               <span>ESSENTIAL</span>
                               <span>ELITE</span>
                               <span>1500€</span>
                            </div>
                         </div>
                         <div className="flex gap-4">
                           <button onClick={() => setStep(3)} className="flex-1 bg-white/5 border border-white/10 font-mono py-5 rounded-2xl hover:bg-white/10 transition-all">{t('back')}</button>
                           <button onClick={() => setStep(5)} className="flex-[2] bg-[#D2691E] text-white font-mono font-bold py-5 rounded-2xl shadow-xl shadow-orange-900/40 hover:scale-[1.02] transition-all">{t('next')}</button>
                         </div>
                       </motion.div>
                     )}

                     {step === 5 && (
                       <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white">
                         <div className="space-y-2">
                            <h2 className="text-4xl font-outfit font-bold italic">{t('setupStrategy')}</h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest">{t('strategySub')}</p>
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Select your path</p>
                           <div className="grid grid-cols-3 gap-3">
                             {['cut', 'maintain', 'bulk'].map(id => (
                               <button key={id} onClick={() => setGoal(id as Goal)} className={`py-4 rounded-xl border text-[10px] font-mono font-bold uppercase transition-all ${goal === id ? 'bg-blue-600 border-blue-600 shadow-lg' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>{id}</button>
                             ))}
                           </div>
                         </div>
                         <div className="flex gap-4">
                           <button onClick={() => setStep(4)} className="flex-1 bg-white/5 border border-white/10 font-mono py-5 rounded-2xl hover:bg-white/10 transition-all">{t('back')}</button>
                           <button onClick={() => setView('processing')} className="flex-[2] bg-white text-black font-mono font-bold py-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-all">{t('finalize')}</button>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               </motion.section>
             )}
             {view === 'processing' && (
               <motion.section key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-screen w-full flex flex-col items-center justify-center text-white">
                 <Loader2 className="animate-spin text-blue-600 mb-6" size={48} />
                 <p className="text-[10px] font-mono tracking-widest opacity-40 uppercase animate-pulse">Synchronizing Data...</p>
               </motion.section>
             )}
           </motion.div>
        )}

        {/* DASHBOARD / APP VIEW STACK (With Top Nav) */}
        {(view === 'dashboard' || view === 'piano_c' || view === 'workouts' || view === 'settings') && (
           <motion.div key="app-stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col pt-20">
              <TopNav current={view} />
              
              <div className="flex-1 overflow-y-auto bg-[#0a0a0a]">
                {view === 'dashboard' && (
                  <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 lg:p-16 space-y-12">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                           <div className="bg-green-600/10 text-green-500 text-[8px] font-bold px-2 py-0.5 rounded border border-green-500/20 uppercase tracking-widest">{diet} Mode</div>
                           {noSugar && <div className="bg-white/10 text-white/40 text-[8px] font-bold px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest">Sugar Free</div>}
                        </div>
                        <h1 className="text-6xl font-outfit font-bold text-white tracking-tight">{t('dashTitle').split(' ')[0]} <br/> <span className="text-red-800 italic">{t('dashTitle').split(' ').slice(1).join(' ')}</span></h1>
                        <p className="text-white/40 text-xl mt-4">{t('dashSub')}</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500"><Flame size={24} /></div><div><p className="text-[10px] text-white/30 font-bold uppercase">BMR_CORE</p><p className="text-xl font-mono font-bold text-white">{results.bmr}</p></div></div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><TrendingUp size={24} /></div><div><p className="text-[10px] text-white/30 font-bold uppercase">TDEE_INDEX</p><p className="text-xl font-mono font-bold text-white">{results.tdee}</p></div></div>
                      </div>
                    </header>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 bg-white/5 rounded-[40px] p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10"><p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-4">{t('targetIntake')}</p><h2 className="text-9xl font-outfit font-bold text-white leading-none tracking-tighter">{results.total} <span className="text-3xl font-normal text-white/20 italic">kcal</span></h2><div className="h-64 mt-12"><ResponsiveContainer width="100%" height="100%"><AreaChart data={WEEKLY_DATA}><defs><linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B0000" stopOpacity={0.4}/><stop offset="95%" stopColor="#8B0000" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" /><Tooltip contentStyle={{ background: '#111', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} /><Area type="monotone" dataKey="val" stroke="#8B0000" strokeWidth={4} fillOpacity={1} fill="url(#colorWeight)" /></AreaChart></ResponsiveContainer></div></div>
                      </div>
                      <div className="bg-white/5 rounded-[40px] p-10 border border-white/5 shadow-2xl space-y-12">
                        <h3 className="text-xl font-outfit font-bold text-white flex items-center justify-between">Strategy <Coins size={20} className="text-orange-500" /></h3>
                        <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/5">
                           <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{t('setupBudget')}</p>
                           <p className="text-4xl font-outfit font-bold text-white">{budget}€</p>
                           <p className="text-[10px] text-green-500 italic">Optimizing for {diet} sources</p>
                        </div>
                        <div className="space-y-8">
                          <div className="space-y-4"><div className="flex justify-between items-end"><p className="text-sm font-bold text-white/30 uppercase">{t('protein')}</p><p className="text-3xl font-mono font-bold text-blue-500">{results.protein}g</p></div><div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{width: '30%'}} /></div></div>
                          <div className="space-y-4"><div className="flex justify-between items-end"><p className="text-sm font-bold text-white/30 uppercase">{t('carbs')}</p><p className="text-3xl font-mono font-bold text-orange-500">{results.carbs}g</p></div><div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-orange-600 rounded-full" style={{width: '45%'}} /></div></div>
                          <div className="space-y-4"><div className="flex justify-between items-end"><p className="text-sm font-bold text-white/30 uppercase">{t('fats')}</p><p className="text-3xl font-mono font-bold text-emerald-500">{results.fats}g</p></div><div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-600 rounded-full" style={{width: '25%'}} /></div></div>
                        </div>
                      </div>
                    </div>
                  </motion.main>
                )}
                {view === 'piano_c' && (
                  <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 lg:p-12 space-y-8">
                     <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div><h2 className="text-xs font-bold text-[#D2691E] uppercase tracking-widest">Daily Macro Insights</h2><p className="text-white/40 text-sm">Tuesday, May 14th</p></div>
                        <div className="flex items-center gap-4"><div className="relative flex-1 md:w-64"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} /><input type="text" placeholder="Search" className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-12 pr-4 text-xs font-mono outline-none focus:border-red-800/50" /></div><button className="bg-red-800 p-2 rounded-full text-white shadow-lg shadow-red-900/40"><Plus size={20}/></button></div>
                     </header>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 flex items-center justify-between">
                           <div className="space-y-4"><p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{t('remaining')}</p><h3 className="text-4xl font-outfit font-bold text-white italic">1,240 <span className="text-sm font-normal opacity-30">kcal</span></h3><div className="flex gap-4 text-[9px] font-mono"><div><p className="opacity-30">Goal</p><p>1,850</p></div><div><p className="opacity-30">{t('eaten')}</p><p className="text-blue-500">610</p></div><div><p className="opacity-30">{t('burned')}</p><p className="text-red-800">0</p></div></div></div>
                           <div className="relative w-24 h-24"><div className="absolute inset-0 flex items-center justify-center text-xl font-bold font-mono">33%</div><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{v:33}, {v:67}]} innerRadius={35} outerRadius={45} dataKey="v" startAngle={90} endAngle={450}><Cell fill="#8B0000" /><Cell fill="rgba(255,255,255,0.05)" /></Pie></PieChart></ResponsiveContainer></div>
                        </div>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-6"><div className="flex justify-between items-center"><p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{t('protein')}</p><div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500"><Pizza size={14}/></div></div><div className="space-y-2"><p className="text-2xl font-mono font-bold text-white">45g <span className="text-sm font-normal opacity-20">/ 140g</span></p><div className="h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-orange-600 rounded-full" style={{width: '32%'}} /></div></div></div>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-6"><div className="flex justify-between items-center"><p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{t('fats')}</p><div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500"><Zap size={14}/></div></div><div className="space-y-2"><p className="text-2xl font-mono font-bold text-white">22g <span className="text-sm font-normal opacity-20">/ 65g</span></p><div className="h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{width: '34%'}} /></div></div></div>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                           <div className="flex justify-between items-center px-2"><h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2"><Sparkles size={16} className="text-red-800" /> {t('aiEngine')}</h3><div className="bg-red-800/10 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded border border-red-800/20 uppercase">PRO Enabled</div></div>
                           <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 flex flex-col md:flex-row gap-8 hover:bg-white/10 transition-all group relative overflow-hidden"><div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Brain size={120} className="text-red-800" /></div><div className="w-16 h-16 bg-red-800 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-900/40 flex-shrink-0"><Wand2 size={32}/></div><div className="space-y-4 flex-1 relative z-10"><h4 className="text-2xl font-outfit font-bold text-white italic">{t('mealSug')}</h4><p className="text-white/40 text-sm leading-relaxed">{t('mealSugSub')}</p><button className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-6 py-3 rounded-xl border border-white/10 transition-all uppercase tracking-widest">Generate Daily Plan</button></div></div>
                           <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 flex flex-col md:flex-row gap-8 hover:bg-white/10 transition-all group relative overflow-hidden"><div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Calendar size={120} className="text-red-800" /></div><div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/40 flex-shrink-0"><Sparkles size={32}/></div><div className="space-y-4 flex-1 relative z-10"><h4 className="text-2xl font-outfit font-bold text-white italic">{t('weeklyPlan')}</h4><p className="text-white/40 text-sm leading-relaxed">{t('weeklyPlanSub')}</p><button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-900/40 transition-all uppercase tracking-widest">Build 7-Day Menu</button></div></div>
                        </div>
                        <div className="space-y-6">
                           <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-6"><p className="text-[10px] text-white/30 font-bold uppercase tracking-widest text-center">WEEKLY PROTEIN TREND</p><div className="h-40"><ResponsiveContainer width="100%" height="100%"><BarChart data={WEEKLY_DATA}><Bar dataKey="val" radius={[4, 4, 0, 0]}>{WEEKLY_DATA.map((_, index) => (<Cell key={index} fill={index === 4 ? '#8B0000' : 'rgba(210, 105, 30, 0.4)'} />))}</Bar><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10}} /></BarChart></ResponsiveContainer></div></div>
                           <div className="bg-red-900/60 border border-red-800/50 rounded-3xl p-8 space-y-6 relative overflow-hidden group"><div className="space-y-4 relative z-10"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"><Star size={14}/></div><h4 className="text-xl font-outfit font-bold italic">Science of Protein</h4><p className="text-xs text-white/60 leading-relaxed italic">"Consuming 20-30g of protein during breakfast helps stabilize blood sugar."</p><button className="flex items-center gap-2 text-[10px] font-bold text-white hover:gap-4 transition-all uppercase tracking-widest">Read the study <ArrowRight size={14}/></button></div></div>
                        </div>
                     </div>
                  </motion.main>
                )}
                {view === 'workouts' && (
                  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 bg-[#0a0a0a] flex flex-col h-full min-h-[calc(100vh-80px)]">
                    <div className="p-8 lg:p-12 space-y-12 max-w-7xl mx-auto w-full">
                       <header><h1 className="text-6xl font-outfit font-bold text-white tracking-tight">{t('training').split(' ')[0]} <span className="text-red-800 italic">{t('training').split(' ')[1] || ''}</span></h1></header>
                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                          <div className="lg:col-span-2 space-y-12">
                             <section className="space-y-8">
                                <h2 className="text-2xl font-outfit font-bold text-white/40 flex items-center gap-2">{t('coaches')}</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                   {[
                                      { name: "Coach Ng", image: "/coach_ng_v2.png", bio: { it: "Specialista in ipertrofia e ottimizzazione metabolica. Programmi personalizzati.", fr: "Spécialiste de l'hypertrophie et de l'optimisation métabolique. Programmes personnalisés.", en: "Specialist in hypertrophy and metabolic optimization. Personalized programs." } },
                                      { name: "Roberto Rubinelli", image: "/roberto_v2.png", bio: { it: "Esperto in nutrizione sportiva e performance atletica d'élite. Focus su biohacking.", fr: "Expert en nutrition sportive et performance athlétique d'élite. Focus sur le biohacking.", en: "Expert in sports nutrition and elite athletic performance. Focus on biohacking." } }
                                   ].map((c, i) => (
                                      <div key={i} className="bg-white/5 rounded-[32px] overflow-hidden shadow-2xl border border-white/5 flex flex-col h-full">
                                         <div className="h-72 overflow-hidden bg-white/5"><img src={c.image} alt={c.name} className="w-full h-full object-cover hover:scale-105 transition-all duration-700" /></div>
                                         <div className="p-8 space-y-6 flex-1 flex flex-col">
                                            <h3 className="text-2xl font-outfit font-bold text-white">{c.name}</h3>
                                            <p className="text-white/40 text-sm leading-relaxed flex-1">{c.bio[lang]}</p>
                                            <div className="flex gap-4 pt-4"><button className={`flex-1 py-3 rounded-xl font-bold text-sm ${i === 0 ? 'bg-red-800 text-white shadow-lg shadow-red-900/20' : 'border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white transition-all'}`}>Contact</button></div>
                                         </div>
                                      </div>
                                   ))}
                                </div>
                             </section>
                          </div>
                          <div className="space-y-8">
                             <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-6"><div className="flex items-center gap-2 text-red-800 text-[10px] font-bold uppercase tracking-[0.2em]"><TrendingUp size={14}/> {t('volume')}</div><div className="space-y-1"><h3 className="text-4xl font-outfit font-bold text-white">12,450 <span className="text-sm font-normal text-white/20 italic">kg / week</span></h3><p className="text-green-500 text-[10px] font-bold">+12%</p></div><div className="h-32"><ResponsiveContainer width="100%" height="100%"><BarChart data={TRAINING_DATA}><Bar dataKey="val" radius={[4, 4, 0, 0]} fill="#8B0000" /></BarChart></ResponsiveContainer></div></div>
                             <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-8"><div className="flex items-center gap-2 text-red-800 text-[10px] font-bold uppercase tracking-[0.2em]"><Zap size={14}/> {t('intensity')}</div><div className="flex flex-col items-center justify-center py-4 relative"><div className="w-32 h-32 rounded-full border-[10px] border-white/5 flex items-center justify-center relative"><div className="absolute inset-0 rounded-full border-[10px] border-red-800 border-t-transparent -rotate-45" /><div className="text-center"><p className="text-3xl font-outfit font-bold text-white">8.5</p><p className="text-[8px] text-white/40 font-bold uppercase">RPE AVG</p></div></div></div></div>
                             <div className="bg-red-800 rounded-3xl p-8 shadow-2xl shadow-red-900/30 text-white space-y-6 relative overflow-hidden"><div className="absolute -right-4 -top-4 opacity-10 rotate-12"><Flame size={120}/></div><div className="space-y-4 relative z-10"><h4 className="text-2xl font-outfit font-bold">{t('preFuel')}</h4><p className="text-white/60 text-xs leading-relaxed">Scientific recommendations.</p><div className="bg-black/20 rounded-2xl p-4 flex justify-between items-center group cursor-pointer hover:bg-black/30 transition-all border border-white/10"><div className="flex items-center gap-3"><Utensils size={18}/><span className="text-[10px] font-bold uppercase tracking-widest">30g Protein / 50g Carbs</span></div><ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></div></div></div>
                          </div>
                       </div>
                       <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 pb-12"><div className="font-outfit font-bold text-white text-xl italic tracking-tight">SmartEat .Space</div><div className="flex gap-8 text-[10px] font-bold text-white/40 uppercase tracking-widest"><button onClick={() => setView('privacy')} className="hover:text-red-800 transition-colors">{t('privacy')}</button><button onClick={() => setView('cookies')} className="hover:text-red-800 transition-colors">{t('cookies')}</button><button onClick={() => setView('terms')} className="hover:text-red-800 transition-colors">{t('terms')}</button></div><p className="text-[10px] text-white/20 font-medium">© 2024 SmartEat .Space. Premium Personalized Nutrition.</p></footer>
                    </div>
                  </motion.main>
                )}
                {view === 'settings' && (
                  <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 lg:p-16 space-y-12">
                    <header>
                      <h1 className="text-6xl font-outfit font-bold text-white tracking-tight">{t('settingsTitle').split(' ')[0]} <br/> <span className="text-red-800 italic">{t('settingsTitle').split(' ')[1]}</span></h1>
                      <p className="text-white/40 text-xl mt-4">{t('settingsSub')}</p>
                    </header>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-2 space-y-8">
                          <section className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-8">
                             <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                <div className="w-12 h-12 bg-red-800/20 rounded-2xl flex items-center justify-center text-red-800"><UserCircle size={24}/></div>
                                <h2 className="text-2xl font-outfit font-bold text-white">{t('profileInfo')}</h2>
                             </div>
                             <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                   <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('weight')}</p>
                                   <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 font-mono text-lg outline-none focus:border-red-800/50" />
                                </div>
                                <div className="space-y-2">
                                   <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('height')}</p>
                                   <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 font-mono text-lg outline-none focus:border-red-800/50" />
                                </div>
                                <div className="space-y-2">
                                   <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{t('age')}</p>
                                   <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 font-mono text-lg outline-none focus:border-red-800/50" />
                                </div>
                             </div>
                          </section>
                          
                          <section className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-8">
                             <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                <div className="w-12 h-12 bg-red-800/20 rounded-2xl flex items-center justify-center text-red-800"><Globe size={24}/></div>
                                <h2 className="text-2xl font-outfit font-bold text-white">{t('lang')}</h2>
                             </div>
                             <div className="grid grid-cols-3 gap-4">
                                {['it', 'fr', 'en'].map(l => (
                                   <button key={l} onClick={() => setLang(l as Language)} className={`py-4 rounded-2xl border text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-red-800 border-red-800 shadow-lg' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>{l}</button>
                                ))}
                             </div>
                          </section>
                       </div>
                       
                       <div className="space-y-8">
                          <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-6">
                             <div className="flex items-center gap-4"><ShieldCheck size={20} className="text-green-500" /><h3 className="font-outfit font-bold text-white">Data Privacy</h3></div>
                             <p className="text-xs text-white/40 leading-relaxed">Local Encryption Active.</p>
                             <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full py-4 border border-white/10 text-white/40 rounded-2xl font-bold text-xs hover:text-red-800 hover:border-red-800 transition-all uppercase tracking-widest">{t('resetData')}</button>
                          </div>
                          <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-6">
                             <div className="flex items-center gap-4"><ShieldAlert size={20} className="text-orange-500" /><h3 className="font-outfit font-bold text-white">Legal Docs</h3></div>
                             <div className="space-y-4">
                                <button onClick={() => setView('privacy')} className="w-full text-left text-xs font-bold text-white/40 hover:text-white transition-all flex items-center justify-between"><span>Privacy Policy</span> <ChevronRight size={14}/></button>
                                <button onClick={() => setView('cookies')} className="w-full text-left text-xs font-bold text-white/40 hover:text-white transition-all flex items-center justify-between"><span>Cookie Policy</span> <ChevronRight size={14}/></button>
                                <button onClick={() => setView('terms')} className="w-full text-left text-xs font-bold text-white/40 hover:text-white transition-all flex items-center justify-between"><span>Terms & Conditions</span> <ChevronRight size={14}/></button>
                             </div>
                          </div>
                       </div>
                    </div>
                  </motion.main>
                )}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
