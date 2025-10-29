import { MessageInstance } from "antd/es/message/interface";

export const onSuccessMessage = (message: string, messageApi: MessageInstance) => {
    messageApi.success(message);
};

export const onErrorMessage = (message: string, messageApi: MessageInstance) => {
    messageApi.error(message);
};
