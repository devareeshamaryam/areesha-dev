export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-100 py-8 px-6 text-center">
      <p
        className="text-gray-400 text-sm"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Crafted with{" "}
        <span className="text-rose-300">&lt;code /&gt;</span>{" "}
        by{" "}
        <span className="text-black font-semibold">Areesha Maryam</span>
      </p>
      <p
        className="text-gray-300 text-xs mt-1"
        style={{ fontFamily: "'Lora', serif" }}
      >
        © 2026 Areesha Maryam. All rights reserved.
      </p>
    </footer>
  );
}