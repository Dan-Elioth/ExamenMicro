import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Exporta los datos a un archivo PDF
export const exportToPdf = (clients) => {
  const doc = new jsPDF();
  const columns = [
    { header: "Id", dataKey: "id" },
    { header: "Nombre", dataKey: "nombres" },
    { header: "DNI", dataKey: "dni" },
    { header: "ApellidoPaterno", dataKey: "apellidoPaterno" },
    { header: "ApellidoMaterno", dataKey: "apellidoMaterno" }
  ];
  const rows = clients.map((cliente) => ({
    id: cliente.id,
    nombres: cliente.nombres,
    dni: cliente.dni,
    apellidoPaterno: cliente.apellidoPaterno,
    apellidoMaterno: cliente.apellidoMaterno,
  }));

  doc.autoTable({
    columns: columns,
    body: rows,
    startY: 10,
  });
  doc.save("categories.pdf");
};

// Exporta los datos a un archivo Excel (XLSX)
export const exportToExcel = (clients) => {
  const worksheet = XLSX.utils.json_to_sheet(clients);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const cliente = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(cliente, 'clientes.xlsx');
};