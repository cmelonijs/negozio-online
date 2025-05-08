"use client";

import AddReviewForm from "./add-review-form";

interface ReviewFormModalProps {
  productId: string;
  existingReview?: {
    id: string;
    title: string;
    content: string;
    rating: number;
  };
  onClose?: () => void;
  isOpen: boolean; // 👈 pass this from parent
}

export default function ReviewFormModal({
  productId,
  existingReview,
  onClose,
  isOpen,
}: ReviewFormModalProps) {
  const closeModal = () => {
    onClose?.();
  };

  if (!isOpen) return null; // 👈 only render when isOpen is true

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] mx-4 overflow-y-auto rounded-lg bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white">
            {existingReview ? "Edit Your Review" : "Write a Review"}
          </h3>
          <button
            onClick={closeModal}
            className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <AddReviewForm
            productId={productId}
            onSuccess={closeModal}
            existingReview={existingReview}
          />
        </div>
      </div>
    </div>
  );
}
