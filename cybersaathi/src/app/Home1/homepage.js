import image from '../../Components/images/image.jpg'
export default function homepage() {
  return (
    <div>
      {/* Add padding top equal or greater than navbar height so content is not hidden behind sticky navbar */}
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Optional overlay */}
        <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Welcome to Code Shakti</h1>
        </div>
      </div>
      
    </div>
  );
}
