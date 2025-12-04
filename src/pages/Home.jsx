import React from 'react'

function Home() {
  return (
    <div className="flex w-full h-screen">
{/* Left Navigation */}
<div className="w-1/4 border-r p-4 flex flex-col items-center gap-4">
<div className="w-16 h-16 rounded-full border flex items-center justify-center">DP</div>
<div>Name</div>
<button className="border p-2 w-full">Home</button>
<button className="border p-2 w-full">Message</button>
<button className="border p-2 w-full">Preferences</button>
<button className="border p-2 w-full">Subscribe</button>
<button className="border p-2 w-full">Discover</button>
<button className="border p-2 w-full">Settings</button>
</div>


{/* Center Swiping Section */}
<div className="w-2/4 p-4 flex flex-col items-center justify-center gap-4">
<div className="w-64 h-96 border rounded-2xl flex items-center justify-center">Photo</div>
<div className="flex flex-col items-center gap-2">
<div className="w-12 h-12 rounded-full border flex items-center justify-center">DP</div>
<div className="border px-4 py-1">Name</div>
</div>
<div>Profile</div>
<div className="flex gap-8 mt-4">
<button className="w-16 h-16 rounded-full border flex items-center justify-center">Swipe Left</button>
<button className="w-10 h-10 border flex items-center justify-center rounded-full">♡</button>
<button className="w-10 h-10 border flex items-center justify-center rounded-full">💙</button>
<button className="w-16 h-16 rounded-full border flex items-center justify-center">Swipe Right</button>
</div>
</div>


{/* Right Side Panel */}
<div className="w-1/4 border-l p-4 flex flex-col items-center">
<div className="w-full flex justify-between border-b pb-2">
<span>Likes</span>
<span>Matches</span>
</div>
<div className="w-full flex justify-around mt-4">
<div className="border-r pr-4"> .<br/> .<br/> .<br/> .</div>
<div className="pl-4"> .<br/> .<br/> .<br/> .</div>
</div>
</div>
</div>
  )
}

export default Home