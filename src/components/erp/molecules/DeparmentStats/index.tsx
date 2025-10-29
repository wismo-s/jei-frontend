import React from "react";
import { Row, Col, Card, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell, PieChart, Pie } from "recharts";
import { FolderKanban, Layers, AlertTriangle, Users } from "lucide-react";
import StatCard from "@components/erp/molecules/StatCard";
import { getEstadisticas } from "@services/portals/erp";

interface DepartmentStatsProps {
  depEnum: string;
}

const COLORS_ISSUES = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];
const COLORS_PRIORITY = ["#2563EB", "#16A34A", "#FBBF24", "#DC2626"];

const DepartmentStats: React.FC<DepartmentStatsProps> = ({ depEnum }) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["estadisticas", depEnum],
    queryFn: () => getEstadisticas(depEnum),
    enabled: !!depEnum,
  });

   if (isLoading || !stats)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );


  const issuesByStatus = Object.entries(stats.issuesPorEstado || {}).map(
    ([status, cantidad]) => ({ status, cantidad }),
  );

  const priorities = Object.entries(stats.issuesPorPrioridad || {}).map(
    ([name, value]) => ({ name, value }),
  );

  return (
    <>
      {/* Resumen del departamento */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={12} md={6}>
          <StatCard
            label="Proyectos"
            value={stats.totalProyectos}
            icon={<FolderKanban className="text-blue-500 w-6 h-6" />}
            color="blue"
          />
        </Col>
        <Col xs={12} md={6}>
          <StatCard
            label="Épicas"
            value={stats.totalEpicas}
            icon={<Layers className="text-green-500 w-6 h-6" />}
            color="green"
          />
        </Col>
        <Col xs={12} md={6}>
          <StatCard
            label="Issues"
            value={stats.totalIssues}
            icon={<AlertTriangle className="text-yellow-500 w-6 h-6" />}
            color="yellow"
          />
        </Col>
        <Col xs={12} md={6}>
          <StatCard
            label="Miembros"
            value={stats.totalUsuarios}
            icon={<Users className="text-purple-500 w-6 h-6" />}
            color="purple"
          />
        </Col>
      </Row>

      {/* Gráficos */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Issues por Estado">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={issuesByStatus}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad">
                  {issuesByStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.status}`}
                      fill={COLORS_ISSUES[index % COLORS_ISSUES.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Card title="Prioridad de Issues">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={priorities}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {priorities.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS_PRIORITY[index % COLORS_PRIORITY.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DepartmentStats;