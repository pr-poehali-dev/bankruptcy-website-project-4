import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const LEAD_URL = 'https://functions.poehali.dev/0a9c7dee-237b-4a40-88c2-ac3449af0ac4';
const PORTRAIT = 'https://cdn.poehali.dev/projects/3dd36d97-b480-4702-892f-9d66ac6d871e/bucket/cc528185-5537-4474-b15e-c33b3816e8c0.jpg';

const NAV = [
  { id: 'about', label: 'Обо мне' },
  { id: 'services', label: 'Услуги' },
  { id: 'cases', label: 'Кейсы' },
  { id: 'guarantees', label: 'Гарантии' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'contacts', label: 'Контакты' },
];

const FAQ = [
  { q: 'Сколько стоит процедура банкротства?', a: 'Стоимость зависит от сложности вашей ситуации, поэтому рассчитывается индивидуально на бесплатной консультации. Без скрытых платежей — вы заранее знаете точную сумму.' },
  { q: 'Правда ли консультация бесплатная?', a: 'Да, первичная консультация полностью бесплатна. Я разберу вашу ситуацию, оценю перспективы дела и отвечу на все вопросы — без каких-либо обязательств с вашей стороны.' },
  { q: 'Можно ли сохранить ипотечную квартиру?', a: 'Во многих случаях — да. Я подбираю индивидуальную стратегию, чтобы сохранить ипотечное жильё даже в процессе банкротства. Конкретные варианты обсудим на консультации.' },
  { q: 'Сколько времени занимает процедура?', a: 'Благодаря быстрой подаче заявлений и оперативному сбору документов процедура проходит в сжатые сроки. Точный срок зависит от вашей ситуации — в среднем от 6 до 9 месяцев.' },
  { q: 'Перестанут ли звонить коллекторы?', a: 'Да. С момента подачи заявления о банкротстве прекращаются звонки коллекторов, начисление пеней и любые взыскания по вашим долгам.' },
  { q: 'Какие долги можно списать через банкротство?', a: 'Через банкротство списываются: кредиты в банках (потребительские, автокредиты), долги по кредитным картам, займы в МФО, долги перед физическими лицами по распискам, долги по ЖКХ, налоги и штрафы. Не списываются: алименты, возмещение вреда здоровью и ущерба от преступлений, субсидиарная ответственность.' },
  { q: 'Какие документы нужны для начала?', a: 'На бесплатной консультации я составлю полный список под вашу ситуацию. Основную бумажную работу и сбор документов я беру на себя — вам не придётся ходить по инстанциям.' },
];

const SERVICES = [
  { icon: 'FileX2', title: 'Списание долгов', text: 'Полное освобождение от долгов перед банками, МФО и коллекторами через процедуру банкротства.' },
  { icon: 'Home', title: 'Сохранение ипотеки', text: 'Помогаю сохранить ипотечное жильё даже в процессе банкротства — индивидуальная стратегия.' },
  { icon: 'FileSignature', title: 'Сбор документов', text: 'Быстрая подготовка и подача заявлений. Берём бумажную работу на себя — вам не нужно ходить по инстанциям.' },
  { icon: 'ShieldCheck', title: 'Защита от коллекторов', text: 'С момента подачи заявления прекращаются звонки, начисление пеней и взыскания.' },
  { icon: 'Scale', title: 'Сопровождение в суде', text: 'Полное юридическое сопровождение на всех этапах процедуры до получения определения суда.' },
  { icon: 'MessagesSquare', title: 'Бесплатная консультация', text: 'Разбираю вашу ситуацию, оцениваю перспективы и рассчитываю стоимость индивидуально.' },
];

const CASES = [
  { sum: '2 400 000 ₽', desc: 'Списан долг по потребительским кредитам в трёх банках. Срок — 7 месяцев.', tag: 'Кредиты' },
  { sum: '1 150 000 ₽', desc: 'Долги по микрозаймам и кредитным картам. Ипотека сохранена.', tag: 'Ипотека' },
  { sum: '3 800 000 ₽', desc: 'Банкротство ИП с сохранением единственного жилья семьи.', tag: 'Бизнес' },
  { sum: '890 000 ₽', desc: 'Освобождение от долгов после поручительства по чужому кредиту.', tag: 'Поручительство' },
];

const GUARANTEES = [
  { icon: 'BadgeCheck', title: 'Гарантия результата', text: 'Письменная гарантия на выполнение работ. Если не возьмусь — честно скажу об этом сразу.' },
  { icon: 'Clock', title: 'Сжатые сроки', text: 'Быстрая подача заявлений и сбор документов сокращают срок процедуры.' },
  { icon: 'Wallet', title: 'Честная цена', text: 'Стоимость рассчитывается индивидуально на бесплатной консультации. Без скрытых платежей.' },
  { icon: 'Award', title: '8 лет опыта', text: 'Сотни доведённых до конца дел и кейсов разной сложности.' },
];

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({ title: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявка отправлена', description: 'Я свяжусь с вами в ближайшее время.' });
      setForm({ name: '', phone: '', message: '' });
    } catch {
      toast({ title: 'Ошибка отправки', description: 'Позвоните напрямую: +7 912 590-89-64', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-navy-deep/95 backdrop-blur border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <button onClick={() => scrollTo('hero')} className="flex flex-col leading-none text-left">
            <span className="font-display text-xl text-white tracking-wide">Митрофанова М.А.</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold">Банкротство физлиц</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-white/70 hover:text-gold transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('consult')} className="bg-gold text-navy hover:bg-gold/90 rounded-none font-medium">
            Консультация
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative bg-navy-deep text-white pt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(hsl(var(--gold)) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28 relative">
          <div className="animate-fade-up">
            <div className="gold-line mb-8" />
            <p className="uppercase tracking-[0.3em] text-gold text-xs mb-6">Юридическая помощь · Опыт 8 лет</p>
            <h1 className="font-display text-5xl lg:text-7xl leading-[1.05] mb-6">
              Законно избавлю<br />вас от долгов
            </h1>
            <p className="text-white/70 text-lg max-w-md mb-10">
              Помогаю людям в сложной финансовой ситуации списать долги и сохранить ипотеку. Бесплатная консультация и гарантия результата.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollTo('consult')} size="lg" className="bg-gold text-navy hover:bg-gold/90 rounded-none text-base px-8">
                Бесплатная консультация
              </Button>
              <Button onClick={() => scrollTo('services')} size="lg" variant="outline" className="rounded-none border-white/30 text-white hover:bg-white/10 bg-transparent text-base px-8">
                Узнать об услугах
              </Button>
            </div>
            <div className="flex gap-10 mt-14">
              {[['8 лет', 'опыта'], ['100%', 'конфиденциально'], ['0 ₽', 'консультация']].map(([a, b]) => (
                <div key={b}>
                  <div className="font-display text-3xl text-gold">{a}</div>
                  <div className="text-xs uppercase tracking-wider text-white/50">{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 border border-gold/30" />
            <img src={PORTRAIT} alt="Митрофанова Мария Александровна" className="relative w-full h-[520px] object-cover object-top grayscale-[15%]" />
            <div className="absolute -bottom-6 -left-6 bg-gold text-navy p-5 max-w-[220px]">
              <div className="font-display text-xl leading-tight">Митрофанова Мария Александровна</div>
              <div className="text-xs mt-1 opacity-80">Специалист по банкротству</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="uppercase tracking-[0.3em] text-gold text-xs mb-4">Обо мне</p>
            <h2 className="font-display text-4xl lg:text-5xl text-navy mb-6 leading-tight">
              Меня зовут Мария.<br />Я на вашей стороне
            </h2>
            <div className="gold-line mb-8" />
          </div>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>Более 8 лет я помогаю физическим лицам выходить из сложных финансовых ситуаций через процедуру банкротства. За это время накопила большой опыт и провела множество дел разной сложности.</p>
            <p>Я понимаю, как тяжело жить под давлением долгов и звонков коллекторов. Моя задача — снять с вас этот груз законным путём, защитить ваше имущество и по возможности сохранить ипотечное жильё.</p>
            <p>Каждое дело веду лично, от первой консультации до определения суда. Работаю честно и прозрачно — вы всегда знаете, на каком этапе находится ваша процедура.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="uppercase tracking-[0.3em] text-gold text-xs mb-4">Услуги</p>
            <h2 className="font-display text-4xl lg:text-5xl text-navy mb-4">Как я могу помочь</h2>
            <div className="gold-line mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-card p-9 hover-lift">
                <div className="w-12 h-12 flex items-center justify-center bg-navy text-gold mb-6">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display text-2xl text-navy mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="uppercase tracking-[0.3em] text-gold text-xs mb-4">Кейсы</p>
          <h2 className="font-display text-4xl lg:text-5xl text-navy mb-4">Реальные результаты</h2>
          <div className="gold-line mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {CASES.map((c) => (
            <div key={c.sum} className="bg-card p-9 hover-lift flex gap-6">
              <div className="shrink-0">
                <div className="w-14 h-14 flex items-center justify-center border border-gold text-gold">
                  <Icon name="TrendingDown" size={26} />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold">{c.tag}</span>
                <div className="font-display text-3xl text-navy my-1">Списано {c.sum}</div>
                <p className="text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GUARANTEES */}
      <section id="guarantees" className="py-24 bg-navy-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(hsl(var(--gold)) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="uppercase tracking-[0.3em] text-gold text-xs mb-4">Гарантии</p>
            <h2 className="font-display text-4xl lg:text-5xl mb-4">Почему мне доверяют</h2>
            <div className="gold-line mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {GUARANTEES.map((g) => (
              <div key={g.title} className="text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center border border-gold/40 text-gold mb-6">
                  <Icon name={g.icon} size={30} />
                </div>
                <h3 className="font-display text-2xl mb-3">{g.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="uppercase tracking-[0.3em] text-gold text-xs mb-4">Вопросы и ответы</p>
            <h2 className="font-display text-4xl lg:text-5xl text-navy mb-6 leading-tight">
              Частые<br />вопросы
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-muted-foreground">
              Не нашли ответ на свой вопрос? Задайте его лично на бесплатной консультации.
            </p>
            <Button onClick={() => scrollTo('consult')} className="mt-6 bg-navy text-white hover:bg-navy/90 rounded-none">
              Задать вопрос
            </Button>
          </div>
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="font-display text-xl text-navy text-left hover:no-underline hover:text-gold py-6">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CONSULT FORM */}
      <section id="consult" className="py-24 bg-secondary"><div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-gold text-xs mb-4">Консультация</p>
            <h2 className="font-display text-4xl lg:text-5xl text-navy mb-6 leading-tight">
              Оставьте заявку —<br />разберём вашу ситуацию
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-muted-foreground text-lg mb-8">
              Консультация бесплатная. Я оценю перспективы вашего дела, отвечу на вопросы и рассчитаю стоимость процедуры индивидуально.
            </p>
            <div className="space-y-4">
              {[['Phone', '+7 912 590-89-64'], ['Mail', 'maria.mitroff@yandex.ru']].map(([icon, val]) => (
                <div key={val} className="flex items-center gap-4">
                  <div className="w-11 h-11 flex items-center justify-center bg-navy text-gold shrink-0">
                    <Icon name={icon} size={20} />
                  </div>
                  <span className="text-navy font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="bg-card border border-border p-8 lg:p-10 shadow-sm">
            <h3 className="font-display text-2xl text-navy mb-6">Запись на консультацию</h3>
            <div className="space-y-4">
              <Input
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-none h-12"
              />
              <Input
                placeholder="Телефон"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-none h-12"
              />
              <Textarea
                placeholder="Опишите вашу ситуацию (необязательно)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="rounded-none min-h-28"
              />
              <Button type="submit" disabled={loading} size="lg" className="w-full bg-gold text-navy hover:bg-gold/90 rounded-none text-base">
                {loading ? 'Отправка...' : 'Получить консультацию'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </div>
          </form>
        </div>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <footer id="contacts" className="bg-navy-deep text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
            <div>
              <div className="font-display text-2xl mb-2">Митрофанова Мария Александровна</div>
              <p className="text-white/50 text-sm">Специалист по банкротству физических лиц. Опыт работы 8 лет.</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-gold text-xs mb-4">Контакты</p>
              <a href="tel:+79125908964" className="block text-white/80 hover:text-gold mb-2">+7 912 590-89-64</a>
              <a href="mailto:maria.mitroff@yandex.ru" className="block text-white/80 hover:text-gold">maria.mitroff@yandex.ru</a>
              <p className="text-white/50 text-sm mt-2">На телефоне все мессенджеры</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-gold text-xs mb-4">Разделы</p>
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="block text-white/80 hover:text-gold mb-2 text-left">
                  {n.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-white/40 text-sm mt-8">© {new Date().getFullYear()} Митрофанова М.А. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;