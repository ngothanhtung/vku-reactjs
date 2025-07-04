import React from 'react';

type Props = {
  text: string;
  width?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

function Button({ text, width, disabled, style, onClick }: Props) {
  return (
    <button
      style={{ width, ...style }}
      disabled={disabled}
      onClick={() => {
        if (onClick && typeof onClick === 'function') {
          onClick();
        }
      }}
    >
      {text}
    </button>
  );
}

const items = [
  {
    day: 'Mon',
    image: '/images/weather-icons/w1.png',
  },
  {
    day: 'Tue',
    image: '/images/weather-icons/w2.png',
  },
  {
    day: 'Wed',
    image: '/images/weather-icons/w3.png',
  },
  {
    day: 'Thu',
    image: '/images/weather-icons/w4.png',
  },
  {
    day: 'Fri',
    image: '/images/weather-icons/w5.png',
  },
];

type WeatherItem = {
  day: string;
  image: string;
};

function Weather({ items }: { items: WeatherItem[] }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: 300, height: 100, borderRadius: 20, boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12)' }}>
      {items.map((item) => (
        <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 12px' }}>
          <div>
            <img src={item.image} alt={item.day} style={{ width: 25, height: 25 }} />
          </div>
          <div style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: '0.1px', lineHeight: '20px' }}>{item.day}</div>
        </div>
      ))}
    </div>
  );
}

export default function PropsDataTypes() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <Button onClick={handleClick} width={100} disabled={false} style={{ backgroundColor: 'blue', color: 'white', height: 80, border: 'none', borderRadius: 8 }} text={'Click me'} />
      <Weather items={items} />
    </div>
  );
}
