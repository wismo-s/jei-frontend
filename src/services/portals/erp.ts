import { portalsApi } from "@services/portals/index";
import { EstadisticasResponse } from "@myTypes/erp";

export const getEstadisticas = async (
    departamento: string,
): Promise<EstadisticasResponse> => {
    const response = await portalsApi.get<EstadisticasResponse>(`/estadisticas`, {
        params: { departamento },
    });
    console.log(response.data);

    return response.data;
};
export const getMiembros = async (
    departamento: string,
): Promise<EstadisticasResponse> => {
    const response = await portalsApi.get<EstadisticasResponse>(`/usuario`, {
        params: { departamento },
    });
    console.log(response.data);

    return response.data;
};
export interface GetParams {
    departamento: string;
    estado?: string;
}
export const getProyectos = async (
    params: GetParams,
): Promise<EstadisticasResponse> => {
    const { departamento, estado } = params;
    const response = await portalsApi.get<EstadisticasResponse>(`/proyectos`, {
        params: {
            departamento,
            ...(estado ? { estado } : {}),
        },
    });
    console.log(response.data);

    return response.data;
};


export const getEpicas = async (
    params: GetParams,
): Promise<EstadisticasResponse> => {
    const { departamento, estado } = params;
    const response = await portalsApi.get<EstadisticasResponse>(`/epicas`, {
        params: {
            departamento,
            ...(estado ? { estado } : {}),
        },
    });

    console.log(response.data);
    return response.data;
};

export const getIssues = async (
    params: GetParams,
): Promise<EstadisticasResponse> => {
    const { departamento, estado } = params;
    const response = await portalsApi.get<EstadisticasResponse>(`/issues`, {
        params: {
            departamento,
            ...(estado ? { estado } : {}),
        },
    });

    console.log(response.data);
    return response.data;
};
