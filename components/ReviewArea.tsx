import type { Review } from "@/lib/types";
import { getPeriod, sortByKey } from "@/lib/utils";
import ReviewRating from "@/components/ReviewRating";
import Image from "next/image";
interface ReviewsProps {
  reviews: Review[];
}

const horizontalScroll = (e: React.WheelEvent<HTMLDivElement>) => {
  e.preventDefault();
  const container = e.currentTarget;
  container.scrollLeft += e.deltaY;
}

export default function ReviewArea(Review: ReviewsProps) {
  const { reviews } = Review;
  const orderedReviews = sortByKey(reviews, "date", true);

  const renderReviews = () => {
    return orderedReviews.map((review: Review) => {
      return (
        <div
          key={review.id}
          className="flex flex-col gap-2 border-2 rounded p-2 m-2"
        >
          <div className="flex gap-2 overflow-x-auto" onWheel={horizontalScroll}>
            {review.images.length > 0
              ? review.images.map((image: string) => (
                  <div className="w-[150px] h-[150px] relative flex-shrink-0 ">
                    <Image
                      key={image}
                      layout="fill"
                      objectFit="cover"
                      src={image}
                      alt={image}
                    />
                  </div>
                ))
              : null}
          </div>
          <div className="font-medium">
            {review.firstName} {review.lastName}
          </div>
          <div className="flex items-center">
            <div className="text-xl mr-2">
              <ReviewRating rating={review.rating} />
            </div>
            <div className="text-slate-500">{getPeriod(review.date)}</div>
          </div>
          <div className="text-slate-900">{review.comment}</div>
        </div>
      );
    });
  };
  return <div>{renderReviews()}</div>;
}
