"use client";

import { useState } from "react";
import AddReviewForm from "./add-review-form";

export default function ReviewFormModal({ productId }: { productId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
      >
        Write a Review
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold dark:text-white">Write a Review</h3>
              <button 
                onClick={closeModal} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-4">
              <AddReviewForm productId={productId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
