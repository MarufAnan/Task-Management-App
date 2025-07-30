import { IoIosCall } from "react-icons/io";

export default function Contact() {
  return (
    <div className="p-4 flex flex-col items-center">
      <img
        src="public/profile.jpg"  // ✅ Correct usage
        alt="profile"
        className="w-55 h-55 rounded-full my-4 shadow-md"
      />
      <h2 className="text-2xl font-bold text-blue-800">📧 Contact</h2>
      <h1 className="text-2xl font-bold text-blue-800">Name: Maruf Halder</h1>
      <a className="mt-2 font-bold text-xl" href="mailto:marufhalder999@gmail.com">
        Email: marufhalder999@gmail.com
      </a>
      <a className="text-3xl bg-blue-500  px-3 rounded-2xl " href="tel:+91 8328760059"><button><IoIosCall /></button></a>
    </div>
  );
}
