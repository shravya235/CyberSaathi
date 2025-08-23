import Navbar from "@/components/Navbar/Navbar";  // ensure the path is correct
import Homepage from "./Home1/homepage";  // capitalized since components should be PascalCase

export default function Home() {
  return (
    <div>
      <Navbar />
      <Homepage />
    </div>
  );
}
