import { format as dateFnsFormat } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

const format: typeof dateFnsFormat = (date, format, options) => dateFnsFormat(date, format, { locale, ...options });

export default format;
