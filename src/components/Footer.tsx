export const Footer = () => {
  return (
    <footer className="bg-dark text-soft text-sm ">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-accent font-bold text-lg mb-2">Rest Company</h3>
          <p>
            Offrez-vous des instants précieux. Rest est une compagnie de luxe.
          </p>
        </div>
        <div>
          <h4 className="text-primary font-semibold mb-1">Contact</h4>
          <p>Email : contact@rest.com</p>
          <p>Tél : +33 6 00 00 00 00</p>
        </div>
        <div>
          <h4 className="text-primary font-semibold mb-1">Adresse</h4>
          <p>69 rue des Palmes</p>
          <p>75000 Paris, France</p>
        </div>
      </div>
      <div className="text-center border-t border-accent py-4 text-xs">
        © {new Date().getFullYear()} Rest
      </div>
    </footer>
  );
};
