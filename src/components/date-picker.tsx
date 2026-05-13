"use client";

import { useState, useRef, useEffect } from "react";

/* ── helpers ── */
function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function fmtDisplay(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday = 0
}

/* ── Component ── */
interface DatePickerProps {
  label: string;
  value: string; // YYYY-MM-DD
  min?: string;
  onChange: (val: string) => void;
}

export function DatePicker({ label, value, min, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());

  const minDate = min ? new Date(min + "T00:00:00") : null;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Sync view to value when it changes externally
  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [value]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  function selectDay(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    onChange(toDateStr(d));
    setOpen(false);
  }

  function isDisabled(day: number): boolean {
    if (!minDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    return d < minDate;
  }

  function isSelected(day: number): boolean {
    if (!value) return false;
    const d = new Date(viewYear, viewMonth, day);
    return toDateStr(d) === value;
  }

  function isToday(day: number): boolean {
    const d = new Date(viewYear, viewMonth, day);
    return toDateStr(d) === toDateStr(new Date());
  }

  // Previous month trailing days
  const prevMonthDays = getDaysInMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1
  );

  const cells: { day: number; current: boolean; key: string }[] = [];

  // trailing days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, current: false, key: `p${i}` });
  }
  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, key: `c${d}` });
  }
  // fill rest of grid
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false, key: `n${d}` });
  }
  // trim to full weeks
  const rows = Math.ceil(cells.length / 7);
  const totalCells = rows * 7;
  const grid = cells.slice(0, totalCells);

  return (
    <div ref={ref} className="relative">
      <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#555] block mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#111] border text-[14px] text-[#f0f0f8] font-mono outline-none transition-colors ${
          open ? "border-[#7e1c26]" : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
        }`}
      >
        <span className={value ? "text-[#f0f0f8]" : "text-[#444]"}>
          {value ? fmtDisplay(new Date(value + "T00:00:00")) : "Select date"}
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#555]">
          <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2" y1="6.5" x2="14" y2="6.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="5.5" y1="2" x2="5.5" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="10.5" y1="2" x2="10.5" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 w-[300px] rounded-xl bg-[#0e0e0e] border border-[rgba(255,255,255,0.1)] shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="font-mono text-[13px] font-bold text-[#f0f0f8] tracking-wide">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_LABELS.map((d) => (
              <div key={d} className="text-center font-mono text-[10px] uppercase tracking-wider text-[#444] py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {grid.map((cell) => {
              if (!cell.current) {
                return (
                  <div key={cell.key} className="h-9 flex items-center justify-center">
                    <span className="text-[13px] text-[#222]">{cell.day}</span>
                  </div>
                );
              }

              const disabled = isDisabled(cell.day);
              const sel = isSelected(cell.day);
              const today = isToday(cell.day);

              return (
                <button
                  key={cell.key}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(cell.day)}
                  className={`h-9 w-full rounded-lg text-[13px] font-mono transition-all duration-150 ${
                    sel
                      ? "bg-[#7e1c26] text-white font-bold shadow-[0_0_12px_rgba(126,28,38,0.4)]"
                      : disabled
                        ? "text-[#333] cursor-not-allowed"
                        : today
                          ? "text-[#c4484f] font-bold hover:bg-[#1a1a1a]"
                          : "text-[#ccc] hover:bg-[#1a1a1a] hover:text-white"
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                if (!minDate || today >= minDate) {
                  onChange(toDateStr(today));
                  setOpen(false);
                }
              }}
              className="font-mono text-[11px] text-[#c4484f] hover:text-[#e06068] transition-colors uppercase tracking-wider"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] text-[#888] hover:text-white transition-colors uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
