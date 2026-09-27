import React from "react";

const Card = ({ name, value, icon, des, color }) => {
  return (
    <div
      className={`${color} relative overflow-hidden rounded-3xl p-5 sm:p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      {/* Background Soft Glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Icon Badge */}
      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner mb-4">
        {icon}
      </div>

      {/* Figures */}
      <div className="space-y-0.5">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {value}
        </h2>
        <p className="text-sm font-semibold tracking-wide text-white/90">
          {name}
        </p>
        <span className="text-xs text-white/70 block pt-0.5">{des}</span>
      </div>
    </div>
  );
};

export default Card;
