import loginImg from "../assets/Images/login.webp"
import Template from "../Components/core/Auth/Template"
import { login } from "../services/operations/authAPI"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { TbCornerDownRightDouble } from "react-icons/tb"
import { BsLightningChargeFill } from "react-icons/bs"

function Login() {
  const [showDemo, setShowDemo] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
   
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      // description2="Education to future-proof your career."
      // image={loginImg}
      formType="login"
    />
    </>
  )
}

export default Login