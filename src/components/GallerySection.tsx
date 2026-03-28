import Masonry from './Masonry';
import ScrollFloat from './ScrollFloat';

type GalleryItem = {
  id: string;
  img: string;
  url: string;
  height: number;
};

const galleryItems: GalleryItem[] = [
  { id: 'g1', img: '/hackathon_images/20150412_HACKATHON-slide-ECXQ-superJumbo.jpg', url: '#', height: 500 },
  { id: 'g2', img: '/hackathon_images/images%20(2).jpg', url: '#', height: 360 },
  { id: 'g3', img: '/hackathon_images/images%20(3).jpg', url: '#', height: 440 },
  { id: 'g4', img: '/hackathon_images/images%20(4).jpg', url: '#', height: 390 },
  { id: 'g5', img: '/hackathon_images/images%20(5).jpg', url: '#', height: 470 },
  { id: 'g6', img: '/hackathon_images/images%20(6).jpg', url: '#', height: 350 },
  { id: 'g7', img: '/hackathon_images/images%20(7).jpg', url: '#', height: 430 },
  { id: 'g8', img: '/hackathon_images/images%20(8).jpg', url: '#', height: 380 },
  { id: 'g9', img: '/hackathon_images/images%20(9).jpg', url: '#', height: 460 },
  { id: 'g10', img: '/hackathon_images/images%20(10).jpg', url: '#', height: 410 },
  { id: 'g11', img: '/hackathon_images/images%20(11).jpg', url: '#', height: 490 },
  { id: 'g12', img: '/hackathon_images/WhatsApp_Image_2023-05-09_at_11.50.53-crop-c0-5__0-5-600x400-70.jpg', url: '#', height: 370 },
  { id: 'g13', img: '/hackathon_images/images%20(3).jpg', url: '#', height: 420 },
  { id: 'g14', img: '/hackathon_images/images%20(5).jpg', url: '#', height: 380 },
  { id: 'g15', img: '/hackathon_images/images%20(7).jpg', url: '#', height: 450 },
  { id: 'g16', img: '/hackathon_images/images%20(9).jpg', url: '#', height: 365 },
  { id: 'g17', img: '/hackathon_images/20150412_HACKATHON-slide-ECXQ-superJumbo.jpg', url: '#', height: 410 },
  { id: 'g18', img: '/hackathon_images/images%20(11).jpg', url: '#', height: 475 },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-16 md:py-24" style={{ background: 'hsl(var(--bg-raised))' }}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <span className="mb-3 block font-mono text-[10px] font-medium uppercase tracking-[3px] text-accent">
          $ ls archive/editions
        </span>
        <ScrollFloat
          containerClassName="font-display font-bold text-[40px] text-text leading-none mb-4"
          scrollStart="top 86%"
        >
          Past mission logs.
        </ScrollFloat>

        <p className="max-w-[62ch] font-body text-[14px] leading-[1.8] text-text-dim md:text-[15px]">
          Build nights, mentor stations, finals, and demo floor snapshots from previous editions.
        </p>

        <div className="relative mt-10 overflow-hidden rounded-[14px] border p-2 md:p-3" style={{ borderColor: 'hsl(var(--border-faint) / 0.2)' }}>
          <Masonry
            items={galleryItems}
            animateFrom="bottom"
            blurToFocus
            scaleOnHover
            hoverScale={0.98}
            duration={0.55}
            stagger={0.04}
          />

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 md:w-24"
            style={{ background: 'linear-gradient(to right, hsl(var(--bg-raised)) 0%, hsl(var(--bg-raised) / 0) 100%)' }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 md:w-24"
            style={{ background: 'linear-gradient(to left, hsl(var(--bg-raised)) 0%, hsl(var(--bg-raised) / 0) 100%)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
