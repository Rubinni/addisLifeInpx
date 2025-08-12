import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface ImageEntry {
  id: string;
  url: string;
  category: string;
  created_at: string;
}

export default function ImageCarousel({ images }: { images: ImageEntry[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 mt-8">
  <Swiper
    modules={[Autoplay, Pagination, Navigation, EffectFade]}
    spaceBetween={30}
    slidesPerView={1}
    loop={true}
    effect="fade"
    speed={1000}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    pagination={{ clickable: true }}
    navigation={true}
    className="rounded-2xl overflow-hidden shadow-lg"
  >
    {images.map((img) => (
      <SwiperSlide key={img.id}>
        <img
          src={img.url}
          alt={img.category}
          className="w-full h-[500px] object-cover rounded-2xl"
        />
      <div className="absolute inset-0 bg-black/40 z-10" />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
}
