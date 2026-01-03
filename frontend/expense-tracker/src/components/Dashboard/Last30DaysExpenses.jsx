import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
import { useTranslation } from 'react-i18next';

const Last30DaysExpenses = ({ data }) => {
    const { t } = useTranslation();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () => {};
    }, [data]);

  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg dark:text-gray-100'>{t("Last_30_Days_Expenses")}</h5>
        </div>

        <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last30DaysExpenses