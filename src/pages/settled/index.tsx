import PageHeader from '@/components/PageHeader/PageHeader';
import Search from '@/components/Search/Search';
import SettledTable from '@/components/Settled/SettledTable';
import { MainColorSet } from '@/theme/types';
import { Flex, useTheme } from '@chakra-ui/react';

const SettledHome = () => {
  const { colors } = useTheme();
  const { white, background, backgroundMain } = colors as MainColorSet;

  return (
    <Flex mx='auto' flexDir='column' w='100%' h='100vh' bg={backgroundMain}>
      <PageHeader headerText='View 925 settled statements' />
      <Flex w='full' bg={white}>
        <Flex mx='auto' px='16px' maxW='1144px' minW='343px' w='full'>
          <Search />
        </Flex>
      </Flex>
      <Flex w='full' pb='64px' bg={background}>
        <Flex mx='auto' maxW='1144px' minW='343px' w='full'>
          <SettledTable />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SettledHome;
