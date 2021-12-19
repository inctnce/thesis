import TDiscipline from './TDiscipline';
import TRoom from './TRoom';

type TData = {
	workdays: string[];
	intervals: string[];
	teachers: string[];
	disciplines: TDiscipline[];
	rooms: TRoom[];
};

export default TData;
