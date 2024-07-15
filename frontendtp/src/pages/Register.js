import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./login.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'

function Register() {

    const [response, setResponse] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const {
        register,
        handleSubmit
    } = useForm()

    const handleSubmitRegister = async (data) => {
        
        const userData = JSON.stringify(data)

        console.log("User data" + userData)
            await axios.post("http://localhost:5500/singup", userData , 
                {
                    headers:{
                        "Content-Type": "Application/json"
                    }
                }
            ).then(res => {
                res.response.status === 200 && setResponse(true)
            })
            .catch(err => {
                err.message.status === 400 && setErrMsg(err.response)
            })
    }

  return (
    <div>

        <Form className='form' onSubmit={handleSubmit(handleSubmitRegister)}>
        <h3>Sign up</h3>

        {response === true ? <p className='text text-success'>User added to database !</p> : <p className='text text-danger'>An error has occured ! {errMsg}</p>}

            <Form.Group className="formGroup" >
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" {...register("name")} />
            </Form.Group>

            <Form.Group className='formGroup'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" {...register("email")}/>
            </Form.Group> 

            <Form.Group className='formGroup'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" {...register("password")} />
            </Form.Group>

            <Button type="submit" className='btnLogin btn btn-primary'> Register </Button>
            
            <p>Already have an account ? <Link to="/">Login now !</Link></p>
        </Form>

    </div>
  )
}

export default Register