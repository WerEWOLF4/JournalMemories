import Button from "../Button/Button";
import styles from "./JornalForm.module.css"
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JornalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";



function JournalForm({ onSubmit, data, onDelete }) {

    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const posteRef = useRef();
    const { userId } = useContext(UserContext);
    const today = new Date().toISOString().slice(0, 10);

    const focusError = (isValid) => {
      switch (true) {
        case !isValid.title:
          titleRef.current.focus();
          break;
        case !isValid.date:
          dateRef.current.focus();
        case !isValid.post:
          posteRef.current.focus();
          break;
      }
    };

    useEffect(() => {
      if (!data) {
        dispatchForm({ type: "CLEAR" });
        dispatchForm({ type: "SET_VALUE", payload: { userId, date: today } });
      } else {
        dispatchForm({ type: "SET_VALUE", payload: { ...data } });
      }
    }, [data, userId, today]);

    useEffect(() => {
      let timerId;
      if (!isValid.date || !isValid.post || !isValid.title) {
        focusError(isValid);
       timerId = setTimeout(() => {
          dispatchForm({type: "RESET_VALIDITY"});
        }, 2000);
      }
      return () => {
         clearTimeout(timerId);
      };
    }, [isValid]);

    useEffect(() => {
       if (isFormReadyToSubmit) {
        onSubmit(values);
        dispatchForm({ type: "CLEAR" });
        dispatchForm({ type: "SET_VALUE", payload: { userId } });
       }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }, [userId]);
  
    const onChange = (e) => {
      dispatchForm({ type: "SET_VALUE", payload: { [e.target.name]: e.target.value }});
    }
    

    const addJournalMemories = (e) => {
      e.preventDefault();
      dispatchForm({type: "SUBMIT"})
    };

    const deleteJournalMemories = () => {
      onDelete(data.id)
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }

  return (

      <form className={styles["jornal-form"]} onSubmit={addJournalMemories}>
        <div className={styles["form-row"]}>
         <Input type='text' ref={titleRef} onChange={onChange} value={values.title} isValid={isValid.title}  name="title" appearence="title"/>
       {data?.id && <button className={styles["delete"]} type="button" onClick={deleteJournalMemories}>
          <img src="/archive.svg" alt="Delete.icon" />
        </button> }
        </div>
      
         <div className={styles["form-row"]}>
           <label htmlFor="date" className={styles["form-label"]}>
            <img src="/calendar.svg" alt="Icon Calendar"/>
            <span>Data</span>
           </label>
          <Input type='date' ref={dateRef} isValid={isValid.date} name="date" onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ""} id="date"/>
         </div>

         <div className={styles["form-row"]}>
           <label htmlFor="tag" className={styles["form-label"]}>
            <img src="/folder.svg" alt="Icon Folder"/>
            <span>Notări</span>
           </label> 
           <Input type='text' id="tag" onChange={onChange} value={values.tag} name="tag" />
         </div>

      <textarea ref={posteRef} name="post" id="" onChange={onChange} value={values.post} cols="30" rows="10" className={cn(styles["input"], {
         [styles["invalid"]]: !isValid.post
         })}></textarea>
      <Button>Salveaza</Button>
      </form> 
      
 );
}

export default JournalForm;