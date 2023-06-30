
import React, { useState, useEffect, useRef } from "react";

// Importaciones de PrimeReact

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../components/auth/Table";
import { DialogCreateUpdate, DialogDelete } from "../components/auth/DialogClient";
import * as ClienteService from "../services/ClienteService";
import { exportToExcel, exportToPdf } from "../export/ExportFileClient";
import Navbar from "../components/navbar";

export default function Client() {  
  let dataClient = {
    nombres: "",
    dni: "",
    apellidoPaterno: "",
    apellidoMaterno: "",

  };

  const [isNavbar] = useState(true);
  
  const [clients, setClients] = useState([]);
  const [clientDialog, setClientDialog] = useState(false);
  const [deleteClientDialog, setDeleteClientDialog] = useState(false);
  const [deleteClientsDialog, setDeleteClientsDialog] = useState(false);
  const [client, setClient] = useState(dataClient);
  const [selectedClients, setSelectedClients] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  });
  const [modalTitle, setModalTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = () => {
    ClienteService.getClientList()
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUpdate = () => {
    setSubmitted(true);

    if (client.nombres) {
      if (client.id || isCreating === false) {
        ClienteService.updateClient(client)
          .then(() => {
            getClients();
            setClientDialog(false);
            toast.current.show({
              severity: "success",
              summary: "Éxito",
              detail: "Cliente actualizado",
              life: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al actualizar el cliente:", error);
          });
      } else {
        ClienteService.createClient(client)
          .then(() => {
            getClients();
            setClientDialog(false);
            toast.current.show({
              severity: "success",
              summary: "Éxito",
              detail: "Cliente creado",
              life: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al crear el cliente", error);
            console.log("Error al crear el cliente:", error);
          });
      }
    }
  };

  const removeClient = () => {
    ClienteService.deleteClient(client.id)
      .then(() => {
        getClients();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteClientDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Cliente Eliminado",
      life: 3000,
    });
  };

  const removeSelectedClients = () => {
    const ids = selectedClients.map((c) => c.id);
    const isMultiple = selectedClients.length > 1;

    ClienteService.deleteSelectedClients(ids)
      .then(() => {
        getClients();
        setClients((prevClients) =>
          prevClients.filter((c) => !ids.includes(c.id))
        );
        setSelectedClients([]);
        if (isMultiple) {
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Clientes Eliminados',
            life: 3000
          });
        } else {
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Cliente Eliminado',
            life: 3000
          });
        }
      })
      .catch((error) => {
        console.error("Error al eliminar los clientes:", error);
      });
    setDeleteClientsDialog(false);
    getClients();
  };

  const openNew = () => {
    setClient(dataClient);
    setSubmitted(false);
    setClientDialog(true);
    setModalTitle("Crear Cliente");
    setIsCreating(true);
  };

  const editClient = (client) => {
    setClient({ ...client });
    setSubmitted(false);
    setClientDialog(true);
    setModalTitle("Editar Cliente");
    setIsCreating(false);
  };

  const confirmDeleteClient = (client) => {
    setClient(client);
    setDeleteClientDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setClientDialog(false);
  };

  const hideDeleteClientDialog = () => {
    setDeleteClientDialog(false);
  };

  const hideDeleteClientsDialog = () => {
    setDeleteClientsDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportExcel = () => {
    exportToExcel(clients);
  };

  const exportPDF = () => {
    exportToPdf(clients);
  };

  const confirmDeleteSelected = () => {
    setDeleteClientsDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _client = { ...client };

    _client[`${name}`] = val;

    setClient(_client);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nuevo"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedClients || !selectedClients.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex align-items-center justify-content-end gap-2">
        <Button
          label="CSV"
          type="button"
          icon="pi pi-file"
          rounded
          onClick={exportCSV}
          data-pr-tooltip="CSV"
        />
        <Button
          label="XLSX"
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          label="PDF"
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          rounded
          onClick={exportPDF}
          data-pr-tooltip="PDF"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className="mr-2"
            onClick={() => editClient(rowData)}
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => confirmDeleteClient(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilter(value);
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0 text-xl">Administrar Clientes</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter} onChange={onGlobalFilterChange}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
  const clientDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveUpdate} />
    </React.Fragment>
  );
  const deleteClientDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteClientDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeClient}
        />
      </div>
    </React.Fragment>
  );
  const deleteClientsDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteClientsDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeSelectedClients}
        />
      </div>
    </React.Fragment>
  );

  return (
    <div>
      {/** TABLA CLIENTES*/}

      <Navbar isNavbar={isNavbar} />
      <Table
        isClient={false}
        refToast={toast}
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
        refDT={dt}
        value={clients}
        selection={selectedClients}
        onSelectionChange={(e) => setSelectedClients(e.value)}
        dataKey="id"
        filters={filters} filterDisplay="menu" globalFilterFields={['nombres']}
        header={header}
        nombre_00="nombres"
        header_00="Nombre"
        nombre_01="dni"
        header_01="DNI"
        nombre_02="apellidoPaterno"
        header_02="ApellidoPAterno"
        nombre_03="apellidoMaterno"
        header_03="ApellidoMaterno"
        body={actionBodyTemplate}
      />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate
        width='30rem'
        isClient={true}
        visible={clientDialog}
        header={modalTitle}
        footer={clientDialogFooter}
        onHide={hideDialog}
        htmlFor_00="nombres"
        label_00="Nombre"
        id_00="nombres"
        value_00={client.nombres}
        onChange_00={(e) => onInputChange(e, "nombres")}
        className_00={classNames({
          "p-invalid": submitted && !client.nombres,
        })}
        msgRequired_00={
          submitted &&
          !client.nombres && (
            <small className="p-error">El nombre es obligatorio.</small>
          )
        }
        htmlFor_01="dni"
        label_01="DNI"
        id_01="dni"
        value_01={client.dni}
        onChange_01={(e) => onInputChange(e, "dni")}
        className_01={classNames({
          "p-invalid": submitted && !client.dni,
        })}
        msgRequired_01={
          submitted &&
          !client.dni && (
            <small className="p-error">La descripción es obligatorio.</small>
          )
        }

        htmlFor_02="apellidoPaterno"
        label_02="ApellidoPaterno"
        id_02="apellidoPaterno"
        value_02={client.apellidoPaterno}
        onChange_02={(e) => onInputChange(e, "apellidoPaterno")}
        className_02={classNames({
          "p-invalid": submitted && !client.apellidoPaterno,
        })}
        msgRequired_02={
          submitted &&
          !client.apellidoPaterno && (
            <small className="p-error">La descripción es obligatorio.</small>
          )
        }

        htmlFor_03="apellidoMaterno"
        label_03="ApellidoMaterno"
        id_03="apellidoMaterno"
        value_03={client.apellidoMaterno}
        onChange_03={(e) => onInputChange(e, "apellidoMaterno")}
        className_03={classNames({
          "p-invalid": submitted && !client.apellidoMaterno,
        })}ge
        msgRequired_03={
          submitted &&
          !client.apellidoMaterno && (
            <small className="p-error">La descripción es obligatorio.</small>
          )
        }
       
      />
      {/** Modal de ELIMINAR un CLIENTE */}
      <DialogDelete
        visible={deleteClientDialog}
        footer={deleteClientDialogFooter}
        onHide={hideDeleteClientDialog}
        msgDialogModal={
          client && (
            <span>
              ¿Estás seguro de que quieres eliminar <b>{client.nombres}</b>? No
              podrás revertir esto.
            </span>
          )
        }
      />
      {/** Modal de ELIMINAR varios CLIENTES */}
      <DialogDelete
        visible={deleteClientsDialog}
        footer={deleteClientsDialogFooter}
        onHide={hideDeleteClientsDialog}
        msgDialogModal={
          client && (
            <span>
              ¿Estás seguro de que desea eliminar los clientes seleccionados?
              No podrás revertir esto.
            </span>
          )
        }
      />
    </div>
  );
}
