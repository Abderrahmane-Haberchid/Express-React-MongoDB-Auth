
import React, { useState } from 'react'
import { Button, Form} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import "./login.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'


function Login() {

    const [backendResponse, setbackendResponse] = useState("")
    const [gotError, setGotError] = useState(false)

    const {
        register,
        handleSubmit,
    } = useForm()

    const navigate = useNavigate()

    const handleLoginBtn = async (data) => {

     const userData = JSON.stringify(data)

        await axios.post(`http://localhost:5500/singin/`, userData ,
            {
                headers: {
                    "Content-Type": "Application/json"
                }
            }
        ).then(res => {
            res.status === 201 && setbackendResponse("You are Logged in !")
            setGotError(prevValue => !prevValue)

            localStorage.setItem("status", "logged in")

            setTimeout(() => {
                navigate("/home")
            }, 5000)
        })
        .catch(err => {
            console.log(err.message)
            err.message.status === 400 && setbackendResponse(err.message)
            setGotError(true)
            
        })
    }

  return (
    <div>
        
        <Form className='form' onSubmit={handleSubmit(handleLoginBtn)}>
        <h3>Sigin in</h3>

        {gotError ? <p className='text text-success'> {backendResponse}</p> : <p className='text text-danger'>{backendResponse}</p>}
            <Form.Group className="formGroup" >
                <Form.Label>Username:</Form.Label>
                <Form.Control type="email" {...register("email")} />
            </Form.Group>

            <Form.Group className='formGroup'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" {...register("password")} />
            </Form.Group>

            <Button type='submit' className='btnLogin btn btn-primary'> Login </Button>

            <p>Don't have an account ? <Link to="/register">Register now !</Link></p>
        </Form>

    </div>
  )
}

export default Login