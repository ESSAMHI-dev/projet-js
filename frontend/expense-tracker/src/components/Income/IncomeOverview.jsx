import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';
import { useTranslation } from 'react-i18next';

const IncomeOverview = ({transactions, onAddIncome}) => {
    const { t } = useTranslation();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg dark:text-gray-100'>{t("Income_Overview")}</h5>
                <p className='text-xs text-gray-400 dark:text-gray-500 mt-0.5'>{t("subtitle_income")}</p>
            </div>

            <button className='add-btn' onClick={onAddIncome}><LuPlus className='text-lg'/> {t("add_income")}</button>
        </div>

        <div className='mt-10'>
            <CustomBarChart 
                data={chartData}
            />
        </div>
    </div>
  )
}

export default IncomeOverview