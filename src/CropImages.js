import fs from "fs";
import Jimp from "jimp";

export default async function CropImages(){

  const inputDirectory = '../qrcode_raw'; // Replace with the path to your image directory
  const outputDirectory = '../qrcode_cropped'; // Replace with the path to the output directory
  
  fs.readdir(inputDirectory, async (err, files) => {
    
    const margin=5;
  
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
  
    for (const file of files) {
      try {
        const imagePath = `${inputDirectory}/${file}`;
        const image = await Jimp.read(imagePath);
  
        // Remove white background
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
          if (this.bitmap.data[idx] === 255 && this.bitmap.data[idx + 1] === 255 && this.bitmap.data[idx + 2] === 255) {
            this.bitmap.data[idx + 3] = 0; // Set alpha channel to 0 (transparent)
          }
        });
  
        // Auto-crop to remove transparent edges
        image.autocrop();
  
        // Add 30-pixel white margin
        const newWidth = image.bitmap.width + 2*margin; // Add 30 pixels on each side
        const newHeight = image.bitmap.height + 2*margin; // Add 30 pixels on each side
        const newImage = new Jimp(newWidth, newHeight, 0xFFFFFFFF); // White background
        newImage.composite(image, margin, margin); // Composite original image onto the new image with margins
  
        // Resize the image to 200x200 pixels
        // newImage.resize(200, 200, Jimp.RESIZE_LANCZOS3);
  
        const outputPath = `${outputDirectory}/${file}`;
        await newImage.writeAsync(outputPath);
  
        console.log(`Processed ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  });
}
