import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  caption?: string;
};

const defaultCaption =
  "AI-powered background removal provides a clean, transparent PNG perfect for any project.";

export default function SingleResultCard({
  src,
  alt = "AI background removal result",
  caption = defaultCaption,
}: Props) {
  return (
   <section className="relative container mx-auto px-4 py-6 md:py-8">
  {/* subtle gradients */}
  <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#F25912]/5 to-transparent -z-10 blur-3xl opacity-35" />
  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#F25912]/5 to-transparent -z-10 blur-3xl opacity-35" />

  <div className="mx-auto w-full md:w-[64vw] max-w-3xl">
    <div className="relative mx-auto w-full rounded-xl overflow-hidden border border-white/25 shadow-inner bg-gradient-to-br from-gray-50/50 to-gray-100/50 px-3 py-3">
      <div className="relative mx-auto w-full max-w-2xl aspect-[16/10] rounded-lg overflow-hidden border border-white/20 bg-white/0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 86vw, 58vw"
          className="object-contain p-2 rounded-4xl"
          priority
        />
      </div>
      {/* caption outside, with smaller top margin */}
      <p className="mt-2 text-sm sm:text-[15px] text-center text-gray-600 leading-relaxed max-w-md mx-auto">
        {caption}
      </p>
    </div>
  </div>
</section>

  );
}
