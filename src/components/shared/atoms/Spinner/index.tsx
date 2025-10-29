import { Spin } from "antd";

export default function Spinner() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Spin size="large" />
        </div>
    );
}
