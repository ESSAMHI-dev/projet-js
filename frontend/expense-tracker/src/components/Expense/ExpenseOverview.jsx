import React, { useEffect, useState } from 'react'
import { LuPencil, LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';
import { prepareExpenseLineChartData } from '../../utils/helper';
import { useTranslation } from 'react-i18next';

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const { t } = useTranslation();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg dark:text-gray-100'>{t("expense_overview")}</h5>
                <p className='text-xs text-gray-400 dark:text-gray-500 mt-0.5'>{t("subtitle_expense")}</p>
            </div>

            <button className='add-btn' onClick={onAddExpense}><LuPlus className='text-lg'/> {t("add_expense")}</button>
        </div>

        <div className='mt-10'>
            <CustomLineChart 
                data={chartData}
            />
        </div>
    </div>
  )
}

export default ExpenseOverview