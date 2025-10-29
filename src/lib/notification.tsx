import { Tag, Typography } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

const { Text } = Typography;

export type ErroNotificationConfig = Partial<{
    messageDescription: string;
}>;

const openErrorNotification = (
    message: string,
    description: string | string[],
    notification: NotificationInstance,
    config?: ErroNotificationConfig,
) => {
    notification.error({
        message,
        description: (
            <div className="space-x-2">
                <Text>{config?.messageDescription || "Ocurrió un error"}</Text>
                {typeof description === "string" ? (
                    <Tag
                        bordered={false}
                        color="error"
                        className="whitespace-break-spaces text-wrap"
                    >
                        {description}
                    </Tag>
                ) : (
                    description.map((desc, index) => (
                        <Tag
                            bordered={false}
                            color="error"
                            key={index}
                            className="whitespace-break-spaces text-wrap my-0.5"
                        >
                            {desc}
                        </Tag>
                    ))
                )}
            </div>
        ),
        duration: 3,
        showProgress: true,
        pauseOnHover: true,
    });
};

export { openErrorNotification };
