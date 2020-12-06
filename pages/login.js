import { useState} from 'react'
import Router from "next/router";
import { mutate } from "swr";
import UserAPI from '../lib/api/user'

export default function Login() {
  const [email, inputEmail] = useState('')
  const [password, inputPassword] = useState('')

  async function Login(e) {
    try {
      e.preventDefault()
      if (email && password) {
          const { data } = await UserAPI.login(email, password);
          if (data?.data) {
          window.localStorage.setItem("user", JSON.stringify(data.data));
          mutate("user", data?.data);
          Router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={Login}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-2">
              <input type="email" required className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e)=>inputEmail(e.target.value)}/>
            </div>
            <div>
              <div className="mb-2">
                <input type="password" required className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e)=> inputPassword(e.target.value)}/>
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={Login}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}