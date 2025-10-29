import { ConfigProvider, App as AntdApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "@routes";

import "./App.css";

function App() {
    return (
        <AntdApp>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#0034BB",
                        fontFamily: "'DM Sans', sans-serif",
                    },
                }}
            >
                <BrowserRouter>
                    <MainRoutes />
                </BrowserRouter>
            </ConfigProvider>
        </AntdApp>
    );
}

export default App;
