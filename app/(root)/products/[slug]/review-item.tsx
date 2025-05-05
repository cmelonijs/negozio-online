import { Star, User } from 'lucide-react';

interface ReviewItemProps {
  review: {
    id: string;
    title: string
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
  };
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <div className="border rounded-lg p-6 mb-6 shadow-sm max-w-4xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{review.title}</h2>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-7 w-7 ${
              star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Review content */}
      <p className="text-gray-700 text-lg leading-relaxed mb-5">{review.comment}</p>
      
      {/* Footer with username and date */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-600 mr-2" />
          <span className="font-medium">{review.userName}</span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ReviewItem;
