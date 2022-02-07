import { Input } from 'antd';
import { useStateValue } from '../../store/StateProvider';

const SearchBar = () => {
  const { Search } = Input;

  const [{ search }, dispatch] = useStateValue();

  const handleChange = (e) => {
    dispatch({
      type: 'ADD_TO_SEARCH',
      item: e.target.value,
    });
  };

  return (
    <Search
      className='search'
      placeholder='input search text'
      onChange={handleChange}
      style={{ width: 400 }}
    />
  );
};

export default SearchBar;
