import React from "react";

const medicines = [
  { name: "Paracetamol", use: "Pain relief, fever reduction" },
  { name: "Ibuprofen", use: "Pain relief, inflammation reduction" },
  { name: "Amoxicillin", use: "Bacterial infections" },
  { name: "Cetirizine", use: "Allergy relief" },
  { name: "Metformin", use: "Blood sugar control in type 2 diabetes" },
  { name: "Omeprazole", use: "Acid reflux and heartburn" },
  { name: "Aspirin", use: "Pain relief, blood thinner" },
  { name: "Azithromycin", use: "Bacterial infections" },
  { name: "Loratadine", use: "Allergy relief" },
  { name: "Ranitidine", use: "Acid reflux and ulcers" },
  { name: "Salbutamol", use: "Asthma and breathing difficulties" },
  { name: "Prednisone", use: "Inflammation and immune suppression" },
  { name: "Hydrochlorothiazide", use: "High blood pressure" },
  { name: "Atorvastatin", use: "Cholesterol control" },
  { name: "Levothyroxine", use: "Thyroid hormone replacement" },
  { name: "Fluoxetine", use: "Depression and anxiety" },
  { name: "Tramadol", use: "Moderate to severe pain" },
  { name: "Clindamycin", use: "Bacterial infections" },
  { name: "Insulin", use: "Blood sugar control in diabetes" },
  { name: "Diclofenac", use: "Pain and inflammation" },
];

const MedicineList = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Medicine Cabinet</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #333", padding: "8px" }}>
              Medicine
            </th>
            <th style={{ borderBottom: "2px solid #333", padding: "8px" }}>
              Use
            </th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                {medicine.name}
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                {medicine.use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineList;
