import { Star } from 'lucide-react';

interface ReviewItemProps {
  review: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
  };
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 font-medium">{review.userName}</span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
