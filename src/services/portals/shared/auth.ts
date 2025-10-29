import { portalsApi } from "..";

export const login = async (credentials: { correo: string; contrasena: string }) => {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        const tokenResponse = await fetch("http://localhost:8080/oauth2/token", {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa("svc-consumer:s3cr3t"),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        if (!tokenResponse.ok) {
            throw new Error("No se pudo obtener el token de servicio");
        }

        const tokenData = await tokenResponse.json();
        const serviceToken = tokenData.access_token;
        console.log(credentials);
        const res = await portalsApi.post("/auth/login", JSON.stringify(credentials), {
            headers: {
                Authorization: `Bearer ${serviceToken}`,
                "Content-Type": "application/json",
            },
        });

        return res.data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};
