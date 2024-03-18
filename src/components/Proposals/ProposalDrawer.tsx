import { OracleType } from '@/types/tableData';
import DrawerWrapper from '../Drawer/DrawerWrapper';

const ProposalDrawer = ({
  data,
  isOpen,
  onClose,
}: {
  data: OracleType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return <DrawerWrapper data={data} isOpen={isOpen} onClose={onClose} />;
};

export default ProposalDrawer;
