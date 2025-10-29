import React, { useState } from "react";
import { Tabs } from "antd";
import DepartmentProyects from "@components/erp/molecules/DepartmentProyects";
import DepartmentMembers from "@components/erp/molecules/DepartmentMembers";
import DeparmentEpics from "@components/erp/molecules/DeparmentEpics";
import DeparmentIssues from "@components/erp/molecules/DeparmentIssues";
import { getMiembros, getEpicas, getProyectos } from "@services/portals/erp";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { EstadoEpic, Miembro, EstadoProyecto } from "@myTypes/erp";

const { TabPane } = Tabs;

type DepartmentTabsProps = {
  depEnum: string; 
};

const epicaEstados: EstadoEpic[] = [
  EstadoEpic.ABIERTA,
  EstadoEpic.EN_PROGRESO,
  EstadoEpic.COMPLETADA,
];

const DeparmentTabs: React.FC<DepartmentTabsProps> = ({ depEnum }) => {
    
    const { data: miembros, isLoading: isMiembrosLoading } = useQuery<Miembro[]>({
    queryKey: ["miembros", depEnum],
    queryFn: () => getMiembros(depEnum),
    enabled: !!depEnum,
  });
  const [epicaFilter, setEpicaFilter] = useState<EstadoEpic | "Todos">("Todos");

  const { data: epicas, isLoading: isEpicasLoading } = useQuery({
    queryKey: ["epicas", depEnum, epicaFilter],
    queryFn: () =>
      getEpicas({
        departamento: depEnum,
        estado: epicaFilter !== "Todos" ? epicaFilter : undefined,
      }),
    enabled: !!depEnum,
  });

   const [proyectoFilter, setProyectoFilter] = useState<EstadoProyecto | "Todos">("Todos");
  const { data: proyectos, isLoading: isProyectosLoading } = useQuery({
    queryKey: ["proyectos", depEnum, proyectoFilter],
    queryFn: () =>
      getProyectos({
        departamento: depEnum,
        estado: proyectoFilter !== "Todos" ? proyectoFilter : undefined,
      }),
    enabled: !!depEnum,
  });

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Miembros" key="1">
        {isMiembrosLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          <DepartmentMembers miembros={miembros || []} />
        )}
      </TabPane>

      <TabPane tab="Proyectos" key="2">
        {isProyectosLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          <DepartmentProyects
            proyectos={proyectos || []}
            proyectoFilter={proyectoFilter}
            setProyectoFilter={setProyectoFilter}
          />
        )}
      </TabPane>

      <TabPane tab="Épicas" key="3">
        {isEpicasLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          <DeparmentEpics epicas={epicas || []} epicaFilter={epicaFilter} setEpicaFilter={setEpicaFilter} />
        )}
      </TabPane>

      <TabPane tab="Issues" key="4">
        <DeparmentIssues depEnum={depEnum}
    miembros={miembros || []} 
    epicas={epicas || []}
    proyectos={proyectos || []} />
      </TabPane>
    </Tabs>
  );
};

export default DeparmentTabs;