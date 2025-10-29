import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";

import Dashboard from "@assets/icons/huge/dashboard.svg?react";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    {
        key: "productivity",
        label: (
            <span className="text-black-medium font-semibold text-xs">
                PRODUCTIVIDAD
            </span>
        ),
        type: "group",
        children: [
            {
                key: "dashboard",
                label: <Link to="/">Dashboard</Link>,
                icon: <Dashboard />,
            },
        ],
    },
    {
        type: "divider",
    },
];

const PATHS: Record<string, string> = {
    "/": "dashboard",
    "/staff": "staff",
    "/departments": "departments",
};

export default function ErpSideBar() {
    const location = useLocation();

    const selectedKey = PATHS[location.pathname];

    const onClick: MenuProps["onClick"] = (e) => {
        console.info("click ", e);
    };

    return (
        <Menu
            onClick={onClick}
            style={{ width: 180, border: 0 }}
            defaultSelectedKeys={[selectedKey]}
            defaultOpenKeys={[""]}
            mode="inline"
            items={items}
            className="hidden md:block min-w-24 sticky left-0 top-0"
        />
    );
}
