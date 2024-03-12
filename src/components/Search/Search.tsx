import { MainColorSet } from '@/theme/types';
import { Flex, Input, InputGroup, useTheme } from '@chakra-ui/react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {
  const { colors } = useTheme();
  const { textGrey } = colors as MainColorSet;

  return (
    <Flex py='20px' maxW='360px' w='full'>
      <InputGroup style={{ fontSize: '14px' }}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color={textGrey}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '14px',
            width: '20px',
            height: '20px',
          }}
        />
        <Input
          type='search'
          placeholder='Search...'
          border={`1px solid black`}
          borderRadius='20px'
          pl='40px'
        />
      </InputGroup>
    </Flex>
  );
};

export default Search;
