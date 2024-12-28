import logo from './logo.svg';
import styles from './App.module.css';
import { useState } from "react";
import moment from "moment";


function App() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [isValueValid, setIsValueValid] = useState(false);

  const onInputButtonClick = () => {
    let promptValue = prompt('Введите значение');
    if (promptValue) {
      promptValue = promptValue.trim();
      if (promptValue.length < 3) {
        setError('Введенное значение должно содержать минимум 3 символа');
        setIsValueValid(false);

      } else {
        setValue(promptValue);
        setError('');
        setIsValueValid(true);

      }
    } else {
      setError('Необходимо ввести значение');
      setIsValueValid(false);
    }
  }

  const onAddButtonClick = () => {
    if (isValueValid) {
      const itemId = Date.now();
      const datetime = moment().format("DD.MM.YYYY HH.mm.ss");

      const updatedList = [...list, { id: itemId, text: value, datetime }];
      console.log(updatedList);
      setList(updatedList);
    }
  }

  return (
    <div className={styles.app}>
      <h1 className={styles['page-heading']}>Ввод значения</h1>
      <p className={styles['no-margin-text']}>
        Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
      </p>
      {error &&
        <div className={styles.error}>{error}</div>
      }
      <div className={styles['buttons-container']}>
        <button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
        <button className={styles.button} disabled={!isValueValid} onClick={onAddButtonClick}>Добавить в список</button>
      </div>
      <div className={styles['list-container']}>
        <h2 className={styles['list-heading']}>Список:</h2>

        {list.length ? <ul className={styles.list}>
          {list.map(({ id, text, datetime }) => <li className={styles['list-item']} key={id}>{text} - {datetime}</li>)}
        </ul> : <p className={styles['no-margin-text']}>Нет добавленных элементов</p>}
      </div>
    </div>
  );
}

export default App;
