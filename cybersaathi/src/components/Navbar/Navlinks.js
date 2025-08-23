import Link from "next/link";

export default function NavLinks({ closeMenu }) {
  const links = [
    { name: "Home", href: "/" },
    { name: "Quiz", href: "/quiz" },
    { name: "About", href: "/about" },
    { name: "Community", href: "/community" },
  ];

  return (
    <>
      {links.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className="text-white hover:text-blue-700 font-medium"
          onClick={closeMenu}
        >
          {name}
        </Link>
      ))}
    </>
  );
}
