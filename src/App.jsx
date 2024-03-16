import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ProjectDetails from "./components/ProjectDetails";
import AddProject from "./components/AddProject";
import ErrorModal from "./components/ErrorModal";

const projectObj = [
  // {
  //   title: "Learn Node",
  //   dueDate: "Dec 29, 2024",
  //   description: "Learn Node from basics",
  //   task: ["Learn the basics"],
  // },
  // {
  //   title: "Learn React",
  //   dueDate: "Dec 29, 2024",
  //   description: "Learn React from basics",
  //   task: ["Learn the basics of react", "Solve problem"],
  // },
];
function App() {
  const [projects, setProjects] = useState(projectObj);
  const [addClicked, setAddbtn] = useState(false);
  const [projectSelected, setProjectSelected] = useState(null);
  const errorModalRef = useRef();

  const addProjectBtnHandler = function () {
    setAddbtn(true);
  };

  const selectProjectHandler = function (projTitle) {
    const selectedProj = projects.filter((project) => {
      return project.title === projTitle;
    });
    setProjectSelected(...selectedProj);
    setAddbtn(false);
  };

  const addProjectHandler = function (obj) {
    setProjects((prevValue) => [...prevValue, obj]);
    selectProjectHandler(obj.title);
  };

  const cancelProjectCreationHandler = () => {
    setAddbtn(false);
    setProjectSelected(null);
  };

  const updateProjectDetailsHandler = (updateProject) => {
    const index = projectObj.findIndex((project) => {
      return project.title === updateProject.title;
    });
    setProjects((prevValue) => {
      prevValue[index] = updateProject;
      return [...prevValue];
    });
    setProjectSelected(updateProject);
  };

  const deleteProjectHandler = (projTitle) => {
    let index = projects.findIndex((proj) => {
      return proj.title === projTitle;
    });
    projects.splice(index, 1);
    setProjects((prevValue) => {
      return [...projects];
    });
    setProjectSelected(null);
  };

  const displayErrorHandler = () => {
    errorModalRef.current.openErrorModal();
  };
  return (
    <>
      <main className="main-container">
        <Sidebar
          projects={projects}
          addProjectBtnHandler={addProjectBtnHandler}
          selectProjectHandler={selectProjectHandler}
        ></Sidebar>
        {!addClicked && (
          <ProjectDetails
            updateProjectDetailsHandler={updateProjectDetailsHandler}
            addProjectBtnHandler={addProjectBtnHandler}
            projectSelected={projectSelected}
            deleteProjectHandler={deleteProjectHandler}
            displayErrorHandler={displayErrorHandler}
          ></ProjectDetails>
        )}
        {addClicked && (
          <AddProject
            addProjectHandler={addProjectHandler}
            cancelProjectCreationHandler={cancelProjectCreationHandler}
            displayErrorHandler={displayErrorHandler}
          />
        )}
      </main>
      <ErrorModal ref={errorModalRef} />
    </>
  );
}

export default App;
