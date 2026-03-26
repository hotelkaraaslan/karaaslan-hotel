"use client";

interface BookingBarProps {
  reservationUrl: string;
  dict: { checkIn: string; checkOut: string; adults: string; children: string; bookNow: string; adultOptions: string[]; childOptions: string[] };
}

export default function BookingBar({ reservationUrl, dict }: BookingBarProps) {
  return (
    <div className="bg-primary relative z-10">
      <form action={reservationUrl} target="_blank" className="flex flex-wrap items-stretch max-w-[1400px] mx-auto">
        <div className="flex-1 min-w-[200px] p-6 border-r border-white/10 max-md:min-w-[50%] max-md:border-b max-md:border-r max-sm:min-w-full">
          <label className="text-[0.65rem] font-semibold tracking-[2px] uppercase text-accent mb-2 block">{dict.checkIn}</label>
          <input type="date" className="bg-transparent border-none text-white font-[family-name:var(--font-body)] text-sm w-full outline-none cursor-pointer" defaultValue={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="flex-1 min-w-[200px] p-6 border-r border-white/10 max-md:min-w-[50%] max-md:border-b max-sm:min-w-full max-sm:border-r-0">
          <label className="text-[0.65rem] font-semibold tracking-[2px] uppercase text-accent mb-2 block">{dict.checkOut}</label>
          <input type="date" className="bg-transparent border-none text-white font-[family-name:var(--font-body)] text-sm w-full outline-none cursor-pointer" defaultValue={new Date(Date.now() + 86400000).toISOString().split("T")[0]} />
        </div>
        <div className="flex-1 min-w-[150px] p-6 border-r border-white/10 max-md:min-w-[50%] max-sm:min-w-full max-sm:border-r-0 max-sm:border-b max-sm:border-white/10">
          <label className="text-[0.65rem] font-semibold tracking-[2px] uppercase text-accent mb-2 block">{dict.adults}</label>
          <select className="bg-transparent border-none text-white font-[family-name:var(--font-body)] text-sm w-full outline-none cursor-pointer appearance-none [&>option]:bg-primary [&>option]:text-white">
            {dict.adultOptions.map((opt, i) => (<option key={i} defaultChecked={i === 1}>{opt}</option>))}
          </select>
        </div>
        <div className="flex-1 min-w-[150px] p-6 border-r border-white/10 max-md:min-w-[50%] max-sm:min-w-full max-sm:border-r-0 max-sm:border-b max-sm:border-white/10">
          <label className="text-[0.65rem] font-semibold tracking-[2px] uppercase text-accent mb-2 block">{dict.children}</label>
          <select className="bg-transparent border-none text-white font-[family-name:var(--font-body)] text-sm w-full outline-none cursor-pointer appearance-none [&>option]:bg-primary [&>option]:text-white">
            {dict.childOptions.map((opt, i) => (<option key={i} defaultChecked={i === 0}>{opt}</option>))}
          </select>
        </div>
        <button type="submit" className="bg-accent text-white px-12 py-6 font-[family-name:var(--font-body)] text-xs font-semibold tracking-[3px] uppercase cursor-pointer hover:bg-accent-dark transition-colors whitespace-nowrap max-sm:w-full max-sm:text-center">
          {dict.bookNow}
        </button>
      </form>
    </div>
  );
}
