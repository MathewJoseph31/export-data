import logo from "./images/logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import * as xlsx from "xlsx";
//import MyDocument from "./MyDocument";

function App() {
  const [dataArr, setDataArr] = useState([]);
  const [strCsv, setStrCsv] = useState("");

  useEffect(() => {
    fetch(`http://ischools-react.herokuapp.com/api/getUsers`, {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arrObj = [];
        arrObj = data.map((record) => {
          let str = Object.values(record).join('","');
          return '"' + str + '"';
        });
        console.log(arrObj);
        setDataArr(data);
        setStrCsv(arrObj.join("\n"));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const exportCsvClick = (e) => {
    let csv_file = new Blob([strCsv], { type: "text/csv" });

    fileDownload("export.csv", csv_file);
  };

  const exportXlsxClick = (e) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const ws = xlsx.utils.json_to_sheet(dataArr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "array" });
    const excel_file = new Blob([excelBuffer], { type: fileType });
    fileDownload("export.xlsx", excel_file);
  };

  const exportPdfClick = (e) => {
    console.log("hi");
  };

  const fileDownload = (fileName, file) => {
    let download_link = document.createElement("a");

    download_link.download = fileName;

    download_link.href = window.URL.createObjectURL(file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  };

  return (
    <div>
      <br />
      <div style={{ display: "flex" }}>
        <button
          title="Export to csv"
          className="btnExportCsv"
          onClick={exportCsvClick}
        ></button>
        <button
          title="Export to Xlsx"
          className="btnExportXlsx"
          onClick={exportXlsxClick}
        ></button>
        <button
          title="Export to Pdf"
          className="btnExportPdf"
          onClick={exportPdfClick}
        >
          Export to Pdf
        </button>
      </div>
      <br />
      <br />
      <textarea
        style={{ width: "700px", height: "400px" }}
        value={strCsv}
        onChange={(e) => {}}
      />
    </div>
  );
}

export default App;
