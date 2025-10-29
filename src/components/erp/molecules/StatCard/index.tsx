import React from "react";

interface StatCardProps {
    label: string;
    value: number;
    icon: JSX.Element;
    color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
    return (
        <div className="flex items-center justify-between p-5 bg-white shadow-md rounded-2xl border hover:shadow-lg transition">
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <h2 className={`text-2xl font-bold text-${color}-500`}>{value}</h2>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
        </div>
    );
};

export default StatCard;
