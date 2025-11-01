import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

const Marketplace = () => {
  const albums = [
    { id: 1, image: album3, genre: "Indie", rotation: -5 },
    { id: 2, image: album1, genre: "Pop", rotation: 3 },
    { id: 3, image: album1, genre: "Featured", rotation: 0, scale: 1.2, zIndex: 10 },
    { id: 4, image: album2, genre: "Rock", rotation: -3 },
    { id: 5, image: album4, genre: "Electronic", rotation: 5 },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="font-clash font-bold text-4xl md:text-6xl lg:text-7xl text-center mb-16 leading-tight text-muted-foreground/80">
          Marketplace for
          <br />
          song use blockchain
        </h2>

        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="absolute transition-all duration-500 hover:scale-110 hover:rotate-0 cursor-pointer group"
              style={{
                transform: `rotate(${album.rotation}deg) scale(${album.scale || 1})`,
                zIndex: album.zIndex || index,
                left: `${15 + index * 15}%`,
              }}
            >
              <div className="relative">
                <img
                  src={album.image}
                  alt={`${album.genre} album cover`}
                  className="w-48 md:w-64 h-48 md:h-64 rounded-lg shadow-2xl shadow-secondary/30 group-hover:shadow-secondary/60 transition-shadow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs font-clash font-semibold tracking-wider">
                      {album.genre}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
    </section>
  );
};

export default Marketplace;
