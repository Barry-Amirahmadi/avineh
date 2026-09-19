import type { GalleryItem } from "@/types/content";

/**
 * PLACEHOLDER CONTENT.
 *
 * `category` is the axis a future gallery filter will use, so the values are
 * kept to a small controlled vocabulary — پارچه · دوخت · آتلیه · لباس — rather
 * than free text.
 *
 * Eight plates, all `4/5`. The gown catalogue is `3/4` because a gown is shot
 * standing; the gallery is not shooting gowns, it is shooting cloth, hands and
 * the room, so it keeps its own single frame. One ratio per surface, never a
 * ratio per image — see the header comment in `products.ts` for why.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "g-01",
    title: "حریر، در نور پنجره",
    category: "پارچه",
    caption: "نور طبیعی، اواخر صبح",
    image: { src: "/media/gallery-01.svg", alt: "نمای نزدیک از حریر در برابر نور پنجره", ratio: "4/5" },
    order: 1,
  },
  {
    id: "g-02",
    title: "درز پهلو",
    category: "دوخت",
    image: { src: "/media/gallery-02.svg", alt: "جزئیات درز پهلوی یک لباس روی مانکن", ratio: "4/5" },
    order: 2,
  },
  {
    id: "g-03",
    title: "بالاتنهٔ ترمه",
    category: "لباس",
    caption: "پیش از دوخت به دامن",
    image: { src: "/media/gallery-03.svg", alt: "بالاتنهٔ دست‌دوز لباس ترمه روی سطح تیره", ratio: "4/5" },
    order: 3,
  },
  {
    id: "g-04",
    title: "میز کار، صبح",
    category: "آتلیه",
    image: { src: "/media/gallery-04.svg", alt: "گوشه‌ای از میز کار آتلیه در نور صبح", ratio: "4/5" },
    order: 4,
  },
  {
    id: "g-05",
    title: "مخمل و اطلس",
    category: "پارچه",
    caption: "کنار هم، بدون اصلاح رنگ",
    image: { src: "/media/gallery-05.svg", alt: "دو تکه پارچهٔ مخمل و اطلس کنار هم", ratio: "4/5" },
    order: 5,
  },
  {
    id: "g-06",
    title: "مهره‌دوزی دست",
    category: "دوخت",
    image: { src: "/media/gallery-06.svg", alt: "نمای نزدیک از مهره‌دوزی دست روی پارچه", ratio: "4/5" },
    order: 6,
  },
  {
    id: "g-07",
    title: "الگو روی میز برش",
    category: "آتلیه",
    caption: "پیش از اولین برش",
    image: { src: "/media/gallery-07.svg", alt: "الگوی کاغذی یک لباس، باز روی میز برش", ratio: "4/5" },
    order: 7,
  },
  {
    id: "g-08",
    title: "لبهٔ دنباله",
    category: "لباس",
    image: { src: "/media/gallery-08.svg", alt: "لبهٔ دنبالهٔ یک لباس عروس روی زمین", ratio: "4/5" },
    order: 8,
  },
];

export const sortedGallery = [...galleryItems].sort((a, b) => a.order - b.order);
