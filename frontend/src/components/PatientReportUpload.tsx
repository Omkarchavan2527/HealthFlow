import React, { useState } from "react";
import { Download, Trash2, Upload, PlusCircle } from "lucide-react";

type Report = {
  id: number;
  name: string;
  url: string;
  type: string;
};

export default function PatientReportUpload() {
  const [reports, setReports] = useState<Report[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newReports: Report[] = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setReports((prev) => [...prev, ...newReports]);
  };

  const handleDelete = (id: number) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Reports</h1>

      {/* Upload Button */}
      <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl cursor-pointer w-fit hover:bg-blue-700">
        <Upload size={18} /> Upload Report
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12 text-gray-500 gap-3">
          <PlusCircle size={48} />
          <p className="text-lg font-medium">No reports found</p>
          <p className="text-sm">Click 'Upload Report' to add your reports</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-2xl shadow-sm p-4 bg-white flex flex-col items-center gap-3"
            >
              {report.type.includes("image") ? (
                <img
                  src={report.url}
                  alt={report.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600">
                  PDF File
                </div>
              )}

              <p className="text-sm font-medium truncate w-full text-center">
                {report.name}
              </p>

              <div className="flex gap-3">
                {/* Download */}
                <a
                  href={report.url}
                  download={report.name}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                >
                  <Download size={16} /> Download
                </a>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(report.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
