import React, { useState } from "react";
import { Row, Col, Card, Progress, Tag, Avatar, Button, Input, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getEpicas } from "@services/portals/erp";
import { EstadoEpic } from "@myTypes/erp";

const { Search } = Input;

interface DepartmentEpicsProps {
  depEnum: string;
}

const epicaEstados: EstadoEpic[] = [
  EstadoEpic.ABIERTA,
  EstadoEpic.EN_PROGRESO,
  EstadoEpic.COMPLETADA,
];

const estadoColors: Record<EstadoEpic, string> = {
  [EstadoEpic.ABIERTA]: "purple",
  [EstadoEpic.EN_PROGRESO]: "blue",
  [EstadoEpic.COMPLETADA]: "green",
};

const DepartmentEpics: React.FC<DepartmentEpicsProps> = ({ depEnum }) => {
  const [epicaFilter, setEpicaFilter] = useState<EstadoEpic | "Todos">("Todos");
  const [searchText, setSearchText] = useState("");

  const { data: epicas, isLoading } = useQuery({
    queryKey: ["epicas", depEnum, epicaFilter],
    queryFn: () =>
      getEpicas({
        departamento: depEnum,
        estado: epicaFilter !== "Todos" ? epicaFilter : undefined,
      }),
    enabled: !!depEnum,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Spin size="large" />
      </div>
    );

  // Filtrado por búsqueda
  const filteredEpicas = epicas?.filter((e) =>
    e.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {/* 🔹 Filtros y búsqueda */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <Button
            type={epicaFilter === "Todos" ? "primary" : "default"}
            onClick={() => setEpicaFilter("Todos")}
          >
            Todos
          </Button>
          {epicaEstados.map((estado) => (
            <Button
              key={estado}
              type={epicaFilter === estado ? "primary" : "default"}
              onClick={() => setEpicaFilter(estado)}
            >
              {estado}
            </Button>
          ))}
        </div>

        <Search
          placeholder="Buscar épica"
          style={{ width: 250 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 🔹 Cards de épicas */}
      {filteredEpicas && filteredEpicas.length > 0 ? (
        <Row gutter={[16, 16]} className="mb-6">
          {filteredEpicas.map((e) => (
            <Col xs={24} md={12} lg={8} key={e.id}>
              <Card>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{e.nombre}</span>
                  <Progress percent={e.progreso || 0} size="small" status="active" />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="p-4 text-gray-500 mb-6 text-center">No hay épicas</div>
      )}

      {/* 🔹 Tabla de épicas */}
      {filteredEpicas && filteredEpicas.length > 0 && (
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] border rounded-lg bg-white-full shadow-sm">
            <div className="grid grid-cols-7 bg-gray-50 font-semibold text-gray-600 text-sm px-4 py-2 border-b">
              <div>ID</div>
              <div>Nombre</div>
              <div>Estado</div>
              <div>Proyecto</div>
              <div>Departamento</div>
              <div>Responsables</div>
              <div>Fecha</div>
            </div>

            {filteredEpicas.map((epic) => (
              <div
                key={epic.id}
                className="grid grid-cols-7 items-center px-4 py-3 border-b hover:bg-gray-50"
              >
                <div className="text-blue-600 font-semibold">#{epic.id}</div>
                <div>{epic.nombre}</div>
                <div>
                  <Tag color={estadoColors[epic.estado]}>{epic.estado}</Tag>
                </div>
                <div>{epic.proyecto?.nombre}</div>
                <div>{epic.departamento}</div>
                <div className="flex items-center gap-2">
                  {epic.usuario ? (
                    <>
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${epic.usuario.nombre}+${epic.usuario.apellido}&background=random`}
                        size={28}
                      />
                      <span className="font-semibold">{epic.usuario.nombre}</span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">Sin asignar</span>
                  )}
                </div>
                <div className="text-gray-500 text-sm">{epic.fecha}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentEpics;