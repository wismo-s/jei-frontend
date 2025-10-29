export interface EstadisticasResponse {
    totalEpicas: number;
    totalIssues: number;
    totalUsuarios: number;
    totalProyectos: number;
    issuesPorEstado: Record<string, number>;
    issuesPorPrioridad: Record<string, number>;
}
export enum Departamento {
    ADMINISTRACION = "ADMINISTRACION",
    MARKETING = "MARKETING",
    DIGITAL = "DIGITAL",
    RRHH = "RRHH",
    AUDIOVISUAL = "AUDIOVISUAL",
    COMERCIAL = "COMERCIAL",
}
export enum Role {
    ADMIN = "ADMIN",
    TRABAJADOR = "TRABAJADOR",
}

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena?: string;
    role: Role;
    departamento: Departamento;
}

export type EstadoProyecto =
    | "PROPUESTO"
    | "APROBADO"
    | "EN_CURSO"
    | "EN_REVISION"
    | "COMPLETADO";

export enum EstadoEpic {
    ABIERTA = "ABIERTA",
    EN_PROGRESO = "EN_PROGRESO",
    COMPLETADA = "COMPLETADA",
}
export type EstadoIssue =
  | "APROBADO"
  | "COMPLETADO"
  | "REVISION"
  | "EN_CURSO"
  | "SIN_EMPEZAR"