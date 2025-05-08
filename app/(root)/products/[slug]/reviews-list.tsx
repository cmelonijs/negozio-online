/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ReviewItem from "./review-item";
import { canUserReviewProduct, getReviewsByProductId } from "@/lib/actions/products.actions";
import ReviewFormModal from "@/components/shared/review-form-modal";
interface Review {
  id: string;
  title: string;
  userName: string;
  rating: number;
  content: string;
  date: Date;
  userId: string; // Added userId property
}

export default function ReviewsList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data } = await getReviewsByProductId({ productId });
        setReviews((data || []).map((review: any) => ({
          ...review,
          rating: Number(review.rating),
        })));
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch reviews"));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // useEffect(() => {
  //   const checkCanReview = async () => {
  //     try {
  //       // Get session directly without using useSession hook
  //       const session = await getSession();
        
  //       if (session?.user?.id) {
  //         const canUserReview = await canUserReviewProduct(session.user.id, productId);
  //         setCanReview(canUserReview);
  //       } else {
  //         setCanReview(false);
  //       }
  //     } catch (err) {
  //       console.error("Error checking review eligibility:", err);
  //       setCanReview(false);
  //     }
  //   };

  //   checkCanReview();
  // }, [productId]);

 // In ReviewsList.tsx
const [userId, setUserId] = useState<string | null>(null);

useEffect(() => {
  const checkCanReview = async () => {
    try {
      const session = await getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
        const canUserReview = await canUserReviewProduct(session.user.id, productId);
        setCanReview(canUserReview);
      } else {
        setUserId(null);
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
        {canReview ? (
          <>
            <div className="mb-6">
              <ReviewFormModal productId={productId} isOpen={false} />
            </div>
            <p>No reviews yet. Be the first to review this product!</p>
          </>
        ) : (
          <p>No reviews yet. Purchase this product to leave a review!</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {canReview && (
        <div className="mb-6">
          <ReviewFormModal productId={productId} isOpen={false} />
        </div>
      )}
      <div className="space-y-4">
        {reviews.map((review) => (
          // <ReviewItem 
          //   key={review.id} 
          //   review={{
          //     id: review.id,
          //     userName: review.userName,
          //     rating: Number(review.rating),
          //     title: review.title || "Review",
          //     comment: review.content,
          //     createdAt: review.date
          //   }} 
          // />
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
  reviewUserId={review.userId} // Include userId with your review from backend
  productId={productId}
/>

        ))}
      </div>
    </div>
  );
}
