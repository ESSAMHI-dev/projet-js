import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
import UpdateExpenseForm from "../../components/Expense/UpdateExpenseForm";
import { useTranslation } from "react-i18next";

const Expense = () => {
  const { t } = useTranslation();
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openUpdateExpenseModal, setOpenUpdateExpenseModal] = useState(false);

  //Get all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense details:", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //Validation Checks
    if (!category.trim()) {
      toast.error(t("enter_category"));
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error(t("enter_valid_amount"));
      return;
    }
    if (!date) {
      toast.error(t("select_date"));
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success(t("expense_added"));
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error(t("failed_add_expense"));
    }
  };

  //Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`);

      setOpenDeleteAlert({ show: false, data: null });
      toast.success(t("expense_deleted"));
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error(t("failed_delete_expense"));
    }
  };

  //Handle Update Expense
  const handleUpdateExpense = async (expense) => {
    const { _id, category, amount, date, icon } = expense;
    try {
      await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(_id), {
        category,
        amount,
        date,
        icon,
      });
      setOpenUpdateExpenseModal(false);
      toast.success(t("expense_updated"));
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error(t("failed_update_expense"));
    }
  };

  //Handle downlaod expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      //Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  const [selectedExpense, setSelectedExpense] = useState(null);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onUpdate={(id) => {
              const expense = expenseData.find(exp => exp._id === id);
              setSelectedExpense(expense);
              setOpenUpdateExpenseModal(true);
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title={t("add_expense")}
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openUpdateExpenseModal}
          onClose={() => setOpenUpdateExpenseModal(false)}
          title={t("update") + " " + t("expense")}
        >
          <UpdateExpenseForm onUpdate={handleUpdateExpense} expense={selectedExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          title={t("delete") + " " + t("expense")}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense source?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
