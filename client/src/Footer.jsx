import {
  FaGithubSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-600">
      <div>
        <h1 className="font-bold text-3xl text-[#ff6130]">MusicRent</h1>
        <p className="py-4">
          We offers a big range of rooms for all your instruments needs. We have
          the perfect facilities to meet your needs.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaGithubSquare size={30} className="cursor-pointer" />
          <FaFacebookSquare size={30} className="cursor-pointer" />
          <FaInstagram size={30} className="cursor-pointer" />
          <FaTwitterSquare size={30} className="cursor-pointer" />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between">
        <div>
          <h6 className="text-xl font-medium text-gray-900">Our Classes</h6>
          <ul>
            <li className="py-2 text-sm transition duration-300  hover:text-primary cursor-pointer">
              Piano Classes
            </li>
            <li className="py-2 text-sm transition duration-300  hover:text-primary cursor-pointer">
              Guitar Classes
            </li>
            <li className="py-2 text-sm transition duration-300  hover:text-primary cursor-pointer">
              Vocal Classes
            </li>
            <li className="py-2 text-sm transition duration-300  hover:text-primary cursor-pointer">
              Violin Classes
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-xl font-medium text-gray-900">Locations</h6>
          <ul>
            <li className="py-2 text-sm transition duration-300  hover:text-primary cursor-pointer">
              Taichung
            </li>
            <li className="py-2 text-sm transition duration-300  hover:text-primary cursor-pointer">
              Tainan
            </li>
            <li className="py-2 text-sm transition duration-300  hover:text-primary cursor-pointer">
              Taipei
            </li>
            <li className="py-2 text-sm transition duration-300  hover:text-primary cursor-pointer">
              Kaohsiung
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-xl font-medium text-gray-900">Working Hours</h6>
          <ul>
            <li className="py-2 text-sm">Monday - Friday:</li>
            <li className="py-2 text-sm">11:00am - 21:00pm</li>
            <li className="py-2 text-sm">Saturday</li>
            <li className="py-2 text-sm">9:00am - 21:00pm</li>
            <li className="py-2 text-sm">Sunday</li>
            <li className="py-2 text-sm">Closed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
