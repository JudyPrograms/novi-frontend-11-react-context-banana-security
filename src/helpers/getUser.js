import axios from "axios";

async function getUser(token, user, isAuth, toggleIsAuth) {

    try {
        const result = await axios.get(`http://localhost:3000/600/users/${user}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            status: 'done',
            user: {
                email: result.data.email,
                username: result.data.username,
                id: result.data.id,
            },
        })

        console.log('Gebruiker ingelogd!')

    } catch (e) {
        console.error(e.response.data)
    }
}

export default getUser;