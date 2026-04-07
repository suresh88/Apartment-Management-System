export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">EasyHome</h2>
          <p className="text-gray-400 text-sm">
            Find your perfect apartment easily with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Apartments</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">Phone: +91 9047720775</p>
          <p className="text-gray-400 text-sm">Email: info@easyhome.com</p>
          <p className="text-gray-400 text-sm">TamilNadu</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="hover:text-blue-500">Facebook</a>
            <a href="#" className="hover:text-pink-500">Instagram</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EasyHome. All rights reserved.
      </div>
    </footer>
  );
}