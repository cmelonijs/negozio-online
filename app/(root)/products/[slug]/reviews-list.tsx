/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ReviewItem from "./review-item";
import { canUserReviewProduct, getReviewsByProductId } from "@/lib/actions/products.actions";
import ReviewFormModal from "@/components/shared/review-form-modal";

export default function ReviewsList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data } = await getReviewsByProductId({ productId });
        setReviews(data || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch reviews"));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  useEffect(() => {
    const checkCanReview = async () => {
      try {
        // Get session directly without using useSession hook
        const session = await getSession();
        
        if (session?.user?.id) {
          const canUserReview = await canUserReviewProduct(session.user.id, productId);
          setCanReview(canUserReview);
        } else {
          setCanReview(false);
        }
      } catch (err) {
        console.error("Error checking review eligibility:", err);
        setCanReview(false);
      }
    };

    checkCanReview();
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

  if (reviews.length === 0) {
    return (
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {canReview && (
          <div className="mb-6">
            <ReviewFormModal productId={productId} />
          </div>
        )}
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {canReview && (
        <div className="mb-6">
          <ReviewFormModal productId={productId} />
        </div>
      )}
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
              createdAt: review.date
            }} 
          />
        ))}
      </div>
    </div>
  );
}
