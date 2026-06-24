export interface CourseDto {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  // price: number;
  // oldPrice?: number | null;
  rating: number;
  totalReviews: number;
  isPublished: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
