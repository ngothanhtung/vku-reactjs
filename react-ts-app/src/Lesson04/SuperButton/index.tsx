import React from 'react';
import styles from './SuperButton.module.css';
import { IoReload } from 'react-icons/io5';
type Props = {
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'default' | 'warning' | 'danger' | 'success' | 'info';
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  shape?: 'round' | 'square';
};

export default function SuperButton({ children, loading, disabled, icon, size = 'medium', type = 'default', style = {}, textStyle = {}, iconStyle = {}, shape = 'square' }: Props) {
  let buttonTypeClass = '';
  switch (type) {
    case 'primary':
      buttonTypeClass = styles.primary;
      break;
    case 'default':
      buttonTypeClass = styles.default;
      break;
    case 'warning':
      buttonTypeClass = styles.warning;
      break;
    case 'danger':
      buttonTypeClass = styles.danger;
      break;
    case 'success':
      buttonTypeClass = styles.success;
      break;
    case 'info':
      buttonTypeClass = styles.info;
      break;
    default:
      buttonTypeClass = styles.default;
      break;
  }

  return (
    <button
      className={`${styles.buttonContainer} ${buttonTypeClass} ${disabled || loading ? styles.disabled : ''}`}
      disabled={disabled || loading}
      style={{
        fontSize: size === 'small' ? '12px' : size === 'large' ? '20px' : '16px',
        padding: size === 'small' ? '4px 8px' : size === 'large' ? '8px 24px' : '6px 16px',
        height: size === 'small' ? '32px' : size === 'large' ? '56px' : '48px',
        lineHeight: size === 'small' ? '32px' : size === 'large' ? '56px' : '48px',
        // borderRadius: size === 'small' ? '2px' : size === 'large' ? '8px' : '4px',

        borderRadius: shape === 'round' ? '100%' : shape === 'square' ? '0' : '4px',
        ...style,
      }}
    >
      {loading && (
        <div className={styles.icon} style={{ ...iconStyle }}>
          <IoReload className={styles.iconAnimation} />
        </div>
      )}
      {icon && !loading && (
        <div className={styles.icon} style={{ ...iconStyle }}>
          {icon}
        </div>
      )}
      <span style={{ ...textStyle }}>{children}</span>
    </button>
  );
}
