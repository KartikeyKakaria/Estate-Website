import { Link } from "react-router-dom"
const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-3 rounded-md" id="username" />
        <input type="email" placeholder="Email" className="border p-3 mt-4 rounded-md" id="email" />
        <input type="password" placeholder="Password" className="border p-3 mt-4 rounded-md" id="password" />
        <button className="bg-slate-700 text-white p-3 rounded-md uppercase disabled:opacity-80 hover:cursor-pointer hover:opacity-90">Sign Up</button>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to='/sign-in'>
            <span className="text-blue-700">Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
