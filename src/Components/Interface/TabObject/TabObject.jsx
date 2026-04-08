import { useEffect, useState } from "react";
import { useGameStore } from "../../../store/store";
import { c_MissingObject, c_Objects } from "../../../constant/objects";
import s from "./TabObject.module.scss";

const TabObject = ({ viewObject, setViewObject }) => {
    const { objectFind } = useGameStore();

    const [currentObject, setCurrentObject] = useState([]);

    useEffect(() => {
        if (objectFind.length < c_Objects.length) {
            let numberMissing = c_Objects.length - objectFind.length;
            let arraywithMissing = [...objectFind];
            for (let i = 0; i < numberMissing; i++) {
                arraywithMissing.push(c_MissingObject);
            }
            setCurrentObject(arraywithMissing);
        } else {
            setCurrentObject(objectFind);
        }
    }, [objectFind]);

    return (
        <div className={s.tabObject}>
            {currentObject.map((object, index) => (
                <div key={index} className={`${s.tabObject__btn} ${object.type === "missing" ? s.missing : ""} ${object === viewObject ? s.active : ""}`} onClick={() => setViewObject(object)}>
                    {object.type != "missing" && (
                        <img className={s.tabObject__icon} src={object.image} alt="" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default TabObject;