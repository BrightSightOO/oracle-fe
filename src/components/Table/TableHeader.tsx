import { Show, Th, Thead, Tr } from '@chakra-ui/react';

const TableHeader = ({
  headerInfo,
}: {
  headerInfo: Record<string, string>[];
}) => {
  return (
    <>
      <Show above='sm'>
        <Thead>
          <Tr>
            {headerInfo.map((header, idx) => (
              <Th key={idx} maxW={header.maxW || 'fit-content'}>
                {header.title}
              </Th>
            ))}
          </Tr>
        </Thead>
      </Show>
      <Show below='sm'>
        <Thead>
          <Tr>
            <Th w='full'>{headerInfo[0].title}</Th>
          </Tr>
        </Thead>
      </Show>
    </>
  );
};

export default TableHeader;
