import { useUmi } from '@/context/UmiProvider';
import { MainColorSet } from '@/theme/types';
import { formatDate } from '@/utils/time';
import {
  Button,
  Collapse,
  Divider,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import {
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';

type RequestCardProps = {
  //request: RequestV1 & { kind: RequestKind.YesNo };
  state: string;
  title: string;
  description: string;
  additionalInfo: {
    name: string;
    value: string;
  }[];
};

enum RequestStateText {
  Requested = 'Requested',
  Asserted = 'Asserted',
  Disputed = 'Disputed',
  Resolved = 'Resolved',
}

const RequestCard = ({ state, title, description, additionalInfo }: RequestCardProps) => {
  const {
    colors: {
      bluePrimary,
      textPrimary,
      greenPrimary,
      pinkPrimary,
      backgroundMain,
      backgroundCard,
      textGrey,
      greenBrightSight,
    },
  } = useTheme<{ colors: MainColorSet }>();

  const { isOpen, onToggle } = useDisclosure();

  const umi = useUmi();

  const actionValues: ActionValues = useMemo(() => {
    switch (state) {
      case RequestStateText.Requested:
        return {
          mainText: 'Enter answer & bond amount',
          actionButtonText: 'Submit',
          buttons: options,
        };
      case 'Provided':
        return {
          mainText: 'Answer',
          actionButtonText: 'Dispute',
          buttons: answer,
        };
      case 'Disputed':
        return {
          mainText: 'Vote correct answer',
          actionButtonText: 'Submit',
          buttons: options,
        };
      default:
        return null;
    }
  }, [status, options, answer]);

  return (
    <VStack w="full" bg={backgroundCard} borderRadius="lg" boxShadow={isOpen ? 'xl' : 'lg'}>
      {/* Card Header */}
      <VStack w="full" p="24px" pb={isOpen ? '0px' : '24px'}>
        <HStack w="full" justifyContent="space-between">
          <HStack w="full" gap={4}>
            <HStack gap={1}>
              <FontAwesomeIcon icon={faClock} color={bluePrimary} width="16px" />
              <Text textStyle="H6" fontWeight="500" color={textGrey}>
                {formatDate(request.assertionTimestamp)}
              </Text>
            </HStack>
            <HStack gap={1}>
              <FontAwesomeIcon icon={faCircleInfo} color={bluePrimary} width="16px" />
              <Text textStyle="H6" fontWeight="500" color={textGrey}>
                {state}
              </Text>
            </HStack>
          </HStack>
          <IconButton
            minW="24px"
            h="24px"
            aria-label="show-more"
            icon={
              <FontAwesomeIcon
                icon={isOpen ? faChevronUp : faChevronDown}
                color={bluePrimary}
                width="14px"
              />
            }
            onClick={onToggle}
          />
        </HStack>
        <Text
          textStyle="H4"
          fontWeight="600"
          lineHeight="30px"
          color={textPrimary}
          pt="15px"
          pb="5px"
        >
          {title}
        </Text>
      </VStack>
      {/* Show more info */}
      <Collapse in={isOpen} animateOpacity>
        <VStack w="full">
          <VStack w="full" px="24px" pb={status === 'Closed' ? '24px' : '0px'}>
            <Divider />
            <Text textStyle="H6" fontWeight="500" color={textGrey}>
              {description}
            </Text>
            <HStack w="full" wrap="wrap" columnGap={6} rowGap={1}>
              {additionalInfo.map((info) => (
                <HStack key={info.name} gap={1}>
                  <Text textStyle="H6" fontWeight="600" color={textPrimary}>
                    {info.name}
                  </Text>
                  <Text textStyle="H6" fontWeight="500" color={textGrey}>
                    {info.value}
                  </Text>
                </HStack>
              ))}
            </HStack>
          </VStack>
          {state !== RequestStateText.Resolved && actionValues ? (
            <VStack w="full" p="24px" align="flex-start" bg={backgroundMain}>
              <Text textStyle="Body" fontWeight="600" color={textPrimary}>
                {actionValues.mainText}
              </Text>
              <HStack w="full">
                {actionValues.buttons
                  ? actionValues.buttons.map((option, idx) => {
                      const colorOption = idx === 0 ? greenPrimary : pinkPrimary;
                      return (
                        <Button
                          key={option}
                          w="full"
                          bg={`${colorOption}1A`}
                          border={`1px solid ${colorOption}`}
                          color={colorOption}
                          _hover={{
                            bg: colorOption,
                            color: textPrimary,
                          }}
                          _selected={{
                            bg: colorOption,
                            color: textPrimary,
                          }}
                        >
                          {option}
                        </Button>
                      );
                    })
                  : null}
              </HStack>
              <Stack w="full" justifyContent="flex-end">
                <Button w={{ base: 'full', md: '150px' }} bg={greenBrightSight} color={textPrimary}>
                  Submit
                </Button>
              </Stack>
            </VStack>
          ) : null}
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default RequestCard;
