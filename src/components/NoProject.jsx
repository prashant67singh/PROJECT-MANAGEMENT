import noproject from '../assets/no-projects.png';
import styles from './NoProject.module.css';
export default function NoProject({addProjectBtnHandler}){
    return (<section className={styles.noProject}>
        <img src={noproject}alt="No-Project"></img>
        <h1>No Project Selected</h1>
        <p>Select a project or get started with a new one</p>
        <button onClick={addProjectBtnHandler}>Create new project</button>
    </section>)
}