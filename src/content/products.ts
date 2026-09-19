import type { Product } from "@/types/content";
import { resolveProducts } from "./resolveProducts";

/**
 * PLACEHOLDER CONTENT.
 *
 * Gowns are named with Persian words — a tree, a light, a flower — and
 * described by *form*: what the cut does, where the weight sits, how long the
 * train runs. Nothing asserts a fabric mill, a price, a lead time, an award or
 * a number of fittings, because none has been supplied. A fictional atelier may
 * say what its own gowns are shaped like; it may not say things about itself
 * that a reader would have to take on trust (§44.1).
 *
 * `tone` is the one field doing design work — it is the gown's own cloth
 * colour, and it drives the ambient wash behind the showcase. All nine set it,
 * and `layout`, explicitly; both are optional in the type so a CMS editor can
 * omit them, and resolveProducts() fills the gap.
 *
 * The nine run light to dark on purpose: ivory at the top of the collection,
 * shadow at the bottom. A gown collection is sequenced, not sorted, and the
 * showcase reads that sequence as a single descent.
 *
 * **Catalogue images share one ratio — `3/4` — and only the `feature` gown
 * departs from it.** The rule is inherited from the template this derives from,
 * where four different ratios were read as the images being mismatched rather
 * than as editorial variety, and the reading was right: a frame that changes
 * per item means the item changes size inside it, and nothing anchors the eye.
 * The ratio itself is re-decided here. Cosmetics shot `4/5`; a gown is
 * photographed standing, head to hem, so `3/4` is the frame that holds one
 * without cropping the skirt or stranding it in empty air. Variety belongs to
 * how much of the row a gown takes, not to the shape of its frame.
 *
 * `views` carries the extra angles — back, bodice, hem — that a gown buyer
 * expects and a jar of cream does not. They appear on the detail page only, in
 * the same ratio as the primary.
 */
export const products: Product[] = [
  {
    id: "p-sepidar",
    slug: "sepidar",
    name: "سپیدار",
    latin: "SEPIDAR",
    category: "لباس عروس",
    description: "برش ستونی، بدون حجم اضافه. برای قامتی که خودش خط دارد.",
    statement: "یک خط عمودی، از شانه تا زمین.",
    body: [
      "سپیدار هیچ حجمی به بدن اضافه نمی‌کند. کل کار لباس این است که خط قامت را نشکند، و هر چیزی که این خط را می‌شکست از طرح بیرون رفت.",
      "دنباله کوتاه است، به اندازه‌ای که حرکت را نشان بدهد و مسیر راه‌رفتن را سنگین نکند. اگر دنبال لباسی با حجم هستید، سپیدار آن لباس نیست.",
    ],
    details: [
      { label: "فرم", value: "ستونی" },
      { label: "آستین", value: "بدون آستین" },
      { label: "دنباله", value: "کوتاه" },
    ],
    tone: "#D8D2C6",
    image: {
      src: "/media/gown-sepidar.svg",
      alt: "لباس عروس سپیدار با برش ستونی، ایستاده در نور کم",
      ratio: "3/4",
    },
    views: [
      {
        src: "/media/gown-sepidar-back.svg",
        alt: "نمای پشت لباس سپیدار و دنبالهٔ کوتاه آن",
        ratio: "3/4",
      },
      {
        src: "/media/gown-sepidar-detail.svg",
        alt: "نمای نزدیک از خط شانه و بالاتنهٔ لباس سپیدار",
        ratio: "3/4",
      },
    ],
    layout: "tall",
    status: "published",
  },
  {
    id: "p-mahtab",
    slug: "mahtab",
    name: "مهتاب",
    latin: "MAHTAB",
    category: "لباس عروس",
    description: "فرم آ-لاین با دنبالهٔ بلند. برای مراسمی که راه‌رفتن دارد.",
    statement: "دنباله جایی است که لباس، بعد از شما وارد می‌شود.",
    body: [
      "مهتاب برای سالنی نوشته شد که در آن مسیری برای رفتن هست. دنبالهٔ بلند تنها وقتی معنی دارد که کسی آن را در حرکت ببیند؛ در فضای کوچک فقط وزن است.",
      "بالاتنه ساده ماند تا تمام توجه روی همان حرکت بیفتد. این تقسیم عمدی است: یک بخش از لباس کار می‌کند و بقیه ساکت می‌ماند.",
    ],
    details: [
      { label: "فرم", value: "آ-لاین" },
      { label: "آستین", value: "بدون آستین" },
      { label: "دنباله", value: "بلند" },
    ],
    tone: "#C8C6C9",
    image: {
      src: "/media/gown-mahtab.svg",
      alt: "لباس عروس مهتاب با فرم آ-لاین و دنبالهٔ بلند",
      ratio: "3/4",
    },
    views: [
      {
        src: "/media/gown-mahtab-back.svg",
        alt: "نمای پشت لباس مهتاب، دنبالهٔ بلند روی زمین",
        ratio: "3/4",
      },
      {
        src: "/media/gown-mahtab-detail.svg",
        alt: "نمای نزدیک از بالاتنهٔ سادهٔ لباس مهتاب",
        ratio: "3/4",
      },
      {
        src: "/media/gown-mahtab-hem.svg",
        alt: "نمای نزدیک از لبهٔ دامن و پایان دنبالهٔ لباس مهتاب",
        ratio: "3/4",
      },
    ],
    layout: "wide",
    status: "published",
  },
  {
    id: "p-niloofar",
    slug: "niloofar",
    name: "نیلوفر",
    latin: "NILOOFAR",
    category: "لباس عروس",
    description: "دامن پرحجم، بدون دنباله. تمام حجم در دامن جمع شده است.",
    statement: "تمام حجم، در یک جا.",
    body: [
      "نیلوفر پرحجم‌ترین لباس مجموعه است و دنباله ندارد. این دو با هم تصمیم گرفته شدند: حجم و دنباله هر دو با هم، لباس را از حالت پوشیدنی خارج می‌کند.",
      "بالاتنه تنگ و کوتاه است تا مرز میان دو بخش لباس واضح بماند. جای این مرز، تنها چیزی است که در پرو جابه‌جا می‌شود.",
    ],
    details: [
      { label: "فرم", value: "دامن پرحجم" },
      { label: "دنباله", value: "ندارد" },
    ],
    tone: "#BFC1BC",
    /* The one gown that departs from the `3/4` catalogue frame. `feature` spans
       the full width of the grid, and a tall frame at that width pushes
       everything after it off the screen — so the feature slot is `4/5`, and
       its own views follow it rather than the catalogue. */
    image: {
      src: "/media/gown-niloofar.svg",
      alt: "لباس عروس نیلوفر با دامن پرحجم",
      ratio: "4/5",
    },
    views: [
      {
        src: "/media/gown-niloofar-back.svg",
        alt: "نمای پشت لباس نیلوفر و بستن بالاتنه",
        ratio: "4/5",
      },
      {
        src: "/media/gown-niloofar-detail.svg",
        alt: "نمای نزدیک از مرز بالاتنه و دامن لباس نیلوفر",
        ratio: "4/5",
      },
    ],
    layout: "feature",
    status: "published",
  },
  {
    id: "p-shabnam",
    slug: "shabnam",
    name: "شبنم",
    latin: "SHABNAM",
    category: "لباس نامزدی",
    description: "کوتاه و بدون آستین. سبک‌ترین لباس مجموعه.",
    statement: "سبک، چون قرار است تمام شب تن‌تان باشد.",
    body: [
      "شبنم برای مراسمی نوشته شد که چند ساعت طول می‌کشد و کسی وسطش لباس عوض نمی‌کند. وزن کم، اولین چیزی بود که تصمیم گرفته شد؛ بقیهٔ طرح دنبال آن آمد.",
      "کوتاه بودن اینجا یک انتخاب سبکی نیست، نتیجهٔ همان تصمیم است: هر سانتی‌متر پارچهٔ اضافه، وزنی است که تا آخر شب می‌ماند.",
    ],
    details: [
      { label: "فرم", value: "کوتاه" },
      { label: "آستین", value: "بدون آستین" },
    ],
    tone: "#D3CFC8",
    image: {
      src: "/media/gown-shabnam.svg",
      alt: "لباس نامزدی شبنم، کوتاه و بدون آستین",
      ratio: "3/4",
    },
    views: [
      {
        src: "/media/gown-shabnam-back.svg",
        alt: "نمای پشت لباس شبنم",
        ratio: "3/4",
      },
      {
        src: "/media/gown-shabnam-detail.svg",
        alt: "نمای نزدیک از خط یقه و حلقهٔ آستین لباس شبنم",
        ratio: "3/4",
      },
    ],
    layout: "compact",
    status: "published",
  },
  {
    id: "p-nastaran",
    slug: "nastaran",
    name: "نسترن",
    latin: "NASTARAN",
    category: "لباس نامزدی",
    description: "بلندی میدی با آستین بلند. پوشیده، بدون اینکه سنگین شود.",
    statement: "پوشیده بودن، لازم نیست سنگین به نظر برسد.",
    body: [
      "نسترن آستین بلند دارد و تا میانهٔ ساق می‌رسد. سؤالی که در طراحی‌اش جواب داده شد این بود: چطور لباسی که بیشتر بدن را می‌پوشاند، حجیم‌تر از لباس کوتاه به نظر نرسد.",
      "جواب در آستین بود. آستین باریک ماند و هیچ چین یا پفی نگرفت، و همین یک تصمیم بقیهٔ لباس را آزاد گذاشت.",
    ],
    details: [
      { label: "فرم", value: "میدی" },
      { label: "آستین", value: "بلند و باریک" },
    ],
    tone: "#C4A9A2",
    image: {
      src: "/media/gown-nastaran.svg",
      alt: "لباس نامزدی نسترن با آستین بلند و بلندی میدی",
      ratio: "3/4",
    },
    views: [
      {
        src: "/media/gown-nastaran-back.svg",
        alt: "نمای پشت لباس نسترن",
        ratio: "3/4",
      },
      {
        src: "/media/gown-nastaran-detail.svg",
        alt: "نمای نزدیک از آستین باریک لباس نسترن",
        ratio: "3/4",
      },
    ],
    layout: "tall",
    status: "published",
  },
  {
    id: "p-termeh",
    slug: "termeh",
    name: "ترمه",
    latin: "TERMEH",
    category: "لباس نامزدی",
    description: "بالاتنهٔ دست‌دوز روی دامن ساده. تمام کار دست، بالاتنه است.",
    statement: "کار دست، جایی که دیده می‌شود.",
    body: [
      "ترمه یک بالاتنهٔ تماماً دست‌دوز دارد و دامنی که هیچ تزئینی ندارد. این تقسیم، تصمیم مرکزی لباس است: کار دست وقتی دیده می‌شود که چیزی کنارش برای دیدن نباشد.",
      "دوخت بالاتنه در آتلیه انجام می‌شود و زمان می‌برد. این را پیش از سفارش می‌گوییم، نه بعد از آن.",
    ],
    details: [
      { label: "فرم", value: "بالاتنهٔ جداشده از دامن" },
      { label: "جزئیات دست‌دوز", value: "تمام بالاتنه" },
    ],
    tone: "#A88B6E",
    image: {
      src: "/media/gown-termeh.svg",
      alt: "لباس نامزدی ترمه با بالاتنهٔ دست‌دوز",
      ratio: "3/4",
    },
    views: [
      {
        src: "/media/gown-termeh-back.svg",
        alt: "نمای پشت لباس ترمه",
        ratio: "3/4",
      },
      {
        src: "/media/gown-termeh-detail.svg",
        alt: "نمای نزدیک از دوخت دست روی بالاتنهٔ لباس ترمه",
        ratio: "3/4",
      },
      {
        src: "/media/gown-termeh-hem.svg",
        alt: "نمای نزدیک از دامن سادهٔ لباس ترمه",
        ratio: "3/4",
      },
    ],
    layout: "wide",
    status: "published",
  },
  {
    id: "p-shabaneh",
    slug: "shabaneh",
    name: "شبانه",
    latin: "SHABANEH",
    category: "لباس مجلسی",
    description: "بلند، با پشت باز. جلو کاملاً بسته است.",
    statement: "از روبه‌رو ساده، از پشت نه.",
    body: [
      "شبانه دو صورت دارد. از روبه‌رو یک لباس کاملاً بسته و ساده است؛ از پشت، کل تصمیم لباس آنجاست.",
      "این ترتیب عمدی است. کسی که وارد می‌شود، لباس ساده را می‌بیند؛ چیزی که می‌ماند، همان لحظه‌ای است که برمی‌گردید.",
    ],
    details: [
      { label: "فرم", value: "بلند" },
      { label: "آستین", value: "بدون آستین" },
    ],
    tone: "#3A3238",
    image: {
      src: "/media/gown-shabaneh.svg",
      alt: "لباس مجلسی شبانه، بلند و بسته از جلو",
      ratio: "3/4",
    },
    views: [
      {
        src: "/media/gown-shabaneh-back.svg",
        alt: "نمای پشت باز لباس شبانه",
        ratio: "3/4",
      },
      {
        src: "/media/gown-shabaneh-detail.svg",
        alt: "نمای نزدیک از خط پشت لباس شبانه",
        ratio: "3/4",
      },
    ],
    layout: "compact",
    status: "published",
  },
  {
    id: "p-aazin",
    slug: "aazin",
    name: "آذین",
    latin: "AAZIN",
    category: "لباس مجلسی",
    description: "مهره‌دوزی دست روی کل لباس. سنگین‌ترین لباس مجموعه.",
    statement: "سنگین است، و این را پنهان نمی‌کنیم.",
    body: [
      "آذین روی تمام سطح لباس مهره‌دوزی دست دارد. نتیجه لباسی است که وزن دارد، و وزنش چیزی نیست که بشود با طرح پنهانش کرد.",
      "به همین دلیل بندها پهن‌تر از بقیهٔ مجموعه است و بالاتنه ساختار بیشتری دارد. اینها تزئین نیستند؛ کاری می‌کنند که لباس بعد از دو ساعت هم سر جایش بماند.",
    ],
    details: [
      { label: "جزئیات دست‌دوز", value: "تمام سطح لباس" },
      { label: "فرم", value: "بلند، با بالاتنهٔ ساختاردار" },
    ],
    tone: "#6B5560",
    image: {
      src: "/media/gown-aazin.svg",
      alt: "لباس مجلسی آذین با مهره‌دوزی دست روی تمام سطح",
      ratio: "3/4",
    },
    views: [
      {
        src: "/media/gown-aazin-back.svg",
        alt: "نمای پشت لباس آذین و بندهای پهن آن",
        ratio: "3/4",
      },
      {
        src: "/media/gown-aazin-detail.svg",
        alt: "نمای نزدیک از مهره‌دوزی دست روی لباس آذین",
        ratio: "3/4",
      },
    ],
    layout: "tall",
    status: "published",
  },
  {
    id: "p-sayeh",
    slug: "sayeh",
    name: "سایه",
    latin: "SAYEH",
    category: "لباس مجلسی",
    description: "یک‌شانه، با درپه‌های آزاد. تنها لباس نامتقارن مجموعه.",
    statement: "تنها لباسی که دو طرفش یکی نیست.",
    body: [
      "سایه روی یک شانه می‌نشیند و پارچه از همان‌جا آزاد رها می‌شود. تمام مجموعه متقارن است جز این یکی، و همین آن را به آخرین لباس فهرست تبدیل کرد.",
      "نامتقارنی فقط وقتی کار می‌کند که یک بار اتفاق بیفتد. اگر دو تصمیم نامتقارن در یک لباس جمع شود، دیگر طرح نیست، بی‌نظمی است.",
    ],
    details: [
      { label: "فرم", value: "یک‌شانه، نامتقارن" },
      { label: "آستین", value: "ندارد" },
    ],
    tone: "#4A4148",
    image: {
      src: "/media/gown-sayeh.svg",
      alt: "لباس مجلسی سایه، یک‌شانه و نامتقارن",
      ratio: "3/4",
    },
    views: [
      {
        src: "/media/gown-sayeh-back.svg",
        alt: "نمای پشت لباس سایه",
        ratio: "3/4",
      },
      {
        src: "/media/gown-sayeh-detail.svg",
        alt: "نمای نزدیک از شانهٔ لباس سایه و درپه‌های آزاد پارچه",
        ratio: "3/4",
      },
    ],
    layout: "wide",
    status: "published",
  },
];

/**
 * What the showcase renders: drafts filtered out, exactly as a CMS would, then
 * resolved so every gown has a `tone` and a `layout`.
 *
 * Filter before resolve, never after — the `layout` fallback is positional, so
 * resolving a list that still contains drafts would shift the arrangements of
 * everything after the first hidden gown.
 */
export const publishedProducts = resolveProducts(
  products.filter((p) => p.status === "published"),
);
