import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { 
  ShieldCheck, 
  Search, 
  MessageSquare, 
  User, 
  Home, 
  ChevronLeft,
  Star,
  Verified,
  MapPin,
  Clock,
  Briefcase,
  Wrench,
  Zap,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight,
  TrendingUp,
  Receipt,
  FileText,
  Phone,
  Camera,
  Truck,
  HelpCircle,
  Plus,
  MoreVertical,
  Settings,
  Send,
  Download,
  Printer,
  History,
  Activity,
  Thermometer, 
  Monitor, 
  Bug, 
  Hammer, 
  Paintbrush, 
  Flame, 
  Square, 
  Scissors, 
  Leaf, 
  Sparkles,
  X
} from 'lucide-react';

// --- Utilidad para clases CSS ---
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Contexto Global para Funcionalidad ---
const AppContext = createContext();

const useAppContext = () => useContext(AppContext);

// --- Componentes Compartidos ---

const Button = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm focus:ring-4 focus:ring-blue-600/10',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-100 transition-colors',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50/50',
    danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
  };
  const sizes = {
    sm: 'px-4 py-2 text-xs font-bold uppercase tracking-widest',
    md: 'px-6 py-2.5 font-semibold text-sm',
    lg: 'px-8 py-3.5 text-base font-bold'
  };
  return (
    <button 
      className={cn(
        'rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 inline-flex whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )} 
      {...props} 
    >
      {children}
    </button>
  );
};

const Card = ({ className, children, title, description, icon: Icon, active, onClick }) => (
  <div 
    onClick={onClick}
    className={cn(
      'bg-white rounded-xl p-6 border transition-all cursor-pointer group shadow-sm',
      active ? 'border-blue-600 ring-1 ring-blue-600' : 'border-slate-200 hover:border-blue-600/50 hover:shadow-md',
      className
    )}
  >
    <div className="flex items-center gap-4">
      {Icon && (
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0",
          active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-600/10 group-hover:text-blue-600"
        )}>
          <Icon size={20} />
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-bold text-slate-900 tracking-tight">{title}</h3>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      {onClick && (
        <div className={cn(
          "w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0",
          active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 group-hover:border-blue-600/50"
        )}>
          {active && <CheckCircle2 size={12} strokeWidth={3} />}
        </div>
      )}
    </div>
    {children}
  </div>
);

const StatusStep = ({ icon: Icon, label, time, active, completed }) => (
  <div className="flex gap-6 items-start relative z-10">
    <div className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center border-2 border-white ring-4 ring-white shadow-sm shrink-0",
      completed ? "bg-emerald-600 text-white" : active ? "bg-blue-600 text-white ring-blue-600/10" : "bg-slate-200 text-slate-500"
    )}>
      <Icon size={16} strokeWidth={completed ? 3 : 2.5} />
    </div>
    <div className="flex-1">
      <h4 className={cn("font-bold text-sm", active ? "text-slate-900" : "text-slate-500")}>{label}</h4>
      {time && <p className={cn("text-xs", completed ? "text-slate-500" : active ? "text-blue-600 font-bold" : "text-slate-500")}>{time}</p>}
    </div>
  </div>
);

const FeeRow = ({ label, amount }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="font-bold text-slate-900">${amount}</span>
  </div>
);

// --- Plantilla Principal ---

const Layout = ({ children, hideNav, title, showBack }) => {
  const { navigate, role, currentRoute } = useAppContext();
  
  const isNavActive = (path) => {
    if (path === '/client' && currentRoute === '/client') return true;
    if (path === '/pro' && currentRoute === '/pro') return true;
    if (path !== '/client' && path !== '/pro' && currentRoute.startsWith(path)) return true;
    return false;
  };

  const navLinkClass = (path) => cn(
    "relative transition-colors cursor-pointer",
    isNavActive(path)
      ? "text-blue-600 font-bold after:absolute after:bottom-[-21px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
      : "text-slate-500 hover:text-slate-900"
  );

  return (
    <div className="min-h-screen flex flex-col pt-16 pb-20 md:pb-0 font-sans bg-slate-50 text-slate-900">
      <header className="fixed top-0 left-0 w-full z-50 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shadow-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          {showBack ? (
            <button onClick={() => navigate('back')} className="p-2 transition-colors hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 cursor-pointer">
              <ChevronLeft size={20} />
            </button>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="text-white" size={20} />
            </div>
          )}
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{title || "Work Home"}</h1>
        </div>
        
        <div className="hidden md:flex gap-8 font-semibold text-sm">
          <button onClick={() => navigate(role === 'client' ? '/client' : '/pro')} className={navLinkClass(role === 'client' ? '/client' : '/pro')}>Resumen</button>
          <button onClick={() => navigate('/client/chat')} className={navLinkClass('/client/chat')}>Mensajes</button>
          <button onClick={() => navigate(role === 'client' ? '/client/services' : '/pro/schedule')} className={navLinkClass(role === 'client' ? '/client/services' : '/pro/schedule')}>Servicios</button>
          <button onClick={() => navigate(role === 'client' ? '/client/status' : '/pro/schedule')} className={navLinkClass(role === 'client' ? '/client/status' : '/pro/schedule')}>Actividad</button>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors hidden sm:block cursor-pointer">
            <Search size={20} />
          </button>
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden shadow-sm cursor-pointer">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Perfil" />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full relative">
          {children}
        </div>
      </main>

      {!hideNav && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-white/80 backdrop-blur-lg border-t border-slate-200 flex justify-around items-center px-4 z-40">
          <NavItem 
            icon={role === 'client' ? Search : Home} 
            label="Inicio" 
            active={currentRoute === '/client' || currentRoute === '/pro'}
            onClick={() => navigate(role === 'client' ? '/client' : '/pro')} 
          />
          <NavItem 
            icon={Briefcase} 
            label="Servicios" 
            active={currentRoute.startsWith('/client/services')}
            onClick={() => navigate(role === 'client' ? '/client/services' : '/pro/schedule')} 
          />
          <NavItem 
            icon={MessageSquare} 
            label="Bandeja" 
            active={currentRoute.startsWith('/client/chat')}
            onClick={() => navigate('/client/chat')} 
          />
          <NavItem 
            icon={Truck} 
            label="Actividad" 
            active={currentRoute.startsWith('/client/status')}
            onClick={() => navigate(role === 'client' ? '/client/status' : '/pro/schedule')} 
          />
        </nav>
      )}
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 transition-all px-4 py-2 rounded-lg cursor-pointer",
      active ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
    )}
  >
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

// --- Vistas de la App ---

const Onboarding = () => {
  const { role, setRole, navigate } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-50 md:flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-500">
        <div className="hidden md:flex w-5/12 bg-slate-100 p-10 relative overflow-hidden flex-col justify-between border-r border-slate-200">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <ShieldCheck className="text-blue-600" size={32} />
              <span className="text-2xl font-extrabold text-slate-900">Work Home</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-slate-900">Únete a nuestra comunidad de confianza.</h1>
            <p className="text-slate-500">Verificamos a cada miembro para garantizar un entorno seguro y profesional para tus necesidades en el hogar.</p>
          </div>
          <div className="space-y-4">
             <div className="flex gap-4 p-4 bg-white/50 rounded-xl">
               <div className="w-8 h-8 rounded-full bg-emerald-600/10 text-emerald-600 flex items-center justify-center"><Verified size={18}/></div>
               <div>
                  <h4 className="font-bold text-sm text-slate-900">Verificación de Identidad</h4>
                  <p className="text-xs text-slate-500">Protocolos de seguridad bancaria.</p>
               </div>
             </div>
             <div className="flex gap-4 p-4 bg-white/50 rounded-xl">
               <div className="w-8 h-8 rounded-full bg-emerald-600/10 text-emerald-600 flex items-center justify-center"><ShieldCheck size={18}/></div>
               <div>
                  <h4 className="font-bold text-sm text-slate-900">Profesionales Evaluados</h4>
                  <p className="text-xs text-slate-500">Revisión exhaustiva de antecedentes.</p>
               </div>
             </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 flex flex-col bg-white">
          <div className="flex justify-between items-center mb-12">
            <StepNode active label="Rol" number={1} />
            <div className="flex-1 h-0.5 bg-slate-200 mx-4 -mt-6"></div>
            <StepNode label="Detalles" number={2} />
            <div className="flex-1 h-0.5 bg-slate-200 mx-4 -mt-6"></div>
            <StepNode label="Verificar" number={3} />
          </div>

          <h2 className="text-2xl font-bold mb-2 text-slate-900">Selecciona tu tipo de cuenta</h2>
          <p className="text-slate-500 mb-8">Elige cómo planeas utilizar Work Home.</p>

          <div className="space-y-4 mb-12">
            <Card 
              active={role === 'client'} 
              onClick={() => setRole('client')}
              title="Propietario / Cliente"
              description="Quiero contratar profesionales verificados para mi hogar."
              icon={Home}
            />
            <Card 
              active={role === 'pro'} 
              onClick={() => setRole('pro')}
              title="Profesional de Servicios"
              description="Quiero ofrecer mis servicios y hacer crecer mi negocio."
              icon={Wrench}
            />
          </div>

          <div className="bg-slate-100 p-4 rounded-xl flex items-start gap-4 mb-8">
            <Camera className="text-blue-600 shrink-0" size={24} />
            <div>
              <p className="font-bold text-sm text-slate-900">Prepara tu Identificación</p>
              <p className="text-xs text-slate-500">En los próximos pasos, necesitarás una identificación oficial o pasaporte válido para verificar tu identidad.</p>
            </div>
          </div>

          <div className="mt-auto flex justify-end gap-4">
            <Button variant="ghost">Cancelar</Button>
            <Button onClick={() => navigate(role === 'client' ? '/client' : '/pro')}>
              Continuar <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepNode = ({ active, label, number }) => (
  <div className="flex flex-col items-center gap-3">
    <div className={cn(
      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border transition-all shadow-sm",
      active ? "bg-blue-600 text-white border-blue-600 shadow-blue-600/20" : "bg-white text-slate-500 border-slate-200"
    )}>
      {number}
    </div>
    <span className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", active ? "text-blue-600" : "text-slate-500")}>{label}</span>
  </div>
);

// --- Base de Datos Expandida de Servicios ---
const serviceCategoriesData = [
  {
     group: "Emergencia y Rápido",
     items: [
        { icon: Wrench, label: "Plomero", desc: "Especialista en reparar fugas de agua, destapar tuberías e instalar sistemas sanitarios o grifería." },
        { icon: Zap, label: "Electricista", desc: "Encargado de solucionar cortes de energía, reparar cortos circuitos e instalar cableado, enchufes y luminarias." },
        { icon: Lock, label: "Cerrajero", desc: "Profesional para apertura de puertas de emergencia, cambio de chapas, candados y extracción de llaves rotas." },
        { icon: Thermometer, label: "Técnico HVAC", desc: "Reparación y mantenimiento preventivo de aires acondicionados, refrigeradores y calentadores." },
        { icon: Monitor, label: "Informático", desc: "Especialista en reparación de computadoras, configuración de redes Wi-Fi y soporte técnico a domicilio." },
        { icon: Truck, label: "Mecánico a Domicilio", desc: "Asistencia vial rápida para fallas automotrices menores, paso de corriente, cambio de llantas o diagnósticos." },
        { icon: Bug, label: "Fumigador", desc: "Experto en control de plagas, fumigación preventiva y desinfección de espacios residenciales." }
     ]
  },
  {
     group: "Proyectos y Remodelaciones",
     items: [
        { icon: Hammer, label: "Albañil", desc: "Profesional de la construcción enfocado en levantar muros, instalar pisos, realizar repellos y ejecutar remodelaciones." },
        { icon: Paintbrush, label: "Pintor", desc: "Especialista en preparación y pintura de interiores, exteriores, fachadas y aplicación de impermeabilizantes." },
        { icon: Hammer, label: "Carpintero", desc: "Fabricante y reparador de muebles a medida, clósets, puertas, marcos y cocinas integrales en madera." },
        { icon: Flame, label: "Herrero / Soldador", desc: "Creador e instalador de estructuras metálicas, incluyendo protecciones para ventanas, portones y barandales." },
        { icon: Square, label: "Cristalero", desc: "Instalador de ventanas a medida, espejos, canceles de baño y estructuras de cristal templado o aluminio." },
        { icon: Square, label: "Tablaroquero", desc: "Especialista en la creación de muros divisorios ligeros, plafones falsos y acabados lisos en paredes interiores." },
        { icon: Scissors, label: "Tapicero", desc: "Profesional dedicado a la restauración, cambio de tela o cuero y reparación de la estructura de muebles." },
        { icon: Leaf, label: "Jardinero", desc: "Encargado del diseño de exteriores, mantenimiento periódico del césped, poda de árboles y cuidado de plantas." }
     ]
  },
  {
     group: "Servicios Generales",
     items: [
        { icon: Sparkles, label: "Personal de Limpieza", desc: "Especialistas en aseo doméstico general, limpieza profunda detallada o especializada post-construcción." },
        { icon: Truck, label: "Fletes y Mudanzas", desc: "Servicio de transporte seguro con vehículos de carga para trasladar muebles o realizar cambios de casa." },
        { icon: Wrench, label: "Handyman", desc: "Profesional versátil para tareas prácticas como armar muebles prefabricados, colgar cuadros o montar TVs." }
     ]
  }
];

const ClientDashboard = () => {
  const { navigate } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllPros, setShowAllPros] = useState(false);

  const prosList = [
    { id: 1, name: "Miguel Chen", rating: "4.9", reviews: "124", category: "Plomería", price: "85", img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
    { id: 2, name: "Sara Jiménez", rating: "4.8", reviews: "98", category: "Electricidad", price: "95", img: "https://images.unsplash.com/photo-1621905252507-b35222d86400?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { id: 3, name: "Carlos Ruiz", rating: "5.0", reviews: "42", category: "Limpieza", price: "40", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { id: 4, name: "David López", rating: "4.7", reviews: "210", category: "Albañil", price: "110", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { id: 5, name: "Elena Ramos", rating: "4.9", reviews: "15", category: "Pintor", price: "60", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
    { id: 6, name: "Javier Soto", rating: "4.6", reviews: "88", category: "Jardinero", price: "55", img: "https://images.unsplash.com/photo-1558904541-efa843a96f0f?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
    { id: 7, name: "Ana Martínez", rating: "4.9", reviews: "56", category: "Técnico HVAC", price: "90", img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    { id: 8, name: "Roberto Gómez", rating: "4.8", reviews: "130", category: "Carpintero", price: "75", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    { id: 9, name: "Laura Vega", rating: "5.0", reviews: "89", category: "Informático", price: "65", img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
    { id: 10, name: "Fernando Díaz", rating: "4.5", reviews: "45", category: "Cerrajero", price: "50", img: "https://images.unsplash.com/photo-1558025137-0b406e9cb1dc?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
    { id: 11, name: "Sofía Castro", rating: "4.8", reviews: "201", category: "Personal de Limpieza", price: "45", img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { id: 12, name: "Mario Luna", rating: "4.7", reviews: "77", category: "Fletes y Mudanzas", price: "120", img: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=400&h=250&fit=crop", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
  ];

  const filteredPros = prosList.filter(pro => 
    pro.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pro.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPros = showAllPros ? filteredPros : filteredPros.slice(0, 3);

  return (
    <Layout>
      <div className="p-4 sm:p-8 space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Briefcase className="absolute -right-20 -bottom-20" size={400} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Encuentra ayuda experta para tu hogar.</h1>
            <p className="text-lg text-slate-500 mb-8">Profesionales verificados listos para ayudar con reparaciones, instalaciones y mantenimiento.</p>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value) setShowAllPros(true);
                }}
                placeholder="¿En qué necesitas ayuda hoy? (Ej: Plomero, Pintor...)" 
                className="w-full pl-12 pr-32 py-5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all shadow-sm bg-white text-slate-900"
              />
              <Button className="absolute right-2 top-2 bottom-2">Buscar</Button>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Barra Lateral de Servicios Mejorada - Sin scroll oculto para permitir el tooltip flotante */}
          <aside className="lg:col-span-3 space-y-6 pr-2 pb-10 relative z-40">
            <h2 className="text-2xl font-bold text-slate-900 sticky top-0 py-2 z-10">Catálogo de Servicios</h2>
            
            {serviceCategoriesData.map((category, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">{category.group}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                   {category.items.map((item, i) => (
                      <ServiceCategory key={i} icon={item.icon} label={item.label} description={item.desc} />
                   ))}
                </div>
              </div>
            ))}
          </aside>

          <div className="lg:col-span-9 space-y-8 relative z-10">
            {!searchTerm && !showAllPros && (
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-bold flex items-center gap-2 text-slate-900">
                    <MapPin size={20} className="text-blue-600" /> Profesionales Cercanos
                  </h3>
                  <span className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">12 Activos Ahora</span>
                </div>
                <div className="h-96 relative bg-slate-100">
                   <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200&h=800" className="w-full h-full object-cover opacity-50 contrast-125" alt="Mapa" />
                   <MapMarker top="20%" left="30%" icon={Wrench} label="Marcos T." />
                   <MapMarker top="50%" left="60%" icon={Zap} label="Sara J." />
                   <MapMarker top="70%" left="40%" icon={Wrench} label="David L." />
                </div>
              </div>
            )}

            <section>
              <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">
                   {searchTerm ? 'Resultados de Búsqueda' : showAllPros ? 'Todos los Profesionales' : 'Mejor Valorados'}
                </h2>
                {!searchTerm && (
                  <button 
                    onClick={() => setShowAllPros(!showAllPros)}
                    className="text-blue-600 font-bold flex items-center gap-1 group cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {showAllPros ? 'Contraer lista' : 'Ver todos'} <ArrowRight size={16} className={cn("transition-transform", showAllPros ? "rotate-180" : "group-hover:translate-x-1")} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {displayedPros.length > 0 ? displayedPros.map(pro => (
                   <ProCard key={pro.id} {...pro} />
                 )) : (
                   <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
                     <Search size={48} className="mx-auto text-slate-300 mb-4" />
                     <h3 className="text-lg font-bold text-slate-900 mb-1">No hay resultados</h3>
                     <p className="text-slate-500">Intenta buscar con otros términos como "Pintor" o "Limpieza".</p>
                   </div>
                 )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </Layout>
  );
};

// --- Componente de Categoría de Servicio (Con Tooltip Funcional al Hover) ---
const ServiceCategory = ({ icon: Icon, label, description }) => (
  <div className="relative group/item">
    <button className="w-full p-3 rounded-xl border border-slate-200 flex items-center gap-4 transition-all hover:border-blue-600/50 hover:shadow-md bg-white text-left cursor-pointer">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover/item:scale-110 bg-slate-50 text-slate-500 group-hover/item:text-blue-600 shrink-0">
        <Icon size={20} />
      </div>
      <span className="font-bold text-[13px] tracking-tight text-slate-900">{label}</span>
    </button>
    
    {/* Tooltip que se muestra hacia abajo al hacer hover sobre la tarjeta */}
    <div className="absolute z-[100] left-0 top-full mt-2 w-64 bg-slate-900 text-white text-xs p-4 rounded-xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all shadow-2xl pointer-events-none">
      <div className="absolute -top-1.5 left-6 w-3 h-3 bg-slate-900 rotate-45"></div>
      <p className="font-bold mb-1.5 text-blue-400 uppercase tracking-wider">{label}</p>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

const ProCard = ({ id, name, rating, reviews, category, price, img, avatar }) => {
  const { navigate } = useAppContext();
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
      <div className="h-40 overflow-hidden relative cursor-pointer" onClick={() => navigate(`/client/profile/${id}`)}>
        <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={name} />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 font-bold text-xs shadow-sm text-slate-900">
          <Star size={14} className="text-blue-600 fill-blue-600" /> {rating} ({reviews})
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg leading-tight text-slate-900">{name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Verified size={12} className="text-emerald-600"/> Antecedentes Revisados</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm -mt-10 relative overflow-hidden bg-white shrink-0">
             <img src={avatar} className="w-full h-full object-cover" alt="avatar" />
          </div>
        </div>
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold uppercase tracking-widest text-slate-700">{category}</span>
        </div>
        <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-auto">
          <span className="text-sm text-slate-500"><span className="font-bold text-lg text-slate-900">${price}</span> / hr</span>
          <Button size="sm" onClick={() => navigate('/client/request')}>Reservar</Button>
        </div>
      </div>
    </div>
  );
}

const MapMarker = ({ top, left, icon: Icon, label }) => (
  <div className="absolute cursor-pointer group" style={{ top, left }}>
     <div className="relative">
       <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110 z-10">
         <Icon size={18} />
       </div>
       <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rotate-45 z-0" />
     </div>
     <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
       {label}
     </div>
  </div>
);

const ServiceRequest = () => {
  const { navigate, addRequest } = useAppContext();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('Hoy');
  const [time, setTime] = useState('Tarde');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    // Guardar solicitud en el contexto
    addRequest({
      id: `WH-${Math.floor(1000 + Math.random() * 9000)}`,
      description,
      date,
      time,
      status: 'Buscando Técnico'
    });
    
    navigate('/client/status');
  };

  return (
    <Layout title="Nueva Solicitud" hideNav showBack>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12 mb-32">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Describe el problema</h1>
          <p className="text-slate-500">Proporciona detalles y fotos para que podamos conectarte con el profesional adecuado.</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
             <label className="font-bold flex items-center gap-2 text-slate-900"><FileText size={20} className="text-blue-600" /> Descripción del Problema</label>
             <textarea 
               rows={4} 
               required
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Ej: La tubería debajo del fregadero de la cocina gotea intensamente cuando el grifo está abierto..."
               className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900"
             />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
             <label className="font-bold flex items-center gap-2 text-slate-900"><Camera size={20} className="text-blue-600" /> Evidencia Fotográfica (Opcional)</label>
             <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={24} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-blue-600">Toca para subir fotos</p>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG o HEIC (Máx 5MB)</p>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8">
             <div className="space-y-4">
               <label className="font-bold flex items-center gap-2 text-slate-900"><Calendar size={20} className="text-blue-600" /> Fecha Preferida</label>
               <div className="grid grid-cols-3 gap-4">
                  <DayPicker label="Hoy" day="12" active={date === 'Hoy'} onClick={() => setDate('Hoy')} />
                  <DayPicker label="Mañana" day="13" active={date === 'Mañana'} onClick={() => setDate('Mañana')} />
                  <DayPicker label="Mié" day="14" active={date === 'Miércoles'} onClick={() => setDate('Miércoles')} />
               </div>
             </div>
             <div className="space-y-4">
               <label className="font-bold flex items-center gap-2 text-slate-900"><Clock size={20} className="text-blue-600" /> Hora Preferida</label>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <TimeOption label="Mañana" active={time === 'Mañana'} onClick={() => setTime('Mañana')} />
                  <TimeOption label="Tarde" active={time === 'Tarde'} onClick={() => setTime('Tarde')} />
                  <TimeOption label="Noche" active={time === 'Noche'} onClick={() => setTime('Noche')} />
                  <TimeOption label="Flexible" active={time === 'Flexible'} onClick={() => setTime('Flexible')} />
               </div>
             </div>
          </div>
          
          <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 p-6 flex flex-col gap-4 z-50">
            <div className="max-w-3xl mx-auto w-full">
              <Button type="submit" className="w-full">Enviar Solicitud <ArrowRight size={20} /></Button>
              <p className="text-center text-[11px] text-slate-500 mt-2 flex items-center justify-center gap-1">
                <Lock size={12} /> Transmisión segura. Aún no se requiere pago.
              </p>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

const DayPicker = ({ label, day, active, onClick }) => (
  <button type="button" onClick={onClick} className={cn(
    "flex flex-col items-center py-4 rounded-xl border-2 transition-all cursor-pointer",
    active ? "border-blue-600 bg-slate-100" : "border-slate-50 bg-white hover:border-slate-200"
  )}>
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</span>
    <span className="text-xl font-bold text-slate-900">{day}</span>
  </button>
);

const TimeOption = ({ label, active, onClick }) => (
  <button type="button" onClick={onClick} className={cn(
    "py-3 rounded-lg border-2 text-xs font-bold transition-all cursor-pointer",
    active ? "border-blue-600 text-blue-600 bg-slate-100" : "border-slate-50 bg-white text-slate-500 hover:border-slate-200"
  )}>
    {label}
  </button>
);

// --- Componentes Cliente Restantes (Actividad, Mis Servicios, Chat, Perfil) ---
const ServiceStatus = () => {
  const { navigate, clientRequests } = useAppContext();
  const activeRequest = clientRequests[0] || { id: 'WH-88492', description: 'Reparación Eléctrica' };

  return (
    <Layout title="Actividad" showBack={false}>
      <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-12">
        <div className="md:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Estado del Servicio</h1>
            <p className="text-slate-500 mt-1">Trabajo #{activeRequest.id} • {activeRequest.description}</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
            <div className="h-[400px] relative bg-slate-100 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200&h=800" className="w-full h-full object-cover" alt="Tracking Map" />
               <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm border border-slate-200 p-4 rounded-xl shadow-md flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-sm">
                    <Truck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Técnico en camino</p>
                    <p className="text-xl font-extrabold text-blue-600">Llega en 12 min</p>
                  </div>
               </div>
               <div className="absolute top-[45%] left-[55%] w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center animate-ping">
                 <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
               </div>
               <div className="absolute top-[45%] left-[55%] w-10 h-10 rounded-full flex items-center justify-center">
                 <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md" />
               </div>
            </div>
            <div className="p-6 md:p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-slate-200 overflow-hidden bg-slate-50">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Pro" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight text-slate-900">Marcos T.</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-700"><Star size={14} className="text-blue-600 fill-blue-600" /> 4.9 <span className="text-slate-500">(124 trabajos)</span></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate('/client/chat')} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 cursor-pointer"><MessageSquare size={20} /></button>
                <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 cursor-pointer"><Phone size={20} /></button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-slate-900">Progreso del Servicio</h3>
            <div className="space-y-0 relative pl-4">
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200"></div>
              <div className="absolute left-8 top-8 h-[25%] w-0.5 bg-emerald-600"></div>
              <div className="space-y-12">
                <StatusStep icon={CheckCircle2} label="Servicio Reservado" time="Hoy, 08:30 AM" active completed />
                <StatusStep icon={Truck} label="Técnico En Camino" time="ETA: 10:15 AM" active />
                <StatusStep icon={Wrench} label="Trabajo En Progreso" />
                <StatusStep icon={CheckCircle2} label="Trabajo Completado" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-8">
           <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-md">
             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 opacity-20 blur-3xl rounded-full"></div>
             <div className="relative z-10 flex flex-col gap-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center"><Lock size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pago Asegurado</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">Tus fondos están retenidos de forma segura. El técnico solo recibirá el pago después de que confirmes que el trabajo se ha completado a tu satisfacción.</p>
                  <a href="#" className="text-sm font-bold underline decoration-emerald-600 underline-offset-4 hover:text-emerald-500 transition-colors">Cómo funciona nuestro pago seguro</a>
                </div>
             </div>
           </div>

           <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-xl font-bold mb-6 border-b border-slate-200 pb-4 text-slate-900">Resumen Financiero</h3>
             <div className="space-y-4 mb-8">
                <FeeRow label="Tarifa de Diagnóstico" amount="85.00" />
                <FeeRow label="Partes Estimadas" amount="120.00" />
                <FeeRow label="Mano de Obra Estimada" amount="150.00" />
                <FeeRow label="Tarifa de Plataforma" amount="15.00" />
             </div>
             <div className="flex justify-between items-center mb-1 text-slate-900">
               <span className="font-bold text-lg">Total Retenido</span>
               <span className="font-extrabold text-2xl">$370.00</span>
             </div>
             <p className="text-right text-xs text-slate-500 mb-8">Pagado vía Visa terminada en ••42</p>
             <div className="bg-slate-100 p-4 rounded-xl flex gap-3 text-sm text-slate-500 border border-slate-200">
               <HelpCircle size={18} className="shrink-0 text-blue-600" />
               <p>El monto final puede variar según las partes reales y la mano de obra requerida. Cualquier ajuste requerirá tu aprobación antes de la liberación.</p>
             </div>
           </div>

           <div className="space-y-3">
             <Button variant="secondary" className="w-full" onClick={() => navigate('/client/invoice')}>Ver Factura Detallada</Button>
             <Button variant="danger" className="w-full">Cancelar Solicitud</Button>
           </div>
        </div>
      </div>
    </Layout>
  );
};

const ClientServices = () => {
  const { navigate, clientRequests } = useAppContext();
  const [activeTab, setActiveTab] = useState('activos');

  const pastServices = [
    { id: 'WH-7213', date: '12 Sep 2023', pro: 'Carlos Ruiz', category: 'Limpieza Profunda', amount: '$120.00', status: 'Completado' },
    { id: 'WH-6542', date: '04 Ago 2023', pro: 'Sara Jiménez', category: 'Instalación Eléctrica', amount: '$350.00', status: 'Completado' }
  ];

  return (
    <Layout title="Mis Servicios">
      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 mb-20">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Servicios Contratados</h1>
          <p className="text-slate-500 mt-1">Gestiona tus solicitudes activas y revisa tu historial.</p>
        </div>

        <div className="flex gap-4 border-b border-slate-200 pb-px">
          <button 
            onClick={() => setActiveTab('activos')}
            className={cn("pb-4 text-sm font-bold border-b-2 transition-colors cursor-pointer", activeTab === 'activos' ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900")}
          >
            Activos ({clientRequests.length})
          </button>
          <button 
            onClick={() => setActiveTab('historial')}
            className={cn("pb-4 text-sm font-bold border-b-2 transition-colors cursor-pointer", activeTab === 'historial' ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900")}
          >
            Historial
          </button>
        </div>

        {activeTab === 'activos' && (
          <div className="space-y-4">
            {clientRequests.length > 0 ? clientRequests.map(req => (
              <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Activity size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900">Solicitud #{req.id}</h3>
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">{req.status}</span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-1">{req.description}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Calendar size={12}/> Agendado para: {req.date} ({req.time})</p>
                  </div>
                </div>
                <Button onClick={() => navigate('/client/status')} className="w-full md:w-auto shrink-0">Ver Estado</Button>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No tienes servicios activos</h3>
                <p className="text-slate-500 mb-6 max-w-sm mx-auto">Cuando contrates a un profesional o envíes una solicitud, aparecerá aquí.</p>
                <Button onClick={() => navigate('/client')}>Buscar Profesionales</Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'historial' && (
          <div className="space-y-4">
            {pastServices.map(service => (
              <div key={service.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center shrink-0">
                    <History size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{service.category}</h3>
                    <p className="text-sm text-slate-500">Profesional: <span className="font-medium text-slate-700">{service.pro}</span></p>
                    <p className="text-xs text-slate-400 mt-1">{service.date} • {service.id}</p>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full">
                     <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">{service.status}</span>
                     <span className="font-extrabold text-lg text-slate-900">{service.amount}</span>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => navigate('/client/invoice')} className="w-full md:w-auto mt-2">Ver Factura</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

const InvoiceView = () => {
  const { navigate, clientRequests } = useAppContext();
  const activeReq = clientRequests[0] || { id: 'WH-88492' };
  const dateStr = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Layout title="Factura" showBack hideNav>
      <div className="max-w-3xl mx-auto p-4 sm:p-8 mb-20">
        <div className="flex justify-between items-center mb-6">
           <Button variant="ghost" onClick={() => navigate('back')}><ChevronLeft size={18}/> Volver</Button>
           <div className="flex gap-2">
             <Button variant="secondary" className="text-slate-600"><Printer size={18} /> Imprimir</Button>
             <Button className="bg-slate-900"><Download size={18} /> Descargar PDF</Button>
           </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-lg">
           <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-200 pb-8 mb-8 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="text-white" size={18} />
                  </div>
                  <span className="text-xl font-extrabold text-slate-900">Work Home</span>
                </div>
                <p className="text-slate-500 text-sm">Plataforma de Servicios Confiables</p>
                <p className="text-slate-500 text-sm">123 Tech Avenue, Suite 400</p>
              </div>
              <div className="md:text-right">
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">FACTURA</h2>
                 <p className="text-sm text-slate-500 font-medium">Referencia: <span className="text-slate-900">{activeReq.id}</span></p>
                 <p className="text-sm text-slate-500 font-medium">Fecha: <span className="text-slate-900">{dateStr}</span></p>
                 <div className="inline-block mt-3 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                    FONDOS RETENIDOS (SEGURO)
                 </div>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Facturado a:</p>
                 <p className="font-bold text-slate-900">Cliente Work Home</p>
                 <p className="text-sm text-slate-500">cliente@email.com</p>
              </div>
              <div className="md:text-right">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Profesional Asignado:</p>
                 <p className="font-bold text-slate-900">Marcos T. (Plomería Expertos)</p>
              </div>
           </div>

           <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b-2 border-slate-200">
                       <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Descripción del Servicio</th>
                       <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Cant.</th>
                       <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Precio Unit.</th>
                       <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Importe</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm text-slate-700">
                    <tr className="border-b border-slate-100">
                       <td className="py-4 font-medium text-slate-900">Tarifa de Diagnóstico y Visita</td>
                       <td className="py-4 text-right">1</td>
                       <td className="py-4 text-right">$85.00</td>
                       <td className="py-4 text-right font-medium text-slate-900">$85.00</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                       <td className="py-4 font-medium text-slate-900 flex items-center gap-1"><ShieldCheck size={14} className="text-blue-600"/> Tarifa de Plataforma y Seguro</td>
                       <td className="py-4 text-right">1</td>
                       <td className="py-4 text-right">$15.00</td>
                       <td className="py-4 text-right font-medium text-slate-900">$15.00</td>
                    </tr>
                 </tbody>
              </table>
           </div>

           <div className="flex justify-end mb-12">
              <div className="w-full md:w-1/2 space-y-3">
                 <div className="flex justify-between text-xl font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                    <span>Total Retenido</span>
                    <span className="text-blue-600">$100.00</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

const Chat = () => {
  const { navigate, messages, addMessage } = useAppContext();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addMessage({ sender: 'client', text: inputText });
    setInputText('');
    setTimeout(() => {
      addMessage({ sender: 'pro', text: '¡Entendido! Lo revisaré y te aviso en seguida. ¿Hay algún otro detalle importante?' });
    }, 1500);
  };

  return (
    <Layout hideNav showBack title="Chat">
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-64px)] relative bg-slate-50">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-white sticky top-0 z-10 shadow-sm">
          <img src="https://images.unsplash.com/photo-1540569014015-19a7ee000766?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full bg-slate-100" alt="Pro" />
          <div>
            <h3 className="font-bold leading-tight text-slate-900">David's Plumbing Pros</h3>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-600 rounded-full inline-block"></span> En línea
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.sender === 'client' ? "justify-end" : "justify-start")}>
              {msg.type === 'quote' ? (
                <div className="bg-white border-2 border-blue-600/30 rounded-2xl shadow-md overflow-hidden max-w-[90%] md:max-w-[70%]">
                   <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                     <div className="flex items-center gap-2"><Receipt size={18} className="text-blue-600" /><span className="font-bold text-sm text-slate-900">Presupuesto #Q-8492</span></div>
                     <span className="bg-blue-600/10 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Pendiente</span>
                   </div>
                   <div className="p-6 space-y-6">
                      <div className="flex justify-between items-center text-slate-900">
                        <span className="font-bold">Total</span>
                        <span className="font-extrabold text-2xl text-blue-600">$250.00</span>
                      </div>
                   </div>
                   <div className="p-4 border-t border-slate-200 flex gap-3">
                     <Button variant="secondary" className="flex-1 py-3 text-xs">Declinar</Button>
                     <Button className="flex-1 py-3 text-xs" onClick={() => navigate('/client/confirm')}>Aceptar Presupuesto</Button>
                   </div>
                </div>
              ) : (
                <div className={cn(
                  "p-4 rounded-2xl text-sm max-w-[85%] shadow-sm",
                  msg.sender === 'client' 
                    ? "bg-slate-900 text-white rounded-tr-none" 
                    : "bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200"
                )}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto flex items-center gap-4">
             <div className="flex-1 relative">
               <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 placeholder="Escribe un mensaje..." 
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-6 pr-12 outline-none focus:border-blue-600 text-slate-900" 
               />
               <button type="submit" disabled={!inputText.trim()} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 disabled:opacity-50 transition-colors cursor-pointer"><Send size={20} /></button>
             </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const PaymentConfirmation = () => {
  const { navigate } = useAppContext();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-12 text-center shadow-md border border-slate-200 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-600/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 size={48} strokeWidth={3} />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-slate-900">Pago Liberado con Éxito</h1>
        <p className="text-slate-500 mb-12">¡Gracias por confirmar! Tu pago ha sido enviado al profesional.</p>
        <Button variant="outline" className="w-full" onClick={() => navigate('/client')}>Volver al Inicio</Button>
      </div>
    </div>
  );
}

const ServiceReview = () => {
  const { navigate } = useAppContext();
  return (
    <Layout hideNav showBack title="Reseña del Servicio">
       <div className="p-4 sm:p-8 max-w-2xl mx-auto space-y-12 mb-20">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">Califica tu Servicio</h1>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-10">
             <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                   {[...Array(5)].map((_, i) => <Star key={i} size={48} className={i < 4 ? "text-blue-600 fill-blue-600 cursor-pointer" : "text-slate-200 cursor-pointer"} />)}
                </div>
             </div>
             <Button className="w-full h-14" onClick={() => navigate('/client/confirm')}>Enviar Reseña y Liberar Pago</Button>
          </div>
       </div>
    </Layout>
  );
};

const ProProfile = () => {
  const { navigate } = useAppContext();
  return (
    <Layout showBack title="Perfil del Profesional">
      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-md relative overflow-hidden flex flex-col md:flex-row gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="shrink-0 flex flex-col items-center md:items-start z-10">
              <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-sm overflow-hidden mb-4 bg-slate-100">
                <img src="https://images.unsplash.com/photo-1540569014015-19a7ee000766?w=400&h=400&fit=crop" className="w-full h-full object-cover" alt="Pro" />
              </div>
              <div className="bg-emerald-600/10 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-600/20 flex items-center gap-1.5 text-xs font-bold">
                <Verified size={14} fill="currentColor" /> Perfil Verificado
              </div>
            </div>
            <div className="flex-1 text-center md:text-left z-10 pt-4">
              <h1 className="text-3xl font-extrabold mb-1 text-slate-900">Michael Reynolds</h1>
              <p className="text-blue-600 font-bold mb-6">Maestro Electricista y Especialista en Hogar Inteligente</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8 text-sm font-medium">
                <div className="flex items-center gap-2 text-slate-900"><Star size={16} className="text-yellow-500 fill-yellow-500" /> 4.9</div>
                <div className="flex items-center gap-2 text-slate-500"><Briefcase size={16} /> 8 Años Exp.</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
             <Button className="w-full h-14" onClick={() => navigate('/client/request')}>Obtener Presupuesto</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Trabajo Reciente</h3>
                <button className="text-blue-600 font-bold text-sm cursor-pointer">Ver Todo</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {['1585704032915-c3400ca199e7', '1621905252507-b35222d86400', '1504328345606-18bbc8c9d7d1'].map((id, i) => (
                   <div key={i} className="aspect-square rounded-2xl bg-slate-100 overflow-hidden group">
                     <img 
                       src={`https://images.unsplash.com/photo-${id}?w=300&h=300&fit=crop`} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                       alt="Work" 
                     />
                   </div>
                 ))}
                 <div className="aspect-square rounded-2xl bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
                    <div className="text-center text-blue-600">
                      <Camera size={32} className="mx-auto mb-1" />
                      <p className="text-xs font-bold">+12 Fotos</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Reseñas de la Comunidad</h3>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-900"><Star size={16} fill="#f59e0b" className="text-yellow-500" /> 4.9</div>
              </div>
              <div className="space-y-6">
                 {[1, 2].map(i => (
                   <div key={i} className="space-y-3 pb-6 border-b border-slate-200 last:border-0">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-900">S{i}</div>
                          <span>Sara J. • Hace 2 semanas</span>
                        </div>
                        <div className="flex text-yellow-500"><Star size={12} fill="currentColor"/> <Star size={12} fill="currentColor"/> <Star size={12} fill="currentColor"/> <Star size={12} fill="currentColor"/> <Star size={12} fill="currentColor"/></div>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-700">Michael fue increíble. Llegó a tiempo, diagnosticó el problema de nuestro panel en 10 minutos y lo arregló rápidamente.</p>
                   </div>
                 ))}
              </div>
              <Button variant="outline" className="w-full">Leer Todas las Reseñas</Button>
           </div>
        </div>
      </div>
    </Layout>
  );
};


// --- Panel y Flujo del Profesional (Con Funcionalidad) ---

const ProDashboard = () => {
  const { navigate, clientRequests } = useAppContext();
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [declinedJobs, setDeclinedJobs] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleAccept = (id) => {
    setAcceptedJobs([...acceptedJobs, id]);
  };

  const handleDecline = (id) => {
    setDeclinedJobs([...declinedJobs, id]);
  };

  const mockRequests = [
    { id: "req-1", description: "Reparación de Fuga de Urgencia", type: "Urgente", dist: "1.2", time: "10", payout: "150 - 200", icon: Home, isUrgent: true },
    { id: "req-2", description: "Inspección de Caja de Breakers", type: "Estándar", dist: "3.5", time: "25", payout: "85 - 120", icon: Zap, isUrgent: false }
  ];

  const visibleClientReqs = clientRequests.filter(req => !declinedJobs.includes(req.id)).map(req => ({
    ...req, dist: "0.8", time: "5", payout: "100 - 150", icon: Activity, isUrgent: false
  }));

  const allVisibleReqs = [...visibleClientReqs, ...mockRequests.filter(r => !declinedJobs.includes(r.id))];

  return (
    <Layout>
      <div className="p-4 sm:p-8 space-y-12 mb-20 md:mb-12 relative">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900">Panel de Control</h1>
          <p className="text-slate-500">Aquí tienes tu resumen operativo diario.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Ganancias Semanales</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-4xl font-bold text-slate-900">$1,850.00</h2>
                  <div className="flex items-center gap-1 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 border border-emerald-600/20">
                    <TrendingUp size={12} /> +12%
                  </div>
                </div>
              </div>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 cursor-pointer"><MoreVertical size={20} /></button>
            </div>
            <div className="h-40 flex items-end gap-2 mt-12">
               {[30, 45, 25, 60, 80, 100, 15].map((h, i) => (
                 <div key={i} className={cn(
                   "flex-1 rounded-t-lg transition-all duration-500",
                   i === 5 ? "bg-blue-600 shadow-md" : "bg-slate-200 group-hover:bg-blue-600/20"
                  )} style={{ height: `${h}%` }} />
               ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
             <div className="flex justify-between items-center">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Puntuación de Reputación</p>
               <Verified size={18} className="text-blue-600" />
             </div>
             <div className="space-y-1">
               <div className="flex items-center gap-3">
                 <h2 className="text-4xl font-bold text-slate-900">4.9</h2>
                 <div className="flex text-yellow-500">
                   {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
                 </div>
               </div>
               <p className="text-xs text-slate-500 font-medium">Profesional verificado • 142 reseñas</p>
             </div>
             <div className="h-px bg-slate-200"></div>
             <div className="flex justify-between items-center">
               <div className="space-y-0.5">
                 <p className="font-bold text-sm text-slate-900">Tasa de Respuesta</p>
                 <p className="text-emerald-600 font-bold text-xs">98% Promedio Global</p>
               </div>
               <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center relative bg-white">
                 <svg className="absolute inset-0 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                   <circle cx="18" cy="18" r="16" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="98, 100" />
                 </svg>
                 <span className="text-[10px] font-bold text-slate-900">98</span>
               </div>
             </div>
          </div>
        </div>

        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900">Solicitudes Cercanas</h2>
            <Button variant="ghost" className="text-blue-600" onClick={() => setIsFilterOpen(true)}>
              <Settings size={18}/> Filtro
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allVisibleReqs.length > 0 ? allVisibleReqs.map(req => (
               <PendingRequestCard 
                 key={req.id}
                 title={req.description.slice(0, 30) + (req.description.length > 30 ? '...' : '')} 
                 type={req.type || "Nueva"} 
                 dist={req.dist} 
                 time={req.time} 
                 payout={req.payout}
                 icon={req.icon}
                 isUrgent={req.isUrgent}
                 accepted={acceptedJobs.includes(req.id)}
                 onAccept={() => handleAccept(req.id)}
                 onDecline={() => handleDecline(req.id)}
               />
            )) : (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
                 <CheckCircle2 size={48} className="mx-auto text-emerald-400 mb-4" />
                 <h3 className="text-xl font-bold text-slate-900">Todo al día</h3>
                 <p className="text-slate-500 mt-2">No hay nuevas solicitudes en tu área en este momento.</p>
              </div>
            )}
          </div>
        </section>

        {/* Modal de Filtro Funcional */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-lg text-slate-900">Filtrar Solicitudes</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors"><X size={20}/></button>
                </div>
                <div className="p-6 space-y-6">
                   <div className="space-y-3">
                     <p className="text-sm font-bold text-slate-900">Distancia Máxima</p>
                     <input type="range" className="w-full accent-blue-600" min="1" max="50" defaultValue="15" />
                     <div className="flex justify-between text-xs text-slate-500"><span>1 mi</span><span>15 mi</span><span>50 mi</span></div>
                   </div>
                   <div className="space-y-3">
                     <p className="text-sm font-bold text-slate-900">Tipo de Trabajo</p>
                     <div className="flex flex-wrap gap-2">
                       <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer">Todos</span>
                       <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer">Urgencias</span>
                       <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer">Residencial</span>
                     </div>
                   </div>
                </div>
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsFilterOpen(false)}>Cancelar</Button>
                  <Button onClick={() => setIsFilterOpen(false)}>Aplicar Filtros</Button>
                </div>
             </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const PendingRequestCard = ({ title, type, dist, time, payout, icon: Icon, isUrgent, accepted, onAccept, onDecline }) => (
  <div className={cn("bg-white p-6 rounded-2xl border shadow-sm transition-all group flex flex-col", accepted ? "opacity-75 border-emerald-600" : "border-slate-200 hover:shadow-md")}>
    <div className="flex justify-between items-start mb-6">
      <div className="flex gap-4">
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
          isUrgent ? "bg-red-50 text-red-600" : "bg-slate-100 text-blue-600"
        )}>
          <Icon size={28} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 leading-tight mb-1">{title}</h4>
          <p className="text-sm text-slate-500">Residencial • Reparación</p>
        </div>
      </div>
      <span className={cn(
        "px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shrink-0 ml-2",
        accepted ? "bg-emerald-600 text-white" : isUrgent ? "bg-red-500 text-white" : "bg-slate-200 text-slate-900"
      )}>{accepted ? 'Aceptado' : type}</span>
    </div>
    <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-200 flex-1">
      <div className="space-y-1">
        <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12}/> a {dist} millas</p>
        <p className="font-bold text-slate-900">Est. {time} mins</p>
      </div>
      <div className="text-right space-y-1">
        <p className="text-xs text-slate-500">Pago Estimado</p>
        <p className="text-xl font-extrabold text-slate-900">${payout}</p>
      </div>
    </div>
    <div className="flex gap-4 mt-6">
      {!accepted ? (
        <>
          <Button variant="secondary" className="flex-1 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50" onClick={onDecline}>Declinar</Button>
          <Button className="flex-1" onClick={onAccept}>Aceptar Trabajo</Button>
        </>
      ) : (
        <Button variant="secondary" className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50 cursor-default"><CheckCircle2 size={18}/> En Progreso</Button>
      )}
    </div>
  </div>
);

const ProSchedule = () => {
  const { navigate } = useAppContext();
  const [showAllQuotes, setShowAllQuotes] = useState(false);

  const activeQuotes = [
    { id: 1, title: "Desvío de Tubería de Cocina", status: "Enviado", price: "1,250", name: "Sara Jiménez" },
    { id: 2, title: "Arreglo de Calentador", status: "Visto", price: "450", name: "Miguel Chen", active: true },
    { id: 3, title: "Revisión de Panel Principal", status: "Enviado", price: "200", name: "Elena Ramos" },
    { id: 4, title: "Instalación de Lámparas", status: "Pendiente", price: "150", name: "David López" }
  ];

  const visibleQuotes = showAllQuotes ? activeQuotes : activeQuotes.slice(0, 2);

  return (
    <Layout title="Agenda">
      <div className="p-4 sm:p-8 space-y-8 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Agenda y Presupuestos</h1>
            <p className="text-slate-500 mt-1">Gestiona tus próximas citas y propuestas activas a clientes.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-100 px-6 py-3 rounded-full border border-slate-200 text-slate-900">
            <span className="text-sm font-bold">Disponible para Reservas</span>
            <div className="w-12 h-6 bg-emerald-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-bold text-slate-900">Octubre 2023</h2>
               <div className="flex gap-2 text-slate-700">
                 <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100 cursor-pointer"><ChevronLeft size={20}/></button>
                 <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100 cursor-pointer"><ArrowRight size={20}/></button>
               </div>
             </div>
             <div className="grid grid-cols-7 bg-slate-200 gap-px rounded-2xl border border-slate-200 overflow-hidden">
               {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                 <div key={d} className="bg-slate-100 p-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500">{d}</div>
               ))}
               {[...Array(31)].map((_, i) => (
                 <div key={i} className={cn(
                   "bg-white min-h-24 p-2 text-right text-xs font-bold text-slate-900",
                   i === 1 || i === 9 ? "bg-slate-100/30" : ""
                 )}>
                   {i + 1}
                   {i === 1 && <div className="mt-2 bg-blue-600/10 text-blue-600 p-1 rounded text-[9px] text-left border border-blue-600/20">10:00 AM - Plomería</div>}
                   {i === 9 && <div className="mt-2 bg-emerald-600/10 text-emerald-600 p-1 rounded text-[9px] text-left border border-emerald-600/20">2:30 PM - Estimación</div>}
                 </div>
               ))}
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col min-h-full">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-slate-900">Presupuestos Activos</h3>
                 <button 
                   onClick={() => setShowAllQuotes(!showAllQuotes)}
                   className="text-blue-600 font-bold text-xs cursor-pointer hover:underline"
                 >
                   {showAllQuotes ? "Ver Menos" : "Ver Todo"}
                 </button>
               </div>
               <div className="space-y-4 flex-1">
                  {visibleQuotes.map(q => (
                    <QuoteItem key={q.id} title={q.title} status={q.status} price={q.price} name={q.name} active={q.active} />
                  ))}
               </div>
               {/* Funcionalidad: Navegar a pantalla de nuevo presupuesto */}
               <Button className="w-full mt-8" onClick={() => navigate('/pro/quote/new')}>
                 <Plus size={18}/> Nuevo Presupuesto
               </Button>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const QuoteItem = ({ title, status, price, name, active }) => (
  <div className={cn(
    "p-4 rounded-2xl border-2 transition-all cursor-pointer",
    active ? "bg-blue-600/5 border-blue-600" : "bg-white border-slate-200 hover:border-blue-600/30"
  )}>
    <div className="flex justify-between items-start mb-3">
       <span className={cn("text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full", active ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500")}>{status}</span>
       <span className="font-bold text-slate-900">${price}</span>
    </div>
    <h4 className="font-bold text-sm mb-1 text-slate-900">{title}</h4>
    <p className="text-xs text-slate-500 flex items-center gap-1"><User size={12}/> {name}</p>
  </div>
);

// Nueva Pantalla: Crear Nuevo Presupuesto (Flujo del Profesional)
const ProQuoteNew = () => {
  const { navigate } = useAppContext();
  return (
    <Layout title="Crear Nuevo Presupuesto" hideNav showBack>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 mb-32">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Generar Cotización</h1>
          <p className="text-slate-500">Completa los detalles de los costos para enviar al cliente. Los precios deben incluir desglose.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/pro/schedule'); }}>
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
             
             <div className="space-y-3">
               <label className="text-sm font-bold text-slate-900">Seleccionar Cliente / Solicitud</label>
               <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900">
                 <option>Sara Jiménez - Reparación de Fuga de Urgencia</option>
                 <option>Cliente Nuevo - Sin solicitud previa</option>
               </select>
             </div>

             <div className="space-y-3">
               <label className="text-sm font-bold text-slate-900">Descripción del Trabajo a Realizar</label>
               <textarea rows={3} placeholder="Describa los servicios específicos..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900" />
             </div>

             <div className="border-t border-slate-200 pt-6 space-y-4">
                <h3 className="font-bold text-slate-900 mb-4">Desglose de Costos</h3>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Concepto</label>
                    <input type="text" defaultValue="Mano de Obra" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 mt-1 text-sm outline-none focus:border-blue-600" />
                  </div>
                  <div className="w-32">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Monto ($)</label>
                    <input type="number" defaultValue="150" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 mt-1 text-sm outline-none focus:border-blue-600 font-bold" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input type="text" defaultValue="Materiales y Refacciones" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-blue-600" />
                  </div>
                  <div className="w-32">
                    <input type="number" defaultValue="85" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm outline-none focus:border-blue-600 font-bold" />
                  </div>
                </div>

                <button type="button" className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline mt-2"><Plus size={16}/> Añadir otro concepto</button>
             </div>

             <div className="bg-slate-100 p-6 rounded-xl flex justify-between items-center mt-6">
                <span className="font-bold text-slate-500">Total Presupuestado</span>
                <span className="text-3xl font-extrabold text-slate-900">$235.00</span>
             </div>
          </div>
          
          <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 p-6 flex flex-col gap-4 z-50">
            <div className="max-w-3xl mx-auto w-full flex gap-4">
              <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate('back')}>Cancelar</Button>
              <Button type="submit" className="flex-1">Enviar al Cliente <Send size={18} /></Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}


// --- Manejador Principal de la Aplicación ---

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [role, setRole] = useState('client');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'pro', text: '¡Hola! He revisado las fotos de la tubería que gotea debajo del fregadero. Sin duda puedo arreglar eso. He preparado un presupuesto para la reparación.' },
    { id: 2, sender: 'pro', type: 'quote' },
    { id: 3, sender: 'client', text: 'Gracias por responder tan rápido. El precio me parece bien. ¿Cuándo podrías venir?' }
  ]);
  const [clientRequests, setClientRequests] = useState([]);

  // Simulador de Navegación Simple
  const navigate = (path) => {
    if (path === 'back') {
      setCurrentRoute(prev => {
        if (prev === '/client/request' || prev === '/client/services') return '/client';
        if (prev === '/client/chat') return '/client/status';
        if (prev === '/client/invoice') return '/client/status';
        if (prev === '/pro/quote/new') return '/pro/schedule';
        return '/';
      });
    } else {
      window.scrollTo(0,0);
      setCurrentRoute(path);
    }
  };

  const addMessage = (msg) => {
    setMessages(prev => [...prev, { id: Date.now(), ...msg }]);
  };

  const addRequest = (req) => {
    setClientRequests([req, ...clientRequests]);
  };

  // Selector de Componentes según la ruta
  const renderRoute = () => {
    switch (currentRoute) {
      case '/': return <Onboarding />;
      case '/client': return <ClientDashboard />;
      case '/client/services': return <ClientServices />;
      case '/client/request': return <ServiceRequest />;
      case '/client/status': return <ServiceStatus />;
      case '/client/chat': return <Chat />;
      case '/client/invoice': return <InvoiceView />;
      case '/client/confirm': return <PaymentConfirmation />;
      case '/client/review': return <ServiceReview />;
      case '/pro': return <ProDashboard />;
      case '/pro/schedule': return <ProSchedule />;
      case '/pro/quote/new': return <ProQuoteNew />;
      default: 
        if (currentRoute.startsWith('/client/profile')) return <ProProfile />;
        return <Onboarding />;
    }
  };

  // Inyección del Tema Global
  return (
    <AppContext.Provider value={{ 
      currentRoute, 
      navigate, 
      role, 
      setRole,
      messages,
      addMessage,
      clientRequests,
      addRequest
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        body { font-family: "Manrope", ui-sans-serif, system-ui, sans-serif; }
      `}</style>
      {renderRoute()}
    </AppContext.Provider>
  );
}