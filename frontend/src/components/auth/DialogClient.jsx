import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";



export const DialogCreateUpdate = (props) => {
  const {
    width,
   
    visible,
    header,
    footer,
    onHide,
  
    htmlFor_00,
    label_00,
    id_00,
    value_00,
    onChange_00,
    className_00,
    msgRequired_00,
    htmlFor_01,
    label_01,
    id_01,
    value_01,
    onChange_01,
    className_01,
    msgRequired_01,
    htmlFor_02,
    label_02,
    id_02,
    value_02,
    onChange_02,
    className_02,
    msgRequired_02,
    htmlFor_03,
    label_03,
    id_03,
    value_03,
    onChange_03,
    className_03,
   
    msgRequired_04,

    isCategory,
    
  } = props;



  return (

    
    <Dialog
      visible={visible}
      style={{ width: width }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={header}
      modal
      className="p-fluid"
      footer={footer}
      onHide={onHide}
    >
      {!isCategory && (
        <>
           <>
           <div className="field">
            <label htmlFor={htmlFor_00} className="font-bold">
              {label_00}
            </label>
            <InputText
              id={id_00}
              value={value_00}
              onChange={onChange_00}
              required
              autoFocus
              className={className_00}
            />
            {msgRequired_00}
          </div>
          <div className="field">
            <label htmlFor={htmlFor_01} className="font-bold">
              {label_01}
            </label>
            <InputText
              id={id_01}
              value={value_01}
              onChange={onChange_01}
              required
              className={className_01}
            />
            {msgRequired_01}
          </div>
          <div className="field">
            <label htmlFor={htmlFor_02} className="font-bold">
              {label_02}
            </label>
            <InputText
              id={id_02}
              value={value_02}
              onChange={onChange_02}
              required
              className={className_02}
            />
            {msgRequired_02}
          </div>
          <div className="field">
            <label htmlFor={htmlFor_03} className="font-bold">
              {label_03}
            </label>
            <InputText
              id={id_03}
              value={value_03}
              onChange={onChange_03}
              required
              className={className_03}
            />
            {msgRequired_04}
          </div>
          
        </>
          
        </>
      )}
     
    </Dialog>
  );
};

export const DialogDelete = (props) => {
  // eslint-disable-next-line react/prop-types
  const { visible, footer, onHide, msgDialogModal } = props;
  return (
    <Dialog
      visible={visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={
        <div style={{ display: "flex", alignItems: "center" }}>
          Confirmar acción
        </div>
      }
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="confirmation-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <i
            className="pi pi-exclamation-triangle mb-3"
            style={{ fontSize: "4rem" }}
          />
          {msgDialogModal}
        </div>
      </div>
    </Dialog>
  );
};
