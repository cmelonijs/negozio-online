import { auth } from "@/auth";
import ReviewItem from "./review-item";
import { canUserReviewProduct, getReviewsByProductId } from "@/lib/actions/products.actions";
import ReviewFormModal from "@/components/shared/review-form-modal";

export default async function ReviewsList({ productId }: { productId: string }) {
  try {
    const { data: reviews } = await getReviewsByProductId({ productId });
    const session = await auth();
    
    // Check if user can add a review
    let canReview = false;
    if (session?.user?.id) {
      canReview = await canUserReviewProduct(session.user.id, productId);
    }

    if (!reviews || reviews.length === 0) {
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
  } catch (error) {
    console.error("Error rendering reviews:", error);
    return (
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <p>Unable to load reviews. Please try again later.</p>
      </div>
    );
  }
}
