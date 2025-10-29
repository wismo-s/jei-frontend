import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin, Button, Avatar, Tag, Badge } from "antd";
import { getIssues } from "@services/portals/erp";
import { EstadoIssue, Miembro, EstadoEpic, EstadoProyecto } from "@myTypes/erp";
import IssueCreateForm from "@components/erp/molecules/IssueCreateForm";
import IssueEditForm from "@components/erp/molecules/IssueEditForm";


interface DepartmentIssuesProps {
  depEnum?: string;          
  miembros?: Miembro[]; 
  epicas: EstadoEpic[];  
  proyectos: EstadoProyecto[];
}

const estadoIssueOptions: (EstadoIssue | "Todos")[] = [
  "Todos",
  "SIN_EMPEZAR",
  "EN_CURSO",
  "REVISION",
  "APROBADO",
  "COMPLETADO",
];

const estadoIssueColorMap: Record<EstadoIssue, string> = {
  SIN_EMPEZAR: "gray",
  EN_CURSO: "blue",
  REVISION: "orange",
  APROBADO: "green",
  COMPLETADO: "green",
};

const DepartmentIssues: React.FC<DepartmentIssuesProps> = ({ depEnum, miembros = [], epicas = [], proyectos = [] }) => {
  const [issueFilter, setIssueFilter] = useState<EstadoIssue | "Todos">("Todos");

  const { data: issues, isLoading } = useQuery({
    queryKey: ["issues", depEnum, issueFilter],
    queryFn: () =>
      getIssues({
        departamento: depEnum,
        estado: issueFilter !== "Todos" ? issueFilter : undefined,
      }),
    enabled: !!depEnum,
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <div className="flex justify-start items-center mb-4 flex-wrap gap-2">
        {estadoIssueOptions.map((estado) => (
          <Button
            key={estado}
            type={issueFilter === estado ? "primary" : "default"}
            onClick={() => setIssueFilter(estado)}
          >
            {estado === "SIN_EMPEZAR"
              ? "Sin empezar"
              : estado === "EN_CURSO"
              ? "En curso"
              : estado === "REVISION"
              ? "En revisión"
              : estado === "APROBADO"
              ? "Aprobado"
              : estado === "COMPLETADO"
              ? "Completado"
              : estado}
          </Button>
        ))}
        <IssueCreateForm miembros={miembros} epicas={epicas} proyectos={proyectos} />
      </div>

      {/* 🔹 Tabla de issues */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px] border rounded-lg bg-white-full shadow-sm">
          <div className="grid grid-cols-11 bg-gray-50 font-semibold text-gray-600 text-sm px-4 py-2 border-b">
            <div>ID</div>
            <div>Nombre</div>
            <div>Responsables</div>
            <div>Prioridad</div>
            <div>Status</div>
            <div>Tipo</div>
            <div>Epic</div>
            <div>Sprint</div>
            <div>Proyecto</div>
            <div>Fecha</div>
            <div>Opciones</div>
          </div>

          {issues && issues.length > 0 ? (
  issues.map((issue: any) => (
    <div
      key={issue.id}
      className="grid grid-cols-11 items-center px-4 py-3 border-b hover:bg-gray-50"
    >
      <div className="text-blue-600 font-semibold">#{issue.id}</div>
      <div>{issue.nombre}</div>
      <div className="flex items-center gap-2">
        {issue.usuario ? (
          <>
            <Avatar
              src={`https://ui-avatars.com/api/?name=${issue.usuario.nombre}+${issue.usuario.apellido}&background=random`}
              size={28}
            />
            <span className="font-semibold">{issue.usuario.nombre}</span>
          </>
        ) : (
          <span>-</span>
        )}
      </div>
      <div>
        <Tag
          color={
            issue.prioridad === "ALTA"
              ? "red"
              : issue.prioridad === "MEDIA"
              ? "orange"
              : "blue"
          }
        >
          {issue.prioridad}
        </Tag>
      </div>
      <div>
        <Badge
          color={estadoIssueColorMap[issue.estado as EstadoIssue]}
          text={
            issue.estado === "SIN_EMPEZAR"
              ? "Sin empezar"
              : issue.estado === "EN_CURSO"
              ? "En curso"
              : issue.estado === "REVISION"
              ? "En revisión"
              : issue.estado === "APROBADO"
              ? "Aprobado"
              : "Completado"
          }
        />
      </div>
      <div>
        <Tag color="purple">{issue.tipo}</Tag>
      </div>
      <div>{issue.epica?.nombre || "-"}</div>
      <div>{issue.sprint || "-"}</div>
      <div>{issue.proyecto?.nombre || "-"}</div>
      <div className="text-gray-500 text-sm">{issue.fecha}</div>

      {/* Nueva columna para editar el issue */}
      <div>
        <IssueEditForm
          issue={issue}
          miembros={miembros}   
          epicas={epicas}       
          proyectos={proyectos} 
          
        />
      </div>
    </div>
  ))
) : (
  <div className="p-4 text-center text-gray-500">No hay issues</div>
)}
        </div>
      </div>
    </>
  );
};

export default DepartmentIssues;