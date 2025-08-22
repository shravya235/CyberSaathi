import Navbar from "../Components/Navbar/Navbar";
export default function Home() {
  return (
    <div>
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:"url('../images/bg.jpg')"}}></div>
      <Navbar/>
    </div>
  );
}