
import Navbar from "./components/Navbar";

//https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=3efbd03c278fab207e0ac146012884e2
export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar></Navbar>
    </div>
  );
}
