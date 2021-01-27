import React from 'react';

const TextInput = (props: TextInputProps) => {
  return (
    <div className='text-input'>
      {props.title && <div className='text-input-title'>
          {props.title}
      </div>}
      <input type={props.password ? 'password' : 'text'}
          value={props.value} 
          placeholder={props.defaultValue} 
          onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
}

export interface TextInputProps {
  value: string;
  defaultValue?: string;
  title?: string;
  onChange: (newValue: string) => void;
  password?: boolean
}

export interface TextInputState {
  focused: boolean;
}

export default TextInput;