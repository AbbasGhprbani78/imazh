"use client"
import React,{useEffect } from 'react'
import styles from './Toast.module.css'
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';


export default function Toast({ type, title, message, showToast, setShowToast }) {
    const icon = {
        success: <CheckCircleIcon className={styles.done_icon} />,
        error: <ErrorIcon className={styles.error_icon} />,
        warning: <WarningIcon className={styles.warning_icon} />,
    }[type];


    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showToast, setShowToast])

    return (
        <div
            className={`${styles.toast_container_right }
        
         ${showToast ? styles.toast_container_active : ""}
         ${type == "success" ?
                    styles.success_color :
                    type == "warning" ? styles.warning_color
                        :
                        type == "error" ? styles.error_color : ""}
         `}>
            <div className={styles.toast_header}>
                <CloseIcon className={styles.close_icon} onClick={() => setShowToast(false)} />
            </div>
            <div className={styles.toast_content}>
                <div className={styles.toast_icon_content}>
                    {icon}
                </div>
                <div className={ styles.toast_texts_right}>
                    <p className={styles.toast_title}>{title}</p>
                    <p className={styles.toast_text}>{message}</p>
                </div>
            </div>
        </div>
    )
}
