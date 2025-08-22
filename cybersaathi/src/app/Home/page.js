import Navbar from '../../Components/Navbar/Navbar';


export default function Home() {
  return (
    <div className='bg-amber-50'>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to Code Shakti</h1>
        {/* Add your homepage content here */}
      </main>
    </div>
  );
}
