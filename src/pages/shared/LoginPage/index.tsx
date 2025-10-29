import { useEffect, useRef } from "react";
import { Button, Form, Input, notification, message } from "antd";
import { useNavigate } from "react-router-dom";


import AuthLayout from "@layouts/shared/AuthLayout";
import Jei from "@components/shared/atoms/Jei";
import { AxiosError } from "axios";
import { openErrorNotification } from "@lib/notification";
import { useMutation } from "@tanstack/react-query";
import { login } from "@services/portals/shared/auth";
import { useAuthStore } from "@store/authStore";

type FieldType = {
    correo: string;
    contrasena: string;
};

export default function LoginPage() {
    const { setAuth, isAuthenticated } = useAuthStore((state) => state);
    const navigate = useNavigate();
    const shouldRedirect = useRef(false);

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (isAuthenticated && shouldRedirect.current) {
            navigate("/");
            shouldRedirect.current = false;
        }
    }, [isAuthenticated, navigate]);

    const mutation = useMutation({
        mutationFn: (values: FieldType) => login(values),
        onSuccess: (data) => {
            setAuth(data.token, data.usuario);
            shouldRedirect.current = true;
        },
        onError: (error: AxiosError) => {
            if (error.code === "ERR_BAD_REQUEST") {
                openErrorNotification(
                    "Credenciales incorrectas",
                    "Invalid Credentials",
                    api,
                );
            } else if (error.code === "ERR_NETWORK") {
                openErrorNotification("Error de red", error.message, api);
            }
            message.error("el usuario o la contraseña son incorrectos");
        },
    });
    const handleSubmit = (values: FieldType) => {
        mutation.mutate(values);
    };

    return (
        <AuthLayout>
            {contextHolder}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="flex justify-center md:block">
                    <Jei width={200} height={70} />
                    <p className="hidden text-3xl md:block md:text-5xl md:max-w-lg text-black-full">
                        En{" "}
                        <span className="text-blue-full font-bold">
                            JEI
                        </span>{" "}
                        trabajamos para ofrecerte la mejor experiencia
                        administrativa.
                    </p>
                </div>
                <div className="space-y-5">
                    <h2 className="text-center text-5xl font-semibold text-black-full">
                        Ingresar
                    </h2>
                    <Form
                        name="login"
                        layout="vertical"
                        className="space-y-8"
                        onFinish={handleSubmit}
                    >
                        <Form.Item<FieldType>
                            name="correo"
                            label={
                                <span className="font-medium text-base">Usuario</span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor. Ingrese un usuario!",
                                },
                            ]}
                        >
                            <Input placeholder="Ej. Juan" className="py-3" />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="contrasena"
                            label={
                                <span className="font-medium text-base">
                                    Contraseña
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor. Ingrese la contraseña!",
                                },
                            ]}
                        >
                            <Input.Password
                                className="py-3"
                                autoComplete="ceu-password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                size="large"
                                className="h-fit"
                                htmlType="submit"
                            >
                                <span className="py-1">Ingresar</span>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AuthLayout>
    );
}
