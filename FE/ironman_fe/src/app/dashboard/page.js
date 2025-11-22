"use client"
import Image from "next/image";
import Link from "next/link";
import CicularProgress from "../reusableComp/circularProgressBar";
import CalendarComp from "../reusableComp/calendar";
import ChartCompData from "../reusableComp/chart";
import Tipsdata from "../reusableComp/tips";
import React from "react";

// const cards = [
//   { title: "Steps", value: "1204", maxVal: "10000" },
//   { title: "Sleep", value: "7", maxVal: "9" },
//   { title: "BP", value: "110", maxVal: "150" },
// ];

const chartData = {
  labels: ["Sunday", "Monday", "Tuesday", "Wednesday"],
  datasets: [
    {
      label: "BP Level",
      data: [81, 90, 111, 91],
      fill: false,
      borderColor: "#42A5F5",
      tension: 0.4,
    },
  ],
};

export default function Dashboard() {
  // Example state hooks for fetched data, error, and loading
  const [data, setData] = React.useState(null);
  console.log('data"', data)
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/wellness?email=testuser444@example.com');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result[0]);
        setChart(result)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    // Dynamically create cards from data
  const cards = data
    ? [
        { title: "Steps", value: data.steps, maxVal: 10000 },
        { title: "Sleep Hours", value: data.sleepHours, maxVal: 9 },
        { title: "Blood Pressure", value: data.BP, maxVal: 150 },
        // { title: "Status", value: data.status, maxVal: 1 },
        // { title: "Date", value: new Date(data.date).toLocaleDateString(), maxVal: 1 }
      ]
    : [];


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">
          HealthCare Project
        </h2>
        <nav className="flex flex-col space-y-4 text-lg text-gray-700">
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:text-blue-600">
            Profile
          </Link>
          <Link href="/contact-doctor" className="hover:text-blue-600">
            Contact Doctor
          </Link>
          <Link href="/" className="hover:text-blue-600">
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Hello, user</h1>
          <Image
            src="/icons/233866.png"
            alt="icon"
            width={24}
            height={24}
            className="w-6 h-6"
          />

          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">
                  Rahul Raj
                </h3>

                <p className="text-sm text-gray-600">raj07gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {card.title}
              </h2>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <CicularProgress percentage={card.value / card.maxVal} />
            </div>
          ))}
        </div>

        {/* calendar */}
        <CalendarComp value={new Date()} />
        <Tipsdata
          data={
            "Drink plenty of water and maintain a balanced diet for optimal health."
          }
        />

        {/* chart */}
        <ChartCompData data={chartData} />
      </div>
    </div>
  );
}
