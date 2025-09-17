// import React, { useRef, useState } from "react";
// import { Eye, EyeOff } from "lucide-react"; // lightweight icons

// const PasswordInput = React.forwardRef((props, ref) => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="relative w-full">
//       <input
//         type={showPassword ? "text" : "password"}
//         placeholder="Password"
//         className="p-3 my-2 w-full text-gray-100 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600 pr-10"
//         ref={ref}
//         {...props}
//       />
//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)}
//         className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
//       >
//         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//       </button>
//     </div>
//   );
// });

// export default PasswordInput;
