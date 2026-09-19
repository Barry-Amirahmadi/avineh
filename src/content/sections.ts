import type {
  AboutContent,
  BrandContent,
  CollectionContent,
  ContactContent,
  CtaContent,
  GalleryContent,
  GalleryPageContent,
  HeroContent,
  InquiryContent,
  NotFoundContent,
  ProductPageContent,
  ShowcaseContent,
  StatementContent,
  ValueItem,
} from "@/types/content";

/**
 * PLACEHOLDER CONTENT.
 *
 * Every line below is a *brand position* an editor can rewrite, not a factual
 * claim. Nothing states a founding year, a number of gowns made, a mill, a
 * price, a lead time or an award, because none was supplied. Read this file as
 * the copy deck.
 *
 * TYPING RULE (§52): every export is annotated with an interface from
 * `@/types/content`, never left to inference. An inferred type describes the
 * literal that happens to be written here; a declared one describes what any
 * source — this file, or a CMS response — has to provide. Only the second is a
 * contract, and the second is the whole claim of the content layer.
 *
 * LINK RULE: every `href` here is written from the site root — a route as
 * `/products/`, an in-page target as `/#contact`. Bare `#contact` worked while
 * the site was a single page and silently resolves to nothing the moment the
 * same component renders on `/products/`. `next/link` applies the deployment
 * base path to a root-relative href, so this form is also the only one that
 * survives being served from a GitHub Pages project subpath.
 */

export const hero: HeroContent = {
  eyebrow: "آتلیهٔ دوخت سفارشی",
  heading: "لباسی که فقط اندازهٔ شماست",
  lead: "آوینه هر لباس را از اندازهٔ خود شما می‌دوزد. سه کالکشن هست و هیچ‌کدام از قفسه بیرون نمی‌آید؛ آنچه می‌بینید طرح است، و لباس بعد از اولین پرو شکل می‌گیرد.",
  primary: { label: "دیدن کالکشن‌ها", href: "/#products" },
  secondary: { label: "دربارهٔ آوینه", href: "/#brand" },
  scrollHint: "پیمایش کنید",
  image: {
    src: "/media/hero-main.svg",
    alt: "لباس عروس آوینه، ایستاده در نور کم آتلیه",
    ratio: "3/4",
  },
  inset: {
    src: "/media/hero-inset.svg",
    alt: "نمای نزدیک از دوخت دست روی بالاتنه",
    ratio: "1/1",
  },
  insetCaption: "دوخت دست بالاتنه",
};

export const statement: StatementContent = {
  text: "ما لباس آماده نمی‌فروشیم. هر طرح، نقطهٔ شروع یک لباس است که هنوز دوخته نشده.",
  attribution: "آوینه",
};

export const showcase: ShowcaseContent = {
  eyebrow: "کالکشن",
  heading: "نُه طرح، در سه کالکشن",
  lead: "هر طرح یک تصمیم مرکزی دارد — فرم، آستین، دنباله یا کار دست — و بقیهٔ لباس دور همان یک تصمیم ساکت می‌ماند.",
  linkLabel: "دیدن طرح",
  /** The homepage showcase is the narrative cut of the collection; this is the
   *  way out of it into the full collection page. */
  allLabel: "صفحهٔ کالکشن‌ها",
  allHref: "/products/",
};

/**
 * Collection page — the full catalogue.
 *
 * Deliberately a different voice from `showcase` above. The homepage sequences
 * the gowns light to dark and tells a story with that order; this page is the
 * register of everything that exists, so it opens by describing the collection
 * rather than by arguing for it. Nothing here counts the gowns in prose — the
 * count is rendered from the data, so it cannot go stale.
 */
export const collection: CollectionContent = {
  eyebrow: "کالکشن",
  heading: "همهٔ طرح‌ها، کنار هم",
  lead: "طرح‌ها به ترتیب سه کالکشن آمده‌اند: عروس، نامزدی، مجلسی. برای دیدن جزئیات و نماهای بیشتر هر طرح، وارد صفحهٔ آن شوید.",
  /** Accessible name of the category index; it is a navigation landmark. */
  indexLabel: "کالکشن‌ها",
  /** Accessible name of the list the index points into. */
  listLabel: "طرح‌ها",
  /** Follows the count, e.g. «۹ لباس». */
  countLabel: "لباس",
  seo: {
    title: "کالکشن‌ها",
    description: "فهرست کامل طرح‌های آوینه در سه کالکشن عروس، نامزدی و مجلسی.",
  },
};

/**
 * Gown detail page — labels and the inquiry message.
 *
 * «ادامهٔ کالکشن» rather than «طرح‌های مرتبط»: the rule that picks the two
 * gowns at the foot of the page prefers the same category and otherwise walks
 * the list, which is a sequence, not a relationship. A heading that claims one
 * is the kind of small dishonesty a reader notices.
 */
export const productPage: ProductPageContent = {
  detailsHeading: "مشخصات",
  relatedEyebrow: "ادامه",
  relatedHeading: "ادامهٔ کالکشن",
  backLabel: "بازگشت به کالکشن‌ها",
  breadcrumbHome: "صفحهٔ اصلی",
  breadcrumbCollection: "کالکشن‌ها",
  breadcrumbLabel: "مسیر صفحه",
};

export const inquiry: InquiryContent = {
  label: "پرسش دربارهٔ این طرح",
  /** `{product}` is replaced with the gown name at render time. */
  message: "سلام. دربارهٔ طرح «{product}» سؤال داشتم.",
  /** The same channel without a gown in hand — used on the about page. */
  generalLabel: "نوشتن در واتساپ",
  generalMessage: "سلام. برای رزرو وقت پرو سؤالی داشتم.",
  /** Appended for screen readers to any link that leaves the site. */
  newWindow: "در پنجرهٔ تازه باز می‌شود",
};

export const brand: BrandContent = {
  eyebrow: "دربارهٔ آوینه",
  heading: "روش کار ما",
  lead: "چهار چیزی که در هر لباس، از اولین اندازه‌گیری تا پروی آخر، ثابت می‌ماند.",
  image: {
    src: "/media/values-texture.svg",
    alt: "نمای نزدیک از پارچه روی میز کار آتلیه",
    ratio: "3/4",
  },
};

export const values: ValueItem[] = [
  {
    id: "v-1",
    title: "اندازه، نه سایز",
    body: "هیچ لباسی به سایز استاندارد دوخته نمی‌شود. الگوی هر لباس روی اندازه‌های خود شما بریده می‌شود.",
  },
  {
    id: "v-2",
    title: "یک تصمیم در هر لباس",
    body: "هر طرح یک نقطهٔ تمرکز دارد و بقیهٔ لباس دور آن ساکت می‌ماند. دو تصمیم پررنگ در یک لباس، هر دو را از بین می‌برد.",
  },
  {
    id: "v-3",
    title: "پرو تا وقتی که درست شود",
    body: "تعداد جلسات پرو از پیش تعیین نمی‌شود. لباس وقتی تمام است که در آینه درست باشد، نه وقتی برنامه تمام شده باشد.",
  },
  {
    id: "v-4",
    title: "کار دست، جایی که دیده شود",
    body: "دوخت دست وقت می‌برد، پس فقط جایی به کار می‌رود که در فاصلهٔ نزدیک دیده می‌شود. باقی لباس تمیز و ساده می‌ماند.",
  },
];

export const gallery: GalleryContent = {
  eyebrow: "گالری",
  heading: "از نزدیک",
  lead: "پارچه، دوخت و آتلیه — بدون اصلاح رنگ.",
  viewLabel: "بزرگ‌نمایی",
  /** The way out of the homepage band and into the full gallery. */
  allLabel: "صفحهٔ گالری",
  allHref: "/gallery/",
};

/**
 * Gallery page.
 *
 * Same eight images as the homepage band, and the difference is scale rather
 * than content: the homepage shows them as a wall of tiles, this shows them as
 * plates. The copy says so plainly instead of pretending there is more here.
 */
export const galleryPage: GalleryPageContent = {
  eyebrow: "گالری",
  heading: "تصویرها، بی‌عجله",
  lead: "همان تصویرها، بزرگ‌تر از آنچه در صفحهٔ اصلی جا می‌شود. برای تمام‌صفحه، روی هر کدام بزنید.",
  seo: {
    title: "گالری",
    description: "تصویرهای آتلیهٔ آوینه — پارچه، دوخت دست و میز کار.",
  },
};

/**
 * About page.
 *
 * Short on purpose. There is no founding year, no founder, no atelier address,
 * no "since" — none of that has been supplied, and a portfolio piece that
 * invents a company history to fill an about page is making the §44.1 mistake
 * in prose instead of in data. What is written here is *position*: how the
 * atelier decides how it works, which is something a brand can assert about
 * itself.
 *
 * It is also not a restatement of the four values on the homepage. Those say
 * what holds true in every gown; this says why nothing is ever in stock.
 */
export const about: AboutContent = {
  eyebrow: "دربارهٔ ما",
  heading: "چرا هیچ لباسی آماده نیست",
  lead: "در آوینه هیچ لباسی از پیش دوخته نمی‌شود. دلیلش را اینجا نوشته‌ایم.",
  body: [
    "یک لباس آماده باید برای بدن متوسط دوخته شود، و بدن متوسط وجود ندارد. هر تغییری که بعد از دوخت روی لباس آماده انجام شود، الگویی را دستکاری می‌کند که برای کس دیگری بریده شده بود.",
    "به همین دلیل اینجا ترتیب برعکس است: اول اندازه، بعد الگو، بعد برش. طرح‌هایی که در این صفحه‌ها می‌بینید نقطهٔ شروع‌اند، نه محصول؛ هر کدام روی اندازه‌های شما دوباره بریده می‌شود.",
    "این یعنی زمان می‌برد و یعنی باید چند بار برای پرو بیایید. ترجیح می‌دهیم همین را از اول بگوییم تا کسی با انتظار لباس آمادهٔ فردا وارد شود.",
  ],
  image: {
    src: "/media/gallery-04.svg",
    alt: "میز کار آتلیهٔ آوینه در نور صبح",
    ratio: "4/3",
  },
  seo: {
    title: "دربارهٔ ما",
    description: "چرا در آوینه هیچ لباسی آماده نیست، و چطور می‌توانید وقت پرو بگیرید.",
  },
};

/**
 * Contact block — the inquiry architecture of §42, in full.
 *
 * WhatsApp first, Instagram second, then the direct details. No form: a form
 * needs a third-party backend to post to, and wiring a real hosted endpoint is
 * outside what a presented template needs (§51). The mechanism that exists is
 * the one the gown pages already use.
 */
export const contact: ContactContent = {
  eyebrow: "تماس",
  heading: "ساده‌ترین راه، پیام مستقیم است",
  lead: "برای رزرو وقت پرو یا پرسش دربارهٔ یک طرح، در واتساپ بنویسید.",
  instagramLabel: "اینستاگرام",
  labels: {
    city: "شهر",
    phone: "تلفن",
    email: "ایمیل",
  },
};

export const cta: CtaContent = {
  eyebrow: "شروع کنید",
  heading: "هنوز طرحی انتخاب نکرده‌اید؟",
  body: "لازم نیست با طرح مشخصی بیایید. در اولین جلسه دربارهٔ مراسم، فصل و آنچه در آینه دوست دارید ببینید حرف می‌زنیم، و انتخاب از همان‌جا شروع می‌شود.",
  primary: { label: "رزرو وقت پرو", href: "/about/#contact" },
  secondary: { label: "دیدن کالکشن‌ها", href: "/products/" },
  image: {
    src: "/media/cta-field.svg",
    alt: "",
    ratio: "16/9",
  },
};

/**
 * The 404 page.
 *
 * Copy, like every other page's — it was written into the component itself and
 * is the last page on the site whose words a CMS could not have reached. A
 * reader arrives here having already gone wrong, so the page says what happened
 * and offers exactly one way out rather than a menu of guesses.
 */
export const notFound: NotFoundContent = {
  eyebrow: "صفحه پیدا نشد",
  heading: "این نشانی وجود ندارد",
  lead: "ممکن است نشانی تغییر کرده باشد. از صفحهٔ اصلی می‌توانید کالکشن‌ها و گالری را ببینید.",
  action: { label: "بازگشت به صفحهٔ اصلی", href: "/" },
};
