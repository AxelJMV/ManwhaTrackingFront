import { useState } from "react";
import itadori from "../assets/wallpapers/itadori.jpeg";
import emailIcon from "../assets/icons/email.png";
import passwordIcon from "../assets/icons/password.png";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ✅ Validar email con expresión regular simple
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // 🧠 Actualizar valores y validar en tiempo real
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setForm((f) => ({ ...f, [name]: val }));

    if (name === "email") {
      setErrors((err) => ({
        ...err,
        email: validateEmail(val) ? "" : "Correo inválido",
      }));
    }
  };

  // 🧠 Envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const emailOk = validateEmail(form.email);
    const passOk = form.password.trim() !== "";

    if (!emailOk || !passOk) {
      if (!emailOk) setErrors((err) => ({ ...err, email: "Correo inválido" }));
      if (!passOk) setSubmitError("La contraseña no puede estar vacía");
      return;
    }

    setLoading(true);
    try {
      // Simular autenticación
      await new Promise((r) => setTimeout(r, 800));
      alert(`✅ Login correcto\nEmail: ${form.email}`);
    } catch {
      setSubmitError("Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Habilitar botón solo si hay email válido y password con texto
  const isValid = validateEmail(form.email) && form.password.trim() !== "";

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden grid md:grid-cols-[380px_1fr]">
        {/* Imagen izquierda */}
        <div className="hidden md:block">
          <img
            src={itadori}
            alt="Login visual"
            className="h-full w-[380px] object-cover"
          />
        </div>

        {/* Formulario */}
        <div className="p-6 md:p-10">
          <p className="text-sm text-gray-500 mb-1">Welcome back</p>
          <h1 className="text-2xl font-extrabold mb-6">
            Login to your account
          </h1>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <img
                  src={emailIcon}
                  alt="Email"
                  className="w-5 h-5 opacity-70 mr-2"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="flex-1 py-2 outline-none bg-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <img
                  src={passwordIcon}
                  alt="Password"
                  className="w-5 h-5 opacity-70 mr-2"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  className="flex-1 py-2 outline-none bg-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={onChange}
                  className="h-4 w-4"
                />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Error general */}
            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={loading || !isValid}
              className={`w-full rounded-md px-4 py-2 font-semibold text-white transition-colors ${
                isValid
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Logging in..." : "Login now"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Join free today
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
