const Hero = () => (
  <section className="relative h-[90vh] w-full overflow-hidden">

    <img
      src="/images/banner.jpg"
      className="absolute inset-0 w-full h-full object-cover scale-105"
      alt=""
    />

    {/* Overlays */}
    <div className="absolute inset-0  from-black via-black/40 to-transparent" />
    <div className="absolute inset-0  from-black/80 via-black/20 to-transparent" />

    <div className="relative z-10 h-full flex items-end px-10 pb-24 max-w-4xl">
      <div>
        <span className="text-purple-400 text-xs font-bold mb-3 inline-block">
          #1 TRENDING
        </span>

        <h1 className="text-5xl font-black mb-4 leading-tight">
          Phát đạn của kẻ điên
        </h1>

        <p className="text-gray-300 max-w-xl mb-6 line-clamp-3">
          Một bộ phim hành động – tâm lý kịch tính, xoay quanh kẻ sát nhân bí ẩn...
        </p>

        <div className="flex gap-4">
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2">
            ▶ Xem ngay
          </button>
          <button className="bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold">
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  </section>
);
export default Hero;