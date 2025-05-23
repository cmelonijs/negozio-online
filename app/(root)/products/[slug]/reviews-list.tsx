
"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ReviewItem from "./review-item";
import {
  canUserReviewProduct,
  getReviewsByProductId,
} from "@/lib/actions/products.actions";
import ReviewFormModal from "@/components/shared/review-form-modal";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  title: string;
  userName: string;
  rating: number;
  content: string;
  date: Date;
  userId: string;
}

export default function ReviewsList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const session = await getSession();
        const sessionUserId = session?.user?.id || null;

        console.log("Session:", session);
        setUserId(sessionUserId);

        const [{ data: reviewData }, reviewPermission] = await Promise.all([
          getReviewsByProductId({ productId }),
          sessionUserId ? canUserReviewProduct(sessionUserId, productId) : false,
        ]);

        const formattedReviews = (reviewData || []).map((review: any) => ({
          ...review,
          rating: Number(review.rating),
        }));

        setReviews(formattedReviews);
        setCanReview(reviewPermission);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <p>Unable to load reviews. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {canReview && (
        <div className="mb-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded "
          >
            Leave a Review
          </Button>
          <ReviewFormModal
            productId={productId}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}

      {reviews.length === 0 ? (
        <p>
          {canReview
            ? "No reviews yet. Be the first to review this product!"
            : "No reviews yet. Purchase this product to leave a review!"}
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={{
                id: review.id,
                userName: review.userName,
                rating: Number(review.rating),
                title: review.title || "Review",
                comment: review.content,
                createdAt: review.date,
              }}
              currentUserId={userId}
              reviewUserId={review.userId}
              productId={productId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
