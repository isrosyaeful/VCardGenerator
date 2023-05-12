export default class QRCode {
    async createQR(text, filename) {
      const { default: fetch } = await import("node-fetch");
      const { default: fs } = await import("fs");
      const response = await fetch("https://chart.googleapis.com/chart", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          cht: "qr",
          chl: text,
          chs: "300x300",
          chco: "00718F",
          chld: "L|0",
        }),
      });
  
      const arrayBuffer = await response.arrayBuffer();
      fs.writeFileSync(
        "../qrcode_raw/" + filename + ".png",
        Buffer.from(arrayBuffer)
      );
    }
  }