import React from 'react';
import { fireEvent } from '@testing-library/react';

import Modal from './modal';
import { render } from '../../utils/test';

describe('<Modal/>', () => {
  it(`renders children inside modal container`, () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');

    const { getByText } = render(
      <Modal closeCallBack={() => {}}>
        {() => (
          <div>
            <h1>modal title</h1>
            <p>modal content</p>
          </div>
        )}
      </Modal>,
      {
        container: document.body.appendChild(modalRoot),
      }
    );

    expect(getByText(/modal title/i)).toBeTruthy();
    expect(getByText(/modal content/i)).toBeTruthy();
  });

  it(`calls close function with close button and escape key`, () => {
    const closeFunction = jest.fn(event => event);
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');

    const { getByTestId } = render(
      <Modal closeCallBack={closeFunction}>
        {() => (
          <div>
            <h1>modal title</h1>
            <p>modal content</p>
          </div>
        )}
      </Modal>,
      {
        container: document.body.appendChild(modalRoot),
      }
    );

    const closeButton = getByTestId('modal-button');

    fireEvent.click(closeButton, { type: 'click' });
    fireEvent.keyDown(window, { type: 'keydown', keyCode: 27 });

    expect(closeFunction).toHaveBeenCalledTimes(2);
  });
});
