import "./App.css";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";
import IdeaProvider from "./context/IdeaContext";



const App = () => {
  return (
    <IdeaProvider>
      <div className="App">
        <div className="idea-board-container">
          <IdeaForm />
          <Ideas />
        </div>
      </div>
    </IdeaProvider>
  );
}

export default App;
