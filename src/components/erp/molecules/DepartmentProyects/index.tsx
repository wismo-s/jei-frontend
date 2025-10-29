import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Card, Button, Progress, Tag, Avatar, Input, Spin } from "antd";
import { getProyectos } from "@services/portals/erp";

const { Search } = Input;

export type EstadoProyecto =
  | "PROPUESTO"
  | "APROBADO"
  | "EN_CURSO"
  | "EN_REVISION"
  | "COMPLETADO";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  role: "ADMIN" | "TRABAJADOR";
  departamento: string;
}

interface Proyecto {
  id: number;
  nombre: string;
  cuenta?: string;
  estado: EstadoProyecto;
  usuario?: Usuario;
  departamento: string;
  porcentaje?: number;
  fechaCreacion?: string;
}

type DepartmentProjectsProps = {
  proyectos: Proyecto[];
  proyectoFilter: EstadoProyecto | "Todos";
  setProyectoFilter: (f: EstadoProyecto | "Todos") => void;
};

const estadoLabels: Record<EstadoProyecto, string> = {
  PROPUESTO: "Propuesto",
  APROBADO: "Aprobado",
  EN_CURSO: "En curso",
  EN_REVISION: "En revisión",
  COMPLETADO: "Completado",
};

const estadoColors: Record<EstadoProyecto, string> = {
  PROPUESTO: "gray",
  APROBADO: "purple",
  EN_CURSO: "green",
  EN_REVISION: "blue",
  COMPLETADO: "gold",
};

const DepartmentProjects: React.FC<DepartmentProjectsProps> = ({
  proyectos,
  proyectoFilter,
  setProyectoFilter,
}) => {
  const [searchText, setSearchText] = useState("");

  // Filtrado por búsqueda
  const proyectosFiltrados = proyectos?.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchText.toLowerCase()) &&
      (proyectoFilter === "Todos" || p.estado === proyectoFilter)
  );

  return (
    <>
      {/* 🔹 Filtros */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <Button
            type={proyectoFilter === "Todos" ? "primary" : "default"}
            onClick={() => setProyectoFilter("Todos")}
          >
            Todos
          </Button>
          {(Object.keys(estadoLabels) as EstadoProyecto[]).map((estado) => (
            <Button
              key={estado}
              type={proyectoFilter === estado ? "primary" : "default"}
              onClick={() => setProyectoFilter(estado)}
            >
              {estadoLabels[estado]}
            </Button>
          ))}
        </div>

        <Search
          placeholder="Buscar proyecto"
          style={{ width: 250 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 🔹 Cards de Proyectos */}
      {proyectosFiltrados && proyectosFiltrados.length > 0 ? (
        <Row gutter={[16, 16]} className="mb-6">
          {proyectosFiltrados.map((p) => (
            <Col xs={24} md={12} lg={8} key={p.id || p.nombre}>
              <Card>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{p.nombre}</span>
                  <Progress percent={p.porcentaje || 0} size="small" status="active" />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="p-4 text-gray-500 text-center mb-6">
          No hay proyectos en este estado
        </div>
      )}

      {/* 🔹 Tabla de Proyectos */}
      {proyectosFiltrados && proyectosFiltrados.length > 0 && (
        <div className="overflow-x-auto">
          <div className="min-w-[1200px] border rounded-lg bg-white shadow-sm">
            <div className="grid grid-cols-6 bg-gray-50 font-semibold text-gray-600 text-sm px-4 py-2 border-b">
              <div>ID</div>
              <div>Nombre</div>
              <div>Porcentaje</div>
              <div>Estado</div>
              <div>Responsable</div>
              <div>Fecha Creación</div>
            </div>
            {proyectosFiltrados.map((p, i) => (
              <div
                key={p.id || i}
                className="grid grid-cols-6 items-center px-4 py-3 border-b hover:bg-gray-50"
              >
                <div className="text-blue-600 font-semibold">
                  {p.id ? `#${p.id}` : "#PRO-XX"}
                </div>
                <div>{p.nombre}</div>
                <div>{p.porcentaje}%</div>
                <div>
                  <Tag color={estadoColors[p.estado] || "default"}>
                    {estadoLabels[p.estado]}
                  </Tag>
                </div>
                <div className="flex items-center gap-2">
                  {p.usuario ? (
                    <>
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${p.usuario.nombre}+${p.usuario.apellido}&background=random`}
                        size={28}
                      />
                      <span className="font-semibold">{p.usuario.nombre}</span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">Sin asignar</span>
                  )}
                </div>
                <div className="text-gray-500 text-sm">
                  {p.fechaCreacion
                    ? new Date(p.fechaCreacion).toLocaleDateString()
                    : "08/09/2025"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentProjects;
