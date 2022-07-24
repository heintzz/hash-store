import React from 'react'
import Authentication from './Authentication'

export default function Login() {
    return <Authentication authType="Login" />
}

// <div className="h-screen w-screen flex flex-col gap-y-5 items-center justify-center">
//     <form className="flex flex-col" ref={loginButton}>
//         <label htmlFor="email">Email: </label>
//         <input type="email" id="email" name="email" />
//         <label htmlFor="password">Password</label>
//         <input
//             type="password"
//             id="password"
//             name="password"
//             autoComplete="on"
//         />
//         <Link
//             to={isLogin ? '/home' : '/'}
//             type="submit"
//             onClick={mauLogin}
//             className="bg-blue-400 text-white rounded-lg mt-5 px-2 w-fit place-self-end"
//         >
//             Login
//         </Link>
//     </form>
//     <p>
//         Don't have an account? <Link to="/signup">Sign Up</Link>
//     </p>
// </div>