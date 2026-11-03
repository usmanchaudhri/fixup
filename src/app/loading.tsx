// import React from 'react'

// export default function GlobalLoading() {
//   return (
//     <div>GlobalLoading</div>
//   )
// }






// app/loading.tsx
export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Modern dual-ring loader */}
      <div className="relative h-14 w-14">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[#E6B000]/20" />
        
        {/* Spinning arc */}
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#E6B000] border-r-[#E6B000]" />
        
        {/* Inner soft pulse */}
        <div className="absolute inset-3 animate-pulse rounded-full bg-[#E6B000]/10" />
      </div>

      <p className="mt-8 text-sm font-medium tracking-[0.2em] text-[#E6B000] uppercase">
        Loading...
      </p>
    </div>
  )
}