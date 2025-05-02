import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { Dashboard } from "./components/Dashboard";

const theme = createTheme({
  primaryColor: "blue",
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="App">
        <Dashboard />
      </div>
    </MantineProvider>
  );
}

export default App;
