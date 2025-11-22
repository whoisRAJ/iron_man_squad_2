"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  // Step 1
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Step 2
  const [role, setRole] = useState("");

  // Step 3
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [stress, setStress] = useState("");
const [sleep, setSleep] = useState("");
const [bp, setBp] = useState("");

  // NEW — Step 4 Confirmation
  const [confirmSubmit, setConfirmSubmit] = useState("");

  const handleStep1 = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2 = () => {
    if (!role) {
      alert("Please select Doctor or Person");
      return;
    }
    setStep(3);
  };

  const handleNextFinal = () => {
    setStep(4);
  };

  const handleCancel = () => {
    router.push("/");
  };

  const handleFinalSubmit = async () => {
  if (!confirmSubmit) return;

  const signupData = {
    email,
    name: username,
    password,
    role,
    specialization,
    experience,
    height,
    weight,
    stress,
    sleep,
    bp,
    consentGiven: true
  };

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup completed successfully!");
      router.push("/");
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error. Try again later.");
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 border rounded-xl shadow-sm">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
            <form onSubmit={handleStep1} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="border p-3 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Username"
                className="border p-3 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-3 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Next
              </button>
              <button
                type="button"
                className="bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 mt-3"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Select Role</h1>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  onChange={(e) => setRole('provider')}
                />
                <span>Doctor</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="role"
                  value="person"
                  onChange={(e) => setRole('user')}
                />
                <span>Person</span>
              </label>

              <button
                onClick={handleStep2}
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Next
              </button>

              <button
                type="button"
                className="bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 mt-3"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {/* STEP 3 — Doctor */}
        {step === 3 && role === "provider" && (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Doctor Details</h1>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Specialization"
                className="border p-3 rounded-md"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Experience (years)"
                className="border p-3 rounded-md"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={handleNextFinal}
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Next
              </button>

              <button
                type="button"
                className="bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 mt-3"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </>
        )}

        {/* STEP 3 — Person */}
        {step === 3 && role === "user" && (
  <>
    <h1 className="text-2xl font-bold text-center mb-6">Person Details</h1>
    <form className="flex flex-col gap-4">

      <input
        type="number"
        placeholder="Height (cm)"
        className="border p-3 rounded-md"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Weight (kg)"
        className="border p-3 rounded-md"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />

      {/* NEW — Stress */}
      <input
        type="text"
        placeholder="Stress Level (Low / Medium / High)"
        className="border p-3 rounded-md"
        value={stress}
        onChange={(e) => setStress(e.target.value)}
        required
      />

      {/* NEW — Sleep */}
      <input
        type="number"
        placeholder="Sleep Hours per Day"
        className="border p-3 rounded-md"
        value={sleep}
        onChange={(e) => setSleep(e.target.value)}
        required
      />

      {/* NEW — Blood Pressure */}
      <input
        type="text"
        placeholder="Blood Pressure (Ex: 120/80)"
        className="border p-3 rounded-md"
        value={bp}
        onChange={(e) => setBp(e.target.value)}
        required
      />

      <button
        type="button"
        onClick={handleNextFinal}
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Next
      </button>

      <button
        type="button"
        className="bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 mt-3"
        onClick={handleCancel}
      >
        Cancel
      </button>

    </form>
  </>
)}

        {/* STEP 4 — SUMMARY + CONFIRMATION */}
{step === 4 && (
  <>
    <h1 className="text-2xl font-bold text-center mb-6">Confirm Your Details</h1>

    <div className="text-sm mb-5">
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Role:</strong> {role}</p>

      {role === "provider" && (
        <>
          <p><strong>Specialization:</strong> {specialization}</p>
          <p><strong>Experience:</strong> {experience} years</p>
        </>
      )}

      {role === "user" && (
        <>
          <p><strong>Height:</strong> {height} cm</p>
          <p><strong>Weight:</strong> {weight} kg</p>
          <p><strong>Stress Level:</strong> {stress}</p>
    <p><strong>Sleep:</strong> {sleep} hours/day</p>
    <p><strong>Blood Pressure:</strong> {bp}</p>
        </>
      )}
    </div>

    {/* NEW — Confirmation Checkbox */}
    <label className="flex items-center gap-3 mb-5">
      <input
        type="checkbox"
        onChange={(e) => setConfirmSubmit(e.target.checked)}
      />
      <span className="font-medium">I confirm my details are correct</span>
    </label>

    {/* Submit button only if checked */}
    <button
      disabled={!confirmSubmit}
      onClick={handleFinalSubmit}
      className={`py-2 rounded-md w-full text-white 
        ${confirmSubmit ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"}`}
    >
      Submit
    </button>

    <button
      type="button"
      className="bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 mt-3 w-full"
      onClick={handleCancel}
    >
      Cancel
    </button>
  </>
)}

      </div>
    </div>
  );
}
