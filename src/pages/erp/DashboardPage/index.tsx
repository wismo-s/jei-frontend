import DashboardLayout from "@layouts/erp/DashboardLayout";
import DeparmentStats from "@components/erp/molecules/DeparmentStats";
import DepartmentProyects from "@components/erp/molecules/DepartmentProyects";
import DepartmentMembers from "@components/erp/molecules/DepartmentMembers";
import DeparmentEpics from "@components/erp/molecules/DeparmentEpics";
import DeparmentIssues from "@components/erp/molecules/DeparmentIssues";
import { Tabs, Select, Spin } from "antd";
import { useState, useEffect } from "react";
import { useAuthStore } from "@store/authStore";
import { Departamento } from "@myTypes/erp";

const { TabPane } = Tabs;

const departmentMap: Record<string, Departamento> = {
  "Administracion y Finanzas": Departamento.ADMINISTRACION,
  "Marketing": Departamento.MARKETING,
  "Transformacion Digital": Departamento.DIGITAL,
  "Comercial": Departamento.COMERCIAL,
  "Coordinacion Academica": Departamento.RRHH,
  "Diseño y Audiovisual": Departamento.AUDIOVISUAL,
};

const departments = Object.keys(departmentMap);

export default function ProductivityDashboardPage() {
   const { user: authUser } = useAuthStore((state) => state);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Setea automáticamente el departamento del usuario
  useEffect(() => {
    if (authUser?.departamento) {
      // Buscar la clave en departmentMap cuyo valor coincide con authUser.departamento
      const matchedDeptKey = Object.keys(departmentMap).find(
        (key) => departmentMap[key] === authUser.departamento
      );
      setSelectedDept(matchedDeptKey || "Marketing");
    }
  }, [authUser]);

  // Mostrar cargando mientras no hay departamento válido
  if (!selectedDept) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Spin size="large" />
      </div>
    );
  }

  const depEnum = departmentMap[selectedDept];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Bienvenido, <span className="text-blue-600">{authUser?.nombre}</span>
        </h1>
        <p className="text-gray-500">Gestiona aquí la productividad</p>
      </div>

      {/* Filtro principal */}
      <div className="mb-6 flex gap-4 items-center flex-wrap">
        <span className="font-semibold">Departamento:</span>
        <Select
          value={selectedDept}
          onChange={setSelectedDept}
          style={{ width: 250 }}
          disabled={authUser?.role !== "ADMIN"}
        >
          {departments.map((d) => (
            <Select.Option
              key={d}
              value={d}
              disabled={authUser?.role !== "ADMIN"}
            >
              {d}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Resumen del departamento */}
      <DeparmentStats depEnum={depEnum} />

      {/* Tabs */}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Miembros" key="1">
          <DepartmentMembers depEnum={depEnum} />
        </TabPane>

        <TabPane tab="Proyectos" key="2">
          <DepartmentProyects depEnum={depEnum} />
        </TabPane>

        <TabPane tab="Épicas" key="3">
          <DeparmentEpics depEnum={depEnum} />
        </TabPane>

        <TabPane tab="Issues" key="4">
          <DeparmentIssues depEnum={depEnum} />
        </TabPane>
      </Tabs>
    </DashboardLayout>
  );
}