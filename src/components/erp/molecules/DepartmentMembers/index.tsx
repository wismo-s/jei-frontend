import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Avatar, Spin } from "antd";
import { getMiembros } from "@services/portals/erp";

interface Miembro {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  role: "ADMIN" | "USER";
}

interface DepartmentMembersProps {
  depEnum: string;
}

const DepartmentMembers: React.FC<DepartmentMembersProps> = ({ depEnum }) => {
  const { data: miembros, isLoading } = useQuery<Miembro[]>({
    queryKey: ["miembros", depEnum],
    queryFn: () => getMiembros(depEnum),
    enabled: !!depEnum,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Spin size="large" />
      </div>
    );

  if (!miembros || miembros.length === 0)
    return (
      <div className="p-4 text-gray-500 text-center">
        No hay miembros en este departamento.
      </div>
    );

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg rounded-2xl py-8 px-6">
      <div className="flex flex-wrap justify-center gap-24">
        {miembros.map((m) => (
          <div key={m.id} className="flex flex-col items-center w-40">
            {/* Avatar */}
            <Avatar
              src={`https://ui-avatars.com/api/?name=${m.nombre}+${m.apellido}&background=random`}
              size={70}
              style={{ marginBottom: 15 }}
            />

            {/* Nombre */}
            <div className="font-semibold text-center">
              {m.nombre} {m.apellido}
            </div>

            {/* Correo */}
            <div className="text-gray-500 text-sm text-center">{m.correo}</div>

            {/* Rol */}
            <div className="text-gray-400 text-xs mt-1">
              {m.role === "ADMIN" ? "Administrador" : "Trabajador"}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DepartmentMembers;