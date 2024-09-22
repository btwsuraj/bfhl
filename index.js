const express = require("express");
const app = express();
const fileType = require('file-type');
const multer = require('multer');
const mime = require('mime-types');

app.use(express.json());

app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post(async (req, res) => {
    const data = req.body.data || [];
    const file_b64 = req.body.file_b64 || null;
    
    const numbers = [];
    const alphabets = [];
    let highest_lowercase_alphabet = "";

    
    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (item >= 'a' && item <= 'z') {
          if (
            !highest_lowercase_alphabet ||
            item > highest_lowercase_alphabet
          ) {
            highest_lowercase_alphabet = item;
          }
        }
      }
    }

    let file_valid = false;
    let mime_type = null;
    let file_size_kb = null;

    if (file_b64) {
      try {
        const buffer = Buffer.from(file_b64, 'base64');
        const fileInfo = await fileType.fromBuffer(buffer);
        file_valid = !!fileInfo; 
        mime_type = fileInfo ? fileInfo.mime : 'unknown';
        file_size_kb = (buffer.length / 1024).toFixed(2);
      } catch (error) {
        file_valid = false;
        mime_type = 'unknown';
        file_size_kb = 'unknown';
      }
    }

    res.json({
      is_success: true,
      user_id: "suraj_jha_22012003",
      email: "sp4247@srmist.edu.in",
      roll_number: "RA2111026020028",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
      file_valid: file_valid,
      file_mime_type: mime_type,
      file_size_kb: file_size_kb,
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
