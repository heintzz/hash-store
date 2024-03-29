import React, { useContext, useRef, useState } from 'react'
import Move from './Move'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'
import { auth, db } from '../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import Loader from './Loader'

export default function Authentication({ authType }) {
  const { isLogin, changeLogin } = useContext(AppContext)
  const [errorType, setErrorType] = useState()
  const [showError, setShowError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [process, setProcess] = useState(false)
  const [input, setInput] = useState({ email: '', password: '' })

  const usersRef = collection(db, 'users')

  let pathLogin = isLogin ? '/' : '/login'
  let pathSignup = errorType !== undefined && !errorType ? '/login' : '/signup'
  let path = authType === 'Login' ? pathLogin : pathSignup

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const authenticationHandler = useRef(null)
  const onAuthentication = () => {
    const { email, password } = input
    setProcess(true)

    if (authType === 'Login') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user.uid
          const newDate = Date.parse(new Date())

          window.localStorage.setItem('isLogin', true)
          window.localStorage.setItem('id', user)
          window.localStorage.setItem('time', newDate)

          changeLogin(JSON.parse(window.localStorage.getItem('isLogin')))
        })
        .catch((err) => {
          setProcess(false)
          setErrorType(err.code)
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          }, 2500)
        })
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user.uid
          await addDoc(usersRef, { userID: user, carts: [], balance: 4000 })
          setSuccess(true)
          setProcess(false)
          setTimeout(() => {
            setSuccess(false)
          }, 3500)
          setInput({ email: '', password: '' })
        })
        .catch((err) => {
          setProcess(false)
          setErrorType(err.code)
          setSuccess(false)
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          }, 2500)
        })
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-y-5 items-center justify-center">
      <form className="flex flex-col w-64 md:w-80" ref={authenticationHandler}>
        <label htmlFor="email" className="my-3">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={input.email}
          className="rounded-lg pl-2 py-1"
          placeholder="hash@gmail.com"
          onChange={inputHandler}
        />
        <label htmlFor="password" className="my-3">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={input.password}
          autoComplete="on"
          className="rounded-lg pl-2 py-1"
          placeholder="••••••••"
          onChange={inputHandler}
        />
        {showError && !success && (
          <ErrorMessage type={errorType} authType={authType} />
        )}
        {!showError && success && <SuccessMessage authType={authType} />}
        <Link
          to={path}
          type="submit"
          onClick={onAuthentication}
          className="bg-blue-400 text-white rounded-lg mt-5 px-2 w-fit place-self-end"
        >
          {process ? <Loader /> : authType}
        </Link>
      </form>
      <Move authType={authType} />
    </div>
  )
}
