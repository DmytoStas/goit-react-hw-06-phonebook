import { useSelector, useDispatch } from 'react-redux';

import { toggleFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

function Filter() {
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={filter}
        onChange={e => {
          dispatch(toggleFilter(e.target.value));
        }}
      />
    </div>
  );
}

export default Filter;
