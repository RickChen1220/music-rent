export default function HomePage() {
  return (
    <div className="bg-custom-color">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center p-6">
        <p className="text-[#ff6130] font-bold p-2">Plan your practice now</p>
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
          <div className="flex flex-col justify-center">
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
    </div>
  );
}
