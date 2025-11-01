const Partners = () => {
  const partners = Array(6).fill("somnia");

  return (
    <section className="py-12 border-y border-border/30 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap opacity-60">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 border border-foreground rounded-sm"></div>
              <span className="font-clash font-medium text-sm tracking-wider">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
