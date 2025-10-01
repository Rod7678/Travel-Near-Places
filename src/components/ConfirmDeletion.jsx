import { useEffect } from "react";

export default function ConfirmDeletion({onConfirm, onCancel}){
    useEffect(()=>{
        const timer = setTimeout(()=>{
            onConfirm()
        }, 3000);

        return ()=>{
            clearTimeout(timer)
        }
    },[onConfirm])


    return (
        <div className="delete-confirmation">
            <h2>are you sure?</h2>
            <p>Do you really want to remove this place?</p>
            <div id="confirmation-action">
                <button className="cancel" onClick={onCancel}>No</button>
                <button className="confirm" onClick={onConfirm}>Yes</button>
            </div>
        </div>
    );
}