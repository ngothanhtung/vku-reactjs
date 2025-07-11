import './App.css';
import ArticlesList from './Lesson04-Guildlines/ArticlesList';
import Attributes from './Lesson04-Guildlines/Attributes';
import Rating10 from './Lesson04/Rating10';

const articles = [
  { id: 1, title: 'Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz', thumbnail: 'images/1.jpeg', addTime: '4 năm trước' },
  { id: 2, title: 'Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12', thumbnail: 'images/2.jpeg', addTime: '4 năm trước' },
  { id: 2, title: 'Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12', thumbnail: 'images/3.jpeg', addTime: '4 năm trước' },
  { id: 4, title: 'Galaxy A82 5G chuẩn bị ra mắt với chip flagship và màn hình trượt độc đáo, Samfans gom lúa đi là vừa', thumbnail: 'images/4.jpeg', addTime: '4 năm trước' },
];

const attributes = [
  { id: 1, label: 'Đen' },
  { id: 2, label: 'Hồng' },
  { id: 3, label: 'Xanh' },
];

function App() {
  return (
    <main className='container'>
      <Attributes data={attributes} />
      <section className='section'>
        <div className='section_header'>
          <h2 className='section_title'>Tin tức</h2>
          <div className='section_extra'>
            <a href='#'>Xem tất cả</a>
          </div>
        </div>
        <div className='section_body'>
          <ArticlesList data={articles} />
        </div>
      </section>
      <Rating10 />
    </main>
  );
}

export default App;
