import { createServer } from "node:http";
import { readDB, writeDB } from "./utils/jsonDB.js";

let db = {};

readDB().then((data) => {
  db = JSON.parse(data);
});

const allowOrigins = ["http://localhost:5173", " http://localhost:5174"];

function serverResponse(req, res, data) {
  const allowOrigin = allowOrigins.find((_origin) => {
    return _origin.toLowerCase() === req.headers.origin?.toLowerCase();
  });

  const header = {
    "Content-Type": "application/json",
  };

  if (allowOrigin) {
    header["Access-Control-Allow-Origin"] = allowOrigin;
  }

  res.writeHead(data.status, header);
  res.end(JSON.stringify(data));
}

const server = createServer((req, res) => {
  if (req.url.includes("chrome.devtools.json")) {
    return res.end("OK");
  }

  let response = {
    status: 200,
  };

  console.log(req.method, req.url);

  if (req.method === "OPTIONS") {
    const allowOrigin = allowOrigins.find((_origin) => {
      return _origin.toLowerCase() === req.headers.origin?.toLowerCase();
    });

    const header = {
      "Content-Type": "application/json",
    };

    if (allowOrigin) {
      header["Access-Control-Allow-Origin"] = allowOrigin;
      header["Access-Control-Allow-Methods"] = "PUT,PATCH,DELETE";
    }

    res.writeHead(200, header);
    res.end();
    return;
  }

  try {
    //@GET: /api/tasks
    //@desc: get all tasks
    if (req.url === "/api/tasks" && req.method === "GET") {
      response.data = db.tasks;
      response.message = "Success";
      serverResponse(req, res, response);
      return;
    }

    //@GET: /api/task/:id
    //@desc: get task by id
    if (req.url.startsWith("/api/task/") && req.method === "GET") {
      const id = +req.url.split("/").pop();
      const task = db.tasks.find((_task) => _task.id === id);

      if (task) {
        response.data = task;
        response.message = "Success";
      } else {
        response.status = 404;
        response.message = "Resource not found!";
      }
      serverResponse(req, res, response);
      return;
    }

    //@POST: /api/task
    //@desc: create new task
    if (req.url === "/api/task" && req.method === "POST") {
      let body = "";
      req.on("data", (buffer) => {
        body += buffer.toString();
      });
      req.on("end", () => {
        const payload = JSON.parse(body);
        const newTask = {
          id: db.maxId + 1,
          title: payload.title,
          isCompleted: false,
        };
        db.tasks.push(newTask);
        db.maxId = db.maxId + 1;
        console.log(db);

        writeDB(db);
        response.status = 201;
        response.data = newTask;

        serverResponse(req, res, response);
      });
      return;
    }

    // @patch: /api/task/:id
    if (req.url.startsWith("/api/task/") && req.method === "PATCH") {
      const id = +req.url.split("/").pop();
      const index = db.tasks.findIndex((_task) => _task.id === id);

      if (index !== -1) {
        let body = "";
        req.on("data", (buffer) => {
          body += buffer.toString();
        });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            const task = db.tasks[index];

            const updatedTask = {
              ...task,
              title: payload.title !== undefined ? payload.title : task.title,
              isCompleted:
                payload.isCompleted !== undefined
                  ? payload.isCompleted
                  : task.isCompleted,
            };

            db.tasks[index] = updatedTask; 

            writeDB(db);
            response.status = 200;
            response.data = updatedTask;
            serverResponse(req, res, response);
          } catch (e) {
            serverResponse(req, res, { status: 400, message: "Invalid JSON" });
          }
        });
      } else {
        serverResponse(req, res, { status: 404, message: "Task not found" });
      }
      return;
    }

    // @delete: /api/task/:id
    if (req.url.startsWith("/api/task/") && req.method === "DELETE") {
      const id = +req.url.split("/").pop();
      const index = db.tasks.findIndex((_task) => _task.id === id);

      if (index !== -1) {
        const deletedTask = db.tasks.splice(index, 1);
        response.status = 200;
        response.data = deletedTask[0];
        writeDB(db);
        serverResponse(req, res, response);
      } else {
        serverResponse(req, res, { status: 404, message: "Task not found" });
      }
      return;
    }
  } catch (e) {
    console.log(e);
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
