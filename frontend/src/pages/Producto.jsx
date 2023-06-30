// import React, { useState, useEffect, useRef } from "react";

// // Importaciones de PrimeReact
// import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { classNames } from "primereact/utils";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import "jspdf-autotable";
// import Table from "../components/auth/Table";
// import { DialogCreateUpdate, DialogDelete } from "../components/auth/DialogCatalogo";
// import * as ProductoService from "../services/ProductoService";
// import { exportToExcel, exportToPdf } from "../export/ExportFilePro";
// import { getCategoryList } from "../services/CategoriaService";

// import Navbar from "../components/navbar";

// export default function Product() {
//   let dataProduct  = {
//     nombre: "",
//     detalle: "",
//     precio:"",
//     stock:"",
//     categoria: {
//     id: "",
//     },

//   };

//   const [isNavbar] = useState(true);

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [productDialog, setProductDialog] = useState(false);
//   const [deleteProductDialog, setDeleteProductDialog] = useState(false);
//   const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
//   const [product, setProduct] = useState(dataProduct);
//   const [selectedProducts, setSelectedProducts] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [filters, setFilters] = useState({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     nombre: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//   });

//   const [modalTitle, setModalTitle] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const toast = useRef(null);
//   const dt = useRef(null);

//   useEffect(() => {
//     getProducts();
//     getCategories();
//   }, []);

//   const getCategories = () => {
//     getCategoryList()
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const getProducts = () => {
//     ProductoService.getProductList()
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const saveUpdate = (event) => {
//     event.preventDefault();
//     setSubmitted(true);

//     if (product.nombre) {
//       if (product.id || isCreating === false) { 
//         const formData = new FormData();
//         let hasChanges = false;

//         // Verificar si hay cambios en la propiedad 'type'
//         const originalProduct = products.find(product.id);
//         if (product.nombre !== originalProduct?.nombre) {
//           formData.append("nombre", product.nombre);
//           hasChanges = true;
//         }
//         if (product.detalle !== originalProduct?.detalle) {
//           formData.append("detalle", product.detalle);
//           hasChanges = true;
//         }
//         if (product.precio !== originalProduct?.precio) {
//           formData.append("precio", product.precio);
//           hasChanges = true;
//         }
//         if (product.stock !== originalProduct?.stock) {
//           formData.append("stock", product.stock);
//           hasChanges = true;
//         }
        
//         // Verificar si hay cambios en la propiedad 'categoria'
//         const originalCategory = products.find(product.id);
//         if (product.categoria.id !== originalCategory?.categoria.id) {
//           formData.append("categoria", product.categoria.id);
//           hasChanges = true;
//         }

//         // Verificar si hay cambios en el archivo seleccionado

//         if (hasChanges) {
//           ProductoService.updateProduct(product.id, formData)
//             .then(() => {
//               getProducts();
//               getCategories();
//               setProductDialog(false);
//               toast.current.show({
//                 severity: "success",
//                 summary: "Éxito",
//                 detail: "Producto actualizado",
//                 life: 3000,
//               });
//             })
//             .catch((error) => {
//               console.error("Error al actualizar el producto:", error);
//             });
//         } else {
//           // No hay cambios, simplemente cierra el diálogo
//           setProductDialog(false);
//         }
//       } else {
//         const formData = new FormData();
//         formData.append("nombre", product.nombre);
//         formData.append("detalle", product.detalle);
//         formData.append("precio", product.precio);
//         formData.append("stock", product.stock);
//         formData.append("categoria", product.categoria.id);
        
//         ProductoService.createProduct(formData)
//           .then(() => {
//             getProducts();
//             getCategories();
//             setProductDialog(false);
//             toast.current.show({
//               severity: "success",
//               summary: "Éxito",
//               detail: "Producto creado",
//               life: 3000,
//             });
//           })
//           .catch((error) => {
//             console.error("Error al crear el producto:", error);
//           });
//       }
//     }
//   };

//   const removeProduct = () => {
//     setProducts((prevProducts) =>
//       prevProducts.filter((c) => c.id !== product.id)
//     );
//     ProductoService.deleteProduct(product.id)
//       .then(() => {
//         getProducts();
//         getCategories();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     setDeleteProductDialog(false);
//     toast.current.show({
//       severity: "success",
//       summary: "Successful",
//       detail: "Producto Eliminado",
//       life: 3000,
//     });
//   };


//    const removeSelectedProducts = () => {
//     const ids = selectedProducts.map((product) => product.id);
//     const isMultiple = selectedProducts.length > 1;

//     ProductoService.deleteSelectedProducts(ids)
//       .then(() => {
//         getProducts();
//         getCategories();
//         setProducts((prevProducts) =>
//           prevProducts.filter((p) => !ids.includes(p.id))
//         );
//         setSelectedProducts([]);
//         if (isMultiple) {
//           toast.current.show({
//             severity: "success",
//             summary: "Successful",
//             detail: "Productos Eliminados",
//             life: 3000,
//           });
//         } else {
//           toast.current.show({
//             severity: "success",
//             summary: "Successful",
//             detail: "Producto Eliminado",
//             life: 3000,
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error al eliminar los productos:", error);
//       });
//     setDeleteProductsDialog(false);
//     getProducts();
//   };

//   const openNew = () => {
//     setProduct(dataProduct);
//     setSubmitted(false);
//     setProductDialog(true);
//     setModalTitle("Crear Producto");
//     setIsCreating(true);
//   };

//   const editproduct = (product) => {
//     setProduct({
//       ...product,
//       id: product.id
//     });
//     setModalTitle("Editar Producto");
//     setIsCreating(false);
//     setProductDialog(true);
//   };

//   const confirmDeleteProduct = (product) => {
//     setProduct(product);
//     setDeleteProductDialog(true);
//   };

//   const hideDialog = () => {
//     setSubmitted(false);
//     setProductDialog(false);
//   };

//   const hideDeleteProductDialog = () => {
//     setDeleteProductDialog(false);
//   };

//   const hideDeleteProductsDialog = () => {
//     setDeleteProductsDialog(false);
//   };

//   const exportCSV = () => {
//     dt.current.exportCSV();
//   };


//   const exportExcel = () => {
//     exportToExcel(categories);
//   };

//   const exportPDF = () => {
//     exportToPdf(categories);
//   };


//   const confirmDeleteSelected = () => {
//     setDeleteProductsDialog(true);
//   };


//   // const onInputChange = (e, name) => {
//   //   const val = e.target.value || "";

//   //   let _product = {...product}

//   //   _product [`${name}`] = val;
//   //   setProduct(_product);
//   // };

//   const onInputChange = (e, name) => {
//     const val = e.target.value || "";
//     setProduct((dataProduct) => ({
//       ...dataProduct,
//       [name]: val,
//     }));
//   };



//   const leftToolbarTemplate = () => {
//     return (
//       <div className="flex flex-wrap gap-2">
//         <Button
//           label="Nuevo"
//           icon="pi pi-plus"
//           severity="success"
//           onClick={openNew}
//         />
//         <Button
//           label="Eliminar"
//           icon="pi pi-trash"
//           severity="danger"
//           onClick={confirmDeleteSelected}
//           disabled={!selectedProducts || !selectedProducts.length}
//         />
//       </div>
//     );
//   };


//   const rightToolbarTemplate = () => {
//     return (
//       <div className="flex align-items-center justify-content-end gap-2">
//         <Button
//           label="CSV"
//           type="button"
//           icon="pi pi-file"
//           rounded
//           onClick={exportCSV}
//           data-pr-tooltip="CSV"
//         />
//         <Button
//           label="XLSX"
//           type="button"
//           icon="pi pi-file-excel"
//           severity="success"
//           rounded
//           onClick={exportExcel}
//           data-pr-tooltip="XLS"
//         />
//         <Button
//           label="PDF"
//           type="button"
//           icon="pi pi-file-pdf"
//           severity="warning"
//           rounded
//           onClick={exportPDF}
//           data-pr-tooltip="PDF"
//         />
//       </div>
//     );
//   };

//   const actionBodyTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         <Button
//           icon="pi pi-pencil"
//           rounded
//           outlined
//           className="mr-2"
//           onClick={() => editproduct(rowData)}
//         />
//         <Button
//           icon="pi pi-trash"
//           rounded
//           outlined
//           severity="danger"
//           onClick={() => confirmDeleteProduct(rowData)}
//         />
//       </React.Fragment>
//     );
//   };


//   const onGlobalFilterChange = (e) => {
//     const value = e.target.value;
//     let _filters = { ...filters };

//     _filters["global"].value = value;

//     setFilters(_filters);
//     setGlobalFilter(value);
//   };

//   const header = (
//     <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
//       <h4 className="m-0 text-xl">Administrar Productos</h4>
//       <span className="p-input-icon-left">
//         <i className="pi pi-search" />
//         <InputText
//           type="search"
//           value={globalFilter}
//           onChange={onGlobalFilterChange}
//           placeholder="Buscar..."
//         />
//       </span>
//     </div>
//   );

//   const productDialogFooter = (
//     <React.Fragment>
//       <Button
//         label="Cancelar"
//         icon="pi pi-times"
//         outlined
//         onClick={hideDialog}
//       />
//       <Button label="Guardar" icon="pi pi-check" onClick={saveUpdate} />
//     </React.Fragment>
//   );

//    const deleteProductDialogFooter = (
//     <React.Fragment>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <Button
//           label="Cancelar"
//           icon="pi pi-times"
//           outlined
//           onClick={hideDeleteProductDialog}
//         />
//         <Button
//           label="Aceptar"
//           icon="pi pi-check"
//           severity="danger"
//           onClick={removeProduct}
//         />
//       </div>
//     </React.Fragment>
//   );


//    const deleteProductsDialogFooter = (
//     <React.Fragment>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <Button
//           label="Cancelar"
//           icon="pi pi-times"
//           outlined
//           onClick={hideDeleteProductsDialog}
//         />
//         <Button
//           label="Aceptar"
//           icon="pi pi-check"
//           severity="danger"
//           onClick={removeSelectedProducts}
//         />
//       </div>
//     </React.Fragment>
//   );


//   return (
//     <div>
//       {/** TABLA de la categoría */}

//       <Navbar isNavbar={isNavbar} />
//       <Table
//         isCategory={false}
//         refToast={toast}
//         left={leftToolbarTemplate}
//         right={rightToolbarTemplate}
//         refDT={dt}
//         value={products}
//         selection={selectedProducts}
//         onSelectionChange={(e) => setSelectedProducts(e.value)}
//         dataKey="id"
//         filters={filters}
//         filterDisplay="menu"
//         globalFilterFields={["nombre"]}
//         header={header}
//         nombre_00="nombre"
//         header_00="Nombre"
//         nombre_01="detalle"
//         header_01="Detalle"
//         nombre_02="precio"
//         header_02="Precio"
//         nombre_03="stock"
//         header_03="Stock"
//         nombre_04="categoria.nombre"
//         header_04="Categoria"
//         body={actionBodyTemplate}
//       />
//       {/** Modal de CREAR y ACTUALIZAR */}
//       <DialogCreateUpdate
      
//        width="40rem"
//        isCategory={false}
//        visible={productDialog}
//        header={modalTitle}
//        footer={productDialogFooter}
//        onHide={hideDialog}


//        htmlFor_00="nombre"
//        label_00="Nombre"
//        id_00="nombre"
//        value_00={product.nombre}
//        onChange_00={(e) => onInputChange(e, "nombre")}
//        className_00={classNames({ "p-invalid": submitted && !product.nombre })}
//        msgRequired_00={
//          submitted &&
//          !product.nombre && (
//            <small className="p-error">El nombre es obligatorio.</small>
//          )
//        }

//        htmlFor_01="detalle"
//         label_01="Detalle"
//         id_01="detalle"
//         value_01={product.detalle}
//         onChange_01={(e) => onInputChange(e, "detalle")}
//         className_01={classNames({
//           "p-invalid": submitted && !product.detalle,
//         })}
//         msgRequired_01={
//           submitted &&
//           !product.detalle && (
//             <small className="p-error">El detalle es obligatorio.</small>
//           )
//         }

//         htmlFor_02="precio"
//         label_02="Precio"
//         id_02="precio"
//         value_02={product.precio}
//         onChange_02={(e) => onInputChange(e, "precio")}
//         className_02={classNames({ "p-invalid": submitted && !product.precio })}
//         msgRequired_02={
//           submitted &&
//           !product.precio && (
//             <small className="p-error">El precio es obligatorio.</small>
//           )
//         }

//         htmlFor_03="stock"
//         label_03="Stock"
//         id_03="stock"
//         value_03={product.stock}
//         onChange_03={(e) => onInputChange(e, "stock")}
//         className_03={classNames({ "p-invalid": submitted && !product.stock })}
//         msgRequired_03={
//           submitted &&
//           !product.stock && (
//             <small className="p-error">El stock es obligatorio.</small>
//           )
//         }

//         label="Categoría"
//         value={product.categoria.id}
//         onChange={(event) =>
//           setProduct({
//             ...product,
//             categoria: {
//               id: event.target.value,
//             },
//           })
//         }
//         options={categories}
//         optionValue="id"
//         optionLabel="nombre"
//         placeholder="Selecciona una categoría"
//         classDrowp={classNames({
//           "p-invalid": submitted && !product.categoria.id,
//         })}
//         msgRequired={
//           submitted &&
//           !product.categoria.id && (
//             <small className="p-error">La categoria es obligatorio.</small>
//           )
//         }
       
//       />
//       {/** Modal de ELIMINAR una categoría */}
//       <DialogDelete
//          visible={deleteProductDialog}
//          footer={deleteProductDialogFooter}
//          onHide={hideDeleteProductDialog}
//          msgDialogModal={
//            product && (
//              <span>
//                ¿Estás seguro de que quieres eliminar <b>{product.nombre}</b>? No
//                podrás revertir esto.
//              </span>
//            )
//          }
//        />
//       {/** Modal de ELIMINAR varias categorys */}
//       <DialogDelete
//         visible={deleteProductsDialog}
//         footer={deleteProductsDialogFooter}
//         onHide={hideDeleteProductsDialog}
//         msgDialogModal={
//           product && (
//             <span>
//               ¿Estás seguro de que desea eliminar los productos seleccionados?
//               No podrás revertir esto.
//             </span>
//           )
//         }
//       />
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";

// Importaciones de PrimeReact
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../components/auth/Table";
import { DialogCreateUpdate, DialogDelete } from "../components/auth/DialogCatalogo";
import * as ProductoService from "../services/ProductoService";
import { exportToExcel, exportToPdf } from "../export/ExportFilePro";
import { getCategoryList } from "../services/CategoriaService";
import Navbar from "../components/navbar";

export default function Product() {
  let dataProduct = {
    nombre: "",
    precio: "",
    stock: "",
    detalle: "",
    categoria: {
      id: "",
    },

  };

  const [isNavbar] = useState(true);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(dataProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });
  const [modalTitle, setModalTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = () => {
    getCategoryList()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = () => {
    ProductoService.getProductList()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUpdate = () => {
    setSubmitted(true);

    if (product.nombre) {
      if (product.id || isCreating === false) {
        ProductoService.updateProduct(product)
          .then(() => {
            getProducts();
            setProductDialog(false);
            toast.current.show({
              severity: "success",
              summary: "Éxito",
              detail: "Producto actualizado",
              life: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al actualizar el producto:", error);
          });
      } else {
       ProductoService.createProduct(product)
          .then(() => {
            getProducts();
            setProductDialog(false);
            toast.current.show({
              severity: "success",
              summary: "Éxito",
              detail: "Producto creado",
              life: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al crear el producto", error);
            console.log("Error al crear el producto:", error);
          });
      }
    }
  };

  const removeProduct = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((c) => c.id !== product.id)
    );
    ProductoService.deleteProduct(product.id)
      .then(() => {
        getProducts();
        getCategories();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteProductDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Producto Eliminado",
      life: 3000,
    });
  };

  const removeSelectedProducts = () => {
    const ids = selectedProducts.map((product) => product.id);
    const isMultiple = selectedProducts.length > 1;

    ProductoService.deleteSelectedProducts(ids)
      .then(() => {
        getProducts();
        getCategories();
        setProducts((prevProducts) =>
          prevProducts.filter((p) => !ids.includes(p.id))
        );
        setSelectedProducts([]);
        if (isMultiple) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Productos Eliminados",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Producto Eliminado",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error al eliminar los productos:", error);
      });
    setDeleteProductsDialog(false);
    getProducts();
  };

  const openNew = () => {
    setProduct(dataProduct);
    setSubmitted(false);
    setProductDialog(true);
    setModalTitle("Crear Producto");
    setIsCreating(true);
  };

  const editproduct = (product) => {
    setProduct({
      ...product,
      id: product.id,
    });
  
    setModalTitle("Editar Producto");
    setIsCreating(false);
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportExcel = () => {
    exportToExcel(products);
  };

  const exportPDF = () => {
    exportToPdf(products);
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = e.target.value || "";
    setProduct((prevImage) => ({
      ...prevImage,
      [name]: val,
    }));
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
          disabled={!selectedProducts || !selectedProducts.length}
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
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editproduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilter(value);
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0 text-xl">Administrar Productos</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={onGlobalFilterChange}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
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
  const deleteProductDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteProductDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeProduct}
        />
      </div>
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteProductsDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeSelectedProducts}
        />
      </div>
    </React.Fragment>
  );



  return (
    <div>
      {/** TABLA de la categoría */}

      <Navbar isNavbar={isNavbar} />
      <Table
        isCategory={false}
        refToast={toast}
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
        refDT={dt}
        value={products}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={["nombre"]}
        header={header}
      
        nombre_00="nombre"
        header_00="Nombre"
        nombre_01="categoria.nombre"
        header_01="Categoria"
        nombre_02="precio"
        header_02="Precio"
        nombre_03="stock"
        header_03="Stock"
        nombre_04="detalle"
        header_04="Detalle"
        
        body={actionBodyTemplate}
      />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate
        width="45rem"
        isCategory={false}
        visible={productDialog}
        header={modalTitle}
        footer={productDialogFooter}
        onHide={hideDialog}
        htmlFor_00="nombre"
       label_00="Nombre"
       id_00="nombre"
       value_00={product.nombre}
       onChange_00={(e) => onInputChange(e, "nombre")}
       className_00={classNames({ "p-invalid": submitted && !product.nombre })}
       msgRequired_00={
         submitted &&
         !product.nombre && (
           <small className="p-error">El nombre es obligatorio.</small>
         )
       }

       htmlFor_01="detalle"
        label_01="Detalle"
        id_01="detalle"
        value_01={product.detalle}
        onChange_01={(e) => onInputChange(e, "detalle")}
        className_01={classNames({
          "p-invalid": submitted && !product.detalle,
        })}
        msgRequired_01={
          submitted &&
          !product.detalle && (
            <small className="p-error">El detalle es obligatorio.</small>
          )
        }

        htmlFor_02="precio"
        label_02="Precio"
        id_02="precio"
        value_02={product.precio}
        onChange_02={(e) => onInputChange(e, "precio")}
        className_02={classNames({ "p-invalid": submitted && !product.precio })}
        msgRequired_02={
          submitted &&
          !product.precio && (
            <small className="p-error">El precio es obligatorio.</small>
          )
        }

        htmlFor_03="stock"
        label_03="Stock"
        id_03="stock"
        value_03={product.stock}
        onChange_03={(e) => onInputChange(e, "stock")}
        className_03={classNames({ "p-invalid": submitted && !product.stock })}
        msgRequired_03={
          submitted &&
          !product.stock && (
            <small className="p-error">El stock es obligatorio.</small>
          )
        }

        label="Categoría"
        value={product.categoria.id}
        onChange={(event) =>
          setProduct({
            ...product,
            categoria: {
              id: event.target.value,
            },
          })
        }
        options={categories}
        optionValue="id"
        optionLabel="nombre"
        placeholder="Selecciona una categoría"
        classDrowp={classNames({
          "p-invalid": submitted && !product.categoria.id,
        })}
        msgRequired={
          submitted &&
          !product.categoria.id && (
            <small className="p-error">La categoria es obligatorio.</small>
          )
        }
       
      />
      {/** Modal de ELIMINAR una categoría */}
      <DialogDelete
        visible={deleteProductDialog}
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
        msgDialogModal={
          product && (
            <span>
              ¿Estás seguro de que quieres eliminar <b>{product.nombre}</b>? No
              podrás revertir esto.
            </span>
          )
        }
      />
      {/** Modal de ELIMINAR varias products */}
      <DialogDelete
        visible={deleteProductsDialog}
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
        msgDialogModal={
          product && (
            <span>
              ¿Estás seguro de que desea eliminar los productos seleccionados?
              No podrás revertir esto.
            </span>
          )
        }
      />
    </div>
  );
}