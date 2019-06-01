import React, {useState} from 'react';
import styled from 'styled-components';

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

const StyledForm = styled.form`
  display: flex;

  input {
    border: ${props => props.theme.Borders.grey1px};
    border-radius: 0.125rem;
    font-size: 0.875rem;
    /* height: 30px;
    width: 59px; */
    margin-right: 0.625rem;
    text-indent: 0.5rem;
  }

  button {
    /* height: 34px; */
    /* width: 91px; */
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: #f8cb00;
    border: none;
    cursor: pointer;
    /* 615944 */
  }
`;

const PriceFilter = ({filterCallBack}) => {
  const [inputValues, setInputsValue] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  // console.log(inputValues);
  function handleFilterChange(event) {
    const {
      target: {name, value},
    } = event;
    const numericValue = parseInt(value, 10) || 0;

    // // check that min price is < that_max
    // if (
    //   (name === 'minPrice' && numericValue > inputValues.maxPrice) ||
    //   (name === 'maxPrice' && numericValue < inputValues.minPrice)
    // ) {
    //   return;
    // }

    setInputsValue({...inputValues, [name]: numericValue});
  }

  function handleFilterProducts(event) {
    event.preventDefault();
    filterCallBack(inputValues);
  }
  return (
    <StyledFilter>
      {/* <React.Fragment> */}
      <h3>Filter By Price</h3>
      <StyledForm onSubmit={handleFilterProducts} onBlur={handleFilterProducts}>
        <input
          type="number"
          name="minPrice"
          placeholder="$ min"
          min={0}
          value={inputValues.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="$ max"
          min={0}
          value={inputValues.maxPrice}
          onChange={handleFilterChange}
        />
        <button type="submit">Go</button>
      </StyledForm>
      {/* </React.Fragment> */}
    </StyledFilter>
  );
};

export default PriceFilter;
