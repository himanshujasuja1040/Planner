import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../context/CommonContext";
import { useParams } from "react-router-dom";

// Consolidated Icons
const Icons = {
  Target: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Calendar: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
      />
    </svg>
  ),
  Clock: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Play: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
    </svg>
  ),
  Pause: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Stop: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 10h6v4H9z"
      />
    </svg>
  ),
  Check: () => (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  BookOpen: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
      />
    </svg>
  ),
  Save: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3-3-3m3-3v12"
      />
    </svg>
  ),
  Lightbulb: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  Brain: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  Focus: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
      />
    </svg>
  ),
  Trash: () => (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
  Settings: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

// Focus Timer
const FocusTimer = ({
  initialMinutes = 25,
  currentSlot,
  onComplete,
  onPause,
  onResume,
  onStop,
  isPaused = false,
  isRunning = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);
  const totalTime = initialMinutes * 60;

  console.log("🎯 FocusTimer: Initialized", {
    initialMinutes,
    timeLeft,
    isRunning,
    isPaused,
    currentSlot: currentSlot?.subject,
  });

  useEffect(() => {
    console.log("⏱️ FocusTimer: Timer state changed", {
      isRunning,
      isPaused,
      timeLeft,
    });

    if (isRunning && !isPaused) {
      console.log("▶️ Starting timer interval");
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            console.log("✅ Timer completed!");
            onComplete();
            return 0;
          }
          const newTime = prev - 1;
          setProgress((newTime / totalTime) * 100);

          // Log every minute
          if (newTime % 60 === 0) {
            console.log(`⏰ ${Math.floor(newTime / 60)} minutes remaining`);
          }

          return newTime;
        });
      }, 1000);
    } else {
      console.log("⏸️ Clearing timer interval");
      clearInterval(intervalRef.current);
    }

    return () => {
      console.log("🧹 Cleaning up timer interval");
      clearInterval(intervalRef.current);
    };
  }, [isRunning, isPaused, onComplete, totalTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-17">
      <div className="relative w-75 h-75">
        <svg className="w-75 h-75 transform -rotate-90" viewBox="0 0 256 256">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="url(#gradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                className="text-blue-400"
                stopColor="currentColor"
              />
              <stop
                offset="100%"
                className="text-purple-500"
                stopColor="currentColor"
              />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-4xl font-bold font-mono tracking-wider mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs opacity-75 uppercase tracking-widest">
            {isPaused ? "Paused" : isRunning ? "Focus Time" : "Ready"}
          </div>
        </div>
      </div>

      {currentSlot && (
        <div className="text-center text-white">
          <h2 className="text-lg font-bold mb-1">{currentSlot.subject}</h2>
          {currentSlot.topic && (
            <p className="text-sm opacity-80">{currentSlot.topic}</p>
          )}
        </div>
      )}

      <div className="flex items-center space-x-3">
        {!isRunning ? (
          <button
            onClick={onResume}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-medium shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Icons.Play className="w-4 h-4 mr-2" />
            Start Focus
          </button>
        ) : (
          <>
            <button
              onClick={isPaused ? onResume : onPause}
              className={`flex items-center px-4 py-2 rounded-lg text-white font-medium shadow-xl transition-all duration-200 transform hover:scale-105 ${
                isPaused
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  : "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
              }`}
            >
              {isPaused ? (
                <Icons.Play className="w-4 h-4 mr-1" />
              ) : (
                <Icons.Pause className="w-4 h-4 mr-1" />
              )}
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={onStop}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg text-white font-medium shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Icons.Stop className="w-4 h-4 mr-1" />
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Focus Mode
const FocusMode = ({
  currentSlot,
  onExit,
  distractionCount,
  onDistraction,
  sessionDuration = 25,
}) => {
  const [timerState, setTimerState] = useState({
    isRunning: false,
    isPaused: false,
    isCompleted: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [duration, setDuration] = useState(sessionDuration);

  console.log("🎯 FocusMode: Entered focus mode", {
    currentSlot: currentSlot?.subject,
    sessionDuration,
    distractionCount,
  });

  useEffect(() => {
    console.log("⚡ FocusMode: Timer state updated", timerState);
  }, [timerState]);

  const handleTimerComplete = () => {
    console.log("✅ Focus session completed!");
    setTimerState({ isRunning: false, isPaused: false, isCompleted: true });
    setTimeout(() => alert("Focus session completed! Great job!"), 500);
  };

  const handleStart = () => {
    console.log("▶️ Starting focus session");
    setTimerState({ isRunning: true, isPaused: false, isCompleted: false });
  };

  const handlePause = () => {
    console.log("⏸️ Pausing focus session");
    setTimerState((prev) => ({ ...prev, isPaused: true }));
  };

  const handleResume = () => {
    console.log("▶️ Resuming focus session");
    setTimerState((prev) => ({ ...prev, isPaused: false }));
  };

  const handleStop = () => {
    console.log("⏹️ Stopping focus session");
    setTimerState({ isRunning: false, isPaused: false, isCompleted: false });
  };

  const handleDistraction = () => {
    console.log("📢 Distraction marked!", { currentCount: distractionCount });
    onDistraction();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex flex-col overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              console.log("⚙️ Toggling settings panel");
              setShowSettings(!showSettings);
            }}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
          >
            <Icons.Settings className="w-5 h-5" />
          </button>
          {showSettings && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white">
              <label className="block text-xs mb-2">
                Session Duration (minutes):
              </label>
              <select
                value={duration}
                onChange={(e) => {
                  const newDuration = Number(e.target.value);
                  console.log("⏱️ Duration changed", {
                    from: duration,
                    to: newDuration,
                  });
                  setDuration(newDuration);
                }}
                className="bg-white/20 rounded-lg px-3 py-2 text-black text-sm"
              >
                <option value={15}>15 min</option>
                <option value={25}>25 min</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
              </select>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            console.log("🚪 Exiting focus mode");
            onExit();
          }}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-white px-8">
        <FocusTimer
          initialMinutes={duration}
          currentSlot={currentSlot}
          onComplete={handleTimerComplete}
          onPause={handlePause}
          onResume={handleStart}
          onStop={handleStop}
          isPaused={timerState.isPaused}
          isRunning={timerState.isRunning}
        />

        <div className="mt-8">
          <button
            onClick={handleDistraction}
            className="flex items-center px-6 py-3 bg-orange-600/80 hover:bg-orange-600 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            <Icons.Target className="w-4 h-4 mr-2" />
            Mark Distraction
          </button>
        </div>

        <div className="mt-6 text-center max-w-md">
          <p className="text-sm text-blue-200 opacity-80 italic">
            "Deep work is the ability to focus without distraction on a
            cognitively demanding task."
          </p>
          <p className="text-xs text-blue-300 opacity-60 mt-1">— Cal Newport</p>
        </div>
      </div>

      <div className="relative z-10 p-4 flex justify-between items-center text-white/60">
        <div className="text-xs">
          Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>{" "}
          to exit focus mode
        </div>
        <div className="text-xs">
          Distractions today:{" "}
          <span className="text-orange-400 font-semibold">
            {distractionCount}
          </span>
        </div>
      </div>
    </div>
  );
};

// Color options
const colorOptions = [
  {
    name: "Blue",
    value: "#3B82F6",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
  },
  {
    name: "Green",
    value: "#10B981",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
  },
  {
    name: "Purple",
    value: "#8B5CF6",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-900",
  },
  {
    name: "Orange",
    value: "#F59E0B",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
  },
  {
    name: "Red",
    value: "#EF4444",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
  },
  {
    name: "Cyan",
    value: "#06B6D4",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-900",
  },
];

// Generate time slots
const generateTimeSlots = () => {
  console.log("📅 Generating time slots...");
  const slots = [];
  const startHour = 6;
  const endHour = 23;

  const formatTime12Hour = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = formatTime12Hour(hour, minute);
      slots.push({
        id: `${hour}-${minute}`,
        time: timeString,
        rawHour: hour,
        rawMinute: minute,
        subject: "",
        topic: "",
        type: "free",
        completed: false,
        color: "#6B7280",
        duration: 30,
        isOccupied: false,
      });
    }
  }

  console.log(
    `📅 Generated ${slots.length} time slots (${startHour}:00 - ${endHour}:30)`
  );
  return slots;
};

// Default subjects
const defaultSubjects = {
  Mathematics: { color: "#3B82F6" },
  Physics: { color: "#10B981" },
  Chemistry: { color: "#8B5CF6" },
  English: { color: "#F59E0B" },
  Biology: { color: "#06B6D4" },
  "General Studies": { color: "#EF4444" },
};

// Time Slot Component
const TimeSlot = ({
  slot,
  subjects,
  onUpdate,
  onStartTimer,
  isHighlighted,
  onClearSchedule,
}) => {
  const getColorClasses = (color) => {
    const colorOption = colorOptions.find((c) => c.value === color);
    return colorOption
      ? colorOption
      : { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-900" };
  };

  const isCurrentTimeSlot = () => {
    const now = new Date();
    const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
    const slotStartMinutes = slot.rawHour * 60 + slot.rawMinute;
    const slotEndMinutes = slotStartMinutes + slot.duration;
    return (
      currentTotalMinutes >= slotStartMinutes &&
      currentTotalMinutes < slotEndMinutes
    );
  };

  const colorClasses = getColorClasses(slot.color);
  const isCurrentSlot = isCurrentTimeSlot();
  const isEmpty = !slot.subject && slot.type === "free";

  const handleSlotClick = () => {
    console.log("🖱️ Time slot clicked", {
      slot: slot.time,
      subject: slot.subject,
      type: slot.type,
      isEmpty,
      isCurrentSlot,
    });
    onUpdate && onUpdate(slot.id);
  };

  const handleStartTimer = (e) => {
    e.stopPropagation();
    console.log("▶️ Starting timer for slot", {
      time: slot.time,
      subject: slot.subject,
      topic: slot.topic,
      duration: slot.duration,
    });
    onStartTimer(slot);
  };

  const handleClearSchedule = (e) => {
    e.stopPropagation();
    console.log("🗑️ Clearing schedule for slot", {
      time: slot.time,
      subject: slot.subject,
    });
    onClearSchedule(slot.id);
  };

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    console.log("✅ Toggling completion for slot", {
      time: slot.time,
      subject: slot.subject,
      wasCompleted: slot.completed,
      nowCompleted: !slot.completed,
    });
    onUpdate(slot.id, { completed: !slot.completed });
  };

  return (
    <div
      className={`rounded-lg p-3 mb-2 cursor-pointer transition-all duration-200 border-2 ${
        isHighlighted
          ? "bg-blue-100 border-blue-400 shadow-md"
          : isEmpty
          ? "bg-white border-gray-200 hover:border-gray-300"
          : isCurrentSlot
          ? `${colorClasses.bg} ${colorClasses.border} shadow-lg border-4`
          : `${colorClasses.bg} ${colorClasses.border} hover:shadow-md`
      } ${slot.isOccupied ? "min-h-[70px]" : ""}`}
      onClick={handleSlotClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span
                className={`text-xs font-medium w-16 ${
                  isEmpty ? "text-gray-500" : colorClasses.text
                }`}
              >
                {slot.time}
              </span>

              {slot.type === "study" && slot.subject ? (
                <div className="flex-1">
                  <div className={`font-medium text-sm ${colorClasses.text}`}>
                    {slot.subject}
                  </div>
                  {slot.topic && (
                    <div className={`text-xs opacity-75 ${colorClasses.text}`}>
                      {slot.topic}
                    </div>
                  )}
                  {slot.duration > 30 && (
                    <div className={`text-xs opacity-60 ${colorClasses.text}`}>
                      {slot.duration} minutes
                    </div>
                  )}
                </div>
              ) : slot.type !== "free" ? (
                <div className="flex-1">
                  <span
                    className={`font-medium capitalize text-sm ${colorClasses.text}`}
                  >
                    {slot.type === "break"
                      ? "Break"
                      : slot.type === "meal"
                      ? "Meal"
                      : "Free Time"}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-gray-400 flex-1">Available</span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              {slot.type === "study" && slot.subject && (
                <>
                  {isCurrentSlot && (
                    <button
                      onClick={handleStartTimer}
                      className="p-1.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white shadow-sm"
                    >
                      <Icons.Play className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={handleClearSchedule}
                    className="p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 shadow-sm"
                  >
                    <Icons.Trash className="w-3 h-3" />
                  </button>
                  <button
                    onClick={handleToggleComplete}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      slot.completed
                        ? "border-green-500 bg-green-100 hover:bg-green-200"
                        : "border-gray-400 bg-gray-100 hover:border-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {slot.completed && (
                      <Icons.Check className="w-2.5 h-2.5 text-green-600" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Time Range Selector
const TimeRangeSelector = ({
  startTime,
  endTime,
  onStartChange,
  onEndChange,
}) => {
  const timeOptions = [];
  for (let hour = 6; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      const timeString = `${time12}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
      const value = `${hour}-${minute}`;
      timeOptions.push({ value, label: timeString, hour, minute });
    }
  }

  console.log("⏰ TimeRangeSelector: Rendered", {
    startTime,
    endTime,
    totalOptions: timeOptions.length,
  });

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Start Time
        </label>
        <select
          value={startTime}
          onChange={(e) => {
            console.log("🕐 Start time changed", {
              from: startTime,
              to: e.target.value,
            });
            onStartChange(e.target.value);
          }}
          className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
        >
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          End Time
        </label>
        <select
          value={endTime}
          onChange={(e) => {
            console.log("🕐 End time changed", {
              from: endTime,
              to: e.target.value,
            });
            onEndChange(e.target.value);
          }}
          className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
        >
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Task Planning Modal
const TaskPlanningModal = ({
  isOpen,
  onClose,
  onSave,
  subjects,
  selectedSlotId,
  timeSlots,
  existingTask,
}) => {
  const [formData, setFormData] = useState({
    type: "study",
    subject: "",
    topic: "",
    startTime: "",
    endTime: "",
    color: "#3B82F6",
  });

  console.log("📝 TaskPlanningModal: Rendered", {
    isOpen,
    selectedSlotId,
    existingTask: existingTask?.subject,
    formData: formData.subject,
  });

  useEffect(() => {
    if (isOpen) {
      if (existingTask) {
        console.log("📝 Loading existing task for editing", existingTask);
        setFormData(existingTask);
      } else if (selectedSlotId) {
        const selectedSlot = timeSlots.find(
          (slot) => slot.id === selectedSlotId
        );
        if (selectedSlot) {
          const startValue = `${selectedSlot.rawHour}-${selectedSlot.rawMinute}`;
          const endHour =
            selectedSlot.rawMinute === 30
              ? selectedSlot.rawHour + 1
              : selectedSlot.rawHour;
          const endMinute = selectedSlot.rawMinute === 30 ? 0 : 30;
          const endValue = `${endHour}-${endMinute}`;

          console.log("📝 Setting up new task form", {
            selectedSlot: selectedSlot.time,
            startValue,
            endValue,
          });

          setFormData({
            type: "study",
            subject: "",
            topic: "",
            startTime: startValue,
            endTime: endValue,
            color: "#3B82F6",
          });
        }
      }
    }
  }, [isOpen, selectedSlotId, timeSlots, existingTask]);

  const handleSave = () => {
    console.log("💾 Attempting to save task", formData);

    if (formData.type === "study" && !formData.subject) {
      console.log(
        "❌ Validation failed: No subject selected for study session"
      );
      alert("Please select a subject for study sessions");
      return;
    }

    console.log("✅ Task validation passed, saving...");
    onSave(formData);
    onClose();
  };

  const handleFormChange = (field, value) => {
    console.log(`📝 Form field changed: ${field}`, {
      from: formData[field],
      to: value,
    });
    setFormData({ ...formData, [field]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-black">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {existingTask ? "Edit Session" : "Plan Your Session"}
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            {existingTask
              ? "Update your scheduled activity."
              : "Set up your study schedule."}
          </p>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Activity Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleFormChange("type", e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
            >
              <option value="study">Study Session</option>
              <option value="break">Break</option>
              <option value="meal">Meal</option>
              <option value="free">Free Time</option>
            </select>
          </div>

          {formData.type === "study" && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleFormChange("subject", e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
                >
                  <option value="">Select Subject</option>
                  {Object.keys(subjects).map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Topic/Goal
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => handleFormChange("topic", e.target.value)}
                  placeholder="What will you study?"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>
            </>
          )}

          <TimeRangeSelector
            startTime={formData.startTime}
            endTime={formData.endTime}
            onStartChange={(time) => handleFormChange("startTime", time)}
            onEndChange={(time) => handleFormChange("endTime", time)}
          />

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Color Theme
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    console.log("🎨 Color selected", {
                      color: color.name,
                      value: color.value,
                    });
                    handleFormChange("color", color.value);
                  }}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    formData.color === color.value
                      ? "border-gray-900 scale-110"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end space-x-2">
          <button
            onClick={() => {
              console.log("❌ Task modal cancelled");
              onClose();
            }}
            className="px-3 py-1.5 text-gray-600 hover:text-gray-800 font-medium text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs"
          >
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

// Brain Dump Component
const BrainDump = ({ notes, onUpdate }) => {
  console.log("🧠 BrainDump: Rendered", { notes: notes });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4 shadow-sm">
      <div className="flex items-center mb-2">
        <Icons.Brain className="text-purple-600 mr-2" />
        <h3 className="text-sm font-semibold text-gray-800">
          Quick Notes & Ideas
        </h3>
      </div>
      <textarea
        value={notes}
        onChange={(e) => {
          console.log("🧠 Brain notes updated", {
            length: e.target.value.length,
          });
          onUpdate(e.target.value);
        }}
        placeholder="Jot down thoughts, doubts, or brilliant ideas that pop up during study..."
        className="w-full text-black h-20 px-2 py-1.5 border border-gray-300 rounded-lg resize-none text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 placeholder-black"
      />
    </div>
  );
};

// Main Component
const DailyPlanner = ({ date = new Date(), subjects = defaultSubjects }) => {
  const { date: dateFromUrl } = useParams();
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots);
  const [currentStudySlot, setCurrentStudySlot] = useState(null);
  const [brainNotes, setBrainNotes] = useState("");
  const [dailyReflection, setDailyReflection] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [distractionCount, setDistractionCount] = useState(0);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [highlightedSlots, setHighlightedSlots] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { userName, compiledSchedule, setCompiledSchedule } = useContext(CommonContext);

  const formattedDate = new Date().toISOString().split("T")[0];


  const navigate = useNavigate();

  // Add this helper function before the main DailyPlanner component
const loadScheduleForDate = (compiledSchedule, targetDate) => {
  console.log("🔍 Searching for saved schedule", { 
    targetDate, 
    availableDates: compiledSchedule.map(s => s.date) 
  });
  
  const savedSchedule = compiledSchedule.find(schedule => schedule.date === targetDate);
  
  if (savedSchedule) {
    console.log("✅ Found saved schedule for date", { 
      date: targetDate,
      hasTimeSlots: savedSchedule.timeSlots?.length > 0,
      hasBrainNotes: !!savedSchedule.brainNotes,
      hasReflection: !!savedSchedule.dailyReflection,
      distractionCount: savedSchedule.distractionCount
    });
    return savedSchedule;
  }
  
  console.log("❌ No saved schedule found for date", targetDate);
  return null;
};

// Add this helper function to populate the schedule data
const populateScheduleData = (savedData, setTimeSlots, setBrainNotes, setDailyReflection, setDistractionCount) => {
  console.log("📥 Loading saved schedule data");
  
  // Load time slots if available
  if (savedData.timeSlots && Array.isArray(savedData.timeSlots)) {
    console.log("⏰ Loading saved time slots", { count: savedData.timeSlots.length });
    setTimeSlots(savedData.timeSlots);
  }
  
  // Load brain notes
  if (savedData.brainNotes !== undefined) {
    console.log("🧠 Loading saved brain notes", { length: savedData.brainNotes.length });
    setBrainNotes(savedData.brainNotes);
  }
  
  // Load daily reflection
  if (savedData.dailyReflection !== undefined) {
    console.log("📝 Loading saved daily reflection", { length: savedData.dailyReflection.length });
    setDailyReflection(savedData.dailyReflection);
  }
  
  // Load distraction count
  if (savedData.distractionCount !== undefined) {
    console.log("📊 Loading saved distraction count", { count: savedData.distractionCount });
    setDistractionCount(savedData.distractionCount);
  }
  
  console.log("✅ Schedule data loaded successfully");
};

// Add this useEffect in the main DailyPlanner component, after the existing state declarations
// Place this after: const { userName, compiledSchedule, setCompiledSchedule } = useContext(CommonContext);

useEffect(() => {
  console.log("🔄 DailyPlanner: Checking for saved schedule on mount/date change", {
    dateFromUrl,
    compiledScheduleLength: compiledSchedule?.length || 0
  });
  
  // Only attempt to load if we have compiled schedules and a date
  if (compiledSchedule && compiledSchedule.length > 0 && dateFromUrl) {
    const savedData = loadScheduleForDate(compiledSchedule, dateFromUrl);
    
    if (savedData) {
      console.log("📂 Loading existing schedule for date", dateFromUrl);
      populateScheduleData(
        savedData,
        setTimeSlots,
        setBrainNotes,
        setDailyReflection,
        setDistractionCount
      );
    } else {
      console.log("🆕 No existing schedule found, using default state for date", dateFromUrl);
    }
  } else {
    console.log("⚠️ Cannot load schedule - missing compiledSchedule or dateFromUrl", {
      hasCompiledSchedule: !!compiledSchedule,
      compiledScheduleLength: compiledSchedule?.length || 0,
      dateFromUrl
    });
  }
}, [dateFromUrl, compiledSchedule]); 


  console.log("🚀 DailyPlanner: Component initialized", {
    totalTimeSlots: timeSlots.length,
    isFocusMode,
    distractionCount,
    currentStudySlot: currentStudySlot?.subject,
    tasksCount: tasks.length,
  });

  const showToastMessage = (message) => {
    console.log("📢 Toast message:", message);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const calculateDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split("-").map(Number);
    const [endHour, endMinute] = endTime.split("-").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const duration = endTotalMinutes - startTotalMinutes;

    console.log("⏱️ Duration calculated", {
      startTime: `${startHour}:${startMinute.toString().padStart(2, "0")}`,
      endTime: `${endHour}:${endMinute.toString().padStart(2, "0")}`,
      durationMinutes: duration,
    });

    return duration;
  };

  const getAffectedSlots = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split("-").map(Number);
    const [endHour, endMinute] = endTime.split("-").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const affectedSlots = timeSlots
      .filter((slot) => {
        const slotTotalMinutes = slot.rawHour * 60 + slot.rawMinute;
        return (
          slotTotalMinutes >= startTotalMinutes &&
          slotTotalMinutes < endTotalMinutes
        );
      })
      .map((slot) => slot.id);

    console.log("🎯 Affected slots calculated", {
      startTime,
      endTime,
      affectedSlotsCount: affectedSlots.length,
      slots: affectedSlots,
    });

    return affectedSlots;
  };

  const clearTimeSlots = (startTime, endTime) => {
    console.log("🧹 Clearing time slots", { startTime, endTime });

    const [startHour, startMinute] = startTime.split("-").map(Number);
    const [endHour, endMinute] = endTime.split("-").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const clearedSlots = timeSlots.map((slot) => {
      const slotTotalMinutes = slot.rawHour * 60 + slot.rawMinute;
      if (
        slotTotalMinutes >= startTotalMinutes &&
        slotTotalMinutes < endTotalMinutes
      ) {
        return {
          ...slot,
          subject: "",
          topic: "",
          type: "free",
          color: "#6B7280",
          duration: 30,
          isOccupied: false,
        };
      }
      return slot;
    });

    const clearedCount =
      clearedSlots.filter((slot) => slot.subject === "" && slot.type === "free")
        .length -
      timeSlots.filter((slot) => slot.subject === "" && slot.type === "free")
        .length;

    console.log("🧹 Time slots cleared", { clearedCount });
    return clearedSlots;
  };

  const handleSlotClick = (slotId, updates) => {
    console.log("🖱️ Slot clicked", { slotId, updates });

    if (typeof updates === "object" && updates.completed !== undefined) {
      console.log("✅ Toggling completion status");
      setTimeSlots((prev) =>
        prev.map((slot) =>
          slot.id === slotId ? { ...slot, ...updates } : slot
        )
      );
      return;
    }

    const existingTask = tasks.find((task) => task.startTime === slotId);
    if (existingTask) {
      console.log("📝 Opening existing task for editing");
      setTaskToEdit(existingTask);
      setSelectedSlotId(null);
    } else {
      console.log("📝 Opening new task creation");
      setTaskToEdit(null);
      setSelectedSlotId(slotId);
    }
    setIsTaskModalOpen(true);
    setHighlightedSlots([]);
  };

  const handleClearSchedule = (slotId) => {
    console.log("🗑️ Clearing schedule for slot", slotId);

    const slot = timeSlots.find((s) => s.id === slotId);
    if (!slot || !slot.isOccupied) {
      console.log("❌ Cannot clear: slot not found or not occupied");
      return;
    }

    const slotsToCheck = timeSlots.filter(
      (s) =>
        s.subject === slot.subject &&
        s.topic === slot.topic &&
        s.color === slot.color &&
        s.isOccupied
    );

    slotsToCheck.sort(
      (a, b) => a.rawHour * 60 + a.rawMinute - (b.rawHour * 60 + b.rawMinute)
    );

    if (slotsToCheck.length > 0) {
      const startSlot = slotsToCheck[0];
      const endSlot = slotsToCheck[slotsToCheck.length - 1];
      const startTime = `${startSlot.rawHour}-${startSlot.rawMinute}`;
      const endHour =
        endSlot.rawMinute === 30 ? endSlot.rawHour + 1 : endSlot.rawHour;
      const endMinute = endSlot.rawMinute === 30 ? 0 : 30;
      const endTime = `${endHour}-${endMinute}`;

      console.log("🗑️ Clearing session slots", {
        sessionSlots: slotsToCheck.length,
        startTime,
        endTime,
      });

      const clearedSlots = clearTimeSlots(startTime, endTime);
      setTimeSlots(clearedSlots);
      showToastMessage("Schedule cleared successfully!");
    }
  };

  const handleTaskSave = (formData) => {
    console.log("💾 Saving task", formData);

    const duration = calculateDuration(formData.startTime, formData.endTime);
    if (duration <= 0) {
      console.log("❌ Invalid duration: end time must be after start time");
      showToastMessage("End time must be after start time!");
      return;
    }

    const [startHour, startMinute] = formData.startTime.split("-").map(Number);

    // Clear existing slots first
    const clearedSlots = clearTimeSlots(formData.startTime, formData.endTime);

    // Then update with new task data
    const updatedSlots = clearedSlots.map((slot) => {
      const slotTotalMinutes = slot.rawHour * 60 + slot.rawMinute;
      const startTotalMinutes = startHour * 60 + startMinute;
      const [endHour, endMinute] = formData.endTime.split("-").map(Number);
      const endTotalMinutes = endHour * 60 + endMinute;

      if (
        slotTotalMinutes >= startTotalMinutes &&
        slotTotalMinutes < endTotalMinutes
      ) {
        const isFirstSlot = slotTotalMinutes === startTotalMinutes;
        return {
          ...slot,
          type: formData.type,
          subject: formData.subject,
          topic: formData.topic,
          color: formData.color,
          duration: isFirstSlot ? duration : 30,
          isOccupied: true,
        };
      }
      return slot;
    });

    console.log("💾 Task saved successfully", {
      type: formData.type,
      subject: formData.subject,
      durationMinutes: duration,
      affectedSlots: updatedSlots.filter(
        (s) => s.isOccupied && s.subject === formData.subject
      ).length,
    });

    setTimeSlots(updatedSlots);
    setHighlightedSlots([]);
    showToastMessage(
      `${
        formData.type === "study" ? "Study session" : "Activity"
      } scheduled successfully!`
    );
  };

  useEffect(() => {
    if (isTaskModalOpen && selectedSlotId) {
      const slot = timeSlots.find((s) => s.id === selectedSlotId);
      if (slot) {
        const startTime = `${slot.rawHour}-${slot.rawMinute}`;
        const endHour = slot.rawMinute === 30 ? slot.rawHour + 1 : slot.rawHour;
        const endMinute = slot.rawMinute === 30 ? 0 : 30;
        const endTime = `${endHour}-${endMinute}`;
        const affected = getAffectedSlots(startTime, endTime);
        setHighlightedSlots(affected);
      }
    } else {
      setHighlightedSlots([]);
    }
  }, [isTaskModalOpen, selectedSlotId, timeSlots]);

  const handleStartTimer = (slot) => {
    console.log("▶️ Starting timer for study session", {
      subject: slot.subject,
      topic: slot.topic,
      duration: slot.duration,
      time: slot.time,
    });

    setCurrentStudySlot(slot);
    enterFocusMode();
    showToastMessage(`Focus session started for ${slot.subject}!`);
  };

  const handleDistraction = () => {
    const newCount = distractionCount + 1;
    console.log("📢 Distraction logged", {
      previousCount: distractionCount,
      newCount,
    });
    setDistractionCount(newCount);
    showToastMessage(`Distraction logged! Total: ${newCount}`);
  };

  const enterFocusMode = () => {
    console.log("🎯 Entering focus mode");
    setIsFocusMode(true);
    document.body.style.overflow = "hidden";
  };

  const exitFocusMode = () => {
    console.log("🚪 Exiting focus mode");
    setIsFocusMode(false);
    setCurrentStudySlot(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isFocusMode) {
        console.log("⌨️ ESC key pressed - exiting focus mode");
        exitFocusMode();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isFocusMode]);

  const calculateStats = () => {
    const studySlots = timeSlots.filter(
      (slot) => slot.type === "study" && slot.subject && slot.isOccupied
    );
    const completedSlots = studySlots.filter((slot) => slot.completed);

    const totalPlannedMinutes = studySlots.reduce((total, slot) => {
      const prevSlot = timeSlots.find(
        (s) =>
          s.rawHour * 60 + s.rawMinute ===
            slot.rawHour * 60 + slot.rawMinute - 30 &&
          s.subject === slot.subject &&
          s.topic === slot.topic &&
          s.isOccupied
      );
      return prevSlot ? total : total + slot.duration;
    }, 0);

    const totalCompletedMinutes = completedSlots.reduce((total, slot) => {
      const prevSlot = timeSlots.find(
        (s) =>
          s.rawHour * 60 + s.rawMinute ===
            slot.rawHour * 60 + slot.rawMinute - 30 &&
          s.subject === slot.subject &&
          s.topic === slot.topic &&
          s.isOccupied
      );
      return prevSlot ? total : total + slot.duration;
    }, 0);

    const plannedHours = totalPlannedMinutes / 60;
    const completedHours = totalCompletedMinutes / 60;
    const completionPercentage =
      totalPlannedMinutes > 0
        ? Math.round((totalCompletedMinutes / totalPlannedMinutes) * 100)
        : 0;

    const uniqueSessions = studySlots.filter((slot) => {
      const prevSlot = timeSlots.find(
        (s) =>
          s.rawHour * 60 + s.rawMinute ===
            slot.rawHour * 60 + slot.rawMinute - 30 &&
          s.subject === slot.subject &&
          s.topic === slot.topic &&
          s.isOccupied
      );
      return !prevSlot;
    });

    const uniqueCompletedSessions = completedSlots.filter((slot) => {
      const prevSlot = timeSlots.find(
        (s) =>
          s.rawHour * 60 + s.rawMinute ===
            slot.rawHour * 60 + slot.rawMinute - 30 &&
          s.subject === slot.subject &&
          s.topic === slot.topic &&
          s.isOccupied
      );
      return !prevSlot;
    });

    const stats = {
      studySlots: uniqueSessions,
      completedSlots: uniqueCompletedSessions,
      plannedHours: plannedHours.toFixed(1),
      completedHours: completedHours.toFixed(1),
      completionPercentage,
    };

    console.log("📊 Stats calculated", stats);
    return stats;
  };

  const stats = calculateStats();

  const saveSchedule = () => {
    // 1. Assemble the latest data for the current day into a single object.
    console.log("Saving for date:", date.toISOString().split("T")[0]);
    const newScheduleData = {
      timeSlots,
      brainNotes,
      dailyReflection,
      distractionCount,
      date: dateFromUrl, // The unique key for the day
    };

    // 2. Use the functional form of setState to safely update based on the previous state.
    setCompiledSchedule((prevSchedules) => {
      // 3. Find the index of the schedule that has the same date.
      const existingScheduleIndex = prevSchedules.findIndex(
        (schedule) => schedule.date === newScheduleData.date
      );

      // 4. If a schedule for the date was found...
      if (existingScheduleIndex > -1) {
        console.log(`🔄 Updating schedule for date: ${newScheduleData.date}`);
        // Create a new array to maintain immutability.
        const updatedSchedules = [...prevSchedules];
        // Replace the old schedule object at the found index with the new one.
        updatedSchedules[existingScheduleIndex] = newScheduleData;

        // Show a confirmation message.
        showToastMessage("Schedule updated successfully!");

        // Return the newly updated array to set the state.
        return updatedSchedules;
      }
      // 5. If no schedule for the date was found...
      else {
        console.log(`✅ Adding new schedule for date: ${newScheduleData.date}`);

        // Show a confirmation message.
        showToastMessage("Schedule saved successfully!");

        // Return a new array containing all old schedules plus the new one.
        return [...prevSchedules, newScheduleData];
      }
    });
  };
  const getCurrentSessionDuration = () => {
    const duration = currentStudySlot ? currentStudySlot.duration : 25;
    console.log("⏱️ Current session duration", { duration });
    return duration;
  };

  // Log current schedule state
  useEffect(() => {
    const occupiedSlots = timeSlots.filter((slot) => slot.isOccupied);
    console.log("📅 Schedule updated", {
      totalSlots: timeSlots.length,
      occupiedSlots: occupiedSlots.length,
      studySessions: occupiedSlots.filter((s) => s.type === "study").length,
      breaks: occupiedSlots.filter((s) => s.type === "break").length,
      meals: occupiedSlots.filter((s) => s.type === "meal").length,
    });
  }, [timeSlots]);

  if (isFocusMode) {
    return (
      <FocusMode
        currentSlot={currentStudySlot}
        onExit={exitFocusMode}
        distractionCount={distractionCount}
        onDistraction={handleDistraction}
        sessionDuration={getCurrentSessionDuration()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <div className="bg-white shadow-sm border-b border-slate-200 w-full top-0 z-10">
        <div className="px-3 pb-3 py-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              className="py-2 px-3 rounded-md text-xs font-medium bg-[#1e2939] text-white rounded-md text-xs font-medium hover:bg-[#252d3d] transition-colors"
              onClick={() =>
                navigate(
                  `/${formattedDate}`
                )
              }
            >
              <span className="hidden sm:inline">Today</span>
              <span className="sm:hidden">Today</span>
            </button>
            <button
              className="py-2 px-3 rounded-md text-xs font-medium bg-[#1e2939] text-white rounded-md text-xs font-medium hover:bg-[#252d3d] transition-colors"
              onClick={() => navigate("/")}
            >
              <span className="hidden sm:inline">Monthly Planner</span>
              <span className="sm:hidden">Monthly</span>
            </button>
            <button className="py-2 px-3 rounded-md text-xs font-medium bg-[#1e2939] text-white rounded-md text-xs font-medium hover:bg-[#252d3d] transition-colors">
              Current
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex-1 flex flex-col lg:min-h-0">
          <header className="border-b border-gray-200 bg-white shadow-sm">
            <div className="px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 gap-2 sm:gap-0">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={enterFocusMode}
                  className="flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-xs shadow-md flex-1 sm:flex-none justify-center sm:justify-start"
                >
                  <Icons.Focus className="w-3 h-3 mr-1.5" />
                  <span className="hidden sm:inline">Focus Mode</span>
                  <span className="sm:hidden">Focus</span>
                </button>
                <button
                  onClick={saveSchedule}
                  className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-xs shadow-md flex-1 sm:flex-none justify-center sm:justify-start"
                >
                  <Icons.Save className="w-3 h-3 mr-1.5" />
                  Save
                </button>
                <button
                  className="flex items-center px-3 py-1.5 bg-[#1e2939] text-white rounded-lg  transition-all text-xs shadow-md flex-1 sm:flex-none justify-center sm:justify-start"
                >
                  {dateFromUrl}
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 pt-3 sm:pt-4 overflow-y-auto">
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 mb-4">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Planned Hours</p>
                    <p className="text-lg font-bold text-gray-900">
                      {stats.plannedHours}h
                    </p>
                  </div>
                  <Icons.Clock className="text-blue-600 w-4 h-4" />
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Completion</p>
                    <p className="text-lg font-bold text-gray-900">
                      {stats.completionPercentage}%
                    </p>
                  </div>
                  <Icons.Target className="text-green-600 w-4 h-4" />
                </div>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${stats.completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Sessions</p>
                    <p className="text-lg font-bold text-gray-900">
                      {stats.completedSlots.length}/{stats.studySlots.length}
                    </p>
                  </div>
                  <Icons.BookOpen className="text-purple-600 w-4 h-4" />
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Distractions</p>
                    <p className="text-lg font-bold text-red-600">
                      {distractionCount}
                    </p>
                  </div>
                  <Icons.Target className="text-red-600 w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 mt-4 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                  <Icons.Lightbulb className="text-yellow-600 mr-2 w-4 h-4" />
                  Daily Reflection
                </h3>
              </div>
              <div className="p-3 text-black">
                <textarea
                  value={dailyReflection}
                  onChange={(e) => {
                    console.log("📝 Daily reflection updated", {
                      task: e.target.value,
                    });
                    setDailyReflection(e.target.value);
                  }}
                  placeholder="What went well today? What challenges did you face? What will you improve tomorrow?"
                  className="w-full h-16 px-2 py-1.5 border border-gray-300 rounded-lg resize-none text-xs focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 placeholder-gray-500"
                />
              </div>
            </div>
            <BrainDump notes={brainNotes} onUpdate={setBrainNotes} />
          </div>
        </div>

        <div className="flex-1 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 lg:min-h-0">
          <div className="h-[44px] border-gray-200 bg-white flex shadow-sm items-center px-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Schedule & Reflection
            </h2>
          </div>

          <div className="flex-1 px-4 pt-3 sm:pt-4 overflow-y-auto">
            <div className="bg-white rounded-xl border border-gray-200 mb-4 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-800 flex items-center">
                  <Icons.Calendar className="text-blue-600 mr-2 w-4 h-4" />
                  Today's Schedule
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Click on any time slot to plan your activities
                </p>
              </div>

              <div className="p-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto">
                {timeSlots.map((slot) => (
                  <TimeSlot
                    key={slot.id}
                    slot={slot}
                    subjects={subjects}
                    onUpdate={handleSlotClick}
                    onStartTimer={handleStartTimer}
                    onClearSchedule={handleClearSchedule}
                    isHighlighted={highlightedSlots.includes(slot.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTaskModalOpen && (
        <TaskPlanningModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            console.log("❌ Task modal closed");
            setIsTaskModalOpen(false);
          }}
          onSave={handleTaskSave}
          subjects={subjects}
          selectedSlotId={selectedSlotId}
          timeSlots={timeSlots}
          existingTask={taskToEdit}
        />
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default DailyPlanner;
