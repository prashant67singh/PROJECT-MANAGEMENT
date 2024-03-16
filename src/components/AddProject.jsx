import style from "./AddProject.module.css";
import { useRef } from "react";

const dateFormatter = function (dateTs) {
  const date = new Date(dateTs);
  return (
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
};
export default function AddProject({
  addProjectHandler,
  cancelProjectCreationHandler,
  displayErrorHandler,
}) {
  const titleRef = useRef();
  const dueRef = useRef();
  const descRef = useRef();
  const submitProject = function () {
    if (
      titleRef.current.value.trim() === "" ||
      descRef.current.value.trim() === "" ||
      dueRef.current.value.trim() === ""
    ) {
      displayErrorHandler();
      return;
    }
    const formattedDate = dateFormatter(dueRef.current.value);
    const projObj = {
      title: titleRef.current.value,
      description: descRef.current.value,
      dueDate: formattedDate,
      task: [],
    };
    addProjectHandler(projObj);
  };
  let timeNow = new Date();
  timeNow.setDate(timeNow.getDate() + 1);
  timeNow = timeNow.toISOString().split('T')[0];

  return (
    <form>
      <div className={style.formActions}>
        <button
          type="button"
          onClick={() => {
            cancelProjectCreationHandler();
          }}
        >
          Cancel
        </button>
        <button type="button" className={style.save} onClick={submitProject}>
          Save
        </button>
      </div>
      <div className={style.formControl}>
        <label>Project Title</label>
        <input ref={titleRef} type="text" />
      </div>
      <div className={style.formControl}>
        <label>Description</label>
        <textarea ref={descRef} name="" id="" cols="30" rows="3"></textarea>
      </div>
      <div className={style.formControl}>
        <label>Due Date</label>
        <input ref={dueRef} type="date" min={timeNow}/>
      </div>
    </form>
  );
}
