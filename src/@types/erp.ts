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
export interface Miembro {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  role: "ADMIN" | "TRABAJADOR";
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

  export enum Tipo {
  TASK = "TASK",
  STORY = "STORY",
}
export enum Prioridad {
  ALTA = "ALTA",
  MEDIA = "MEDIA",
  BAJA = "BAJA",
}

  export type Issue = {
  nombre: string;
  usuario: number; 
  prioridad: Prioridad;
  estado: EstadoIssue;
  departamento: Departamento;
  tipo: Tipo;
  epicos: number;
  sprint?: string;
  proyecto: number;
  fecha: string; 
};