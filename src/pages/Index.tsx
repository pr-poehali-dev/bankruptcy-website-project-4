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
  { icon: 'FileX2', emoji: '🗂️', title: 'Списание долгов', text: 'Полное освобождение от долгов перед банками, МФО и коллекторами через процедуру банкротства.', color: 'bg-orange-50 text-orange-500' },
  { icon: 'Home', emoji: '🏠', title: 'Сохранение ипотеки', text: 'Помогаю сохранить ипотечное жильё даже в процессе банкротства — индивидуальная стратегия.', color: 'bg-blue-50 text-blue-500' },
  { icon: 'FileSignature', emoji: '📋', title: 'Сбор документов', text: 'Быстрая подготовка и подача заявлений. Берём бумажную работу на себя.', color: 'bg-purple-50 text-purple-500' },
  { icon: 'ShieldCheck', emoji: '🛡️', title: 'Защита от коллекторов', text: 'С момента подачи заявления прекращаются звонки, начисление пеней и взыскания.', color: 'bg-green-50 text-green-500' },
  { icon: 'Scale', emoji: '⚖️', title: 'Сопровождение в суде', text: 'Полное юридическое сопровождение на всех этапах процедуры до определения суда.', color: 'bg-red-50 text-red-500' },
  { icon: 'MessagesSquare', emoji: '💬', title: 'Бесплатная консультация', text: 'Разбираю вашу ситуацию, оцениваю перспективы и рассчитываю стоимость индивидуально.', color: 'bg-yellow-50 text-yellow-600' },
];

const CASES = [
  { sum: '2 400 000 ₽', desc: 'Списан долг по потребительским кредитам в трёх банках. Срок — 7 месяцев.', tag: 'Кредиты', emoji: '🏦' },
  { sum: '1 150 000 ₽', desc: 'Долги по микрозаймам и кредитным картам. Ипотека сохранена.', tag: 'Ипотека', emoji: '🏠' },
  { sum: '3 800 000 ₽', desc: 'Банкротство ИП с сохранением единственного жилья семьи.', tag: 'Бизнес', emoji: '💼' },
  { sum: '890 000 ₽', desc: 'Освобождение от долгов после поручительства по чужому кредиту.', tag: 'Поручительство', emoji: '🤝' },
];

const GUARANTEES = [
  { icon: 'BadgeCheck', emoji: '✅', title: 'Гарантия результата', text: 'Письменная гарантия на выполнение работ. Если не возьмусь — честно скажу об этом сразу.' },
  { icon: 'Clock', emoji: '⚡', title: 'Сжатые сроки', text: 'Быстрая подача заявлений и сбор документов сокращают срок процедуры.' },
  { icon: 'Wallet', emoji: '💰', title: 'Честная цена', text: 'Стоимость рассчитывается индивидуально. Без скрытых платежей — вы знаете сумму заранее.' },
  { icon: 'Award', emoji: '🏆', title: '8 лет опыта', text: 'Сотни доведённых до конца дел и кейсов разной сложности.' },
];

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
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
    <div className="min-h-screen bg-white text-foreground">

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <button onClick={() => scrollTo('hero')} className="flex flex-col leading-none text-left">
            <span className="font-display text-xl text-foreground font-semibold tracking-wide">Митрофанова М.А.</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand">Банкротство физлиц</span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-gray-500 hover:text-brand transition-colors font-medium">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+79125908964" className="hidden md:block text-sm font-semibold text-foreground hover:text-brand transition-colors">
              +7 912 590-89-64
            </a>
            <Button onClick={() => scrollTo('consult')} className="bg-brand text-white hover:bg-brand-dark rounded-xl font-semibold shadow-sm" style={{ backgroundColor: 'hsl(var(--brand))' }}>
              Консультация
            </Button>
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-base text-gray-700 hover:text-brand font-medium py-1">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="pt-16 bg-gradient-to-br from-blue-50 via-white to-white overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
          <div className="animate-fade-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-brand rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'hsl(var(--brand))' }} />
              Опыт 8 лет · Бесплатная консультация
            </div>
            <h1 className="font-display text-5xl lg:text-6xl leading-[1.08] mb-5 text-foreground">
              Законно избавлю<br />
              <span style={{ color: 'hsl(var(--brand))' }}>вас от долгов</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg mb-8 leading-relaxed">
              Помогаю людям в сложной финансовой ситуации списать долги и сохранить ипотеку. Гарантия результата в письменном виде.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Button onClick={() => scrollTo('consult')} size="lg" className="text-white rounded-xl px-8 text-base font-semibold shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: 'hsl(var(--brand))' }}>
                Бесплатная консультация
              </Button>
              <Button onClick={() => scrollTo('services')} size="lg" variant="outline" className="rounded-xl border-gray-200 text-gray-700 hover:border-brand hover:text-brand text-base px-8">
                Узнать об услугах
              </Button>
            </div>
            <div className="flex gap-8">
              {[['8 лет', 'опыта'], ['100%', 'конфиденциально'], ['0 ₽', 'консультация']].map(([a, b]) => (
                <div key={b} className="text-center">
                  <div className="font-display text-3xl font-bold" style={{ color: 'hsl(var(--brand))' }}>{a}</div>
                  <div className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 lg:order-2 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg, hsl(217 85% 38% / 0.12), transparent 60%)' }} />
            <img
              src={PORTRAIT}
              alt="Митрофанова Мария Александровна"
              className="relative w-full h-[480px] lg:h-[560px] object-cover object-top rounded-3xl shadow-2xl"
            />
            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-blue-50">⚖️</div>
              <div>
                <div className="font-semibold text-foreground text-sm">Митрофанова Мария Александровна</div>
                <div className="text-xs text-gray-400">Специалист по банкротству физических лиц</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-brand text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">Обо мне</div>
            <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Меня зовут Мария.<br />Я на вашей стороне
            </h2>
            <div className="gold-line mb-8" />
          </div>
          <div className="space-y-5 text-gray-500 text-lg leading-relaxed">
            <p>Более 8 лет я помогаю физическим лицам выходить из сложных финансовых ситуаций через процедуру банкротства. За это время накопила большой опыт и провела множество дел разной сложности.</p>
            <p>Я понимаю, как тяжело жить под давлением долгов и звонков коллекторов. Моя задача — снять с вас этот груз законным путём, защитить имущество и по возможности сохранить ипотечное жильё.</p>
            <p>Каждое дело веду лично, от первой консультации до определения суда. Работаю честно и прозрачно — вы всегда знаете, на каком этапе находится ваша процедура.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block bg-blue-50 text-brand text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">Услуги</div>
            <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-2">Как я могу помочь</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-7 shadow-sm hover-lift border border-gray-100">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${s.color}`}>
                  {s.emoji}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block bg-blue-50 text-brand text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">Кейсы</div>
            <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-2">Реальные результаты</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {CASES.map((c) => (
              <div key={c.sum} className="bg-gray-50 rounded-2xl p-7 hover-lift border border-gray-100 flex gap-5 items-start">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                  {c.emoji}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand bg-blue-50 px-2 py-0.5 rounded-full">{c.tag}</span>
                  <div className="font-display text-2xl font-bold text-foreground mt-2 mb-1">Списано {c.sum}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section id="guarantees" className="py-20" style={{ backgroundColor: 'hsl(var(--dark))' }}>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block bg-white/10 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">Гарантии</div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-2">Почему мне доверяют</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUARANTEES.map((g) => (
              <div key={g.title} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover-lift">
                <div className="text-4xl mb-5">{g.emoji}</div>
                <h3 className="font-semibold text-white text-lg mb-2">{g.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="inline-block bg-blue-50 text-brand text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">FAQ</div>
              <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-4 leading-tight">Частые вопросы</h2>
              <div className="gold-line mb-6" />
              <p className="text-gray-400 mb-6">Не нашли ответ на свой вопрос? Задайте его на бесплатной консультации.</p>
              <Button onClick={() => scrollTo('consult')} className="rounded-xl font-semibold text-white" style={{ backgroundColor: 'hsl(var(--brand))' }}>
                Задать вопрос
              </Button>
            </div>
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-gray-100 px-6">
                    <AccordionTrigger className="font-semibold text-base text-foreground text-left hover:no-underline hover:text-brand py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-sm leading-relaxed pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULT FORM */}
      <section id="consult" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-blue-50 text-brand text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">Консультация</div>
              <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
                Оставьте заявку —<br />разберём вашу ситуацию
              </h2>
              <div className="gold-line mb-7" />
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Консультация бесплатная. Оценю перспективы вашего дела, отвечу на вопросы и рассчитаю стоимость индивидуально.
              </p>
              <div className="space-y-3">
                <a href="tel:+79125908964" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                    <Icon name="Phone" size={20} />
                  </div>
                  <span className="text-foreground font-semibold group-hover:text-brand transition-colors">+7 912 590-89-64</span>
                </a>
                <a href="mailto:maria.mitroff@yandex.ru" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                    <Icon name="Mail" size={20} />
                  </div>
                  <span className="text-foreground font-semibold group-hover:text-brand transition-colors">maria.mitroff@yandex.ru</span>
                </a>
                <a href="https://t.me/+79125908964" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                    <Icon name="Send" size={20} />
                  </div>
                  <span className="text-foreground font-semibold group-hover:text-brand transition-colors">Telegram</span>
                </a>
                <a href="https://max.ru/+79125908964" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                    <Icon name="MessageCircle" size={20} />
                  </div>
                  <span className="text-foreground font-semibold group-hover:text-brand transition-colors">MAX</span>
                </a>
              </div>
            </div>
            <form onSubmit={submit} className="bg-gray-50 rounded-2xl border border-gray-100 p-8 lg:p-10 shadow-sm">
              <h3 className="font-display text-2xl text-foreground mb-6">Запись на консультацию</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl h-12 bg-white border-gray-200"
                />
                <Input
                  placeholder="Телефон"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-xl h-12 bg-white border-gray-200"
                />
                <Textarea
                  placeholder="Опишите вашу ситуацию (необязательно)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="rounded-xl min-h-28 bg-white border-gray-200"
                />
                <Button type="submit" disabled={loading} size="lg" className="w-full rounded-xl text-base font-semibold text-white shadow-md" style={{ backgroundColor: 'hsl(var(--brand))' }}>
                  {loading ? 'Отправка...' : 'Получить консультацию'}
                </Button>
                <p className="text-xs text-gray-400 text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="bg-gray-900 text-white pt-14 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            <div>
              <div className="font-display text-xl font-semibold mb-2">Митрофанова М.А.</div>
              <p className="text-white/50 text-sm leading-relaxed">Специалист по банкротству физических лиц. Опыт работы 8 лет.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-brand font-semibold mb-4">Контакты</p>
              <a href="tel:+79125908964" className="block text-white/70 hover:text-white mb-2 text-sm">+7 912 590-89-64</a>
              <a href="mailto:maria.mitroff@yandex.ru" className="block text-white/70 hover:text-white mb-4 text-sm">maria.mitroff@yandex.ru</a>
              <div className="flex gap-2">
                <a href="https://t.me/+79125908964" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 text-white/60 hover:bg-brand hover:text-white transition-colors" title="Telegram">
                  <Icon name="Send" size={15} />
                </a>
                <a href="https://max.ru/+79125908964" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 text-white/60 hover:bg-brand hover:text-white transition-colors" title="MAX">
                  <Icon name="MessageCircle" size={15} />
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-brand font-semibold mb-4">Разделы</p>
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="block text-white/60 hover:text-white mb-2 text-left text-sm">
                  {n.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-white/30 text-xs mt-8">© {new Date().getFullYear()} Митрофанова М.А. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;