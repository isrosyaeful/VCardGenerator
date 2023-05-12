//import module
import QRCode from './QRCode.js';
import XLSX from 'xlsx';
import CropImages from './CropImages.js';
import { createVBackPNG, createVFrontPNG } from "./screnshoot.js";

export default function GenerateVCard() {
  

  // Generate QR Code using vCard format
  const GenerateQRContent = async (data) => {
    
    const QR = new QRCode();
    const qrText =
      `BEGIN:VCARD\nVERSION:3.0\nN:**LAST_NAME**;**FIRST_NAME**\n` +
      `FN:**FIRST_NAME** **LAST_NAME**\nORG:**COMPANY_NAME**\nTITLE:**JOB**\n` +
      `ADR:;;**STREET_ADDR**;**CITY_ADDR**;**STATE_ADDR**;**ZIP_ADDR**;**COUNTRY_ADDR**\n` +
      `TEL;WORK;VOICE:**PHONE_CONTACT**\nTEL;CELL:**MOBILE_CONTACT**\n` +
      `TEL;FAX:**FAX_CONTACT**\nEMAIL;WORK;INTERNET:**EMAIL**\nURL:**WEBSITE**\nEND:VCARD`;

    for (let i = 0 + 1; i < data.length; i++) {
      let text = qrText;
      text = text.replace(/\*\*FIRST_NAME\*\*/g, data[i][0]);
      text = text.replace(/\*\*LAST_NAME\*\*/g, data[i][1] ? data[i][1] : "");
      text = text.replace(/\*\*COMPANY_NAME\*\*/g, data[i][3]);
      text = text.replace(/\*\*JOB\*\*/g, data[i][4]);
      text = text.replace(/\*\*STREET_ADDR\*\*/g, data[i][9]);
      text = text.replace(/\*\*CITY_ADDR\*\*/g, data[i][11]);
      text = text.replace(/\*\*STATE_ADDR\*\*/g, "");
      text = text.replace(/\*\*ZIP_ADDR\*\*/g, data[i][10]);
      text = text.replace(/\*\*COUNTRY_ADDR\*\*/g, data[i][12]);
      text = text.replace(/\*\*PHONE_CONTACT\*\*/g, data[i][7]);
      text = text.replace(/\*\*MOBILE_CONTACT\*\*/g, data[i][6]);
      text = text.replace(/\*\*FAX_CONTACT\*\*/g, "");
      text = text.replace(/\*\*EMAIL\*\*/g, data[i][5] ? data[i][5] : "");
      text = text.replace(/\*\*WEBSITE\*\*/g, data[i][8]);

      let filename = "qrc_" + data[i][0] + (data[i][1] ? " " + data[i][1] : "");
      filename = filename.split(" ").join("_");

      if (text.includes("undefined")) {
        console.log("\nundefined detected in the qr code content");
        console.log(filename);
        console.log(text + "\n");
        break;
      } else {
        QR.createQR(text, filename);

        console.log(filename);
        // console.log(text+"\n");
      }
    }
  };

  const GenerateVCardImage = async (data) => {
    for (let i = 0 + 1; i < data.length; i++) {
      // console.log(data[i]);
      let filename = "qrc_" + data[i][0] + (data[i][1] ? " " + data[i][1] : "");
      //   filename.replace(/ /g, "_");
      filename = filename.split(" ").join("_");
      const imagePath = "../qrcode_cropped/" + filename + ".png";
      //  createVBackPNG(image)
      await createVFrontPNG(
        data[i][2].toUpperCase(),
        data[i][0] + (data[i][1] ? " " + data[i][1] : "")
      );
      await createVBackPNG(
        imagePath,
        data[i][0] + (data[i][1] ? " " + data[i][1] : ""),
        data[i][4],
        data[i][3],
        data[i][7],
        data[i][5],
        data[i][8]
      );
      console.log("vCard generated - "+filename);
    }
  };

  const main = async () => {
    //initialize
    const QR = new QRCode();
    const masterDataDir = "../data/master_data2.xlsx";

    // Load the Excel file
    const workbook = XLSX.readFile(masterDataDir);

    // Assuming the data is in the first sheet of the workbook
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Parse the worksheet data into an array of objects
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(data.length);
    
    await GenerateQRContent(data);

    // // delay for qr code to be generated
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    await CropImages();

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    await GenerateVCardImage(data);
  };
  main();
}
