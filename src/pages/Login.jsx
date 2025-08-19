import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
      } else {
        setMessage(res.message || "Login gagal");
      }
    } catch (err) {
      setMessage("Error server");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white/80 backdrop-blur-md border border-green-300 
                   shadow-xl p-8 rounded-2xl w-96"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Login IoT Farm 🐔🌾
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-full text-white font-semibold shadow-md">
          Login
        </button>

        {message && (
          <p className="mt-4 text-sm text-red-600 text-center">{message}</p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
