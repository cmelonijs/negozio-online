import { Star, User } from "lucide-react";
import { useState } from "react";
import ReviewFormModal from "@/components/shared/review-form-modal";
import { Button } from "@/components/ui/button";

interface ReviewItemProps {
  review: {
    id: string;
    userName: string;
    rating: number;
    title: string;
    comment: string;
    createdAt: Date;
  };
  productId: string;
  reviewUserId: string;
  currentUserId: string | null;
}

const ReviewItem = ({
  review,
  currentUserId,
  reviewUserId,
  productId,
}: ReviewItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isOwner = currentUserId === reviewUserId;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm dark:shadow-gray-900/10 max-w-4xl mx-auto bg-white dark:bg-gray-800">
      {/* Review title */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {review.title}
      </h2>

      {/* Star rating */}
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-7 w-7 ${
              star <= review.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-5">
        {review.comment}
      </p>

      {/* Footer: User + Date + Edit Button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <span className="font-medium dark:text-gray-200">
            {review.userName}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>

          {isOwner && (
            <Button
              onClick={() => setIsEditOpen(true)}
              className="text-sm text-red-600 hover:underline px-3 py-1 border border-red-600 rounded-md"
              variant="ghost"
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Edit Review Modal */}
      <ReviewFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        productId={productId}
        existingReview={{
          id: review.id,
          title: review.title,
          content: review.comment,
          rating: review.rating,
        }}
      />
    </div>
  );
};

export default ReviewItem;
