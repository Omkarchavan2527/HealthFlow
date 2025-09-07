import Detail from './Detail';
import { useUser } from './UserContext';
import Detailpreview from './Detailpreview';
export default function DetailWrapper() {
  const { user } = useUser();
return user
    ? <Detailpreview  />
    : <Detail />;
}