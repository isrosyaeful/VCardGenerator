import fs from "fs";
import puppeteer from "puppeteer";

export async function createVBackPNG(
  path,
  fullname,
  role,
  company,
  phone,
  email,
  website
) {
  let html = fs.readFileSync("./vcardBack.html", "utf8");
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   ignoreDefaultArgs: ['--enable-automation'],
  //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
  // });
  // // Disable Puppeteer logging
  // await browser._connection.send('Browser.setLoggingPreference', {
  //   enable: false,
  // });

  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 440,
    height: 660,
    deviceScaleFactor: 1,
  });
  const image = fs.readFileSync(path);
  const base64Image = new Buffer.from(image).toString("base64");
  const dataURI = "data:image/jpeg;base64," + base64Image;
  html = html.replace("{{imageSource}}", dataURI);
  html = html.replace("{FULLNAME}", fullname.toUpperCase());
  html = html.replace("{ROLE}", role);
  html = html.replace("{COMPANY}", company);
  html = html.replace("{PHONE}", phone);
  html = html.replace("{EMAIL}", email);
  html = html.replace("{WEBSITE}", website);

  await page.setContent(html);
  await page.screenshot({ path: "../vCard/" + fullname + "_vCardBack.png" });
  await browser.close();
}

export async function createVFrontPNG(nickName, fullname) {
  let html = fs.readFileSync("./vcardFront.html", "utf8");
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 440,
    height: 660,
    deviceScaleFactor: 1,
  });
  const image = fs.readFileSync("./CARD-LOGO.png");
  const base64Image = new Buffer.from(image).toString("base64");
  const dataURI = "data:image/jpeg;base64," + base64Image;
  html = html.replace("{{imageSource}}", dataURI);
  html = html.replace("{NAME}", nickName);

  await page.setContent(html);
  await page.screenshot({ path: "../vCard/" + fullname + "_vCardFront.png" });
  await browser.close();
}
