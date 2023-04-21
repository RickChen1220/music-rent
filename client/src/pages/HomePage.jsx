import { FaAngleUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import BarChart from "../BarChart";

export default function HomePage() {
  const [isVisible, setIsVisble] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isVisible = scrollTop > 0;
      setIsVisble(isVisible);
    };

    addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-custom-color">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center p-6">
        <p className="text-[#ff6130] font-bold p-2 md:text-xl">
          Plan your practice now
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Grow with music.
        </h1>
        <div>
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Choose your favorie room near you with best facilities and
            Unbeatable price.
          </p>
          <button className="text-white bg-[#ff6130] w-[200px] rounded-2xl font-medium my-6 mx-auto py-3">
            Get Started
          </button>
        </div>
      </div>
      <div className="w-full py-16 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <img
            className="w-[500px] mx-auto my-4"
            src="/images/gp-1.jpg"
            alt="My Image"
          />
          <div className="flex flex-col justify-center mx-2">
            <p className="text-[#ff6130] font-bold">WELCOME TO MUSIC RENT</p>
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              Create Your Own Melodies
            </h1>
            <p>
              Our rental room is equipped with high-quality instruments and
              equipment to cater to all your musical needs. Whether you are a
              seasoned musician or a beginner, our space is perfect for you to
              practice, rehearse, or record your music. We offer a variety of
              instruments, including guitars, drums, keyboards, and more, all
              maintained to the highest standard to ensure you have the best
              experience possible. Our music rental room is designed to inspire
              creativity and provide a comfortable and professional environment
              for all our customers. Come and explore your musical talents with
              us today!
            </p>
            <button className="text-white bg-[#ff6130] w-[200px] rounded-2xl font-medium my-6 mx-auto md:mx-0 py-3">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div>
        <BarChart />
      </div>

      <div className="w-full py-16 px-4 bg-slate-200">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
          <div className="lg:col-span-2 my-4">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              We Are Always Providing Best Service For You
            </h1>
            <p>Sign up to our news letter and stay up to date.</p>
          </div>
          <div className="my-4">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <input
                className="p-3"
                type="email"
                placeholder="Enter email"
              ></input>
              <button className="text-white bg-[#ff6130] w-[200px] rounded-2xl font-medium my-6 mx-auto py-3 ml-4">
                Join with us
              </button>
            </div>
            <p>
              We care about the protection of your data. Read our{" "}
              <span className="text-[#ff6130]">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full py-[10rem] px-4" id="ourTeam">
        <div className=" mx-auot grid md:grid-cols-3 gap-8">
          <div className="w-full shadow-xl flex flex-col py-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img
              className="w-80 mx-auto mt-[-3rem] bg-white"
              src="/images/ms-1.jpg"
              alt="My Image"
            />
            <h2 className="text-2xl font-bold text-center py-8">
              Samson Miller
            </h2>
            <p className="text-center text-lg font-bold">Business Owner</p>
          </div>
          <div className="w-full shadow-xl flex flex-col py-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img
              className="w-80 mx-auto mt-[-3rem] bg-white"
              src="/images/ms-2.jpg"
              alt="My Image"
            />
            <h2 className="text-2xl font-bold text-center py-8">Lucas Ross</h2>
            <p className="text-center text-lg font-bold">Manager</p>
          </div>
          <div className="w-full shadow-xl flex flex-col py-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img
              className="w-80 mx-auto mt-[-3rem] bg-white"
              src="/images/ms-3.jpg"
              alt="My Image"
            />
            <h2 className="text-2xl font-bold text-center py-8">Martin Rizz</h2>
            <p className="text-center text-lg font-bold">Photographer</p>
          </div>
        </div>
      </div>
      {isVisible && (
        <button
          className="fixed bottom-4 right-4 p-2 rounded-full bg-primary text-white transition duration-300 hover:bg-[#c73b10] focus:outline-none"
          onClick={handleClick}
        >
          <FaAngleUp />
        </button>
      )}
    </div>
  );
}
