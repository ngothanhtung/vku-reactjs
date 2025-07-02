import styles from './Input.module.css'
type InputProps = {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    text?: string
    placeholder?: string,
    type?: 'text' | 'email' | 'tel' | 'number' | 'password'
}
const Input = ({
    leftIcon,
    rightIcon,
    text='',
    type='text',
    placeholder=''
}: InputProps) => {
  return (
    <div className={styles.input}>
        <span>
            {leftIcon}
            <input type={type} value={text} placeholder={placeholder} />
        </span>
        {rightIcon}
    </div>
  )
}

export default Input