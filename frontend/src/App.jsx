import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthLayout, ProtectedRouteLayout } from "./layouts";

import { AuthProvider, ProjectsProvider } from "./context";

import {
  Login,
  Signup,
  ForgotPassword,
  NewPassword,
  ConfirmAccount,
} from "./pages/public";

import {
  Home,
  Projects,
  NewProject,
  Project,
  EditProject,
  MyTasks,
  NewCollaborator,
} from "./pages/private";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedRouteLayout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/create-project" element={<NewProject />} />
              <Route path="projects/:id" element={<Project />} />
              <Route path="projects/edit/:id" element={<EditProject />} />
              <Route
                path="projects/new-collaborator/:id"
                element={<NewCollaborator />}
              />
              <Route path="tasks" element={<MyTasks />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
