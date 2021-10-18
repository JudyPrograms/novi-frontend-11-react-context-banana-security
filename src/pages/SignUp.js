import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import InputField from "../components/InputField";
import axios from 'axios';


function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const history = useHistory()

    async function handleFormSubmit(data) {

        console.log("SignUp form data:", data)

        try {
            const result = await axios.post("http://localhost:3000/register",
                {
                    email: data.email,
                    password: data.password,
                    username: data.username,
                }
            )
            console.log("SignUp post result:", result)

            history.push("/signin")
        } catch (e) {
            console.log(e.response.data)
            console.error(e)
        }

    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField register={register} name="email" required={true} errors={errors}>
                    <span>E-mail:</span>
                </InputField>
                <InputField register={register} name="password" required={true} errors={errors}>
                    <span>Wachtwoord:</span>
                </InputField>
                <InputField register={register} name="username" required={true} errors={errors}>
                    <span>Gebruikersnaam:</span>
                </InputField>
                <button type="submit">Registreer</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;