import Link from "next/link";

export default function NavLinks({ closeMenu }) {
  const links = [
    { name: "Home", href: "/Home" },
    { name: "Quiz", href: "/Quiz" },
    { name: "Article", href: "/article" },
    { name: "About", href: "/About" },
    { name: "Community", href: "/Community/community" },
    { name: "profile", href: "/Profile/profile" },
    { name: "contact", href: "/"}
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
