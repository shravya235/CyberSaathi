import Navbar from '@/components/Navbar/Navbar';
import image from './image.jpg';

export default function Homepage() {
  return (
    <div className='overflow-hidden'>
      <Navbar/>
      <div className=" pt-16 w-full h-screen bg-center bg-no-repeat bg-cover"
  style={{ backgroundImage: `url(${image.src || image})` }}
>
  </div>
    </div>
  );
}

