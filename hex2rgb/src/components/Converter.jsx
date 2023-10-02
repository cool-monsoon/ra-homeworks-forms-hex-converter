import { useState } from 'react';
import hex2rgb from 'hex2rgb';

export default function Converter() {
  const [form, setForm] = useState({
    value: '',
  });

  const onValueChange = event => {
    setForm(prevForm => ({ ...prevForm, value: event.target.value }));
  }

  const validate = hex => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
    return regex.test(hex) ? true : false;
  }

  const validateValue = () => {
    let outputValue;

    if (validate(form.value) && form.value.length === 4 || validate(form.value) && form.value.length === 7) {
      outputValue = hex2rgb(form.value, {rgbStringDefault: " "}).rgbString;
    } else if (!validate(form.value) && form.value.length === 4 || !validate(form.value) && form.value.length > 6) {
      outputValue = 'Ошибка!';
    } else {
      outputValue = ' ';
    }

    return outputValue;
  }

  return (
    <div className={!validate(form.value) && form.value.length === 4 || !validate(form.value) && form.value.length > 6 ? 'form error' : 'form'}
    style={form.value.length === 4 || form.value.length === 7 ? { backgroundColor: hex2rgb(form.value, {rgbStringDefault: " "}).rgbString } : null}
    >
      <div className='container'>
        <input className='color-hex' value={form.value} onChange={onValueChange} maxLength="7"/>
        <div className='color-rgb'>{validateValue()}</div>
      </div>
    </div >
  )
}