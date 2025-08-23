import Link from "next/link";

export default function ProfileLink() {
  return (
    <Link
      href="/Profile/profile"
      className="text-white hover:text-blue-700 font-medium"
    >
      Profile
    </Link>
  );
}
