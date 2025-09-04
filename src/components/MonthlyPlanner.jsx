import React, { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonContext } from '../context/CommonContext';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MonthlyPlanner = () => {
  const navigate = useNavigate();
  const { userName, compiledSchedule } = useContext(CommonContext);

  // ✅ DEBUG LOG 1: Check data from context
  console.log("1. Data from Context:", compiledSchedule);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dayTargets, setDayTargets] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeComponent, setActiveComponent] = useState('monthly-planner');

  // ✅ DEBUG LOG 2: Check the component's state on every render
  console.log("3. Current dayTargets state:", dayTargets);

  // Utility to format dates consistently to 'YYYY-MM-DD'
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const initialTargets = {};

    if (compiledSchedule) {
      compiledSchedule.forEach(schedule => {
        if (schedule.date && schedule.dailyReflection?.trim()) {
          initialTargets[schedule.date] = schedule.dailyReflection.trim();
        }
      });
    }

    // ✅ DEBUG LOG 3: Check the object created by the effect
    console.log("2. Targets processed by useEffect:", initialTargets);

    setDayTargets(initialTargets);
  }, [compiledSchedule]);


  const monthWeeks = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();

    const weeks = [];
    let currentWeek = Array(firstDayOfWeek).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      weeks.push([...currentWeek, ...Array(7 - currentWeek.length).fill(null)]);
    }
    return weeks;
  }, [currentMonth, currentYear]);

  const navigateMonth = useCallback((direction) => {
    setSelectedDate(null);
    const newDate = new Date(currentYear, currentMonth);
    newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  }, [currentMonth, currentYear]);

  const getDayTarget = (day) => {
    if (!day) return '';
    const dateKey = formatDate(new Date(currentYear, currentMonth, day));
    return dayTargets[dateKey] || '';
  };

  const handleDayClick = useCallback((day) => {
    setSelectedDate(day);
    const date = new Date(currentYear, currentMonth, day);
    navigate(`/${formatDate(date)}`);
  }, [currentYear, currentMonth, userName, navigate]);

  const handleQuickNavigation = useCallback(() => {
    const dateToUse = selectedDate
      ? new Date(currentYear, currentMonth, selectedDate)
      : new Date();
    navigate(`/${formatDate(dateToUse)}`);
  }, [selectedDate, currentYear, currentMonth, userName, navigate]);

  const isToday = (day) => {
    const today = new Date();
    return day &&
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear;
  };

  const getTaskCount = (day) => {
    const target = getDayTarget(day);
    return target ? target.split('\n').filter(line => line.trim()).length : 0;
  };

  const tasksForCurrentMonth = useMemo(() => {
    return Object.entries(dayTargets)
      .filter(([key, target]) => {
        const [year, month] = key.split('-').map(Number);
        return year === currentYear && month === currentMonth + 1 && target.trim();
      })
      .sort(([a], [b]) => {
        const dayA = parseInt(a.split('-')[2]);
        const dayB = parseInt(b.split('-')[2]);
        return dayA - dayB;
      });
  }, [dayTargets, currentYear, currentMonth]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 top-0 z-10">
        <div className="px-3 pb-3 py-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleQuickNavigation}
              className={`py-2 px-3 rounded-md text-xs font-medium bg-[#1e2939] text-white`}
            >
              Today
            </button>
            <button
              onClick={handleQuickNavigation}
              className={`py-2 px-3 rounded-md text-xs font-medium bg-[#1e2939] text-white`}
            >
              {selectedDate ? `${selectedDate}-${currentMonth + 1}-${currentYear}` : 'Selected Date'}
            </button>
            <button
              onClick={() => {
                const today = new Date();
                setCurrentMonth(today.getMonth());
                setCurrentYear(today.getFullYear());
                setSelectedDate(null);
                setActiveComponent('monthly-planner');
              }}
              className={`py-2 px-3 rounded-md text-xs font-medium bg-[#1e2939] text-white`}
            >
              Current
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-3 py-4">
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <div className="flex items-center justify-between p-1">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">{MONTH_NAMES[currentMonth]}</h2>
              <p className="text-sm text-slate-500">{currentYear}</p>
            </div>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 border-t border-slate-200">
            {DAY_NAMES.map((day) => (
              <div key={day} className="p-2 text-center bg-slate-50">
                <span className="text-xs font-medium text-slate-600">{day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {monthWeeks.flat().map((day, index) => {
              const target = getDayTarget(day);
              const hasTarget = target.trim().length > 0;
              return (
                <div
                  key={index}
                  className={`
                    h-20 border-b border-r border-slate-100 last:border-r-0 p-0.5
                    ${day ? 'bg-white hover:bg-slate-50 active:bg-slate-100 cursor-pointer' : 'bg-slate-25'}
                    ${isToday(day) ? 'bg-blue-50' : ''}
                    ${selectedDate === day ? 'border-2 border-blue-500' : ''}
                  `}
                  onClick={() => day && handleDayClick(day)}
                >
                  {day && (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`
                          text-[10px] font-medium
                          ${isToday(day) ? 'text-blue-700 bg-blue-100 w-4 h-4 rounded-full flex items-center justify-center' : 'text-slate-700'}
                          ${selectedDate === day ? 'text-blue-700 font-bold' : ''}
                        `}>
                          {day}
                        </span>
                        {hasTarget && <div className="w-1 h-1 bg-blue-500 rounded-full"></div>}
                      </div>
                      {hasTarget && (
                        <div className={`flex-1 rounded p-1 border ${
                          selectedDate === day
                            ? 'bg-blue-100 border-blue-200'
                            : 'bg-blue-50 border-blue-100'
                        }`}>
                          <div className="text-[9px] text-slate-600 leading-tight">
                            <div className="truncate">{target.split('\n')[0]?.trim()}</div>
                            {getTaskCount(day) > 1 && (
                              <div className="text-blue-500 font-medium">+{getTaskCount(day) - 1}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks Overview */}
        {tasksForCurrentMonth.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Your Tasks
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {tasksForCurrentMonth.map(([key, target]) => {
                const day = parseInt(key.split('-')[2]);
                return (
                  <div key={key} className={`rounded-lg p-3 border ${
                    selectedDate === day
                      ? 'bg-blue-100 border-blue-200'
                      : 'bg-blue-50 border-blue-100'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-800 text-sm">
                        {MONTH_NAMES[currentMonth]} {day}
                      </span>
                      <button
                        onClick={() => console.log(`Delete requested for day: ${day}`)}
                        className="text-red-500 hover:text-red-600 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-1">
                      {target.split('\n').filter(line => line.trim()).map((task, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-blue-400 mt-1 text-xs">•</span>
                          <span className="flex-1">{task.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyPlanner;