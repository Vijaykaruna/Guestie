import Button from "react-bootstrap/Button";
import { Modal as TableModal } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const TABLE_CONFIG = {
  food: [
    { key: "title", label: "Name" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
  ],

  order: [
    { key: "title", label: "Name" },
    { key: "date", label: "Date" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
    { key: "amount", label: "Amount" },
  ],
  plan: [
    { key: "planDetails", label: "Plan" },
    { key: "activeDate", label: "Activate Plan Date" },
    { key: "deActiveDate", label: "De Activate Plan Date" },
  ],
};

function ModalTable({ title, content = [], type, onClose }) {
  const columns = TABLE_CONFIG[type];

  return (
    <TableModal size="lg" centered show onHide={onClose}>
      <TableModal.Header closeButton>
        <TableModal.Title>{title}</TableModal.Title>
      </TableModal.Header>

      <TableModal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {content.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "price" || col.key === "amount"
                      ? `Rs.${item[col.key]}`
                      : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableModal.Body>

      <TableModal.Footer>
        <Button onClick={onClose}>Close</Button>
      </TableModal.Footer>
    </TableModal>
  );
}

export default ModalTable;

// import { useModalTable } from "../../hooks/useModalTable.js";
// import ModalTable from "../../components/layout/ModalTable.jsx";

// const { modal, openModal, onClose } = useModalTable();

// onClick={() => { openModal("Food Details", foodList, "food"); }}

// {modal && (
//   <ModalTable
//     title={modal.title}
//     content={modal.content}
//     type={modal.type}
//     onClose={onClose}
//   />
// )}
