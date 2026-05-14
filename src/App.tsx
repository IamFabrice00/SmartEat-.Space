import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { 
  ChevronRight, ArrowLeft, Loader2, ShieldCheck, Star, 
  LayoutDashboard, Utensils, Dumbbell, Settings as SettingsIcon, LogOut, Menu, X, Flame, TrendingUp, Zap, Calendar, 
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
const T: Record<Language, Record<string, string>> = {
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
    setupIdentity: "Identité",
    setupBiometrics: "Biométrie",
    setupDiet: "Diète & Santé",
    setupBudget: "Budget Mensuel",
    setupStrategy: "Stratégie",
    next: "SUIVANT",
    back: "RETOUR",
    finalize: "FINALISER ET ENTRER",
    gender: "Genre",
    age: "Âge",
    weight: "Poids (KG)",
    height: "Taille (CM)",
    allergies: "Allergies / Intolérances",
    sugarFree: "Sans Sucre",
    budgetSub: "Budget Mensuel pour vos entraînements",
    strategySub: "Objectif final",
    dashTitle: "Analyse Bio d'Aujourd'hui",
    dashSub: "Vos données personnalisées pour un état métabolique serein.",
    targetIntake: "Objectif Calories",
    protein: "Protéines",
    carbs: "Glucides",
    fats: "Lipides",
    remaining: "RESTANTS",
    eaten: "Mangés",
    burned: "Brûlés",
    aiEngine: "Moteur de Repas IA",
    mealSug: "Suggestions de Repas",
    mealSugSub: "Génération automatique d'une journée type.",
    weeklyPlan: "Plans Hebdomadaires IA",
    weeklyPlanSub: "Génération de menus complets de 7 jours.",
    training: "Entraînement",
    coaches: "Vos Coachs Dédiés",
    volume: "Volume d'Entraînement",
    intensity: "Score d'Intensité",
    preFuel: "Carburant Pré-Entraînement",
    settingsTitle: "Paramètres Système",
    settingsSub: "Gérez votre profil biométrique et vos préférences.",
    profileInfo: "Informations Profil",
    dietStrat: "Stratégie Alimentaire",
    resetData: "Réinitialiser les Données",
    lang: "Langue",
    privacy: "Politique de Confidentialité",
    cookies: "Politique de Cookies",
    terms: "Termes et Conditions",
    cookieMsg: "Nous utilisons des cookies pour améliorer votre expérience sur SmartEat .Space.",
    accept: "Tout Accepter",
    decline: "Refuser",
    legalIntro: "Dernière mise à jour : Mai 2024. Votre vie privée est notre priorité."
  },
  en: {
    heroTitle: "Fuel Your Body, Transform Your Life",
    heroSub: "Discover a balanced, calm approach to health. SmartEat .Space uses advanced scientific principles to tailor a nutrition plan that fits your life.",
    startFree: "Start Free",
    calcPlan: "Calculate Your Plan",
    trustedBy: "Trusted by Professionals",
    expertSub: "Top-tier athletes and health professionals rely on SmartEat .Space.",
    sidebarHome: "Home",
    sidebarDash: "Dashboard",
    sidebarMacros: "Macros",
    sidebarWorkouts: "Workouts",
    sidebarMagazine: "Magazine",
    sidebarSettings: "Settings",
    sidebarLogout: "Logout",
    setupIdentity: "Identity",
    setupBiometrics: "Biometrics",
    setupDiet: "Diet & Health",
    setupBudget: "Monthly Budget",
    setupStrategy: "Strategy",
    next: "NEXT",
    back: "BACK",
    finalize: "FINALIZE AND ENTER",
    gender: "Gender",
    age: "Age",
    weight: "Weight (KG)",
    height: "Height (CM)",
    allergies: "Allergies / Intolerances",
    sugarFree: "Sugar-Free",
    budgetSub: "Monthly fuel investment for your workouts",
    strategySub: "Ultimate objective",
    dashTitle: "Today's Bio-Analysis",
    dashSub: "Your personalized data for a serene metabolic state.",
    targetIntake: "Target Intake",
    protein: "Proteins",
    carbs: "Carbohydrates",
    fats: "Fats",
    remaining: "REMAINING",
    eaten: "Eaten",
    burned: "Burned",
    aiEngine: "AI Meal Engine",
    mealSug: "Meal Suggestions",
    mealSugSub: "Automatic generation of a typical day.",
    weeklyPlan: "AI Weekly Plans",
    weeklyPlanSub: "Generation of entire 7-day menus.",
    training: "Training",
    coaches: "Your Dedicated Coaches",
    volume: "Training Volume",
    intensity: "Intensity Score",
    preFuel: "Pre-Workout Fuel",
    settingsTitle: "System Settings",
    settingsSub: "Manage your biometric profile and preferences.",
    profileInfo: "Profile Information",
    dietStrat: "Dietary Strategy",
    resetData: "Reset Local Data",
    lang: "Language",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    terms: "Terms and Conditions",
    cookieMsg: "We use cookies to enhance your experience on SmartEat .Space.",
    accept: "Accept All",
    decline: "Decline",
    legalIntro: "Last updated: May 2024. Your privacy is our priority."
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

  const t = (key: string) => {
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
                   {t('heroTitle').split(',')[0]} <br /> {t('heroTitle').split(',')[1] || ''}
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
                 <p>All biometric data is stored locally on your device. We do not transmit this info.</p>
              </div>
           }/>
        )}

        {view === 'cookies' && (
           <LegalPage title={t('cookies')} icon={<Fingerprint size={32}/>} content={
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold">Cookies Policy</h3>
                 <p>We use local storage for performance and data privacy.</p>
              </div>
           }/>
        )}

        {view === 'terms' && (
           <LegalPage title={t('terms')} icon={<FileText size={32}/>} content={
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold">Terms of Use</h3>
                 <p>SmartEat .Space is for educational purposes only.</p>
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
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{t('gender')}</p>
                           <div className="flex gap-2">
                             {['male', 'female'].map(g => (
                               <button key={g} onClick={() => setGender(g as Gender)} className={`flex-1 py-4 rounded-xl border text-xs font-mono uppercase tracking-widest transition-all ${gender === g ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10'}`}>{g}</button>
                             ))}
                           </div>
                         </div>
                         <div className="space-y-4">
                           <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{t('age')}</p>
                           <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
                         </div>
                         <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white font-mono font-bold py-5 rounded-2xl">{t('next')}</button>
                       </motion.div>
                     )}

                     {step === 2 && (
                       <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white">
                         <h2 className="text-4xl font-outfit font-bold italic">{t('setupBiometrics')}</h2>
                         <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" placeholder={t('weight')} />
                         <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" placeholder={t('height')} />
                         <div className="flex gap-4">
                           <button onClick={() => setStep(1)} className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl">{t('back')}</button>
                           <button onClick={() => setStep(3)} className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl">{t('next')}</button>
                         </div>
                       </motion.div>
                     )}

                     {step === 3 && (
                       <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white">
                         <h2 className="text-4xl font-outfit font-bold italic">{t('setupDiet')}</h2>
                         <div className="grid grid-cols-2 gap-2">
                           {['omnivore', 'vegan', 'vegetarian', 'keto'].map(d => (
                             <button key={d} onClick={() => setDiet(d as DietType)} className={`py-3 rounded-xl border text-[10px] font-bold uppercase transition-all ${diet === d ? 'bg-white text-black' : 'bg-white/5 border-white/10'}`}>{d}</button>
                           ))}
                         </div>
                         <input type="text" placeholder={t('allergies')} value={allergies} onChange={e => setAllergies(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
                         <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <span className="text-sm font-bold opacity-60">{t('sugarFree')}</span>
                            <button onClick={() => setNoSugar(!noSugar)} className={`w-12 h-6 rounded-full relative ${noSugar ? 'bg-green-600' : 'bg-white/10'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${noSugar ? 'left-7' : 'left-1'}`} /></button>
                         </div>
                         <div className="flex gap-4">
                           <button onClick={() => setStep(2)} className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl">{t('back')}</button>
                           <button onClick={() => setStep(4)} className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl">{t('next')}</button>
                         </div>
                       </motion.div>
                     )}

                     {step === 4 && (
                       <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white text-center">
                         <h2 className="text-4xl font-outfit font-bold italic">{t('setupBudget')}</h2>
                         <p className="text-6xl font-outfit font-bold">{budget}€</p>
                         <input type="range" min="50" max="1500" step="10" value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full accent-orange-600" />
                         <div className="flex gap-4">
                           <button onClick={() => setStep(3)} className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl">{t('back')}</button>
                           <button onClick={() => setStep(5)} className="flex-[2] bg-orange-600 text-white py-5 rounded-2xl">{t('next')}</button>
                         </div>
                       </motion.div>
                     )}

                     {step === 5 && (
                       <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-white">
                         <h2 className="text-4xl font-outfit font-bold italic">{t('setupStrategy')}</h2>
                         <div className="grid grid-cols-3 gap-3">
                           {['cut', 'maintain', 'bulk'].map(id => (
                             <button key={id} onClick={() => setGoal(id as Goal)} className={`py-4 rounded-xl border text-[10px] font-bold uppercase transition-all ${goal === id ? 'bg-blue-600 border-blue-600' : 'bg-white/5 border-white/10'}`}>{id}</button>
                           ))}
                         </div>
                         <div className="flex gap-4">
                           <button onClick={() => setStep(4)} className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl">{t('back')}</button>
                           <button onClick={() => setView('processing')} className="flex-[2] bg-white text-black font-bold py-6 rounded-2xl">{t('finalize')}</button>
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
                 <p className="text-[10px] font-mono tracking-widest opacity-40 uppercase">Synchronizing...</p>
               </motion.section>
             )}
           </motion.div>
        )}

        {/* DASHBOARD STACK */}
        {(view === 'dashboard' || view === 'piano_c' || view === 'workouts' || view === 'settings') && (
           <motion.div key="app-stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col pt-20">
              <TopNav current={view} />
              <div className="flex-1 overflow-y-auto bg-[#0a0a0a]">
                {view === 'dashboard' && (
                  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 lg:p-16 space-y-12">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <h1 className="text-6xl font-outfit font-bold text-white tracking-tight">{t('dashTitle').split(' ')[0]} <br/> <span className="text-red-800 italic">{t('dashTitle').split(' ').slice(1).join(' ')}</span></h1>
                      </div>
                      <div className="flex gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4"><Flame size={24} className="text-orange-500" /><div><p className="text-[10px] text-white/30 font-bold uppercase">BMR</p><p className="text-xl font-mono font-bold text-white">{results.bmr}</p></div></div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4"><TrendingUp size={24} className="text-blue-500" /><div><p className="text-[10px] text-white/30 font-bold uppercase">TDEE</p><p className="text-xl font-mono font-bold text-white">{results.tdee}</p></div></div>
                      </div>
                    </header>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 bg-white/5 rounded-[40px] p-12 border border-white/5 shadow-2xl">
                         <p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-4">{t('targetIntake')}</p><h2 className="text-9xl font-outfit font-bold text-white">{results.total} <span className="text-3xl font-normal text-white/20 italic">kcal</span></h2>
                         <div className="h-64 mt-12"><ResponsiveContainer width="100%" height="100%"><AreaChart data={WEEKLY_DATA}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" /><Tooltip /><Area type="monotone" dataKey="val" stroke="#8B0000" fill="rgba(139,0,0,0.2)" /></AreaChart></ResponsiveContainer></div>
                      </div>
                      <div className="bg-white/5 rounded-[40px] p-10 border border-white/5 space-y-12">
                         <h3 className="text-xl font-outfit font-bold text-white flex justify-between">Strategy <Coins size={20} className="text-orange-500" /></h3>
                         <div className="space-y-8">
                            <div className="space-y-4"><div className="flex justify-between items-end"><p className="text-sm font-bold text-white/30 uppercase">{t('protein')}</p><p className="text-3xl font-mono font-bold text-blue-500">{results.protein}g</p></div><div className="h-2 bg-white/5 rounded-full"><div className="h-full bg-blue-600 rounded-full" style={{width: '30%'}} /></div></div>
                            <div className="space-y-4"><div className="flex justify-between items-end"><p className="text-sm font-bold text-white/30 uppercase">{t('carbs')}</p><p className="text-3xl font-mono font-bold text-orange-500">{results.carbs}g</p></div><div className="h-2 bg-white/5 rounded-full"><div className="h-full bg-orange-600 rounded-full" style={{width: '45%'}} /></div></div>
                            <div className="space-y-4"><div className="flex justify-between items-end"><p className="text-sm font-bold text-white/30 uppercase">{t('fats')}</p><p className="text-3xl font-mono font-bold text-emerald-500">{results.fats}g</p></div><div className="h-2 bg-white/5 rounded-full"><div className="h-full bg-emerald-600 rounded-full" style={{width: '25%'}} /></div></div>
                         </div>
                      </div>
                    </div>
                  </motion.main>
                )}
                {view === 'piano_c' && (
                  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 lg:p-12 space-y-8">
                     <header className="flex justify-between items-center"><h2 className="text-2xl font-bold">Daily Macro Insights</h2><div className="flex gap-4"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} /><input type="text" className="bg-white/5 border border-white/5 rounded-full py-2 pl-12 pr-4 text-xs" placeholder="Search" /></div><button className="bg-red-800 p-2 rounded-full"><Plus size={20}/></button></div></header>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 flex items-center justify-between">
                           <div className="space-y-4"><p className="text-[10px] text-white/30 font-bold uppercase">{t('remaining')}</p><h3 className="text-4xl font-bold">1,240 <span className="text-sm opacity-30">kcal</span></h3></div>
                           <div className="w-24 h-24"><ResponsiveContainer><PieChart><Pie data={[{v:33}, {v:67}]} innerRadius={35} outerRadius={45} dataKey="v" startAngle={90} endAngle={450}><Cell fill="#8B0000" /><Cell fill="rgba(255,255,255,0.05)" /></Pie></PieChart></ResponsiveContainer></div>
                        </div>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-6"><div className="flex justify-between"><p className="text-[10px] opacity-30 uppercase font-bold">{t('protein')}</p><Pizza size={14}/></div><p className="text-2xl font-mono font-bold">45g / 140g</p></div>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-6"><div className="flex justify-between"><p className="text-[10px] opacity-30 uppercase font-bold">{t('fats')}</p><Zap size={14}/></div><p className="text-2xl font-mono font-bold">22g / 65g</p></div>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                           <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 flex gap-8"><Wand2 size={32} className="text-red-800" /><div className="space-y-4"><h4 className="text-2xl font-bold">{t('mealSug')}</h4><p className="text-white/40 text-sm">{t('mealSugSub')}</p><button className="bg-white/5 text-xs font-bold px-6 py-3 rounded-xl border border-white/10 uppercase">Generate</button></div></div>
                           <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 flex gap-8"><Sparkles size={32} className="text-blue-600" /><div className="space-y-4"><h4 className="text-2xl font-bold">{t('weeklyPlan')}</h4><p className="text-white/40 text-sm">{t('weeklyPlanSub')}</p><button className="bg-blue-600 text-xs font-bold px-6 py-3 rounded-xl uppercase">Build 7-Day Menu</button></div></div>
                        </div>
                        <div className="space-y-6">
                           <div className="bg-white/5 border border-white/5 rounded-3xl p-8 text-center"><p className="text-[10px] opacity-30 uppercase font-bold mb-4">WEEKLY TREND</p><div className="h-40"><ResponsiveContainer><BarChart data={WEEKLY_DATA}><Bar dataKey="val" fill="#8B0000" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div></div>
                           <div className="bg-red-900/60 rounded-3xl p-8 space-y-4"><Star size={14}/><h4 className="text-xl font-bold italic">Science of Protein</h4><p className="text-xs text-white/60 italic">"Consuming protein during breakfast helps stabilize blood sugar."</p></div>
                        </div>
                     </div>
                  </motion.main>
                )}
                {view === 'workouts' && (
                  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 lg:p-12 space-y-12">
                    <h1 className="text-6xl font-bold">{t('training')}</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                       <div className="lg:col-span-2 space-y-12">
                          <h2 className="text-2xl font-bold opacity-40">{t('coaches')}</h2>
                          <div className="grid md:grid-cols-2 gap-8">
                             {EXPERTS.map((c, i) => (
                                <div key={i} className="bg-white/5 rounded-[32px] overflow-hidden border border-white/5 flex flex-col">
                                   <div className="h-72 overflow-hidden"><img src={c.image} alt={c.name} className="w-full h-full object-cover" /></div>
                                   <div className="p-8 space-y-6 flex-1 flex flex-col">
                                      <h3 className="text-2xl font-bold">{c.name}</h3>
                                      <p className="text-white/40 text-sm flex-1">{c.quotes[lang]}</p>
                                      <button className={`py-3 rounded-xl font-bold text-sm ${i === 0 ? 'bg-red-800' : 'border-2 border-red-800 text-red-800'}`}>Contact</button>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                       <div className="space-y-8">
                          <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-6"><p className="text-[10px] opacity-30 font-bold uppercase">{t('volume')}</p><h3 className="text-4xl font-bold">12,450 <span className="text-xs opacity-20">kg / week</span></h3></div>
                          <div className="bg-white/5 rounded-3xl p-8 border border-white/5 text-center"><p className="text-[10px] opacity-30 font-bold uppercase mb-4">{t('intensity')}</p><div className="w-32 h-32 rounded-full border-8 border-red-800/20 border-t-red-800 mx-auto flex items-center justify-center font-bold text-3xl">8.5</div></div>
                          <div className="bg-red-800 rounded-3xl p-8 space-y-6"><h4 className="text-2xl font-bold">{t('preFuel')}</h4><p className="text-white/60 text-xs">Scientific recommendations.</p><button className="w-full bg-black/20 rounded-2xl p-4 flex justify-between items-center text-[10px] font-bold uppercase"><span>30g Prot / 50g Carb</span> <ArrowRight size={16}/></button></div>
                       </div>
                    </div>
                  </motion.main>
                )}
                {view === 'settings' && (
                  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 lg:p-16 space-y-12">
                    <h1 className="text-6xl font-bold">{t('settingsTitle')}</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-2 space-y-8">
                          <section className="bg-white/5 rounded-[40px] p-10 space-y-8"><div className="flex items-center gap-4 border-b border-white/5 pb-6"><UserCircle size={24} className="text-red-800" /><h2 className="text-2xl font-bold">{t('profileInfo')}</h2></div>
                             <div className="grid md:grid-cols-3 gap-8">
                                <div><p className="text-[10px] opacity-30 uppercase font-bold mb-2">{t('weight')}</p><input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/5 rounded-xl p-4" /></div>
                                <div><p className="text-[10px] opacity-30 uppercase font-bold mb-2">{t('height')}</p><input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/5 rounded-xl p-4" /></div>
                                <div><p className="text-[10px] opacity-30 uppercase font-bold mb-2">{t('age')}</p><input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full bg-white/5 border border-white/5 rounded-xl p-4" /></div>
                             </div>
                          </section>
                          <section className="bg-white/5 rounded-[40px] p-10 space-y-8"><div className="flex items-center gap-4 border-b border-white/5 pb-6"><Globe size={24} className="text-red-800" /><h2 className="text-2xl font-bold">{t('lang')}</h2></div>
                             <div className="grid grid-cols-3 gap-4">{['it', 'fr', 'en'].map(l => (<button key={l} onClick={() => setLang(l as Language)} className={`py-4 rounded-xl border text-xs font-bold uppercase ${lang === l ? 'bg-red-800 border-red-800' : 'bg-white/5 border-white/10'}`}>{l}</button>))}</div>
                          </section>
                       </div>
                       <div className="space-y-8">
                          <div className="bg-white/5 rounded-[40px] p-10 space-y-6"><h3 className="font-bold flex items-center gap-2"><ShieldCheck size={20} className="text-green-500" /> Data Privacy</h3><button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full py-4 border border-white/10 rounded-xl text-xs uppercase font-bold">{t('resetData')}</button></div>
                          <div className="bg-white/5 rounded-[40px] p-10 space-y-6"><h3 className="font-bold flex items-center gap-2"><ShieldAlert size={20} className="text-orange-500" /> Legal</h3><div className="space-y-4">{['privacy', 'cookies', 'terms'].map(v => (<button key={v} onClick={() => setView(v as View)} className="w-full text-left text-xs opacity-40 hover:opacity-100 flex justify-between items-center capitalize"><span>{v} Policy</span> <ChevronRight size={14}/></button>))}</div></div>
                       </div>
                    </div>
                  </motion.main>
                )}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
      <SpeedInsights />
    </div>
  );
};

export default App;
