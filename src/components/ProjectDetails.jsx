import { useRef } from "react";
import NoProject from "./NoProject";
import style from "./ProjectDetails.module.css";

export default function ProjectDetails({
  updateProjectDetailsHandler,
  addProjectBtnHandler,
  projectSelected,
  deleteProjectHandler,
  displayErrorHandler
}) {
  let renderedProject = (
    <NoProject addProjectBtnHandler={addProjectBtnHandler} />
  );

  const inputRef = useRef();
  const addTaskHandler = function () {
    if (inputRef.current.value === "") {
      displayErrorHandler();
      return;
    }
    projectSelected.task.push(inputRef.current.value);
    updateProjectDetailsHandler(projectSelected);
    inputRef.current.value = "";
  };

  const onClearTaskHandler = function (task) {
    const taskIndex = projectSelected.task.indexOf(task);
    projectSelected.task.splice(taskIndex, 1);
    updateProjectDetailsHandler(projectSelected);
  };

  const deleteProject = () => {
    deleteProjectHandler(projectSelected.title);
  };

  if (projectSelected != null && projectSelected != undefined) {
    renderedProject = (
      <section className={style.detailsContainer}>
        <header className="gridItem">
          <div className={style.titleCcontainer}>
            <h1>{projectSelected.title}</h1>
            <button onClick={deleteProject}>Delete</button>
          </div>
        </header>
        <article className="gridItem">
          <div className={style.desContainer}>
            <p className={style.dateStyle}>{projectSelected.dueDate}</p>
            <p>{projectSelected.description}</p>
          </div>
        </article>
        <hr />
        <main id="detailsItems" className="gridItem">
          <div className={style.projectTasks}>
            <h2>Tasks</h2>
            <input type="text" name="" id="" ref={inputRef} />
            <button onClick={addTaskHandler}>Add Task</button>
            {projectSelected.task.length === 0 ? (
              <p>This project does not have any tasks yet.</p>
            ) : (
              <ul className={style.taskContainer}>
                {projectSelected.task.map((task, index) => {
                  return (
                    <li key={index}>
                      <span>{task}</span>
                      <button
                        onClick={() => {
                          onClearTaskHandler(task);
                        }}
                      >
                        Clear
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </main>
      </section>
    );
  }

  return <>{renderedProject}</>;
}
