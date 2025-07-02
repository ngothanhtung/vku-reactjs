import { ArrowRight } from 'lucide-react';
import styles from './GetStartedButton.module.css'
const GetStartedButton = ()=>{
    return (
        <button className={styles.button}><span>Get started</span> <ArrowRight size={16} /></button>
    )
}

export default GetStartedButton