export default function Sidebar({projects, addProjectBtnHandler, selectProjectHandler}) {
  return (
    <section className="sidebar">
      <h1>Your Projects</h1>
      <button onClick={addProjectBtnHandler}> + Add Project</button>
      <div>
        <ul>
          {projects.map(project => {
            return <li key={project.title}><button type="button" onClick={()=> selectProjectHandler(project.title)}>{project.title}</button></li>
          })}
        </ul>
      </div>
    </section>
  );
}
