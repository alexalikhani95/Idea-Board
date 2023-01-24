import "./App.css";
import Form from "./components/Form";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";
import IdeaProvider from "./context/IdeaContext";



const App = () => {
  return (
    <IdeaProvider>
      <div className="App">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Form isAddForm={true}/>
          <Ideas />
        </div>
      </div>
    </IdeaProvider>
  );
}

export default App;
