import "./App.css";

function App() {
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  return (
    <>
      <h1>this is demo for jwt token</h1>
      <p>{token}</p>
    </>
  );
}

export default App;
