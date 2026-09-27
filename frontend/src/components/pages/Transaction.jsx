import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import AddTransaction from "../component/AddTrasaction";
import EditTransaction from "../component/EditTransaction";
import Cards from "../parts/Cards";
import TransactionChart from "../parts/TransactionChart";
import TransactionList from "../parts/TransactionList";
import Footer from "../layouts/Footer";
import useAddTransaction from "../hooks/useAddTransaction";
import useGetTransaction from "../hooks/useGetTransaction";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import useUpdateTransaction from "../hooks/useUpdateTransaction"; // hook for updating

const Transaction = () => {
  const { deleteTransaction } = useDeleteTransaction();
  const { transactions, setTransactions, getTransactions } =
    useGetTransaction();
  const [openAddTransaction, setOpenAddTransaction] = useState(false);

  // Edit modal state
  const [editingTransaction, setEditingTransaction] = useState(null);

  const { loading: addLoading, addTransaction } = useAddTransaction();
  const { loading: updateLoading, updateTransaction } = useUpdateTransaction();

  const handleAddTransaction = async (newTx) => {
    const success = await addTransaction(newTx);
    if (success) {
      setOpenAddTransaction(false);
      getTransactions();
    }
  };

  const handleUpdateTransaction = async (updatedTx) => {
    const txId = updatedTx._id || updatedTx.id;

    const success = await updateTransaction(updatedTx);

    if (success) {
      setTransactions((prev) =>
        prev.map((item) =>
          (item._id || item.id) === txId ? { ...item, ...updatedTx } : item,
        ),
      );
      setEditingTransaction(null);
      getTransactions(); // Refresh data from backend
    }
  };

  const handleDeleteTransaction = async (id) => {
    setTransactions((prev) =>
      prev.filter((item) => (item._id || item.id) !== id),
    );
    await deleteTransaction({ transactionId: id });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="fixed top-0 right-0 left-0 z-50">
        <Navbar onOpenAddTransaction={() => setOpenAddTransaction(true)} />
      </header>

      {/* Add Modal */}
      {openAddTransaction && (
        <AddTransaction
          onClose={() => setOpenAddTransaction(false)}
          onAddTransaction={handleAddTransaction}
          loading={addLoading}
        />
      )}

      {/* Edit Modal */}
      {editingTransaction && (
        <EditTransaction
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onUpdateTransaction={handleUpdateTransaction}
          loading={updateLoading}
        />
      )}

      <main className="flex-1 pt-24 mb-10 px-4 max-w-7xl mx-auto w-full space-y-6">
        <Cards transactions={transactions} />
        <TransactionChart transactions={transactions} />
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={(item) => setEditingTransaction(item)}
        />
      </main>

      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6">
        <Footer />
      </footer>
    </div>
  );
};

export default Transaction;
