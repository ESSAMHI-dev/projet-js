import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddFactureForm from "../../components/Facture/AddFactureForm";

const Factures = () => {
  useUserAuth();

  const [openAddFacture, setOpenAddFacture] = useState(false);

  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  const filteredFactures = factures.filter((facture) => {
    if (filterStatus === "all") return true;
    return facture.status === filterStatus;
  });

  const handleAddFacture = async (facture) => {
    const { title, amount, dueDate, status } = facture;
    // Validation Checks
    if (!title.trim()) {
      toast.error("Please enter facture title");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!dueDate) {
      toast.error("Please enter a due date");
      return;
    }
    if (!status.trim()) {
      toast.error("Please enter a status");
      return;
    }
    try {
      const response = await axiosInstance.post(
        API_PATHS.FACTURES.ADD_FACTURE,
        facture
      );
      if (response.data) {
        setFactures(response.data);
        setOpenAddFacture(false);
        toast.success("Facture added successfully");
      }
    } catch (error) {
      toast.error("Failed to add facture");
    }
  };

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.FACTURES.GET_ALL_FACTURES
        );
        setFactures(response.data);
      } catch (error) {
        toast.error("Failed to fetch factures");
      } finally {
        setLoading(false);
      }
    };

    fetchFactures();
  }, []);

  useEffect((e) => {
    e?.preventDefault();
  }, []);

  return (
    <DashboardLayout activeMenu="Factures">
      <div className="my-5 mx-auto dark:text-white">
        <div className="p-5 bg-white dark:bg-slate-800 dark:text-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold mb-4">Factures Page</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  Filter:
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="paid">paid</option>
                  <option value="unpaid">unpaid</option>
                </select>
              </div>
            </div>
            <button
              className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
              onClick={() => setOpenAddFacture(true)}
            >
              Add Facture
            </button>
            <Modal
              isOpen={openAddFacture}
              onClose={() => setOpenAddFacture(false)}
              title="Add New Facture"
            >
              <AddFactureForm onAddFacture={handleAddFacture} />
            </Modal>
          </div>

          {loading ? (
            <p>Loading factures...</p>
          ) : (
            <table className="min-w-full bg-white dark:bg-slate-800">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-slate-700 text-left">
                    Title
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-slate-700 text-left">
                    Amount
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-slate-700 text-left">
                    Due Date
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-slate-700 text-left">
                    Status
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-slate-700 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFactures && filteredFactures.length > 0 ? (
                  filteredFactures.map((facture) => (
                    <tr key={facture._id}>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-slate-700">
                        {facture.title}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-slate-700">
                        {facture.amount}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-slate-700">
                        {new Date(facture.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-slate-700">
                        {facture.status}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-slate-700">
                        <button className="text-blue-500 hover:underline mr-2">
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No factures found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Factures;
