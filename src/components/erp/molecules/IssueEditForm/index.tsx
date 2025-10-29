import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, InputNumber, message, Tag, Badge, Avatar } from "antd";
import { Prioridad, Tipo, EstadoIssue, Issue, Departamento, Miembro, EstadoEpic, EstadoProyecto  } from "@myTypes/erp";
import { useAuthStore } from "@store/authStore";
import { updateIssue } from "@services/portals/erp";
import dayjs from "dayjs";

type IssueEditFormProps = {
  issue: Issue;               
  miembros: Miembro[];
  epicas: EstadoEpic[];
  proyectos: EstadoProyecto[];    
};

const departamentosList: Departamento[] = Object.values(Departamento)

const sprintsList = ["Sprint 1", "Sprint 2", "Sprint 3"];

const estadoIssueColorMap: Record<EstadoIssue, string> = {
  SIN_EMPEZAR: "gray",
  EN_CURSO: "blue",
  REVISION: "orange",
  APROBADO: "green",
  COMPLETADO: "green",
};


const IssueEditForm: React.FC<IssueEditFormProps> = ({
  issue,
  miembros,
  epicas,
  proyectos,
}) => {
  const { user: authUser } = useAuthStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const openModal = () => {
    form.setFieldsValue({
      ...issue,
      fecha: dayjs(issue.fecha),
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const onFinish = async (values: any) => {
  try {
    setLoading(true);

    // Formatear los campos que deben ser solo IDs
    const formattedValues: Issue = {
      ...issue,
      ...values,
      fecha: values.fecha.format("YYYY-MM-DD"),
      usuario: issue.usuario?.id ?? values.usuario, 
      proyecto: issue.proyecto?.id ?? values.proyecto, 
      epicos: issue.epica?.id ?? values.epicos, 
    };

    await updateIssue(issue.id, formattedValues);

    message.success("Issue actualizado correctamente");
    closeModal();
    window.location.reload();
  } catch (error) {
    console.error(error);
    message.error("Error al actualizar el issue");
  } finally {
    setLoading(false);
  }
};

  const prioridadColor = (prioridad: Prioridad) => {
    switch (prioridad) {
      case "ALTA":
        return "red";
      case "MEDIA":
        return "orange";
      case "BAJA":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <>
      <Button type="default" onClick={openModal}>
        Editar Issue
      </Button>

      <Modal
        title="Editar Issue"
        open={isOpen}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
            <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: "Nombre obligatorio" }]}
                      >
                        <Input />
                      </Form.Item>
          
          <Form.Item name="usuario" initialValue={issue.usuario?.id} hidden>
  <Input />
</Form.Item>
          <Form.Item
            name="prioridad"
            label="Prioridad"
            rules={[{ required: true, message: "Prioridad obligatoria" }]}
            initialValue={Prioridad.BAJA} // Valor por defecto
          >
            <Select
              placeholder="Selecciona prioridad"
              valueRender={(selectedValue: Prioridad) => (
                <Tag color={prioridadColor(selectedValue)}>{selectedValue}</Tag>
              )}
            >
              {Object.values(Prioridad).map((p) => (
                <Select.Option key={p} value={p}>
                  <Tag color={prioridadColor(p)}>{p}</Tag>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
                    <Form.Item
            name="estado"
            label="Estado"
            rules={[{ required: true, message: "Estado obligatorio" }]}
            initialValue={"SIN_EMPEZAR"} // Valor por defecto
          >
            <Select
              placeholder="Selecciona estado"
              // Renderizar el valor seleccionado con Badge
              valueRender={(selectedValue: EstadoIssue) => (
                <Badge
                  color={estadoIssueColorMap[selectedValue]}
                  text={
                    selectedValue === "SIN_EMPEZAR"
                      ? "Sin empezar"
                      : selectedValue === "EN_CURSO"
                      ? "En curso"
                      : selectedValue === "REVISION"
                      ? "En revisión"
                      : selectedValue === "APROBADO"
                      ? "Aprobado"
                      : "Completado"
                  }
                />
              )}
            >
              {["APROBADO", "COMPLETADO", "REVISION", "EN_CURSO", "SIN_EMPEZAR"].map((e) => (
                <Select.Option key={e} value={e}>
                  <Badge
                    color={estadoIssueColorMap[e as EstadoIssue]}
                    text={
                      e === "SIN_EMPEZAR"
                        ? "Sin empezar"
                        : e === "EN_CURSO"
                        ? "En curso"
                        : e === "REVISION"
                        ? "En revisión"
                        : e === "APROBADO"
                        ? "Aprobado"
                        : "Completado"
                    }
                  />
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
                    <Form.Item
            name="departamento"
            label="Departamento"
            rules={[{ required: true, message: "Departamento obligatorio" }]}
            initialValue={authUser?.departamento} 
          >
            <Select disabled={authUser?.role !== "ADMIN"}>
              {departamentosList.map((d) => (
                <Select.Option key={d} value={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
                    <Form.Item
            name="tipo"
            label="Tipo"
            rules={[{ required: true, message: "Tipo obligatorio" }]}
            initialValue={Tipo.TASK} 
          >
            <Select
              placeholder="Selecciona tipo"
              valueRender={(selectedValue: Tipo) => (
                <Tag color="purple">{selectedValue}</Tag>
              )}
            >
              {Object.values(Tipo).map((t) => (
                <Select.Option key={t} value={t}>
                  <Tag color="purple">{t}</Tag>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


<Form.Item name="epicos" initialValue={issue.epicos?.[0]?.id} hidden>
  <Input />
</Form.Item>
          
                    <Form.Item
                      name="sprint"
                      label="Sprint"
                      rules={[{ required: true, message: "Sprint obligatorio" }]}
                    >
                      <Select>
                        {sprintsList.map((s) => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
          
                    <Form.Item name="proyecto" initialValue={issue.proyecto?.id} hidden>
  <Input />
</Form.Item>
          
                    <Form.Item
                      name="fecha"
                      label="Fecha"
                      rules={[{ required: true, message: "Fecha obligatoria" }]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default IssueEditForm;
