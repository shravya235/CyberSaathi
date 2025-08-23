import Link from "next/link";

export default function ProfileLink({ closeMenu }) {
  return (
    <Link
      href="/profile"
      className="text-white hover:text-blue-700 font-medium"
      onClick={closeMenu}
    >
      Profile
    </Link>
  );
}
