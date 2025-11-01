import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

const Marketplace = () => {
  const albums = [
    { id: 1, image: album3, genre: "Indie" },
    { id: 2, image: album1, genre: "Pop" },
    { id: 3, image: album1, genre: "Featured" },
    { id: 4, image: album2, genre: "Rock" },
    { id: 5, image: album4, genre: "Electronic" },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="font-clash font-bold text-4xl md:text-6xl lg:text-7xl text-center mb-20 leading-tight text-muted-foreground/80">
          Marketplace for
          <br />
          song use blockchain
        </h2>

        <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap max-w-6xl mx-auto">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="group cursor-pointer animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "backwards"
              }}
            >
              <div className="relative transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                <img
                  src={album.image}
                  alt={`${album.genre} album cover`}
                  className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-xl shadow-2xl shadow-secondary/30 group-hover:shadow-secondary/60 group-hover:shadow-glow transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs md:text-sm font-clash font-semibold tracking-wider text-white block">
                      {album.genre}
                    </span>
                  </div>
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-secondary/50 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
    </section>
  );
};

export default Marketplace;
