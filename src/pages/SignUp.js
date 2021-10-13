import React from 'react';
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import InputField from "../components/InputField";

function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm()

    function handleFormSubmit(data) {
        console.log(data)
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
                <InputField register={register} name="e-mail" required={true} errors={errors}>
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