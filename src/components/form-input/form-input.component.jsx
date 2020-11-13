import React from 'react';

import './form-input.styles.scss';

const FormInput = (props) => {
  console.log(props);
  console.log({...props});
  return (
  <div className='group'>
    <input className='form-input' {...props} />
    {props.label ? (
      <label
        className={`${
          props.value.length > 0 ? 'shrink' : ''
        } form-input-label`}
      >
        {props.label}
      </label>
    ) : null}
  </div>
)};

export default FormInput;

