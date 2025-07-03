
import { useState } from 'react';
import styles from './Attributes.module.css';

interface IAttribute {
    id: number;
    label: string
}
const AttrItem = ({label, isActive, onHandleClick}: {label: string, isActive: boolean, onHandleClick: ()=>void})=>{
    return <span onClick={onHandleClick} className={`${styles.attr_value} ${isActive ? styles.active: ''}`}>{label}</span>
}
//Danh sách tùy chọn màu sắc
const Attributes = ({data}: {data: IAttribute[]}) => {
    const [currentIndex, setCurrentIndex] = useState(1)
  return (
    <div className={styles.attributes}>
      <span className={styles.attr_name}>Màu sắc</span>
      {/* <span className={styles.attr_value}>Đen</span>
      <span className={styles.attr_value}>Hồng</span>
      <span className={styles.attr_value}>Xanh</span> */}
      {/* <AttrItem label='Đen' />
      <AttrItem label='Hồng' />
      <AttrItem label='Xanh' /> */}
      {
        data.length > 0 && data.map((attr)=>{
            return  <AttrItem onHandleClick={()=>{
                setCurrentIndex(attr.id)
            }} isActive={currentIndex === attr.id} key={attr.id} label={attr.label} />
        })
      }
    </div>
  );
}

export default Attributes;