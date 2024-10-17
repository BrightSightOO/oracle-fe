import type { RequestCardProps } from "./RequestCard";

import { getTokenAmount } from "@/constants/mints";
import { useUmi } from "@/context/UmiProvider";
import { useAccount } from "@/hooks/account";
import {
  AssertionV1,
  findAssertionV1Pda,
  findVotingV1Pda,
  getAssertionV1AccountDataSerializer,
  getVotingV1AccountDataSerializer,
  RequestKind,
  RequestState,
  RequestV1,
  VotingV1,
} from "@/program-sdks/oracle";
import { MainColorSet } from "@/theme/types";
import { prettyAmount } from "@/utils/amount";
import { formatDate } from "@/utils/time";
import {
  Button,
  Collapse,
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import {
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";

type Props = RequestCardProps & {
  request: RequestV1 & { kind: RequestKind.YesNo };
};

enum YesNoValue {
  Yes = 1,
  No = 2,
  Invalid = 3,
}

function decodeYesNoValue(value: number | bigint): YesNoValue {
  value = Number(value);

  switch (value) {
    case YesNoValue.Yes:
    case YesNoValue.No:
    case YesNoValue.Invalid:
      return value;

    default:
      throw new Error(`Invalid yes/no value: ${value}`);
  }
}

const YesNoRequestCard = ({ request, data }: Props) => {
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

  const [assertionPda] = useMemo(
    () => findAssertionV1Pda(umi, { request: request.publicKey, round: request.round }),
    [request.publicKey, request.round, umi],
  );
  const [votingPda] = useMemo(
    () => findVotingV1Pda(umi, { assertion: assertionPda }),
    [assertionPda, umi],
  );

  const assertion = useAccount(assertionPda, getAssertionV1AccountDataSerializer);
  const voting = useAccount(votingPda, getVotingV1AccountDataSerializer);

  const { title, description } = data;

  const bond = getTokenAmount(request.bondMint, request.bond);
  const reward = getTokenAmount(request.rewardMint, request.reward);

  const state = RequestState[request.state];

  const additionalInfo = [
    { name: "Bond", value: prettyAmount(bond) },
    { name: "Reward", value: prettyAmount(reward) },
    { name: "State", value: state },
  ];

  if (assertion !== undefined) {
    const assertedValue = decodeYesNoValue(assertion.assertedValue);

    additionalInfo.push(
      { name: "Asserted Value", value: YesNoValue[assertedValue] },
      { name: "Asserter", value: assertion.asserter },
    );

    if (request.state === RequestState.Resolved) {
      additionalInfo.push({
        name: "Resolved Value",
        value: YesNoValue[decodeYesNoValue(request.value)],
      });
    } else if (voting === undefined) {
      additionalInfo.push(
        { name: "Disputer", value: assertion.disputer },
        {
          name: "Dispute Period Ends",
          value: formatDate(assertion.expirationTimestamp),
        },
      );
    } else {
      additionalInfo.push({
        name: "Voting Period Ends",
        value: formatDate(voting.endTimestamp),
      });
    }
  }

  // const actionValues: ActionValues = useMemo(() => {
  //   switch (status) {
  //     case "Open":
  //       return {
  //         mainText: "Enter answer & bond amount",
  //         actionButtonText: "Submit",
  //         buttons: options,
  //       };
  //     case "Closed":
  //       return null;
  //     case "Provided":
  //       return {
  //         mainText: "Answer",
  //         actionButtonText: "Dispute",
  //         buttons: answer,
  //       };
  //     case "Disputed":
  //       return {
  //         mainText: "Vote correct answer",
  //         actionButtonText: "Submit",
  //         buttons: options,
  //       };
  //     default:
  //       return null;
  //   }
  // }, [status, options, answer]);

  return (
    <VStack w="full" bg={backgroundCard} borderRadius="lg" boxShadow={isOpen ? "xl" : "lg"}>
      {/* Card Header */}
      <VStack w="full" p="24px" pb={isOpen ? "0px" : "24px"}>
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
        <Text textStyle="H4" fontWeight="600" color={textPrimary} pt="15px" pb="5px">
          {title}
        </Text>
      </VStack>
      {/* Show more info */}
      <Collapse in={isOpen} animateOpacity>
        <VStack w="full">
          <VStack w="full" px="24px" pb={status === "Closed" ? "24px" : "0px"}>
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
          {/* {status !== "Closed" && actionValues ? (
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
              <Flex w="full" justifyContent="flex-end">
                <Button w={{ base: "full", md: "150px" }} bg={greenBrightSight} color={textPrimary}>
                  Submit
                </Button>
              </Flex>
            </VStack>
          ) : null} */}
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default YesNoRequestCard;
