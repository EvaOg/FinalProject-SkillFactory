import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Main from "./components/main/Main";
import MainLayout from "./components/MainLayout";
import TableReports from "./components/forUsers/TableReports";
import ReportDetails from "./components/forUsers/ReportDetails";
import TableOfficers from "./components/forUsers/TableOfficers";
import OfficerDetails from "./components/forUsers/OfficerDetails";
import "./App.css";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {" "}
              <Route index element={<Main />} />
              <Route path="/allreports" element={<TableReports />} />
              <Route path="/allofficers" element={<TableOfficers />} />
              <Route path="/allreports/:id" element={<ReportDetails />} />
              <Route path="/allofficers/:id" element={<OfficerDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
