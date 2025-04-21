'use client'; 

import styles from "./image-picker.module.css";
import { useRef,useState } from 'react';
import Image from 'next/image';

export default function ImagePicker({label, name}){
    const [pickedImage, updateImage] = useState(null);
    const imageInput = useRef();

    function handleClick(){
        imageInput.current.click();
    }

    function PickedImgFunc(event){
        const file = event.target.files[0];

        if(!file)
        {
            updateImage(null);
            return ;
        }
        const readFile = new FileReader();

        readFile.onload = () => {
            updateImage(readFile.result);
        }
        readFile.readAsDataURL(file);
    }
    return (
        <div className={styles.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.preview}>
                {!pickedImage && <p>No Image selected</p>}
                {pickedImage && <Image src={pickedImage} alt="picked image" fill/>}
            </div>
            <div className={styles.controls}>
                <input type="file"
                       className={styles.input} 
                       id={name} 
                       accept="image/png, image/jpeg"
                       name={name} 
                       ref = {imageInput}
                       onChange={PickedImgFunc}
                       required />
            </div>
            <button className={styles.button} type="button" onClick={handleClick}>
                Pick an Image
            </button>
        </div>
    );
};