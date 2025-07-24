// src/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  Hospital,
  Syringe,
  HeartPulse,
  Stethoscope,
  Pill,
  Bandage,
  Ambulance,
  CalendarCheck,
  Activity,
} from "lucide-react";
import sleepwalkerImg from "../assets/sleepwalker.jpg";
import spiderBitesImg from "../assets/spiderbites.jpeg";
import fatigueImg from "../assets/fatigue.jpeg";
import NearbyHospitalsMap from "../components/NearbyHospitalsMap";

/* — HeroBanner — */
const HeroBanner = ({ userName, nextAppointment, healthScore }) => (
  <div className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 rounded-2xl p-8 mb-8 overflow-hidden">
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="relative z-10 flex justify-between items-center text-white">
      <div>
        <h1 className="text-4xl font-bold mb-2">Hi, {userName}!</h1>
        <p className="text-cyan-200 text-lg">
          Your health journey continues here
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="bg-white/20 rounded-lg p-3">
            <p className="text-sm text-cyan-200">Next Appointment</p>
            <p className="font-semibold">{nextAppointment}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <p className="text-sm text-cyan-200">Health Score</p>
            <p className="font-semibold">{healthScore}/100</p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center">
        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
          <Hospital size={48} className="text-white" />
        </div>
      </div>
    </div>
  </div>
);

/* — SearchBar — */
const SearchBar = ({ onSearch, currentQuery }) => {
  const [term, setTerm] = useState("");
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Find Healthcare Services
      </h3>
      {currentQuery && (
        <div className="mb-3 p-2 bg-cyan-50 rounded-lg">
          <span className="text-sm text-cyan-700">
            Searching for: "{currentQuery}"
          </span>
        </div>
      )}
      <div className="relative">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search doctors, services..."
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        <span className="absolute inset-y-0 left-0 pl-4 pt-4 text-gray-400 text-xl">
          🔍
        </span>
        <button
          onClick={() => onSearch(term)}
          className="absolute right-2 top-2 bottom-2 bg-cyan-600 text-white px-6 rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

/* — CategoryGrid — */
const CategoryGrid = ({ onSelect, selectedCategory }) => {
  const cats = [
    {
      name: "Hospital",
      icon: Hospital,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
    },
    {
      name: "Vaccination",
      icon: Syringe,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      name: "Cardiology",
      icon: HeartPulse,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      name: "Check‑up",
      icon: Stethoscope,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      name: "Pharmacy",
      icon: Pill,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      name: "First Aid",
      icon: Bandage,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      name: "Emergency",
      icon: Ambulance,
      bg: "bg-pink-100",
      color: "text-pink-600",
    },
    {
      name: "Appointments",
      icon: CalendarCheck,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Healthcare Categories
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {cats.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className={`bg-white rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transform hover:scale-105 transition ${
              selectedCategory === cat.name ? "ring-2 ring-cyan-500" : ""
            }`}
          >
            <div
              className={`${cat.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}
            >
              <cat.icon className={cat.color} size={32} />
            </div>
            <span className="text-gray-800 font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* — QuestionsModal — */
const QuestionsModal = ({ open, category, onClose, onSubmit }) => {
  const questionMap = {
    Hospital: ["In‑person or telehealth?", "Emergency?"],
    Vaccination: ["Which vaccine?", "Any allergies?"],
    Cardiology: ["Chest pain yes/no?", "Shortness of breath?"],
  };
  const questions = questionMap[category] || ["Describe your concern?"];
  const [answers, setAnswers] = useState(questions.map(() => ""));

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{category} Info</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(category, answers);
          }}
        >
          {questions.map((q, i) => (
            <div key={i} className="mb-4">
              <label className="block text-gray-700 mb-1">{q}</label>
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => {
                  const next = [...answers];
                  next[i] = e.target.value;
                  setAnswers(next);
                }}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* — BookingModal — */
const BookingModal = ({ show, onClose, onConfirm, initial }) => {
  const [date, setDate] = useState(initial?.date || "");
  const [time, setTime] = useState(initial?.time || "");
  const [doctor, setDoctor] = useState(initial?.doctor || "");

  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4">
          {initial ? "Reschedule" : "Book"} Appointment
        </h3>
        <label className="block text-sm">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <label className="block text-sm">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <label className="block text-sm">Doctor</label>
        <select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Choose a doctor</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
          <option value="Dr. Brown">Dr. Brown</option>
        </select>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm({ date, time, doctor })}
            className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

/* — AppointmentActions — */
const AppointmentActions = ({ onBook, onCancel, onReschedule }) => (
  <div className="flex justify-end gap-4 mb-6">
    <button
      onClick={onBook}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
    >
      Book Appointment
    </button>
    <button
      onClick={onCancel}
      className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
    >
      Cancel
    </button>
    <button
      onClick={onReschedule}
      className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600"
    >
      Reschedule
    </button>
  </div>
);

/* — StatsSection — */
const StatsSection = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
    {[
      {
        title: "Total Patients",
        value: "1.2K",
        icon: <Activity className="w-8 h-8 text-blue-500" />,
      },
      {
        title: "Today Appointments",
        value: "24",
        icon: <CalendarCheck className="w-8 h-8 text-green-500" />,
      },
      {
        title: "Health Score",
        value: "82/100",
        icon: <HeartPulse className="w-8 h-8 text-red-500" />,
      },
    ].map((s, i) => (
      <div key={i} className="bg-white p-6 rounded-xl shadow flex items-center">
        <div className="p-3 bg-gray-100 rounded-full mr-4">{s.icon}</div>
        <div>
          <div className="text-2xl font-bold">{s.value}</div>
          <div>{s.title}</div>
        </div>
      </div>
    ))}
  </div>
);

/* — HealthTalk — */
const HealthTalk = () => {
  const articles = [
    {
      title: "Help a Sleepwalker",
      date: "July 16, 2025",
      summary: "Tips...",
      img: sleepwalkerImg,
    },
    {
      title: "Treat Spider Bites",
      date: "July 11, 2025",
      summary: "Helpful guide...",
      img: spiderBitesImg,
    },
    {
      title: "Always So Tired?",
      date: "July 10, 2025",
      summary: "Explore fatigue...",
      img: fatigueImg,
    },
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Talk</h3>
      <div className="space-y-4">
        {articles.map((a, i) => (
          <div
            key={i}
            className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition"
          >
            <img
              src={a.img}
              alt={a.title}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div>
              <h4 className="font-medium text-gray-900">{a.title}</h4>
              <p className="text-sm text-gray-600">{a.date}</p>
              <p className="text-sm text-gray-700 mt-1">{a.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* — NearbyHospitalsModal — */
const NearbyHospitalsModal = ({ open, onClose, hospitals }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start p-4 z-50 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Nearby Hospitals</h2>
        <ul className="space-y-4">
          {hospitals.map((h, i) => (
            <li key={i} className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg">{h.name}</h3>
              <p className="text-sm text-gray-600">{h.location}</p>
              {h.phone && <p className="text-sm">📞 {h.phone}</p>}
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      h.name + " " + h.location
                    )}`,
                    "_blank"
                  )
                }
                className="mt-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
              >
                View on map
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* — Main Dashboard — */
export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showHospitalsModal, setShowHospitalsModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [rescheduling, setRescheduling] = useState(false);
  const [apptToReschedule, setApptToReschedule] = useState(null);

  const hospitals = [
    { name: "University College Hospital", location: "Ibadan", phone: null },
    { name: "Adeoyo Hospital (Yemetu)", location: "Ibadan", phone: null },
    { name: "Oluyoro Catholic Hospital", location: "Ibadan", phone: null },
    {
      name: "Molly Specialist Hospital",
      location: "Ibadan",
      phone: "+2348076748330",
    },
    { name: "Lautech Teaching Hospital", location: "Ogbomosho", phone: null },
    {
      name: "Bowen University Teaching Hospital",
      location: "Ogbomosho",
      phone: null,
    },
  ];

  const handleSearch = (q) => setSearchQuery(q);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat === "Hospital") setShowHospitalsModal(true);
    else setShowQuestions(true);
  };

  const handleQuestionsSubmit = (cat, answers) => {
    console.log(cat, answers);
    setShowQuestions(false);
    setShowBooking(true);
  };

  const handleBook = () => setShowBooking(true);
  const handleCancel = () => {
    if (!appointments.length) return alert("No appointment to cancel.");
    setAppointments((prev) => prev.slice(1));
    alert("Cancelled");
  };
  const handleReschedule = () => {
    if (!appointments.length) return alert("None to reschedule.");
    setApptToReschedule(appointments[0]);
    setRescheduling(true);
    setShowBooking(true);
  };
  const handleConfirm = ({ date, time, doctor }) => {
    if (rescheduling && apptToReschedule) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === apptToReschedule.id ? { ...a, date, time, doctor } : a
        )
      );
      alert("Rescheduled");
    } else {
      setAppointments((prev) => [
        ...prev,
        { id: Date.now(), date, time, doctor },
      ]);
      alert("Booked");
    }
    setShowBooking(false);
    setRescheduling(false);
    setApptToReschedule(null);
  };

  const next = appointments[0];
  const nextApp = next ? `${next.date} at ${next.time}` : "None";

  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold">Nearby Hospitals</h1>
        <NearbyHospitalsMap />
      </div>
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <HeroBanner
          userName="Fawaz"
          nextAppointment={nextApp}
          healthScore={85}
        />
        <SearchBar onSearch={handleSearch} currentQuery={searchQuery} />
        <CategoryGrid
          onSelect={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
        <AppointmentActions
          onBook={handleBook}
          onCancel={handleCancel}
          onReschedule={handleReschedule}
        />
        <StatsSection />
        <HealthTalk />
        <QuestionsModal
          open={showQuestions}
          category={selectedCategory}
          onClose={() => setShowQuestions(false)}
          onSubmit={handleQuestionsSubmit}
        />
        <BookingModal
          show={showBooking}
          onClose={() => setShowBooking(false)}
          onConfirm={handleConfirm}
          initial={rescheduling ? apptToReschedule : null}
        />
      </div>

      <NearbyHospitalsModal
        open={showHospitalsModal}
        hospitals={hospitals}
        onClose={() => setShowHospitalsModal(false)}
      />
    </>
  );
}
