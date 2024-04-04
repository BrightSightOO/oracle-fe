import { MainColorSet } from '@/theme/types';
import {
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
  useTheme,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export enum NAVIGATION_OPTIONS {
  VERIFY = '/vote',
  PROPOSE = '/propose',
  SETTLED = '/settled',
}

const NAV_NAME_MAP = {
  [NAVIGATION_OPTIONS.VERIFY]: 'Vote',
  [NAVIGATION_OPTIONS.PROPOSE]: 'Propose',
  [NAVIGATION_OPTIONS.SETTLED]: 'Settled',
};

const Navigation = () => {
  const { route } = useRouter();
  const { colors } = useTheme();
  const { bluePrimary, white, black, textGrey } = colors as MainColorSet;

  const [activeTab, setActiveTab] = useState(route);

  useEffect(() => {
    setActiveTab(route);
  }, [route]);

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
  );

  return (
    <Flex
      alignItems='center'
      justifyContent='flex-end'
      maxW='600px'
      position='relative'
      zIndex={100}
    >
      <Show above='md'>
        <HStack spacing='5'>
          {Object.values(NAVIGATION_OPTIONS).map((navOpt) => {
            let color = activeTab === navOpt ? white : textGrey;
            const navTitle = NAV_NAME_MAP[navOpt];

            return (
              <NavLink href={navOpt} passHref key={navOpt} shallow>
                <Text
                  textStyle='Body'
                  css={{ textWrap: 'nowrap' }}
                  textAlign='center'
                  color={color}
                  _hover={{
                    color: white,
                  }}
                >
                  {navTitle}
                </Text>
              </NavLink>
            );
          })}
        </HStack>
      </Show>
      <Show below='md'>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            bg={black}
            _hover={{
              bg: black,
            }}
            icon={<FontAwesomeIcon icon={faBars} color={white} />}
          />
          <MenuList zIndex={2}>
            {Object.values(NAVIGATION_OPTIONS).map((navOpt) => {
              let color = activeTab === navOpt ? bluePrimary : black;
              const navTitle = NAV_NAME_MAP[navOpt];

              return (
                <NavLink href={navOpt} passHref key={navOpt} shallow>
                  <MenuItem>
                    <Flex alignItems='center'>
                      <Text
                        textStyle='Body'
                        textAlign='center'
                        fontWeight='600'
                        ml='5px'
                        color={color}
                      >
                        {navTitle}
                      </Text>
                    </Flex>
                  </MenuItem>
                </NavLink>
              );
            })}
            <Flex mt={2} justifyContent='center' minW='190px'>
              <WalletMultiButtonDynamic />
            </Flex>
          </MenuList>
        </Menu>
      </Show>
    </Flex>
  );
};

export default Navigation;
