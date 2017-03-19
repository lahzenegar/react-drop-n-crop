import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import DropNCrop from '../../src/DropNCrop';
import '../../styles/index.css';

storiesOf('<DropNCrop />', module).add('Default', () => (
  <div>
    <h1>react-drop-n-crop</h1>
    <DropNCrop
      onChange={fileBlob => {
        action('fileBlob')(fileBlob);
      }}
    />
    <h3>Example Usage:</h3>
    <pre>
      {
        `<DropNCrop
  onChange={(fileBlob) => {
    console.log(fileBlob);
  }}
/>`
      }
    </pre>
  </div>
));
