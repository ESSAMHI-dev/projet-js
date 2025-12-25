import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddFactureForm from "../../components/Facture/AddFactureForm";
import DeleteAlert from "../../components/DeleteAlert";
import UpdateFactureForm from "../../components/Facture/UpdateFactureForm";

const Factures = () => {
  useUserAuth();

  const [openAddFacture, setOpenAddFacture] = useState(false);
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [openUpdateFactureModal, setOpenUpdateFactureModal] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);
  
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const filteredFactures = factures.filter((facture) => {
    if (filterStatus === "all") return true;
    return facture.status === filterStatus;
  });
  

  const fetchFactures = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.FACTURES.GET_ALL_FACTURES
      );
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.factures || [];
      setFactures(data);
    } catch (error) {
      toast.error("Failed to fetch factures");
      setFactures([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFactures();
  }, [fetchFactures]);

  const handleAddFacture = async (facture) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.FACTURES.ADD_FACTURE,
        facture
      );
      if (response.data) {
        fetchFactures();
        setOpenAddFacture(false);
        toast.success("Facture added successfully");
      }
    } catch (error) {
      toast.error("Failed to add facture");
    }
  };

  const handleDeleteFacture = async (factureId) => {
    try {
      await axiosInstance.delete(API_PATHS.FACTURES.DELETE_FACTURE(factureId));
      // Locally remove the deleted item from state
      setFactures((prev) => prev.filter((item) => item._id !== factureId));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Facture deleted successfully");
    } catch (error) {
      toast.error("Failed to delete facture");
    }
  };


  const handleUpdateFacture = async (updatedFacture) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.FACTURES.UPDATE_FACTURE(updatedFacture._id),
        updatedFacture
      );
      if (response.data) {
        fetchFactures();
        setOpenUpdateFactureModal(false);
        toast.success("Facture updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update facture");
    }
  };

  return (
    <DashboardLayout activeMenu="Factures">
      <div className="my-5 mx-auto dark:text-white">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Factures Page</h1>
            <div className="flex items-center gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2 dark:bg-slate-700 dark:text-white"
              >
                <option value="all">All Statuses</option>
                <option value="paid">paid</option>
                <option value="unpaid">unpaid</option>
              </select>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                onClick={() => setOpenAddFacture(true)}
              >
                Add Facture
              </button>
            </div>
          </div>

          {loading ? (
            <p>Loading factures...</p>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="border-b dark:border-slate-700">
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Due Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFactures.length > 0 ? (
                  filteredFactures.map((facture) => (
                    <tr
                      key={facture._id}
                      className="border-b dark:border-slate-700"
                    >
                      <td className="py-2 px-4">{facture.title}</td>
                      <td className="py-2 px-4">{facture.amount}</td>
                      <td className="py-2 px-4">
                        {new Date(facture.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{facture.status}</td>
                      <td className="py-2 px-4">
                        <button
                          className="text-blue-500 mr-2 hover:cursor-pointer hover:underline"
                          onClick={() => {
                            setSelectedFacture(facture);
                            setOpenUpdateFactureModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:cursor-pointer hover:underline"
                          onClick={() =>
                            setOpenDeleteAlert({
                              show: true,
                              data: facture._id,
                            })
                          }
                        >
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

      {/* MOVE MODALS OUTSIDE THE LOOP FOR PERFORMANCE */}
      <Modal
        isOpen={openAddFacture}
        onClose={() => setOpenAddFacture(false)}
        title="Add New Facture"
      >
        <AddFactureForm onAddFacture={handleAddFacture} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        title="Delete Facture"
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
      >
        <DeleteAlert
          content="Are you sure you want to delete this facture?"
          onDelete={() => handleDeleteFacture(openDeleteAlert.data)}
        />
      </Modal>
      <Modal
        isOpen={openUpdateFactureModal}
        onClose={() => setOpenUpdateFactureModal(false)}
        title="Update Facture"
      >
        <UpdateFactureForm
          onUpdate={handleUpdateFacture}
          facture={selectedFacture}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Factures;
