import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

import Logout from "@assets/icons/huge/logout.svg?react";

import ArrowDown from "@assets/icons/general/arrow-down.svg?react";
import { useAuthStore } from "@store/authStore";
import { Avatar } from "antd";

interface MenuItem {
    key: string;
    label?: string;
    link: string;
    icon: React.FC;
    type?: "divider";
}

const MENU_ITEMS: MenuItem[] = [
    {
        key: "divider1",
        type: "divider",
        link: "",
        icon: (() => null) as unknown as React.FC,
    },
    {
        key: "logout",
        label: "Salir",
        link: "/logout",
        icon: Logout,
    },
];

export default function UserActions() {
    const { user, logout } = useAuthStore((state) => state);

    const dropdownItems: MenuProps["items"] = MENU_ITEMS.map((item) =>
        item.type === "divider"
            ? {
                  key: item.key,
                  type: "divider",
                  style: { margin: 0, padding: 0 },
              }
            : {
                  key: item.key,
                  label: (
                      <Link
                          to={item.link}
                          className="flex items-center gap-4 py-2 px-4 hover:bg-blue-low hover:text-blue-full fill-blue-full text-black-full"
                      >
                          <item.icon />
                          {item.label}
                      </Link>
                  ),
                  style: { margin: 0, padding: 0 },
              },
    );

    const handleClickEvent = ({ key }: { key: string }) => {
        if (key === "logout") {
            logout();
        }
    };

    const firstLastName = `${user?.nombre?.split(" ")[0]} ${user?.apellido?.split(" ")[0]}`;

    const getInitials = () => {
        if (user?.nombre && user?.apellido) {
            return (
                (user.nombre[0] || "").toUpperCase() +
                (user.apellido[0] || "").toUpperCase()
            );
        }
        return "JEI";
    };

    return (
        <>
            <Dropdown
                menu={{ items: dropdownItems, onClick: handleClickEvent }}
                trigger={["click"]}
                className="hidden md:flex items-center gap-4"
            >
                <div className="flex gap-4 items-center cursor-pointer">
                    <Avatar className="h-12 w-12 rounded-full bg-state-green-low flex justify-center items-center font-bold text-blue-full text-2xl">
                        {getInitials()}
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold text-blue-full">
                            {firstLastName === " " ? "Usuario" : firstLastName}
                        </span>
                    </div>
                    <ArrowDown />
                </div>
            </Dropdown>
        </>
    );
}
