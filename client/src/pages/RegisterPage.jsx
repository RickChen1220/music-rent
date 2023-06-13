import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
        isAdmin,
      });
      alert("Registration successful!");
    } catch (e) {
      alert("Registration falied!");
    }
  }

  return (
    <div className="mt-4 flex grow items-center justify-around">
      <div className="mb-64">
        <h1 className="mb-4 py-2 text-center text-4xl">Register</h1>
        <form className="mx-auto max-w-md" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Music Rent"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <input
            type="email"
            placeholder="mrent@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <div>
            <label htmlFor="isAdmin">
              Admin:
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(true)}
              />
            </label>
          </div>
          <button className="primary">Register</button>
          <div className="py-2 text-center text-gray-500">
            Already a member?
            <Link className="text-black underline" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
