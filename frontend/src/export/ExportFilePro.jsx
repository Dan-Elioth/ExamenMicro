import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Exporta los datos a un archivo PDF
export const exportToPdf = (products) => {
  const doc = new jsPDF();
  const columns = [
    { header: "Id", dataKey: "id" },
    { header: "Nombre", dataKey: "nombre" },
    { header: "Detalle", dataKey: "detalle" },
    { header: "Precio", dataKey: "precio" },
    { header: "Stock", dataKey: "stock" },
    { header: "Categoría", dataKey: "categoria" },
  
 
 

  ];
  const rows = products.map((product) => ({
    id: product.id,
    nombre: product.nombre,
    detalle: product.detalle,
    precio: product.precio,
    stock: product.stock,
    categoria: product.categoria.nombre,
    
  }));

  doc.autoTable({
    columns: columns,
    body: rows,
    startY: 10,
  });
  doc.save("products.pdf");
};

// Exporta los datos a un archivo Excel (XLSX)
export const exportToExcel = (products) => {
  const excelData = products.map((product) => ({
    id: product.id,
    nombre: product.nombre,
    categoria: product.categoria.nombre,
    estado: product.estado,
    precio: product.precio,
    stock: product.stock,
    detalle: product.detalle,
    material: product.material,
    largo: product.largo,
    ancho: product.ancho,
    alto: product.alto,
    imagen: product.imagen,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const product = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(product, "products.xlsx");
};