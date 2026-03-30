"use client";

import { useState, useRef, useEffect } from "react";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function formatDisplayDate(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${y}년 ${parseInt(m)}월 ${parseInt(d)}일`;
}

export default function DatePicker({
  value,
  onChange,
  name,
  required,
}: {
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
  required?: boolean;
}) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(
    value ? parseInt(value.split("-")[0]) : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    value ? parseInt(value.split("-")[1]) - 1 : today.getMonth()
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const todayStr = formatDate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const selectDate = (day: number) => {
    onChange(name, formatDate(viewYear, viewMonth, day));
    setOpen(false);
  };

  const isPast = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return date < todayStart;
  };

  return (
    <div ref={ref} className="relative">
      {/* Hidden input for form validation */}
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-belluno text-left flex items-center justify-between gap-2 w-full"
      >
        <span
          className={
            value ? "text-blanc-text-primary" : "text-blanc-text-muted"
          }
        >
          {value ? formatDisplayDate(value) : "날짜를 선택해주세요"}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-blanc-gold shrink-0"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute z-50 top-full mt-2 left-0 right-0 bg-white border border-blanc-champagne shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] animate-fade-in-view">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-blanc-champagne/50">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center text-blanc-text-muted hover:text-blanc-text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="font-display text-base tracking-wide text-blanc-text-primary">
              {viewYear}년 {MONTHS[viewMonth]}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center text-blanc-text-muted hover:text-blanc-text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 px-3 pt-3">
            {DAYS.map((d, i) => (
              <div
                key={d}
                className={`text-center text-[10px] tracking-widest uppercase font-body pb-2 ${
                  i === 0
                    ? "text-blanc-rose"
                    : i === 6
                    ? "text-blue-300"
                    : "text-blanc-text-muted"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 px-3 pb-3">
            {/* Empty cells for days before the 1st */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = formatDate(viewYear, viewMonth, day);
              const isSelected = value === dateStr;
              const isToday = todayStr === dateStr;
              const past = isPast(day);
              const dayOfWeek = (firstDay + i) % 7;
              const isSunday = dayOfWeek === 0;
              const isSaturday = dayOfWeek === 6;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={past}
                  onClick={() => selectDate(day)}
                  className={`
                    aspect-square flex items-center justify-center font-body text-sm transition-all relative
                    ${past ? "text-blanc-champagne cursor-not-allowed" : "hover:bg-blanc-blush-light cursor-pointer"}
                    ${isSelected ? "bg-blanc-text-primary text-white hover:bg-blanc-text-primary" : ""}
                    ${isToday && !isSelected ? "font-medium" : ""}
                    ${!past && !isSelected && isSunday ? "text-blanc-rose" : ""}
                    ${!past && !isSelected && isSaturday ? "text-blue-300" : ""}
                    ${!past && !isSelected && !isSunday && !isSaturday ? "text-blanc-text-primary" : ""}
                  `}
                >
                  {day}
                  {isToday && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blanc-gold" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
