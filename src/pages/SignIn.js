import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import InputField from "../components/InputField";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignIn() {

    const {loginFunction} = useContext(AuthContext);

    const {register, handleSubmit, formState: {errors}} = useForm()

    async function handleFormSubmit(data) {

        console.log("SignIn form data:", data)

        try {
            const result = await axios.post("http://localhost:3000/login", {
                email: data.email,
                password: data.password,
            })
            console.log("SignIn post result:", result)
            loginFunction(result.data.accessToken)
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField register={register} name="email" required={true} errors={errors}>
                    <span>E-mail:</span>
                </InputField>
                <InputField register={register} name="password" required={true} errors={errors}>
                    <span>Wachtwoord:</span>
                </InputField>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;