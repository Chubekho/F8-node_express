const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

async function backupDB() {
  const backupDir = path.join(__dirname, "../../../../backupDB");
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  const fileName = `backup_${new Date().toISOString().replace(/[:.]/g, "-")}.sql`;
  const filePath = path.join(backupDir, fileName);
  const outputStream = fs.createWriteStream(filePath);

  // Tham số cho Docker exec
  const args = [
    "exec", "mysql-8.0", "mysqldump",
    `-u${process.env.DB_USER}`,
    `-p${process.env.DB_PWD}`,
    process.env.DB_NAME
  ];

  const mysqldump = spawn("docker", args);

  // Pipe trực tiếp dữ liệu từ Docker vào file
  mysqldump.stdout.pipe(outputStream);

  mysqldump.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  mysqldump.on("close", (code) => {
    if (code === 0) {
      console.log(`[${new Date().toLocaleString()}] Backup thành công: ${fileName}`);
    } else {
      console.error(`Backup thất bại với mã lỗi: ${code}`);
      fs.unlinkSync(filePath); // Xoá file lỗi nếu backup fail
    }
  });
}


module.exports = backupDB;