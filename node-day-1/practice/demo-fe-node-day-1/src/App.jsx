// import { useEffect } from "react";
import "./App.css";

function App() {
  const handleCreateTask = () => {
    fetch("http://127.0.0.1:3000/api/task/1", {
      method: "PATCH",
      body: JSON.stringify({
        title: "danh nhau",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <button onClick={handleCreateTask}>Create task</button>
    </div>
  );
}

export default App;
